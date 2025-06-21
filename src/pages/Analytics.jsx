import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  Recycle, 
  MapPin, 
  Award,
  Download,
  Filter,
  Eye,
  Camera,
  Target,
  Globe
} from 'lucide-react'

const Analytics = () => {
  const { user, permissions, isAdmin, isVolunteer, mockUsers } = useAuth()
  const [timeRange, setTimeRange] = useState('30d')
  const [viewType, setViewType] = useState('overview')

  // Redirect if user doesn't have analytics permissions
  if (!permissions.canViewAnalytics && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600">You don't have permission to view analytics.</p>
        </div>
      </div>
    )
  }

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', events: 12, participants: 340, waste: 125, points: 1800 },
    { month: 'Feb', events: 15, participants: 420, waste: 180, points: 2100 },
    { month: 'Mar', events: 18, participants: 520, waste: 240, points: 2800 },
    { month: 'Apr', events: 22, participants: 680, waste: 310, points: 3200 },
    { month: 'May', events: 25, participants: 750, waste: 360, points: 3800 },
    { month: 'Jun', events: 28, participants: 890, waste: 420, points: 4200 }
  ]

  const wasteTypeData = [
    { name: 'Plastic Bottles', value: 35, color: '#0ea5e9' },
    { name: 'Plastic Bags', value: 25, color: '#22c55e' },
    { name: 'Food Waste', value: 15, color: '#f59e0b' },
    { name: 'Cigarette Butts', value: 12, color: '#ef4444' },
    { name: 'Glass', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ]

  const beachData = [
    { beach: 'Juhu', cleanups: 45, waste: 180, rating: 4.8 },
    { beach: 'Marine Drive', waste: 145, cleanups: 38, rating: 4.6 },
    { beach: 'Versova', cleanups: 32, waste: 165, rating: 4.9 },
    { beach: 'Bandra', cleanups: 28, waste: 120, rating: 4.5 },
    { beach: 'Chowpatty', cleanups: 22, waste: 95, rating: 4.3 }
  ]

  const weeklyActivity = [
    { day: 'Mon', activity: 65 },
    { day: 'Tue', activity: 78 },
    { day: 'Wed', activity: 45 },
    { day: 'Thu', activity: 89 },
    { day: 'Fri', activity: 56 },
    { day: 'Sat', activity: 95 },
    { day: 'Sun', activity: 82 }
  ]
  const impactMetrics = [
    {
      title: permissions.canViewAllUsers ? 'Total Platform Events' : 'Events Attended',
      value: permissions.canViewAllUsers ? '156' : (user?.eventsParticipated || '8'),
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: permissions.canViewAllUsers ? 'Total Active Volunteers' : 'Your Rank',
      value: permissions.canViewAllUsers ? '2,847' : '#127',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: permissions.canViewAllUsers ? 'Total Waste Collected' : 'Your Waste Collected',
      value: permissions.canViewAllUsers ? '4.2 Tons' : `${user?.wasteCollected || 45}kg`,
      change: '+25%',
      trend: 'up',
      icon: Recycle,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: permissions.canViewAllUsers ? 'Beaches Cleaned' : 'Impact Points',
      value: permissions.canViewAllUsers ? '28' : (user?.impactPoints || 890),
      change: '+5%',
      trend: 'up',
      icon: permissions.canViewAllUsers ? MapPin : Award,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const achievementStats = [
    { achievement: 'First Timer', count: 245, percentage: 15 },
    { achievement: 'Weekend Warrior', count: 189, percentage: 12 },
    { achievement: 'Eco Champion', count: 156, percentage: 10 },
    { achievement: 'Community Leader', count: 89, percentage: 6 },
    { achievement: 'Plastic Fighter', count: 234, percentage: 14 }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Analytics & Impact
            </h1>
            <p className="text-gray-600 text-lg">
              Track environmental impact and community engagement across Mumbai's beaches
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="3m">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="btn-outline flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    <span>{metric.change}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {metric.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {metric.title}
                </div>
              </motion.div>
            )
          })}        </div>

        {/* Admin User Management Section */}
        {permissions.canViewAllUsers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <span>User Analytics</span>
              </h2>
              <div className="flex items-center space-x-2">
                <button className="btn-outline text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">{mockUsers.length}</div>
                <div className="text-blue-100">Total Users</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {mockUsers.filter(u => u.role === 'volunteer').length}
                </div>
                <div className="text-green-100">Active Volunteers</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {mockUsers.filter(u => u.role === 'moderator' || u.role === 'admin').length}
                </div>
                <div className="text-purple-100">Staff Members</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {Math.round(mockUsers.reduce((sum, u) => sum + (u.impactPoints || 0), 0) / mockUsers.length)}
                </div>
                <div className="text-orange-100">Avg Points per User</div>
              </div>
            </div>
            
            {/* Top Performers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-600">User</th>
                    <th className="text-left p-3 font-medium text-gray-600">Role</th>
                    <th className="text-left p-3 font-medium text-gray-600">Events</th>
                    <th className="text-left p-3 font-medium text-gray-600">Waste Collected</th>
                    <th className="text-left p-3 font-medium text-gray-600">Impact Points</th>
                    <th className="text-left p-3 font-medium text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers
                    .sort((a, b) => (b.impactPoints || 0) - (a.impactPoints || 0))
                    .map((userData, index) => (
                    <tr key={userData.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{userData.name}</div>
                            <div className="text-gray-500 text-xs">{userData.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
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
                      </td>
                      <td className="p-3 font-medium">{userData.eventsParticipated || 0}</td>
                      <td className="p-3 font-medium">{userData.wasteCollected || 0}kg</td>
                      <td className="p-3 font-medium text-green-600">{userData.impactPoints || 0}</td>
                      <td className="p-3 text-gray-600">{userData.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Main Analytics Grid */}
        <div className="grid lg:grid-cols-8 gap-8">
          
          {/* Monthly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Monthly Progress</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewType('overview')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewType === 'overview' ? 'bg-ocean-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewType('detailed')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    viewType === 'detailed' ? 'bg-ocean-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="waste"
                  stackId="1"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.6}
                  name="Waste Collected (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="participants"
                  stackId="2"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.6}
                  name="Participants"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Waste Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 card"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Waste Type Distribution</h2>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-2 mt-4">
              {wasteTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Beach Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 card"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Beach Performance</h2>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={beachData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="beach" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cleanups" fill="#0ea5e9" name="Cleanups" />
                <Bar dataKey="waste" fill="#22c55e" name="Waste (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Activity Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 card"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Activity Pattern</h2>
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Achievement Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 card"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Achievement Distribution</h2>
            
            <div className="space-y-4">
              {achievementStats.map((achievement, index) => (
                <div key={achievement.achievement} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {achievement.achievement}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {achievement.count} users ({achievement.percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.percentage * 5}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 card"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {[
                { type: 'cleanup', text: 'Juhu Beach cleanup completed', time: '2 hours ago', icon: Recycle },
                { type: 'user', text: '45 new volunteers joined', time: '4 hours ago', icon: Users },
                { type: 'photo', text: '28 cleanup photos uploaded', time: '6 hours ago', icon: Camera },
                { type: 'achievement', text: '12 new badges earned', time: '8 hours ago', icon: Award },
                { type: 'goal', text: 'Monthly waste target: 80% achieved', time: '1 day ago', icon: Target }
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-ocean-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">
                        {activity.text}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Environmental Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-green-500 to-blue-500 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Environmental Impact Summary</h2>
              <p className="text-white/90 mb-4">
                Your collective efforts are making a real difference to Mumbai's coastal environment
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold">4.2T</div>
                  <div className="text-white/80">Waste Removed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">28</div>
                  <div className="text-white/80">Beaches Cleaned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2,847</div>
                  <div className="text-white/80">Active Volunteers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-white/80">Events Organized</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Globe className="h-24 w-24 text-white/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
