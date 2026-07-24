'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SettingsPage() {
  const [email, setEmail] = useState('analytics@company.com')
  const [organizationName, setOrganizationName] = useState('Pakakumi Company')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage account and platform preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
          <Input
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full bg-sidebar-accent/20 border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-sidebar-accent/20 border-border text-foreground"
          />
        </div>

        <Button className="bg-accent text-primary hover:bg-accent/90">Save Changes</Button>
      </div>

      {/* Attribution Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Attribution Model</h2>
        <p className="text-sm text-muted-foreground">Choose how FTDs are attributed across channels</p>

        <div className="space-y-2">
          {['First Click', 'Last Click', 'Data-Driven (Beta)'].map((model) => (
            <label key={model} className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-sidebar-accent/20">
              <input type="radio" name="attribution" value={model} defaultChecked={model === 'Last Click'} className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">{model}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>

        <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-sidebar-accent/20">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm font-medium text-foreground">Critical alerts</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-sidebar-accent/20">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm font-medium text-foreground">Daily summary</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-sidebar-accent/20">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm font-medium text-foreground">Weekly reports</span>
        </label>
      </div>

      {/* Data Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Data & Privacy</h2>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Data Retention</h3>
          <p className="text-sm text-muted-foreground mb-3">Current: 24 months</p>
          <Button variant="outline" className="bg-sidebar-accent/30 border-border hover:bg-sidebar-accent/50">
            Configure Retention Policy
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>

        <div>
          <p className="text-sm text-muted-foreground mb-3">Permanently delete this account and all associated data</p>
          <Button variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
