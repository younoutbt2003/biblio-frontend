import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Database,
  Trash2,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Data
  const [profileData, setProfileData] = useState({
    firstName: 'Rachid',
    lastName: 'Benali',
    email: 'rachid.benali@usthb.dz',
    orcid: '0000-0002-1825-0097',
    institution: 'USTHB',
    department: 'Computer Science',
    position: 'Associate Professor',
    bio: 'Researcher specializing in AI and Machine Learning with focus on medical applications.',
    website: 'https://rachidbenali.com',
    phone: '+213 555 123 456'
  });

  // Password Data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNewCitations: true,
    emailWeeklyDigest: true,
    emailCollaborationInvites: true,
    emailSystemUpdates: false,
    pushNewCitations: true,
    pushCollaborations: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowCollaborationRequests: true,
    showPublications: true
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'Africa/Algiers',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light'
  });

  const handleSave = () => {
    // TODO: API call to save settings
    console.log('Saving settings...', {
      profile: profileData,
      notifications,
      privacy,
      preferences
    });
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = () => {
    // TODO: API call to change password
    console.log('Changing password...');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Lock },
    { id: 'preferences', name: 'Preferences', icon: Globe },
    { id: 'data', name: 'Data & Storage', icon: Database }
  ];

  return (
    <Layout title="Settings" subtitle="Manage your account and preferences">
      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-2 sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h3>
                <p className="text-sm text-gray-600">Update your personal details and public profile</p>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-2xl font-semibold">
                      RB
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                        Upload New
                      </button>
                      <button className="ml-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Remove
                      </button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* ORCID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ORCID iD
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileData.orcid}
                      onChange={(e) => setProfileData({...profileData, orcid: e.target.value})}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0000-0002-1825-0097"
                    />
                    
                     <a href={`https://orcid.org/${profileData.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify
                    </a>
                  </div>
                </div>

                {/* Institution & Department */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={profileData.institution}
                      onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Associate Professor, PhD Student"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your research interests..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {profileData.bio.length}/500 characters
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+213 555 123 456"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Address</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{profileData.email}</p>
                      <p className="text-xs text-gray-500">Your primary email address</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                    Change Email
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    Not Enabled
                  </span>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h3>
                <p className="text-sm text-gray-600">Choose how you want to be notified</p>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNewCitations', label: 'New Citations', description: 'When your work is cited' },
                      { key: 'emailWeeklyDigest', label: 'Weekly Digest', description: 'Summary of your activity' },
                      { key: 'emailCollaborationInvites', label: 'Collaboration Invites', description: 'When someone wants to collaborate' },
                      { key: 'emailSystemUpdates', label: 'System Updates', description: 'Platform news and updates' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Push Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { key: 'pushNewCitations', label: 'New Citations', description: 'Real-time citation alerts' },
                      { key: 'pushCollaborations', label: 'Collaborations', description: 'Collaboration requests' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                <p className="text-sm text-gray-600">Control who can see your information</p>
              </div>

              <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="public">Public - Anyone can see</option>
                    <option value="researchers">Researchers Only</option>
                    <option value="private">Private - Only me</option>
                  </select>
                </div>

                {/* Privacy Toggles */}
                <div className="space-y-4">
                  {[
                    { key: 'showEmail', label: 'Show Email Address', description: 'Display your email on your public profile' },
                    { key: 'showPhone', label: 'Show Phone Number', description: 'Display your phone number on your profile' },
                    { key: 'allowCollaborationRequests', label: 'Allow Collaboration Requests', description: 'Let others send you collaboration invites' },
                    { key: 'showPublications', label: 'Show Publications', description: 'Display your publications publicly' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy[item.key as keyof typeof privacy] as boolean}
                          onChange={(e) => setPrivacy({...privacy, [item.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Preferences</h3>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Africa/Algiers">Africa/Algiers (GMT+1)</option>
                    <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setPreferences({...preferences, theme})}
                        className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                          preferences.theme === theme
                            ? 'border-primary-600 bg-primary-50 text-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Storage Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              {/* Data Export */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Your Data</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Download a copy of your data including profile, publications, and activity.
                </p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Request Data Export
                </button>
              </div>

              {/* Delete Account */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-red-200">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete My Account
                </button>
              </div>
            </div>
          )}

          {/* Save Button (Fixed at bottom for relevant tabs) */}
          {['profile', 'notifications', 'privacy', 'preferences'].includes(activeTab) && (
            <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Settings saved successfully!</span>
                </div>
              )}
              <div className="flex gap-3 ml-auto">
                <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};