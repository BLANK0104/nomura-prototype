import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Shield,
  Target,
  Zap,
  Heart,
  Users,
  Calendar,
  Recycle,
  Download,
  Share2,
  Lock,
  CheckCircle,
  Gift,
  Flame
} from 'lucide-react'

const Achievements = () => {
  const { user, permissions, isAdmin } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [showCertificate, setShowCertificate] = useState(null)

  // Achievement categories
  const categories = [
    { id: 'all', name: 'All', icon: Award },
    { id: 'participation', name: 'Participation', icon: Users },
    { id: 'impact', name: 'Environmental Impact', icon: Recycle },
    { id: 'leadership', name: 'Leadership', icon: Crown },
    { id: 'community', name: 'Community', icon: Heart },
    { id: 'special', name: 'Special', icon: Star },
  ]

  // Comprehensive achievements system
  const achievements = [
    // Participation Achievements
    {
      id: 1,
      title: 'First Steps',
      description: 'Attend your first beach cleanup event',
      category: 'participation',
      icon: Target,
      points: 50,
      rarity: 'common',
      unlocked: true,
      progress: 1,
      requirement: 1,
      unlockedDate: '2024-03-20',
      certificate: true,
      badge: '🏖️'
    },
    {
      id: 2,
      title: 'Weekend Warrior',
      description: 'Attend 5 cleanup events',
      category: 'participation',
      icon: Calendar,
      points: 150,
      rarity: 'common',
      unlocked: true,
      progress: 5,
      requirement: 5,
      unlockedDate: '2024-04-15',
      certificate: true,
      badge: '⚡'
    },
    {
      id: 3,
      title: 'Consistency Champion',
      description: 'Attend 15 cleanup events',
      category: 'participation',
      icon: Medal,
      points: 300,
      rarity: 'rare',
      unlocked: user?.eventsParticipated >= 15,
      progress: user?.eventsParticipated || 0,
      requirement: 15,
      unlockedDate: user?.eventsParticipated >= 15 ? '2024-05-20' : null,
      certificate: true,
      badge: '🏆'
    },
    {
      id: 4,
      title: 'Cleanup Legend',
      description: 'Attend 50 cleanup events',
      category: 'participation',
      icon: Crown,
      points: 1000,
      rarity: 'legendary',
      unlocked: user?.eventsParticipated >= 50,
      progress: user?.eventsParticipated || 0,
      requirement: 50,
      unlockedDate: user?.eventsParticipated >= 50 ? '2024-06-01' : null,
      certificate: true,
      badge: '👑'
    },

    // Environmental Impact Achievements
    {
      id: 5,
      title: 'Plastic Fighter',
      description: 'Collect 10kg of plastic waste',
      category: 'impact',
      icon: Recycle,
      points: 100,
      rarity: 'common',
      unlocked: user?.wasteCollected >= 10,
      progress: user?.wasteCollected || 0,
      requirement: 10,
      unlockedDate: user?.wasteCollected >= 10 ? '2024-04-01' : null,
      certificate: true,
      badge: '♻️'
    },
    {
      id: 6,
      title: 'Waste Warrior',
      description: 'Collect 50kg of waste',
      category: 'impact',
      icon: Shield,
      points: 250,
      rarity: 'rare',
      unlocked: user?.wasteCollected >= 50,
      progress: user?.wasteCollected || 0,
      requirement: 50,
      unlockedDate: user?.wasteCollected >= 50 ? '2024-05-10' : null,
      certificate: true,
      badge: '🛡️'
    },
    {
      id: 7,
      title: 'Ocean Guardian',
      description: 'Collect 100kg of waste',
      category: 'impact',
      icon: Trophy,
      points: 500,
      rarity: 'epic',
      unlocked: user?.wasteCollected >= 100,
      progress: user?.wasteCollected || 0,
      requirement: 100,
      unlockedDate: user?.wasteCollected >= 100 ? '2024-06-15' : null,
      certificate: true,
      badge: '🌊'
    },

    // Leadership Achievements
    {
      id: 8,
      title: 'Team Leader',
      description: 'Lead your first cleanup team',
      category: 'leadership',
      icon: Users,
      points: 200,
      rarity: 'rare',
      unlocked: user?.role === 'volunteer' || user?.role === 'moderator' || user?.role === 'admin',
      progress: user?.role === 'volunteer' || user?.role === 'moderator' || user?.role === 'admin' ? 1 : 0,
      requirement: 1,
      unlockedDate: user?.role === 'volunteer' ? '2024-04-20' : null,
      certificate: true,
      badge: '👥'
    },
    {
      id: 9,
      title: 'Event Organizer',
      description: 'Organize 5 cleanup events',
      category: 'leadership',
      icon: Calendar,
      points: 400,
      rarity: 'epic',
      unlocked: permissions?.canCreateEvents && user?.role !== 'user',
      progress: permissions?.canCreateEvents ? 3 : 0,
      requirement: 5,
      unlockedDate: null,
      certificate: true,
      badge: '📅'
    },

    // Community Achievements
    {
      id: 10,
      title: 'Social Butterfly',
      description: 'Share 10 cleanup posts on social media',
      category: 'community',
      icon: Heart,
      points: 100,
      rarity: 'common',
      unlocked: true,
      progress: 12,
      requirement: 10,
      unlockedDate: '2024-05-01',
      certificate: false,
      badge: '🦋'
    },
    {
      id: 11,
      title: 'Community Leader',
      description: 'Get 100 likes on your cleanup posts',
      category: 'community',
      icon: Star,
      points: 200,
      rarity: 'rare',
      unlocked: user?.role !== 'user',
      progress: user?.role !== 'user' ? 156 : 45,
      requirement: 100,
      unlockedDate: user?.role !== 'user' ? '2024-05-15' : null,
      certificate: true,
      badge: '⭐'
    },

    // Special Achievements
    {
      id: 12,
      title: 'Early Bird',
      description: 'Attend 10 morning cleanup events (before 8 AM)',
      category: 'special',
      icon: Zap,
      points: 300,
      rarity: 'epic',
      unlocked: true,
      progress: 12,
      requirement: 10,
      unlockedDate: '2024-06-01',
      certificate: true,
      badge: '🌅'
    },
    {
      id: 13,
      title: 'Platform Founding Member',
      description: 'Be among the first 100 users to join the platform',
      category: 'special',
      icon: Crown,
      points: 500,
      rarity: 'legendary',
      unlocked: user?.id <= 4, // First 4 users in our mock data
      progress: user?.id <= 4 ? 1 : 0,
      requirement: 1,
      unlockedDate: user?.id <= 4 ? '2024-01-15' : null,
      certificate: true,
      badge: '🎖️'
    }
  ]

  // Filter achievements by category
  const filteredAchievements = achievements.filter(achievement => 
    activeCategory === 'all' || achievement.category === activeCategory
  )

  // Calculate user stats
  const totalAchievements = achievements.length
  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)
  const completionRate = Math.round((unlockedAchievements / totalAchievements) * 100)

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRarityGradient = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-yellow-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const downloadCertificate = (achievement) => {
    // Mock certificate download
    console.log(`Downloading certificate for: ${achievement.title}`)
    // In a real app, this would generate and download a PDF certificate
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              🏆 Achievements & Certificates
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Track your environmental impact and celebrate your contributions to Mumbai's beaches
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-ocean-600 mb-1">{unlockedAchievements}</div>
              <div className="text-sm text-gray-600">Achievements Unlocked</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{completionRate}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {achievements.filter(a => a.unlocked && a.certificate).length}
              </div>
              <div className="text-sm text-gray-600">Certificates</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-ocean-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon
            const progressPercentage = Math.min((achievement.progress / achievement.requirement) * 100, 100)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card relative overflow-hidden ${
                  achievement.unlocked ? 'ring-2 ring-green-200' : 'opacity-75'
                }`}
              >
                {/* Rarity Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity}
                </div>

                {/* Achievement Icon */}
                <div className="text-center mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${getRarityGradient(achievement.rarity)} flex items-center justify-center mb-3 ${
                    achievement.unlocked ? 'animate-pulse' : 'grayscale'
                  }`}>
                    {achievement.unlocked ? (
                      <span className="text-3xl">{achievement.badge}</span>
                    ) : (
                      <Lock className="h-8 w-8 text-white" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.requirement}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getRarityGradient(achievement.rarity)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points and Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-gray-800">{achievement.points} pts</span>
                  </div>
                  
                  {achievement.unlocked && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Unlocked</span>
                    </div>
                  )}
                </div>

                {/* Unlocked Date */}
                {achievement.unlocked && achievement.unlockedDate && (
                  <div className="text-xs text-gray-500 mb-4">
                    Unlocked on {achievement.unlockedDate}
                  </div>
                )}

                {/* Actions */}
                {achievement.unlocked && (
                  <div className="flex space-x-2">
                    {achievement.certificate && (
                      <button
                        onClick={() => downloadCertificate(achievement)}
                        className="flex-1 btn-outline text-sm flex items-center justify-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Certificate</span>
                      </button>
                    )}
                    <button className="flex-1 btn-outline text-sm flex items-center justify-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Level System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text mb-4">Your Level Progress</h2>
            
            {/* Current Level */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-ocean-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {Math.floor(totalPoints / 500) + 1}
                </span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-800">
                  Level {Math.floor(totalPoints / 500) + 1}
                </div>
                <div className="text-gray-600">
                  {totalPoints % 500} / 500 XP to next level
                </div>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-ocean-500 to-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(totalPoints % 500) / 5}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements
