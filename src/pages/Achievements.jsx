import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Trophy, 
  Award, 
  Star, 
  Crown,
  Target,
  Zap,
  Heart,
  Users,
  Recycle,
  Calendar,
  Shield,
  Flame,
  Gift,
  CheckCircle,
  Lock,
  TrendingUp,
  Camera,
  Share2
} from 'lucide-react'

const Achievements = () => {
  const { user, permissions, isAdmin, mockUsers } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Achievement categories
  const categories = [
    { id: 'all', name: 'All Achievements', icon: Trophy },
    { id: 'cleanup', name: 'Cleanup', icon: Recycle },
    { id: 'social', name: 'Social', icon: Users },
    { id: 'leadership', name: 'Leadership', icon: Crown },
    { id: 'consistency', name: 'Consistency', icon: Calendar },
    { id: 'special', name: 'Special', icon: Star }
  ]

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first beach cleanup',
      icon: '👶',
      category: 'cleanup',
      difficulty: 'easy',
      points: 50,
      earned: true,
      earnedDate: '2024-03-15',
      progress: 1,
      target: 1,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Eco Warrior',
      description: 'Participate in 10 beach cleanups',
      icon: '🌱',
      category: 'cleanup',
      difficulty: 'medium',
      points: 200,
      earned: user?.eventsParticipated >= 10,
      earnedDate: user?.eventsParticipated >= 10 ? '2024-05-20' : null,
      progress: user?.eventsParticipated || 0,
      target: 10,
      rarity: 'uncommon'
    },
    {
      id: 3,
      title: 'Beach Guardian',
      description: 'Collect 100kg of waste from beaches',
      icon: '🏖️',
      category: 'cleanup',
      difficulty: 'hard',
      points: 500,
      earned: (user?.wasteCollected || 0) >= 100,
      earnedDate: (user?.wasteCollected || 0) >= 100 ? '2024-06-01' : null,
      progress: user?.wasteCollected || 0,
      target: 100,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Social Butterfly',
      description: 'Get 100 likes on your cleanup posts',
      icon: '🦋',
      category: 'social',
      difficulty: 'medium',
      points: 150,
      earned: false,
      progress: 45,
      target: 100,
      rarity: 'uncommon'
    },
    {
      id: 5,
      title: 'Community Leader',
      description: 'Organize 5 cleanup events',
      icon: '👑',
      category: 'leadership',
      difficulty: 'hard',
      points: 750,
      earned: user?.role === 'admin' || user?.role === 'volunteer',
      earnedDate: user?.role === 'admin' || user?.role === 'volunteer' ? '2024-04-10' : null,
      progress: user?.role === 'admin' || user?.role === 'volunteer' ? 5 : 0,
      target: 5,
      rarity: 'epic'
    },
    {
      id: 6,
      title: 'Consistency Champion',
      description: 'Maintain a 30-day cleanup streak',
      icon: '🔥',
      category: 'consistency',
      difficulty: 'hard',
      points: 600,
      earned: true,
      earnedDate: '2024-05-15',
      progress: 30,
      target: 30,
      rarity: 'rare'
    },
    {
      id: 7,
      title: 'Plastic Fighter',
      description: 'Remove 50kg of plastic waste',
      icon: '♻️',
      category: 'cleanup',
      difficulty: 'medium',
      points: 300,
      earned: (user?.wasteCollected || 0) >= 50,
      earnedDate: (user?.wasteCollected || 0) >= 50 ? '2024-05-25' : null,
      progress: Math.min(user?.wasteCollected || 0, 50),
      target: 50,
      rarity: 'uncommon'
    },
    {
      id: 8,
      title: 'Photography Pro',
      description: 'Share 25 cleanup photos',
      icon: '📸',
      category: 'social',
      difficulty: 'medium',
      points: 200,
      earned: false,
      progress: 12,
      target: 25,
      rarity: 'uncommon'
    },
    {
      id: 9,
      title: 'Early Bird',
      description: 'Join 5 sunrise cleanup sessions',
      icon: '🌅',
      category: 'special',
      difficulty: 'medium',
      points: 250,
      earned: false,
      progress: 3,
      target: 5,
      rarity: 'rare'
    },
    {
      id: 10,
      title: 'Platform Pioneer',
      description: 'Be among the first 100 users to join',
      icon: '🚀',
      category: 'special',
      difficulty: 'legendary',
      points: 1000,
      earned: user?.id <= 4, // Mock condition
      earnedDate: user?.id <= 4 ? '2024-01-15' : null,
      progress: user?.id <= 4 ? 1 : 0,
      target: 1,
      rarity: 'legendary'
    }
  ]

  // Filter achievements
  const filteredAchievements = achievements.filter(achievement => 
    activeCategory === 'all' || achievement.category === activeCategory
  )

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500'
      case 'uncommon': return 'from-green-400 to-green-500'
      case 'rare': return 'from-blue-400 to-blue-500'
      case 'epic': return 'from-purple-400 to-purple-500'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      case 'legendary': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const earnedAchievements = achievements.filter(a => a.earned)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)
  const completionRate = Math.round((earnedAchievements.length / achievements.length) * 100)

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center space-x-2">
                <Trophy className="h-8 w-8" />
                <span>Achievements</span>
              </h1>
              <p className="text-gray-600">
                Track your progress and unlock rewards for your environmental impact
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{earnedAchievements.length}</div>
                <div className="text-xs text-gray-600">Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-xs text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
                <div className="text-xs text-gray-600">Complete</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{earnedAchievements.length}/{achievements.length}</div>
            <div className="text-gray-600">Achievements Unlocked</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{totalPoints}</div>
            <div className="text-gray-600">Achievement Points</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{completionRate}%</div>
            <div className="text-gray-600">Completion Rate</div>
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
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
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card hover:shadow-lg transition-all relative overflow-hidden ${
                achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-75'
              }`}
            >
              {/* Rarity Background */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}></div>
              
              {/* Achievement Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl p-3 rounded-lg ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(achievement.difficulty)}`}>
                    {achievement.difficulty}
                  </span>
                  {achievement.earned && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </div>

              {/* Achievement Info */}
              <div className="space-y-3">
                <div>
                  <h3 className={`text-lg font-bold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points and Date */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600">{achievement.points} pts</span>
                  </div>
                  {achievement.earned && achievement.earnedDate && (
                    <span className="text-xs text-gray-500">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Share Button for Earned Achievements */}
                {achievement.earned && (
                  <button className="w-full btn-outline text-sm flex items-center justify-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share Achievement</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achievements