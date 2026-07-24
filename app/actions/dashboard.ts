'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

async function getAdminCheck() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function getDashboardMetrics(dateFrom: Date, dateTo: Date) {
  await getAdminCheck()

  const [
    totalDeposits,
    ftdCount,
    totalUsers,
    campaigns,
    sources,
    totalSpend,
    clicksData,
    registrationsData,
    verifiedData,
  ] = await Promise.all([
    prisma.deposit.aggregate({
      where: { depositedAt: { gte: dateFrom, lte: dateTo }, status: 'completed' },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.deposit.count({
      where: { isFirstDeposit: true, depositedAt: { gte: dateFrom, lte: dateTo }, status: 'completed' },
    }),
    prisma.user.count({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.campaign.findMany({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.acquisitionSource.findMany(),
    prisma.campaign.aggregate({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
      _sum: { totalSpend: true },
    }),
    prisma.attributionEvent.count({
      where: { clickedAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.registration.count({
      where: { registeredAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.registration.count({
      where: { verifiedAt: { gte: dateFrom, lte: dateTo } },
    }),
  ])

  const costPerFTD = ftdCount > 0 ? (totalSpend._sum.totalSpend || 0) / ftdCount : 0

  return {
    metrics: {
      totalSpend: totalSpend._sum.totalSpend || 0,
      impressions: 0,
      clicks: clicksData,
      registrations: registrationsData,
      verifiedUsers: verifiedData,
      ftds: ftdCount,
      costPerFTD: Math.round(costPerFTD * 100) / 100,
      totalDepositValue: totalDeposits._sum.amount || 0,
    },
    campaigns,
    sources,
    totalUsers,
  }
}

export async function getAcquisitionFunnel(dateFrom: Date, dateTo: Date) {
  await getAdminCheck()

  const [traffic, clicks, registrations, verified, ftds] = await Promise.all([
    prisma.attributionEvent.count({
      where: { clickedAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.attributionEvent.count({
      where: { clickedAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.registration.count({
      where: { registeredAt: { gte: dateFrom, lte: dateTo } },
    }),
    prisma.registration.count({
      where: { verifiedAt: { gte: dateFrom, lte: dateTo }, verifiedAt: { not: null } },
    }),
    prisma.deposit.count({
      where: { isFirstDeposit: true, depositedAt: { gte: dateFrom, lte: dateTo }, status: 'completed' },
    }),
  ])

  return {
    stages: [
      { name: 'Traffic', value: traffic || 1000, dropoff: 0 },
      {
        name: 'Clicks',
        value: clicks,
        dropoff: traffic > 0 ? Math.round(((traffic - clicks) / traffic) * 100) : 0,
      },
      {
        name: 'Registrations',
        value: registrations,
        dropoff: clicks > 0 ? Math.round(((clicks - registrations) / clicks) * 100) : 0,
      },
      {
        name: 'Verified',
        value: verified,
        dropoff: registrations > 0 ? Math.round(((registrations - verified) / registrations) * 100) : 0,
      },
      {
        name: 'FTDs',
        value: ftds,
        dropoff: verified > 0 ? Math.round(((verified - ftds) / verified) * 100) : 0,
      },
    ],
  }
}

export async function getChannelPerformance(dateFrom: Date, dateTo: Date) {
  await getAdminCheck()

  const channels = await prisma.acquisitionSource.findMany({
    include: {
      campaigns: {
        where: { createdAt: { gte: dateFrom, lte: dateTo } },
      },
      attributionEvents: {
        where: { clickedAt: { gte: dateFrom, lte: dateTo } },
      },
      registrations: {
        where: { registeredAt: { gte: dateFrom, lte: dateTo } },
      },
    },
  })

  const channelData = await Promise.all(
    channels.map(async (channel) => {
      const ftds = await prisma.deposit.count({
        where: {
          isFirstDeposit: true,
          user: {
            attributionEvents: {
              some: {
                sourceId: channel.id,
              },
            },
          },
          depositedAt: { gte: dateFrom, lte: dateTo },
          status: 'completed',
        },
      })

      const totalSpend = channel.campaigns.reduce((sum, c) => sum + c.totalSpend, 0)
      const clicks = channel.attributionEvents.length

      return {
        id: channel.id,
        name: channel.sourceName,
        type: channel.sourceType,
        spend: totalSpend,
        traffic: clicks,
        registrations: channel.registrations.length,
        ftds,
        costPerFTD: ftds > 0 ? Math.round((totalSpend / ftds) * 100) / 100 : 0,
        conversionRate: clicks > 0 ? Math.round((ftds / clicks) * 10000) / 100 : 0,
      }
    })
  )

  return channelData.sort((a, b) => b.ftds - a.ftds)
}

export async function getCampaignPerformance(dateFrom: Date, dateTo: Date, sourceId?: string) {
  await getAdminCheck()

  const campaigns = await prisma.campaign.findMany({
    where: {
      createdAt: { gte: dateFrom, lte: dateTo },
      ...(sourceId && { sourceId }),
    },
    include: {
      source: true,
    },
  })

  const performanceData = await Promise.all(
    campaigns.map(async (campaign) => {
      const ftds = await prisma.deposit.count({
        where: {
          isFirstDeposit: true,
          user: {
            attributionEvents: {
              some: {
                campaignId: campaign.id,
              },
            },
          },
          depositedAt: { gte: dateFrom, lte: dateTo },
          status: 'completed',
        },
      })

      const totalDepositValue = await prisma.deposit.aggregate({
        where: {
          isFirstDeposit: true,
          user: {
            attributionEvents: {
              some: {
                campaignId: campaign.id,
              },
            },
          },
          depositedAt: { gte: dateFrom, lte: dateTo },
          status: 'completed',
        },
        _sum: { amount: true },
      })

      const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0
      const cpc = campaign.clicks > 0 ? campaign.totalSpend / campaign.clicks : 0
      const costPerFTD = ftds > 0 ? campaign.totalSpend / ftds : 0

      // Performance categorization
      let performance = 'INVESTIGATE'
      if (ftds > 100 && costPerFTD < 500) performance = 'SCALE'
      else if (ftds > 50 && costPerFTD < 800) performance = 'OPTIMIZE'
      else if (campaign.totalSpend > 50000 && ftds < 50) performance = 'INVESTIGATE'
      else if (ftds === 0 && campaign.totalSpend > 20000) performance = 'PAUSE'

      return {
        id: campaign.id,
        name: campaign.name,
        source: campaign.source.sourceName,
        status: campaign.status,
        spend: campaign.totalSpend,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        ctr: Math.round(ctr * 100) / 100,
        cpc: Math.round(cpc * 100) / 100,
        registrations: campaign.registrations,
        verified: campaign.verifiedUsers,
        ftds,
        costPerFTD: Math.round(costPerFTD * 100) / 100,
        totalDepositValue: totalDepositValue._sum.amount || 0,
        performance,
      }
    })
  )

  return performanceData.sort((a, b) => b.ftds - a.ftds)
}
