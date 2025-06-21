import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useSearchParams } from 'react-router-dom'
import { 
  Edit3, 
  Camera, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone,
  Award,
  Star,
  TrendingUp,
  Users,
  Recycle,
  Heart,
  Share2,
  Settings,
  Bell,
  Shield,
  Eye,
  Download,
  Search,
  Filter,
  UserCheck,
  UserX,
  Crown
} from 'lucide-react'

const Profile = () => {
  const { user, updateProfile, mockUsers, permissions, isAdmin, isVolunteer } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [viewingUserId, setViewingUserId] = useState(null)
  const [userSearch, setUserSearch] = useState('')
  
  // Get user ID from URL params (for admin viewing other profiles)
  const profileUserId = searchParams.get('userId')
  
  // Determine which user profile to display
  const currentProfileUser = React.useMemo(() => {
    if (profileUserId && permissions.canViewAllUsers) {
      return mockUsers.find(u => u.id === parseInt(profileUserId))
    }
    return user
  }, [profileUserId, permissions.canViewAllUsers, mockUsers, user])

  const [formData, setFormData] = useState({
    name: currentProfileUser?.name || '',
    email: currentProfileUser?.email || '',
    location: currentProfileUser?.location || '',
    phone: currentProfileUser?.phone || '',
    bio: currentProfileUser?.bio || ''
  })

  // Filter users for admin search
  const filteredUsers = React.useMemo(() => {
    if (!permissions.canViewAllUsers || !userSearch) return mockUsers
    return mockUsers.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
    )
  }, [userSearch, mockUsers, permissions.canViewAllUsers])

  const isViewingOwnProfile = !profileUserId || currentProfileUser?.id === user?.id

  const achievements = [
    { name: 'Eco Warrior', description: 'Participated in 20+ cleanups', icon: '🌍', earned: true },
    { name: 'Beach Guardian', description: 'Cleaned 5 different beaches', icon: '🏖️', earned: true },
    { name: 'Community Leader', description: 'Organized 10+ events', icon: '👥', earned: true },
    { name: 'Plastic Fighter', description: 'Removed 100kg+ plastic waste', icon: '♻️', earned: false },
    { name: 'Consistency Champion', description: '30 days streak', icon: '🔥', earned: true },
    { name: 'Social Influencer', description: '1000+ social media engagements', icon: '📱', earned: false }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'cleanup',
      title: 'Juhu Beach Morning Cleanup',
      date: '2024-06-15',
      waste: '15kg',
      participants: 45,
      photos: 8
    },
    {
      id: 2,
      type: 'post',
      title: 'Shared cleanup photos',
      date: '2024-06-10',
      likes: 34,
      comments: 12
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned "Consistency Champion" badge',
      date: '2024-06-08',
      points: 200
    }
  ]
  const impactStats = [
    { label: 'Events Attended', value: currentProfileUser?.eventsParticipated || 0, icon: Calendar, color: 'text-blue-500' },
    { label: 'Waste Collected', value: `${currentProfileUser?.wasteCollected || 0}kg`, icon: Recycle, color: 'text-green-500' },
    { label: 'Impact Points', value: currentProfileUser?.impactPoints || 0, icon: Star, color: 'text-yellow-500' },
    { label: 'Badges Earned', value: currentProfileUser?.badges?.length || 0, icon: Award, color: 'text-purple-500' }
  ]

  const handleUserSelect = (userId) => {
    setSearchParams({ userId: userId.toString() })
    setViewingUserId(userId)
  }

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin User Browser */}
        {permissions.canViewAllUsers && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                <span>User Management</span>
              </h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUsers.map((userData) => (
                <motion.div
                  key={userData.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserSelect(userData.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    currentProfileUser?.id === userData.id
                      ? 'border-ocean-500 bg-ocean-50'
                      : 'border-gray-200 hover:border-ocean-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {userData.role === 'admin' && (
                        <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userData.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData.email}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        userData.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800'
                          : userData.role === 'moderator'
                          ? 'bg-blue-100 text-blue-800'
                          : userData.role === 'volunteer'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userData.role}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-gray-500">
                    <span>{userData.eventsParticipated} events</span>
                    <span>{userData.impactPoints} points</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
          {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-ocean-500 to-green-500 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="relative z-10">
            {/* Admin/Moderator Badge */}
            {!isViewingOwnProfile && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  <Eye className="h-4 w-4 mr-2" />
                  Viewing {currentProfileUser?.role} profile
                </span>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <img
                  src={currentProfileUser?.avatar}
                  alt={currentProfileUser?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                />
                {isViewingOwnProfile && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Camera className="h-5 w-5" />
                  </button>
                )}
                {currentProfileUser?.role === 'admin' && (
                  <Crown className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300" />
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">{currentProfileUser?.name}</h1>
                  {currentProfileUser?.role === 'admin' && (
                    <Shield className="h-6 w-6 text-yellow-300" />
                  )}
                </div>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-white/90 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{currentProfileUser?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {currentProfileUser?.joinedDate}</span>
                  </div>
                </div>
                
                <p className="text-white/90 max-w-2xl">
                  {currentProfileUser?.role === 'admin' 
                    ? 'Platform administrator dedicated to managing and growing the Mumbai Beach Cleanup community.'
                    : currentProfileUser?.role === 'moderator'
                    ? 'Community moderator helping maintain a positive and engaging environment for all volunteers.'
                    : currentProfileUser?.role === 'volunteer'
                    ? 'Active volunteer and event organizer passionate about environmental conservation.'
                    : 'Passionate environmental advocate dedicated to keeping Mumbai\'s beaches clean.'
                  }
                </p>
              </div>
              
              {isViewingOwnProfile && (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-outline border-white text-white hover:bg-white hover:text-ocean-600 flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button className="btn-outline border-white text-white hover:bg-white hover:text-ocean-600 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-gray-200"
        >
          <nav className="flex space-x-8">
            {['overview', 'achievements', 'activities', 'edit'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-ocean-500 text-ocean-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Recent Activities */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                        <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                          {activity.type === 'cleanup' && <Recycle className="h-6 w-6 text-ocean-600" />}
                          {activity.type === 'post' && <Share2 className="h-6 w-6 text-ocean-600" />}
                          {activity.type === 'achievement' && <Award className="h-6 w-6 text-ocean-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{activity.title}</div>
                          <div className="text-sm text-gray-600">{activity.date}</div>
                          {activity.waste && (
                            <div className="text-sm text-green-600">Collected {activity.waste} waste</div>
                          )}
                          {activity.likes && (
                            <div className="text-sm text-red-500">{activity.likes} likes, {activity.comments} comments</div>
                          )}
                          {activity.points && (
                            <div className="text-sm text-yellow-600">+{activity.points} points</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Progress */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Events Goal</span>
                        <span className="text-gray-800">8/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Waste Collection Goal</span>
                        <span className="text-gray-800">45kg/50kg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Social Engagement</span>
                        <span className="text-gray-800">156/200</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Achievements & Badges</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={achievement.name}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <div className={`font-bold ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                            {achievement.name}
                          </div>
                          <div className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                            {achievement.description}
                          </div>
                        </div>
                        {achievement.earned && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'edit' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      placeholder="Tell us about your environmental journey..."
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button onClick={handleSave} className="btn-primary">
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-orange-600">15 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rank</span>
                  <span className="font-bold text-purple-600">#127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Badge</span>
                  <span className="font-bold text-green-600">5 more events</span>
                </div>
              </div>
            </motion.div>            {/* Earned Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Badges</h3>
              <div className="space-y-3">
                {currentProfileUser?.badges?.slice(0, 3).map((badge, index) => (
                  <div key={badge} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{badge}</div>
                      <div className="text-xs text-gray-500">Recently earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Share Profile</h3>
              <div className="space-y-3">
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share Profile</span>
                </button>
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Certificate</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
