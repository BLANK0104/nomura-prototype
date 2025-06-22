import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  MapPin, 
  Users, 
  Eye, 
  Target, 
  Trophy, 
  Clock,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  Award,
  BarChart3,
  Filter,
  Search,
  Download,
  RefreshCw,
  User
} from 'lucide-react'

const AdminTracking = () => {
  const { user, permissions, mockUsers, isAdmin } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')
  const [refreshInterval, setRefreshInterval] = useState(5000) // 5 seconds
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Mock live cleanup data
  const [liveCleanups, setLiveCleanups] = useState([
    {
      id: 1,
      name: 'Juhu Beach Cleanup',
      status: 'active',
      startTime: '06:00 AM',
      duration: '3 hours',
      location: 'Juhu Beach',
      participants: 45,
      totalWasteCollected: 125,
      averageRating: 4.8,
      coordinator: 'Sarah Coordinator'
    },
    {
      id: 2,
      name: 'Marine Drive Cleanup',
      status: 'scheduled',
      startTime: '07:00 AM',
      duration: '2 hours',
      location: 'Marine Drive',
      participants: 32,
      totalWasteCollected: 0,
      averageRating: 0,
      coordinator: 'Rahul Volunteer'
    }
  ])

  // Mock participant data with real-time progress
  const [participantProgress, setParticipantProgress] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
      cleanupId: 1,
      wasteCollected: 12,
      currentMilestone: 'Eco Warrior',
      milestonesCompleted: 3,
      pointsEarned: 180,
      currentStreak: 5,
      status: 'cleaning',
      location: { lat: 19.0896, lng: 72.8245 },
      joinTime: '06:15 AM',
      lastActivity: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      cleanupId: 1,
      wasteCollected: 8,
      currentMilestone: 'Beach Guardian',
      milestonesCompleted: 2,
      pointsEarned: 120,
      currentStreak: 3,
      status: 'break',
      location: { lat: 19.0896, lng: 72.8245 },
      joinTime: '06:00 AM',
      lastActivity: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Anita Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      cleanupId: 1,
      wasteCollected: 15,
      currentMilestone: 'Plastic Fighter',
      milestonesCompleted: 4,
      pointsEarned: 225,
      currentStreak: 7,
      status: 'cleaning',
      location: { lat: 19.0896, lng: 72.8245 },
      joinTime: '06:10 AM',
      lastActivity: '1 minute ago'
    }
  ])

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // Simulate real-time updates
      setParticipantProgress(prev => 
        prev.map(participant => ({
          ...participant,
          wasteCollected: participant.wasteCollected + Math.floor(Math.random() * 3),
          pointsEarned: participant.pointsEarned + Math.floor(Math.random() * 10),
          lastActivity: Math.floor(Math.random() * 5) + 1 + ' minutes ago'
        }))
      )
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600">Only administrators can access live tracking.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'cleaning': return 'text-green-600 bg-green-100'
      case 'break': return 'text-yellow-600 bg-yellow-100'
      case 'finished': return 'text-blue-600 bg-blue-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCleanupStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredParticipants = participantProgress.filter(participant => {
    if (activeFilter === 'all') return true
    return participant.status === activeFilter
  })

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
                <Eye className="h-8 w-8" />
                <span>Live Cleanup Tracking</span>
              </h1>
              <p className="text-gray-600">
                Monitor real-time progress of all cleanup activities and participants
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <button 
                onClick={() => setLastUpdate(new Date())}
                className="btn-outline flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Cleanup Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {liveCleanups.map((cleanup, index) => (
            <motion.div
              key={cleanup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{cleanup.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCleanupStatusColor(cleanup.status)}`}>
                  {cleanup.status}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{cleanup.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{cleanup.startTime} • {cleanup.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{cleanup.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>{cleanup.totalWasteCollected}kg collected</span>
                </div>
                {cleanup.averageRating > 0 && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{cleanup.averageRating} avg rating</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Coordinator: {cleanup.coordinator}</span>
                  <button className="text-ocean-600 hover:text-ocean-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-800">Participant Tracking</h3>
              <div className="flex items-center space-x-2">
                {['all', 'cleaning', 'break', 'finished'].map(status => (
                  <button
                    key={status}
                    onClick={() => setActiveFilter(status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === status
                        ? 'bg-ocean-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Refresh every:</label>
              <select 
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="border border-gray-200 rounded px-2 py-1 text-sm"
              >
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds</option>
                <option value={60000}>1 minute</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Participant Progress Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-600">Participant</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Waste Collected</th>
                  <th className="text-left p-3 font-medium text-gray-600">Current Milestone</th>
                  <th className="text-left p-3 font-medium text-gray-600">Points Earned</th>
                  <th className="text-left p-3 font-medium text-gray-600">Streak</th>
                  <th className="text-left p-3 font-medium text-gray-600">Last Activity</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, index) => (
                  <motion.tr
                    key={participant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{participant.name}</div>
                          <div className="text-gray-500 text-xs">Joined: {participant.joinTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                        {participant.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{participant.wasteCollected}kg</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span>{participant.currentMilestone}</span>
                        <span className="text-xs text-gray-500">({participant.milestonesCompleted})</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-yellow-600">{participant.pointsEarned}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">{participant.currentStreak}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-500">
                      {participant.lastActivity}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-xs">
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-700 text-xs">
                          Send Message
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Real-time Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {participantProgress.filter(p => p.status === 'cleaning').length}
            </div>
            <div className="text-gray-600 text-sm">Active Participants</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {participantProgress.reduce((sum, p) => sum + p.wasteCollected, 0)}kg
            </div>
            <div className="text-gray-600 text-sm">Total Waste Collected</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {participantProgress.reduce((sum, p) => sum + p.pointsEarned, 0)}
            </div>
            <div className="text-gray-600 text-sm">Points Earned Today</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {participantProgress.reduce((sum, p) => sum + p.milestonesCompleted, 0)}
            </div>
            <div className="text-gray-600 text-sm">Milestones Completed</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminTracking
