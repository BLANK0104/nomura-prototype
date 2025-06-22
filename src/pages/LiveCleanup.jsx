import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  MapPin, 
  Target, 
  Award, 
  Users, 
  User,
  Clock,
  Zap,
  Trophy,
  Star,
  Flame,
  CheckCircle,
  TrendingUp,
  Camera,
  Share2,
  Gift,
  Crown,
  Sparkles,
  Heart,
  Shield,
  Timer,
  Activity,
  BarChart3
} from 'lucide-react'

const LiveCleanup = () => {
  const { user, permissions, isAdmin, mockUsers } = useAuth()
  const [activeCleanup, setActiveCleanup] = useState(null)
  const [userProgress, setUserProgress] = useState({
    wasteCollected: 0,
    timeSpent: 0,
    streakCount: 0,
    milestones: [],
    currentLevel: 1,
    experiencePoints: 0
  })
  const [liveParticipants, setLiveParticipants] = useState([])
  const [showMilestoneModal, setShowMilestoneModal] = useState(null)
  const [realTimeUpdates, setRealTimeUpdates] = useState([])

  // Mock active cleanup data
  const mockActiveCleanup = {
    id: 1,
    title: 'Juhu Beach Morning Cleanup',
    location: 'Juhu Beach, Mumbai',
    startTime: '06:00 AM',
    duration: '4 hours',
    participants: 45,
    totalWasteTarget: 500,
    currentWasteCollected: 287,
    milestones: [
      { id: 1, target: 100, reward: '50 points', achieved: true, achievedBy: 'Team Alpha' },
      { id: 2, target: 200, reward: '100 points + Badge', achieved: true, achievedBy: 'Team Beta' },
      { id: 3, target: 300, reward: '150 points + Special Badge', achieved: false },
      { id: 4, target: 400, reward: '200 points + Certificate', achieved: false },
      { id: 5, target: 500, reward: '300 points + Trophy', achieved: false }
    ]
  }

  // Mock live participants data
  const mockParticipants = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
      wasteCollected: 25,
      streak: 5,
      level: 8,
      points: 1250,
      achievements: ['Speed Collector', 'Team Player'],
      status: 'active',
      location: 'Zone A'
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      wasteCollected: 22,
      streak: 3,
      level: 6,
      points: 980,
      achievements: ['Plastic Hunter'],
      status: 'active',
      location: 'Zone B'
    },
    {
      id: 3,
      name: 'Anita Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      wasteCollected: 18,
      streak: 2,
      level: 4,
      points: 720,
      achievements: ['First Timer'],
      status: 'break',
      location: 'Zone A'
    }
  ]

  // Gamification levels and rewards
  const levels = [
    { level: 1, name: 'Beach Newcomer', minPoints: 0, maxPoints: 100, color: 'text-gray-600' },
    { level: 2, name: 'Sand Cleaner', minPoints: 101, maxPoints: 250, color: 'text-bronze-600' },
    { level: 3, name: 'Wave Warrior', minPoints: 251, maxPoints: 500, color: 'text-blue-600' },
    { level: 4, name: 'Tide Turner', minPoints: 501, maxPoints: 750, color: 'text-green-600' },
    { level: 5, name: 'Ocean Guardian', minPoints: 751, maxPoints: 1000, color: 'text-purple-600' },
    { level: 6, name: 'Beach Champion', minPoints: 1001, maxPoints: 1500, color: 'text-orange-600' },
    { level: 7, name: 'Eco Hero', minPoints: 1501, maxPoints: 2000, color: 'text-red-600' },
    { level: 8, name: 'Environmental Legend', minPoints: 2001, maxPoints: 3000, color: 'text-yellow-600' }
  ]

  const achievements = [
    { id: 'first_cleanup', name: 'First Cleanup', icon: '🏖️', description: 'Complete your first cleanup' },
    { id: 'speed_collector', name: 'Speed Collector', icon: '⚡', description: 'Collect 10kg in 30 minutes' },
    { id: 'team_player', name: 'Team Player', icon: '👥', description: 'Help 3 other volunteers' },
    { id: 'plastic_hunter', name: 'Plastic Hunter', icon: '🥤', description: 'Collect 50 plastic items' },
    { id: 'streak_master', name: 'Streak Master', icon: '🔥', description: 'Maintain 5-day streak' },
    { id: 'photo_champion', name: 'Photo Champion', icon: '📸', description: 'Share 10 cleanup photos' },
    { id: 'milestone_crusher', name: 'Milestone Crusher', icon: '🎯', description: 'Complete 5 milestones' }
  ]

  // Simulate real-time updates
  useEffect(() => {
    setActiveCleanup(mockActiveCleanup)
    setLiveParticipants(mockParticipants)
    
    // Mock real-time updates
    const interval = setInterval(() => {
      const updates = [
        'Priya just collected 2kg of plastic waste! 🎉',
        'Team Alpha reached the 100kg milestone! 🏆',
        'New volunteer joined Zone B! 👋',
        'Rahul earned "Speed Collector" achievement! ⚡',
        'Overall progress: 287kg collected! 📊'
      ]
      
      setRealTimeUpdates(prev => [
        ...prev.slice(-4),
        { id: Date.now(), message: updates[Math.floor(Math.random() * updates.length)] }
      ])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const startCleanup = () => {
    // Mock starting cleanup
    console.log('Starting cleanup tracking...')
  }

  const updateProgress = (type, amount) => {
    setUserProgress(prev => ({
      ...prev,
      [type]: prev[type] + amount
    }))
  }

  const getProgressPercentage = () => {
    if (!activeCleanup) return 0
    return (activeCleanup.currentWasteCollected / activeCleanup.totalWasteTarget) * 100
  }

  const getUserLevel = (points) => {
    return levels.find(level => points >= level.minPoints && points <= level.maxPoints) || levels[0]
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            🌊 Live Cleanup Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time gamification and milestone tracking for beach cleanups
          </p>
        </motion.div>

        {/* Live Cleanup Progress */}
        {activeCleanup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-r from-blue-500 to-green-500 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{activeCleanup.title}</h2>
                <div className="flex items-center space-x-4 text-blue-100">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{activeCleanup.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{activeCleanup.startTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{activeCleanup.participants} participants</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{activeCleanup.currentWasteCollected}kg</div>
                <div className="text-blue-100">of {activeCleanup.totalWasteTarget}kg target</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(getProgressPercentage())}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 1 }}
                  className="bg-white h-4 rounded-full flex items-center justify-end pr-2"
                >
                  <Sparkles className="h-3 w-3 text-blue-500" />
                </motion.div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {activeCleanup.milestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-3 rounded-lg ${
                    milestone.achieved 
                      ? 'bg-green-500/20 border-2 border-green-300' 
                      : 'bg-white/10 border-2 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    {milestone.achieved ? (
                      <CheckCircle className="h-6 w-6 text-green-300" />
                    ) : (
                      <Target className="h-6 w-6 text-white/60" />
                    )}
                  </div>
                  <div className="text-lg font-bold">{milestone.target}kg</div>
                  <div className="text-xs text-white/80">{milestone.reward}</div>
                  {milestone.achieved && (
                    <div className="text-xs text-green-300 mt-1">
                      ✓ {milestone.achievedBy}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Live Participants (Admin View) */}
          {permissions.canViewAllUsers && (
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold gradient-text flex items-center space-x-2">
                    <Activity className="h-6 w-6" />
                    <span>Live Participants Tracking</span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {liveParticipants.map((participant) => {
                    const level = getUserLevel(participant.points)
                    return (
                      <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${level.color} bg-white border-2 border-white`}>
                              {participant.level}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{participant.name}</div>
                            <div className="text-sm text-gray-600">{participant.location}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                participant.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {participant.status}
                              </span>
                              {participant.streak > 0 && (
                                <span className="flex items-center space-x-1 text-xs text-orange-600">
                                  <Flame className="h-3 w-3" />
                                  <span>{participant.streak}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {participant.wasteCollected}kg
                          </div>
                          <div className="text-sm text-gray-600">
                            {participant.points} points
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {participant.achievements.map((achievement, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          )}

          {/* Personal Progress & Real-time Updates */}
          <div className="space-y-6">
            
            {/* Personal Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Your Progress</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Waste Collected</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{userProgress.wasteCollected}kg</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Experience Points</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{userProgress.experiencePoints}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Current Streak</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{userProgress.streakCount} days</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Current Level</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{userProgress.currentLevel}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => updateProgress('wasteCollected', 5)}
                  className="w-full btn-primary"
                >
                  + Add 5kg Collected
                </button>
                <button
                  onClick={() => updateProgress('experiencePoints', 50)}
                  className="w-full btn-outline"
                >
                  + Add 50 XP
                </button>
              </div>
            </motion.div>

            {/* Real-time Updates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Live Updates</span>
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {realTimeUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <p className="text-sm text-gray-700">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Achievement Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Available Achievements</span>
              </h3>
              
              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Milestone Achievement Modal */}
        <AnimatePresence>
          {showMilestoneModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowMilestoneModal(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Milestone Achieved!
                </h2>
                <p className="text-gray-600 mb-6">
                  You've reached the {showMilestoneModal.target}kg milestone!
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6">
                  <div className="text-lg font-bold text-green-600">
                    Reward: {showMilestoneModal.reward}
                  </div>
                </div>
                <button
                  onClick={() => setShowMilestoneModal(null)}
                  className="btn-primary w-full"
                >
                  Awesome! 🎯
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LiveCleanup
