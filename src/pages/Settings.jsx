import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Mail, 
  Phone,
  MapPin,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  X,
  Edit3,
  Trash2,
  Users,
  Database,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon
} from 'lucide-react'

const Settings = () => {
  const { user, permissions, isAdmin, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    website: user?.website || '',
    organization: user?.organization || ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    weeklyDigest: true,
    socialUpdates: true,
    systemUpdates: true,
    marketingEmails: false
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showAchievements: true,
    showActivity: true
  })

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    units: 'metric',
    autoSave: true
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'system', name: 'System', icon: SettingsIcon },
    ...(isAdmin ? [{ id: 'admin', name: 'Admin', icon: Database }] : [])
  ]

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
    setHasChanges(true)
  }

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handleSystemChange = (setting, value) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    try {
      // Mock save functionality
      await new Promise(resolve => setTimeout(resolve, 1000))
      setHasChanges(false)
      // Show success message
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const handleExportData = () => {
    // Mock data export
    const userData = {
      profile: profileData,
      notifications: notificationSettings,
      privacy: privacySettings,
      system: systemSettings
    }
    const dataStr = JSON.stringify(userData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `mumbai-beach-cleanup-settings-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-ocean-500 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="card">
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${user?.role === 'admin' ? 'text-purple-600' : user?.role === 'volunteer' ? 'text-green-600' : 'text-blue-600'}`}>
                        {user?.role?.toUpperCase()}
                      </span>
                      {user?.role === 'admin' && <Shield className="h-4 w-4 text-purple-600" />}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={user?.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-ocean-500 text-white rounded-full flex items-center justify-center hover:bg-ocean-600">
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                        <p className="text-gray-600">{user?.email}</p>
                        <p className="text-sm text-gray-500">Member since {user?.joinedDate}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="Tell us about yourself and your environmental interests..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push notifications' },
                          { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Text message notifications for urgent updates' }
                        ].map(setting => (
                          <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800">{setting.label}</div>
                              <div className="text-sm text-gray-600">{setting.desc}</div>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(setting.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notificationSettings[setting.key] ? 'bg-ocean-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Content</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'eventReminders', label: 'Event Reminders', desc: 'Reminders for upcoming cleanup events' },
                          { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of community activities and achievements' },
                          { key: 'socialUpdates', label: 'Social Updates', desc: 'New posts, comments, and community interactions' },
                          { key: 'systemUpdates', label: 'System Updates', desc: 'Platform updates and maintenance notifications' },
                          { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and partnership opportunities' }
                        ].map(setting => (
                          <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800">{setting.label}</div>
                              <div className="text-sm text-gray-600">{setting.desc}</div>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(setting.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notificationSettings[setting.key] ? 'bg-ocean-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Who can see your profile?
                          </label>
                          <select
                            value={privacySettings.profileVisibility}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                          >
                            <option value="public">Everyone</option>
                            <option value="members">Platform Members Only</option>
                            <option value="volunteers">Volunteers and Above</option>
                            <option value="private">Only Me</option>
                          </select>
                        </div>

                        {[
                          { key: 'showEmail', label: 'Show Email Address' },
                          { key: 'showPhone', label: 'Show Phone Number' },
                          { key: 'showLocation', label: 'Show Location' },
                          { key: 'allowMessages', label: 'Allow Direct Messages' },
                          { key: 'showAchievements', label: 'Show Achievements' },
                          { key: 'showActivity', label: 'Show Activity History' }
                        ].map(setting => (
                          <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium text-gray-800">{setting.label}</div>
                            <button
                              onClick={() => handlePrivacyChange(setting.key, !privacySettings[setting.key])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                privacySettings[setting.key] ? 'bg-ocean-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  privacySettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <button className="w-full btn-outline text-left p-4 flex items-center justify-between">
                          <div>
                            <div className="font-medium">Change Password</div>
                            <div className="text-sm text-gray-600">Update your account password</div>
                          </div>
                          <Lock className="h-5 w-5 text-gray-400" />
                        </button>
                        
                        <button className="w-full btn-outline text-left p-4 flex items-center justify-between">
                          <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-gray-600">Add extra security to your account</div>
                          </div>
                          <Shield className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === 'system' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">System Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          value={systemSettings.theme}
                          onChange={(e) => handleSystemChange('theme', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={systemSettings.language}
                          onChange={(e) => handleSystemChange('language', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिन्दी</option>
                          <option value="mr">मराठी</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={systemSettings.timezone}
                          onChange={(e) => handleSystemChange('timezone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <select
                          value={systemSettings.dateFormat}
                          onChange={(e) => handleSystemChange('dateFormat', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <button 
                          onClick={handleExportData}
                          className="w-full btn-outline text-left p-4 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">Export Data</div>
                            <div className="text-sm text-gray-600">Download your account data</div>
                          </div>
                          <Download className="h-5 w-5 text-gray-400" />
                        </button>
                        
                        <button 
                          onClick={() => setShowDeleteAccount(true)}
                          className="w-full border border-red-200 text-red-600 hover:bg-red-50 text-left p-4 flex items-center justify-between rounded-lg transition-colors"
                        >
                          <div>
                            <div className="font-medium">Delete Account</div>
                            <div className="text-sm text-red-500">Permanently delete your account and all data</div>
                          </div>
                          <Trash2 className="h-5 w-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Settings */}
              {activeTab === 'admin' && isAdmin && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <h3 className="text-lg font-semibold mb-2">Platform Analytics</h3>
                        <p className="text-purple-100 mb-4">Configure analytics and reporting</p>
                        <button className="btn-outline border-white text-white hover:bg-white hover:text-purple-600">
                          Configure
                        </button>
                      </div>

                      <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <h3 className="text-lg font-semibold mb-2">User Management</h3>
                        <p className="text-blue-100 mb-4">Manage user roles and permissions</p>
                        <button className="btn-outline border-white text-white hover:bg-white hover:text-blue-600">
                          Manage
                        </button>
                      </div>

                      <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <h3 className="text-lg font-semibold mb-2">Content Moderation</h3>
                        <p className="text-green-100 mb-4">Review and moderate platform content</p>
                        <button className="btn-outline border-white text-white hover:bg-white hover:text-green-600">
                          Review
                        </button>
                      </div>

                      <div className="card bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <h3 className="text-lg font-semibold mb-2">System Maintenance</h3>
                        <p className="text-orange-100 mb-4">Platform maintenance and updates</p>
                        <button className="btn-outline border-white text-white hover:bg-white hover:text-orange-600">
                          Maintain
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {hasChanges && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-6 right-6 flex items-center space-x-3"
                >
                  <button
                    onClick={() => setHasChanges(false)}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Settings
