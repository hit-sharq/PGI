import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await prisma.deposit.deleteMany()
    await prisma.registration.deleteMany()
    await prisma.attributionEvent.deleteMany()
    await prisma.campaign.deleteMany()
    await prisma.acquisitionSource.deleteMany()
    await prisma.user.deleteMany()

    // Create acquisition sources
    console.log('📢 Creating acquisition sources...')
    const sources = await prisma.acquisitionSource.createMany({
      data: [
        { sourceName: 'Google Ads', sourceType: 'Paid Search' },
        { sourceName: 'Organic Search', sourceType: 'Organic' },
        { sourceName: 'Opera Traffic', sourceType: 'Partner' },
        { sourceName: 'Social Media', sourceType: 'Social' },
        { sourceName: 'Affiliate', sourceType: 'Affiliate' },
        { sourceName: 'Direct', sourceType: 'Direct' },
      ],
    })

    const sourceIds = await prisma.acquisitionSource.findMany()
    console.log(`✅ Created ${sourceIds.length} acquisition sources`)

    // Create campaigns
    console.log('📊 Creating campaigns...')
    const campaigns = []
    for (const source of sourceIds) {
      const campaignCount = Math.floor(Math.random() * 5) + 2
      for (let i = 0; i < campaignCount; i++) {
        const impressions = Math.floor(Math.random() * 500000) + 100000
        const clicks = Math.floor(impressions * (Math.random() * 0.1 + 0.05))
        const spend = Math.floor(clicks * (Math.random() * 50 + 20))

        const campaign = await prisma.campaign.create({
          data: {
            externalCampaignId: `camp_${source.id}_${i}`,
            name: `${source.sourceName} Campaign ${i + 1}`,
            sourceId: source.id,
            status: Math.random() > 0.3 ? 'active' : 'paused',
            dailyBudget: spend / 30,
            totalSpend: spend,
            impressions,
            clicks,
            registrations: Math.floor(clicks * 0.24),
            verifiedUsers: Math.floor(clicks * 0.16),
            FTDs: Math.floor(clicks * 0.05),
            totalDepositValue: Math.floor(clicks * 0.05 * 500),
            costPerFTD: Math.round((spend / Math.max(Math.floor(clicks * 0.05), 1)) * 100) / 100,
          },
        })
        campaigns.push(campaign)
      }
    }
    console.log(`✅ Created ${campaigns.length} campaigns`)

    // Create users and their conversion journey
    console.log('👥 Creating users and conversion journeys...')
    let userCount = 0
    let attributionEventCount = 0
    let registrationCount = 0
    let depositCount = 0

    for (const campaign of campaigns) {
      // Calculate users for this campaign
      const usersForCampaign = Math.floor(campaign.clicks * 0.2)

      for (let u = 0; u < usersForCampaign; u++) {
        const userId = await prisma.user.create({
          data: {
            externalUserId: `user_${campaign.id}_${u}`,
            acquisitionSourceId: campaign.sourceId,
          },
        })
        userCount++

        // Create attribution event (click)
        const clickedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        await prisma.attributionEvent.create({
          data: {
            userId: userId.id,
            source: campaign.source.sourceName,
            medium: 'cpc',
            campaign: campaign.name,
            adGroup: `AdGroup_${Math.floor(Math.random() * 10)}`,
            keyword: `keyword_${Math.floor(Math.random() * 100)}`,
            gclid: `gclid_${Math.random().toString(36).substring(7)}`,
            utmSource: campaign.source.sourceName,
            utmMedium: 'cpc',
            utmCampaign: campaign.name,
            landingPage: `/landing/${Math.floor(Math.random() * 20)}`,
            clickedAt,
            sourceId: campaign.sourceId,
            campaignId: campaign.id,
          },
        })
        attributionEventCount++

        // Create registration (70% of clickers)
        if (Math.random() > 0.3) {
          const registeredAt = new Date(clickedAt.getTime() + Math.random() * 24 * 60 * 60 * 1000)
          const registration = await prisma.registration.create({
            data: {
              userId: userId.id,
              source: campaign.source.sourceName,
              campaign: campaign.name,
              registeredAt,
              sourceId: campaign.sourceId,
              campaignId: campaign.id,
            },
          })
          registrationCount++

          // Update user
          await prisma.user.update({
            where: { id: userId.id },
            data: { registeredAt },
          })

          // Create verification (80% of registered users)
          if (Math.random() > 0.2) {
            const verifiedAt = new Date(registeredAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
            await prisma.user.update({
              where: { id: userId.id },
              data: { verifiedAt },
            })

            // Create deposit (35% of verified users = FTD)
            if (Math.random() > 0.65) {
              const depositedAt = new Date(verifiedAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000)
              const amount = Math.floor(Math.random() * 5000) + 500

              await prisma.deposit.create({
                data: {
                  userId: userId.id,
                  amount,
                  status: 'completed',
                  depositedAt,
                  isFirstDeposit: true,
                },
              })

              await prisma.user.update({
                where: { id: userId.id },
                data: { firstDepositAt: depositedAt, firstDepositAmount: amount, isFTD: true },
              })

              depositCount++
            }
          }
        }
      }
    }

    console.log(`✅ Created ${userCount} users`)
    console.log(`✅ Created ${attributionEventCount} attribution events (clicks)`)
    console.log(`✅ Created ${registrationCount} registrations`)
    console.log(`✅ Created ${depositCount} first-time deposits (FTDs)`)

    console.log('\n✨ Database seeding completed successfully!')
    console.log(`\nSummary:`)
    console.log(`- Acquisition Sources: ${sourceIds.length}`)
    console.log(`- Campaigns: ${campaigns.length}`)
    console.log(`- Users: ${userCount}`)
    console.log(`- FTDs: ${depositCount}`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
