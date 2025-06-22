import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Users, 
  Award, 
  TrendingUp, 
  MapPin, 
  Camera,
  Recycle,
  Heart,
  Star,
  Trophy,
  Target,
  Activity,
  Flame
} from 'lucide-react'

const Dashboard = () => {
  const { user, permissions, isAdmin, isVolunteer, mockUsers } = useAuth()

  // Admin gets to see all users' data
  const getAllUsersStats = () => {
    if (!permissions.canViewAllUsers) return null
    
    return {
      totalUsers: mockUsers.length,
      totalEvents: mockUsers.reduce((sum, u) => sum + (u.eventsParticipated || 0), 0),
      totalWaste: mockUsers.reduce((sum, u) => sum + (u.wasteCollected || 0), 0),
      totalPoints: mockUsers.reduce((sum, u) => sum + (u.impactPoints || 0), 0)
    }
  }

  const allUsersStats = getAllUsersStats()

  const recentActivities = [
    {
      id: 1,
      type: 'cleanup',
      title: 'Juhu Beach Cleanup',
      date: '2024-06-15',
      points: 150,
      icon: Recycle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'badge',
      title: `Earned "${user?.badges?.[user.badges.length - 1] || 'New Badge'}" Badge`,
      date: '2024-06-10',
      points: 200,
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'social',
      title: 'Shared cleanup photos',
      date: '2024-06-08',
      points: 50,
      icon: Camera,
      color: 'text-blue-600'
    },
    // Admin-specific activities
    ...(isAdmin ? [
      {
        id: 4,
        type: 'admin',
        title: 'Reviewed 5 new user registrations',
        date: '2024-06-07',
        points: 0,
        icon: Users,
        color: 'text-purple-600'
      },
      {
        id: 5,
        type: 'admin',
        title: 'Created new cleanup event',
        date: '2024-06-06',
        points: 100,
        icon: Calendar,
        color: 'text-orange-600'
      }
    ] : []),
    // Volunteer-specific activities
    ...(isVolunteer ? [
      {
        id: 6,
        type: 'volunteer',
        title: 'Organized community meetup',
        date: '2024-06-05',
        points: 300,
        icon: Users,
        color: 'text-indigo-600'
      }
    ] : [])
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Bandra Beach Cleanup',
      date: '2024-06-25',
      time: '06:00 AM',
      location: 'Bandra Beach, Mumbai',
      participants: 45,
      weather: 'Sunny, 28°C'
    },
    {
      id: 2,
      title: 'Marine Drive Cleanup',
      date: '2024-06-28',
      time: '07:00 AM',
      location: 'Marine Drive, Mumbai',
      participants: 32,
      weather: 'Partly Cloudy, 26°C'
    },
    {
      id: 3,
      title: 'Versova Beach Cleanup',
      date: '2024-07-02',
      time: '06:30 AM',
      location: 'Versova Beach, Mumbai',
      participants: 28,
      weather: 'Clear, 29°C'
    }
  ]
  const achievements = [
    {
      title: 'Events Attended',
      value: user?.eventsParticipated || 0,
      target: isAdmin ? 100 : isVolunteer ? 50 : 25,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Waste Collected',
      value: user?.wasteCollected || 0,
      target: isAdmin ? 500 : isVolunteer ? 200 : 100,
      unit: 'kg',
      icon: Recycle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Impact Points',
      value: user?.impactPoints || 0,
      target: isAdmin ? 10000 : isVolunteer ? 5000 : 2000,
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: permissions.canViewAllUsers ? 'Platform Rank' : 'Community Rank',
      value: isAdmin ? 1 : isVolunteer ? Math.floor(Math.random() * 10) + 1 : 127,
      total: permissions.canViewAllUsers ? mockUsers.length : 1000,
      icon: Trophy,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  // Admin-specific stats
  const adminStats = permissions.canViewAllUsers ? [
    {
      title: 'Total Platform Users',
      value: allUsersStats?.totalUsers || 0,
      icon: Users,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Platform Events',
      value: allUsersStats?.totalEvents || 0,
      icon: Calendar,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Total Platform Waste',
      value: `${allUsersStats?.totalWaste || 0}kg`,
      icon: Recycle,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Platform Impact Points',
      value: `${Math.floor((allUsersStats?.totalPoints || 0) / 1000)}K`,
      icon: Award,
      color: 'from-pink-500 to-rose-500'
    }
  ] : []

  const weeklyProgress = [
    { day: 'Mon', activity: 2, goal: 3 },
    { day: 'Tue', activity: 3, goal: 3 },
    { day: 'Wed', activity: 1, goal: 3 },
    { day: 'Thu', activity: 4, goal: 3 },
    { day: 'Fri', activity: 2, goal: 3 },
    { day: 'Sat', activity: 5, goal: 3 },
    { day: 'Sun', activity: 3, goal: 3 }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-ocean-500 to-green-500 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 
                {isAdmin && ' 👑'} 
                {isVolunteer && ' 🌟'}
                {!isAdmin && !isVolunteer && ' 🌊'}
              </h1>
              <p className="text-white/90 text-lg">
                {isAdmin && "Manage the platform and track overall community impact."}
                {isVolunteer && "Lead the community and organize amazing cleanup events."}
                {!isAdmin && !isVolunteer && "Ready to make a difference today? Check out your impact and upcoming events."}
              </p>
              {permissions.canViewAllUsers && (
                <div className="mt-2 text-white/80">
                  <span className="text-sm">
                    Platform Overview: {allUsersStats?.totalUsers} users • {allUsersStats?.totalEvents} events • {allUsersStats?.totalWaste}kg waste collected
                  </span>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white/20"
              />
            </div>
          </div>
        </motion.div>

        {/* Admin Platform Stats */}
        {permissions.canViewAllUsers && adminStats.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card border-l-4 border-purple-500"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {stat.title}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Live Cleanup Gamification Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-r from-blue-500 to-green-500 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Activity className="h-6 w-6" />
                <span>Live Cleanup Status</span>
              </h2>
              <p className="text-blue-100">
                {isAdmin 
                  ? 'Monitor real-time cleanup progress and participant tracking'
                  : 'Join live cleanup sessions and earn real-time rewards'
                }
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">12</div>
              <div className="text-blue-100">Active cleanups</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">287</div>
              <div className="text-blue-100 text-sm">Participants Online</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">1.2K</div>
              <div className="text-blue-100 text-sm">Kg Collected Today</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">45</div>
              <div className="text-blue-100 text-sm">Real-time Achievements</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-blue-100">Live tracking active</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-100">
                <Flame className="h-4 w-4" />
                <span>Current streak: {user?.streak || 5} days</span>
              </div>
            </div>
            <div className="flex space-x-3">
              {isAdmin && (
                <Link to="/admin-tracking" className="btn-outline border-white text-white hover:bg-white hover:text-blue-600">
                  <Target className="h-4 w-4 mr-2" />
                  Admin Tracking
                </Link>
              )}
              <Link to="/live-cleanup" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors">
                <Activity className="h-4 w-4 mr-2 inline" />
                {isAdmin ? 'Monitor Live' : 'Join Live Cleanup'}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements & Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold gradient-text flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Recent Achievements & Milestones</span>
            </h2>
            <Link to="/achievements" className="btn-outline text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🏆', title: 'Beach Champion', description: 'Reached level 8!', time: '2 hours ago', points: 200 },
              { icon: '⚡', title: 'Speed Collector', description: 'Collected 25kg in 30 min', time: '1 day ago', points: 150 },
              { icon: '🎯', title: 'Milestone Crusher', description: 'Completed 5 milestones', time: '2 days ago', points: 300 }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      +{achievement.points} points
                    </span>
                    <span className="text-xs text-gray-500">{achievement.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {permissions.canViewAllUsers ? 'Your Personal Stats' : 'Your Impact'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            const progress = achievement.target 
              ? (achievement.value / achievement.target) * 100 
              : (achievement.value / achievement.total) * 100

            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {achievement.value}{achievement.unit}
                    </div>
                    <div className="text-sm text-gray-500">
                      {achievement.target ? `of ${achievement.target}${achievement.unit || ''}` : `of ${achievement.total}`}
                    </div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{achievement.title}</span>
                    <span className="text-gray-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${achievement.color}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Activities and Progress */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Weekly Activity</h2>
                <Activity className="h-5 w-5 text-gray-600" />
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {day.day}
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-20">
                        <div 
                          className="bg-gradient-to-t from-ocean-500 to-green-500 rounded-full transition-all duration-500"
                          style={{ height: `${(day.activity / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {day.activity}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Goal: {day.goal}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${activity.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          +{activity.points} pts
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Upcoming Events and Badges */}
          <div className="space-y-8">
            
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {event.weather}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-3 bg-ocean-500 text-white py-2 rounded-lg hover:bg-ocean-600 transition-colors">
                      Join Event
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Badges</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {user?.badges?.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {badge}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gamification Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold gradient-text flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Your Level & Progress</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Level */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-ocean-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-2xl">
                  {Math.floor((user?.impactPoints || 0) / 500) + 1}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">
                Level {Math.floor((user?.impactPoints || 0) / 500) + 1}
              </div>
              <div className="text-sm text-gray-600">
                {(user?.impactPoints || 0) % 500}/500 XP to next level
              </div>
              {/* Level Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-ocean-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((user?.impactPoints || 0) % 500) / 5}%` }}
                ></div>
              </div>
            </div>
            
            {/* Recent Achievement */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="font-semibold text-gray-800">Latest Achievement</div>
              <div className="text-sm text-gray-600">
                {user?.badges?.[user.badges.length - 1] || 'Complete your first event!'}
              </div>
              <div className="text-xs text-green-600 mt-1">+200 XP earned</div>
            </div>
            
            {/* Assessment Progress */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="font-semibold text-gray-800">Assessments</div>
              <div className="text-sm text-gray-600">1 of 4 completed</div>
              <div className="text-xs text-purple-600 mt-1">Complete more to unlock certificates</div>
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex justify-center space-x-3 mt-6 pt-6 border-t border-gray-200">
            <a href="/achievements" className="btn-outline text-sm flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>View Achievements</span>
            </a>
            <a href="/assessments" className="btn-outline text-sm flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Take Assessment</span>
            </a>
            <a href="/certificates" className="btn-outline text-sm flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>My Certificates</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
