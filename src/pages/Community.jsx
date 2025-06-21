import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  MapPin,
  Clock,
  Award,
  Bookmark,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Users,
  TrendingUp,
  Image as ImageIcon,
  Video,
  Smile
} from 'lucide-react'

const Community = () => {
  const { user, permissions, isAdmin, isVolunteer } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showModerationPanel, setShowModerationPanel] = useState(false)

  const posts = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
        badges: ['Eco Warrior', 'Community Leader'],
        verified: true
      },
      content: 'Amazing turnout at today\'s Juhu Beach cleanup! We collected over 200kg of waste and had such a great time doing it. The community spirit was incredible! 🌊♻️',
      images: [
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1618477462146-0071f4216b75?w=600&h=400&fit=crop'
      ],
      location: 'Juhu Beach, Mumbai',
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      shares: 8,
      liked: true,
      bookmarked: false,
      tags: ['cleanup', 'juhu', 'community']
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Rahul Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        badges: ['Weekend Warrior'],
        verified: false
      },
      content: 'Check out this innovative beach cleaning tool I designed! Made from recycled materials, it helps collect microplastics more effectively. What do you think? 🔧🏖️',
      images: [
        'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=400&fit=crop'
      ],
      location: 'Mumbai, Maharashtra',
      timestamp: '5 hours ago',
      likes: 78,
      comments: 23,
      shares: 15,
      liked: false,
      bookmarked: true,
      tags: ['innovation', 'tools', 'microplastics']
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Anita Desai',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        badges: ['First Timer', 'Plastic Fighter'],
        verified: false
      },
      content: 'My first beach cleanup experience was absolutely transformative! Met so many amazing people who care about our environment. Already signed up for the next one! 💚',
      images: [],
      location: 'Versova Beach, Mumbai',
      timestamp: '1 day ago',
      likes: 32,
      comments: 8,
      shares: 4,
      liked: true,
      bookmarked: false,
      tags: ['firsttime', 'transformation', 'versova']
    },
    {
      id: 4,
      user: {
        id: 4,
        name: 'Mumbai Eco Warriors',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        badges: ['Official Organization'],
        verified: true
      },
      content: 'IMPACT REPORT: This month we\'ve achieved incredible milestones! 🎉\n\n✅ 15 beach cleanups organized\n✅ 2.5 tons of waste collected\n✅ 500+ volunteers participated\n✅ 8 corporate partnerships\n\nThank you to our amazing community! 📊🌍',
      images: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'
      ],
      location: 'Mumbai, Maharashtra',
      timestamp: '2 days ago',
      likes: 156,
      comments: 34,
      shares: 45,
      liked: false,
      bookmarked: true,
      tags: ['impact', 'report', 'achievement']
    }
  ]

  const topContributors = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
      points: 2500,
      cleanups: 25,
      waste: 150
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      points: 1650,
      cleanups: 15,
      waste: 98
    },
    {
      id: 3,
      name: 'Anita Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      points: 890,
      cleanups: 8,
      waste: 45
    }
  ]
  const handleUserSelect = (userId) => {
    setViewingUserId(userId)
  }
  const handleLike = (postId) => {
    // Mock like functionality
    console.log('Liked post:', postId)
  }

  const handleBookmark = (postId) => {
    // Mock bookmark functionality
    console.log('Bookmarked post:', postId)
  }

  const challenges = [
    {
      id: 1,
      title: '30-Day Beach Guardian Challenge',
      description: 'Participate in cleanups for 30 consecutive days',
      progress: 12,
      total: 30,
      reward: '500 points + Special Badge',
      participants: 234,
      timeLeft: '15 days'
    },
    {
      id: 2,
      title: 'Plastic-Free Weekend',
      description: 'Collect only plastic waste this weekend',
      progress: 2,      total: 5,
      reward: '200 points',
      participants: 89,
      timeLeft: '2 days'
    }
  ]

  const formatTimeAgo = (timestamp) => {
    return timestamp
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Community Feed
              </h1>
              <p className="text-gray-600 text-lg">
                Connect with fellow environmental champions and share your cleanup journey
              </p>
            </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
              {permissions.canModerateContent && (
                <button 
                  onClick={() => setShowModerationPanel(!showModerationPanel)}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Shield className="h-5 w-5" />
                  <span>Moderate</span>
                </button>
              )}
              <button 
                onClick={() => setShowCreatePost(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Post</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Filters and Challenges */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Filters</h3>
              <div className="space-y-2">
                {['all', 'photos', 'achievements', 'events', 'discussions'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeFilter === filter 
                        ? 'bg-ocean-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Active Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Active Challenges</h3>
              <div className="space-y-4">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">
                      {challenge.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {challenge.description}
                    </p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{challenge.progress}/{challenge.total}</span>
                        <span>{challenge.timeLeft} left</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 font-medium">{challenge.reward}</span>
                      <span className="text-gray-500">{challenge.participants} participants</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post Modal/Card */}
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card border-2 border-ocean-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Create Post</h3>
                  <button 
                    onClick={() => setShowCreatePost(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <textarea
                    placeholder="Share your cleanup experience, insights, or environmental tips..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-ocean-600">
                        <ImageIcon className="h-5 w-5" />
                        <span className="text-sm">Photo</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-ocean-600">
                        <Video className="h-5 w-5" />
                        <span className="text-sm">Video</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-ocean-600">
                        <MapPin className="h-5 w-5" />
                        <span className="text-sm">Location</span>
                      </button>
                    </div>
                    
                    <button className="btn-primary">
                      Share Post
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-800">{post.user.name}</h4>
                          {post.user.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimeAgo(post.timestamp)}</span>
                          {post.location && (
                            <>
                              <MapPin className="h-4 w-4" />
                              <span>{post.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  {/* User Badges */}
                  {post.user.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.user.badges.map(badge => (
                        <span key={badge} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center space-x-1">
                          <Award className="h-3 w-3" />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Images */}
                  {post.images.length > 0 && (
                    <div className={`mb-4 grid gap-2 rounded-lg overflow-hidden ${
                      post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                    }`}>
                      {post.images.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={image}
                          alt={`Post image ${imageIndex + 1}`}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  {/* Post Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-ocean-600 text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </button>

                      {/* Admin/Moderator Actions */}
                      {permissions.canModerateContent && (
                        <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                          <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                            Pin
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`transition-colors ${
                        post.bookmarked ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${post.bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Top Contributors */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-800">Top Contributors</h3>
              </div>
              
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-700' :
                        'bg-amber-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">
                        {contributor.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {contributor.points} points • {contributor.cleanups} cleanups
                      </div>
                      <div className="text-xs text-green-600">
                        {contributor.waste}kg waste collected
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Active Members</span>
                  </div>
                  <span className="font-bold text-gray-800">2,847</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Posts Today</span>
                  </div>
                  <span className="font-bold text-gray-800">156</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">Likes Given</span>
                  </div>
                  <span className="font-bold text-gray-800">4,523</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
