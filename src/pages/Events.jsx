import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  Plus,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Eye,
  Heart,
  Share2,
  UserPlus,
  Edit3,
  Trash2,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Events = () => {
  const { user, permissions, isAdmin, isVolunteer } = useAuth()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [showCreateEvent, setShowCreateEvent] = useState(false)

  const events = [
    {
      id: 1,
      title: 'Juhu Beach Sunrise Cleanup',
      description: 'Join us for an early morning beach cleanup session with breakfast included.',
      date: '2024-06-25',
      time: '06:00 AM',
      duration: '3 hours',
      location: 'Juhu Beach, Mumbai',
      organizer: 'Mumbai Eco Warriors',
      participants: 45,
      maxParticipants: 100,
      difficulty: 'Easy',
      category: 'Beach Cleanup',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=300&fit=crop',
      weather: {
        condition: 'Sunny',
        temperature: '28°C',
        icon: Sun
      },
      tags: ['Beach', 'Morning', 'Breakfast', 'Family Friendly'],
      featured: true,
      registered: false
    },
    {
      id: 2,
      title: 'Marine Drive Waste Segregation Drive',
      description: 'Focus on proper waste segregation and recycling awareness along Marine Drive.',
      date: '2024-06-28',
      time: '07:00 AM',
      duration: '2.5 hours',
      location: 'Marine Drive, Mumbai',
      organizer: 'Green Mumbai Initiative',
      participants: 32,
      maxParticipants: 60,
      difficulty: 'Medium',
      category: 'Waste Management',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop',
      weather: {
        condition: 'Partly Cloudy',
        temperature: '26°C',
        icon: Cloud
      },
      tags: ['Segregation', 'Education', 'Awareness'],
      featured: false,
      registered: true
    },
    {
      id: 3,
      title: 'Versova Beach Community Clean-up',
      description: 'Large-scale community cleanup with live music and refreshments.',
      date: '2024-07-02',
      time: '06:30 AM',
      duration: '4 hours',
      location: 'Versova Beach, Mumbai',
      organizer: 'Versova Residents Association',
      participants: 128,
      maxParticipants: 200,
      difficulty: 'Easy',
      category: 'Beach Cleanup',
      image: 'https://images.unsplash.com/photo-1618477462146-0071f4216b75?w=600&h=300&fit=crop',
      weather: {
        condition: 'Clear',
        temperature: '29°C',
        icon: Sun
      },
      tags: ['Community', 'Music', 'Large Scale', 'Refreshments'],
      featured: true,
      registered: false
    },
    {
      id: 4,
      title: 'Bandra Beach Plastic-Free Initiative',
      description: 'Special focus on removing plastic waste and microplastics from the shoreline.',
      date: '2024-07-05',
      time: '05:30 AM',
      duration: '3.5 hours',
      location: 'Bandra Beach, Mumbai',
      organizer: 'Plastic Free Mumbai',
      participants: 23,
      maxParticipants: 50,
      difficulty: 'Hard',
      category: 'Specialized Cleanup',
      image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=300&fit=crop',
      weather: {
        condition: 'Windy',
        temperature: '27°C',
        icon: Wind
      },
      tags: ['Plastic', 'Microplastics', 'Specialized', 'Early Morning'],
      featured: false,
      registered: false
    },
    {
      id: 5,
      title: 'Chowpatty Beach Family Fun Day',
      description: 'Family-friendly cleanup event with games and activities for children.',
      date: '2024-07-08',
      time: '08:00 AM',
      duration: '2 hours',
      location: 'Chowpatty Beach, Mumbai',
      organizer: 'Mumbai Family Volunteers',
      participants: 67,
      maxParticipants: 80,
      difficulty: 'Easy',
      category: 'Family Event',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop',
      weather: {
        condition: 'Light Rain',
        temperature: '25°C',
        icon: CloudRain
      },      tags: ['Family', 'Children', 'Games', 'Fun'],
      featured: false,
      registered: false
    },
    // Admin/Volunteer only events
    {
      id: 6,
      title: 'Volunteer Training Workshop',
      description: 'Intensive training for new volunteers on cleanup techniques and safety protocols.',
      date: '2024-07-10',
      time: '10:00 AM',
      duration: '4 hours',
      location: 'Community Center, Bandra',
      organizer: 'Training Team',
      participants: 18,
      maxParticipants: 25,
      difficulty: 'Medium',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=300&fit=crop',
      weather: {
        condition: 'Indoor',
        temperature: '24°C',
        icon: Thermometer
      },
      tags: ['Training', 'Volunteers', 'Safety', 'Skills'],
      featured: false,
      registered: false,
      visibility: isVolunteer || isAdmin ? 'public' : 'restricted'
    },
    {
      id: 7,
      title: 'Admin Strategy Meeting',
      description: 'Monthly strategy meeting for administrators and team leads.',
      date: '2024-07-12',
      time: '02:00 PM',
      duration: '2 hours',
      location: 'Virtual Meeting',
      organizer: 'Admin Team',
      participants: 8,
      maxParticipants: 15,
      difficulty: 'Easy',
      category: 'Meeting',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
      weather: {
        condition: 'Online',
        temperature: 'N/A',
        icon: Eye
      },      tags: ['Admin', 'Strategy', 'Leadership', 'Planning'],
      featured: false,
      registered: false,
      visibility: isAdmin ? 'public' : 'restricted'
    }
  ]

  const categories = [
    'all', 
    'Beach Cleanup', 
    'Waste Management', 
    'Specialized Cleanup', 
    'Family Event',
    ...(isVolunteer || isAdmin ? ['Training'] : []),
    ...(isAdmin ? ['Meeting'] : [])
  ]
  const difficulties = ['Easy', 'Medium', 'Hard']
  const filteredEvents = events.filter(event => {
    // First check visibility permissions
    const hasAccess = !event.visibility || 
                     event.visibility === 'public' || 
                     (event.visibility === 'restricted' && (isVolunteer || isAdmin))
    
    if (!hasAccess) return false
    
    const matchesCategory = filter === 'all' || event.category === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleRegister = (eventId) => {
    // Mock registration logic
    console.log('Registering for event:', eventId)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Cleanup Events
              </h1>
              <p className="text-gray-600 text-lg">
                {permissions.canCreateEvents 
                  ? 'Create and manage community-driven beach cleanup events across Mumbai'
                  : 'Join community-driven beach cleanup events across Mumbai'
                }
              </p>
            </div>
            
            {permissions.canCreateEvents && (
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setShowCreateEvent(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Event</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, locations, or organizers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-ocean-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-ocean-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredEvents.map((event, index) => {
            const WeatherIcon = event.weather.icon
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card group hover:shadow-2xl ${event.featured ? 'ring-2 ring-yellow-300' : ''} ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}
              >
                {event.featured && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Featured</span>
                  </div>
                )}

                <div className={`${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                      <WeatherIcon className="h-4 w-4 text-orange-500" />
                      <span className="text-xs font-medium">{event.weather.condition}</span>
                      <Thermometer className="h-3 w-3 text-gray-500" />
                      <span className="text-xs">{event.weather.temperature}</span>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`${viewMode === 'list' ? 'md:w-2/3 md:pl-6' : ''} flex-1`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-ocean-600 transition-colors">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(event.difficulty)}`}>
                      {event.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{event.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.participants}/{event.maxParticipants} participants</span>
                      <UserPlus className="h-4 w-4 ml-2" />
                      <span>by {event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-ocean-100 text-ocean-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{event.tags.length - 3} more
                      </span>
                    )}
                  </div>                  <div className="flex items-center space-x-3">
                    {event.registered ? (
                      <div className="flex-1 flex items-center justify-center space-x-2 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium">
                        <UserPlus className="h-4 w-4" />
                        <span>Registered</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id)}
                        className="flex-1 btn-primary flex items-center justify-center space-x-2"
                        disabled={event.participants >= event.maxParticipants}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>{event.participants >= event.maxParticipants ? 'Full' : 'Register'}</span>
                      </button>
                    )}
                    
                    <button className="btn-outline flex items-center space-x-1 px-3 py-2">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>

                    {/* Admin Actions */}
                    {permissions.canManageEvents && (
                      <>
                        <button className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Events
