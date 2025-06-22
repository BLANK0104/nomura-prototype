import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Users, 
  MapPin, 
  Target, 
  Award, 
  Clock,
  Activity,
  TrendingUp,
  Eye,
  Settings,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Trophy,
  Star,
  Flame,
  Zap,
  Camera,
  Share2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Play,
  Pause,
  Square
} from 'lucide-react'

const AdminLiveTracking = () => {
  const { user, mockUsers } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [liveParticipants, setLiveParticipants] = useState([])
  const [eventStats, setEventStats] = useState({})
  const [realTimeData, setRealTimeData] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLiveTracking, setIsLiveTracking] = useState(true)

  // Mock active events for admin tracking
  const activeEvents = [
    {
      id: 1,
      title: 'Juhu Beach Morning Cleanup',
      location: 'Juhu Beach, Mumbai',
      startTime: '06:00 AM',
      participants: 45,
      status: 'active',
      totalWaste: 287,
      targetWaste: 500,
      zones: ['Zone A', 'Zone B', 'Zone C']
    },
    {
      id: 2,
      title: 'Marine Drive Evening Session',
      location: 'Marine Drive, Mumbai',
      startTime: '05:00 PM',
      participants: 32,
      status: 'active',
      totalWaste: 156,
      targetWaste: 300,
      zones: ['North', 'Central', 'South']
    }
  ]

  // Enhanced participant data with real-time tracking
  const mockLiveParticipants = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
      currentZone: 'Zone A',
      wasteCollected: 25,
      streak: 5,
      level: 8,
      points: 1250,
      status: 'active',
      lastUpdate: '2 min ago',
      sessionTime: '2h 15m',
      achievements: ['Speed Collector', 'Team Player'],
      heartRate: 75,
      photosTaken: 12,
      helpRequests: 0,
      efficiency: 92
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      currentZone: 'Zone B',
      wasteCollected: 22,
      streak: 3,
      level: 6,
      points: 980,
      status: 'break',
      lastUpdate: '5 min ago',
      sessionTime: '2h 45m',
      achievements: ['Plastic Hunter'],
      heartRate: 68,
      photosTaken: 8,
      helpRequests: 1,
      efficiency: 87
    },
    {
      id: 3,
      name: 'Anita Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      currentZone: 'Zone A',
      wasteCollected: 18,
      streak: 2,
      level: 4,
      points: 720,
      status: 'help_needed',
      lastUpdate: '1 min ago',
      sessionTime: '1h 30m',
      achievements: ['First Timer'],
      heartRate: 85,
      photosTaken: 5,
      helpRequests: 2,
      efficiency: 78
    },
    {
      id: 4,
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      currentZone: 'Zone C',
      wasteCollected: 30,
      streak: 8,
      level: 12,
      points: 2100,
      status: 'active',
      lastUpdate: '30 sec ago',
      sessionTime: '3h 10m',
      achievements: ['Zone Leader', 'Marathon Cleaner', 'Photo Master'],
      heartRate: 72,
      photosTaken: 18,
      helpRequests: 0,
      efficiency: 95
    }
  ]

  // Real-time milestones and achievements
  const realTimeMilestones = [
    { id: 1, type: 'personal', user: 'Priya Sharma', achievement: 'Collected 25kg!', time: '2 min ago', points: 100 },
    { id: 2, type: 'team', user: 'Zone A Team', achievement: 'Reached 100kg milestone!', time: '5 min ago', points: 200 },
    { id: 3, type: 'global', user: 'All Participants', achievement: 'Platform total: 10,000kg!', time: '8 min ago', points: 500 },
    { id: 4, type: 'personal', user: 'Vikram Singh', achievement: 'Level up to 12!', time: '12 min ago', points: 150 }
  ]

  useEffect(() => {
    setSelectedEvent(activeEvents[0])
    setLiveParticipants(mockLiveParticipants)
    setEventStats({
      totalParticipants: mockLiveParticipants.length,
      activeParticipants: mockLiveParticipants.filter(p => p.status === 'active').length,
      helpNeeded: mockLiveParticipants.filter(p => p.status === 'help_needed').length,
      totalWaste: mockLiveParticipants.reduce((sum, p) => sum + p.wasteCollected, 0),
      avgEfficiency: Math.round(mockLiveParticipants.reduce((sum, p) => sum + p.efficiency, 0) / mockLiveParticipants.length)
    })
    setRealTimeData(realTimeMilestones)
  }, [])

  // Filter participants based on status and search
  const filteredParticipants = liveParticipants.filter(participant => {
    const matchesStatus = filterStatus === 'all' || participant.status === filterStatus
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.currentZone.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'break': return 'bg-yellow-100 text-yellow-800'
      case 'help_needed': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4" />
      case 'break': return <Pause className="h-4 w-4" />
      case 'help_needed': return <AlertTriangle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <XCircle className="h-4 w-4" />
    }
  }

  const sendHelpToParticipant = (participantId) => {
    console.log('Sending help to participant:', participantId)
    // Mock sending help functionality
  }

  const exportData = () => {
    console.log('Exporting live tracking data...')
    // Mock export functionality
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center space-x-2">
              <Activity className="h-8 w-8" />
              <span>Admin Live Tracking Dashboard</span>
            </h1>
            <p className="text-gray-600">
              Real-time monitoring and gamification management for all cleanup events
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLiveTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {isLiveTracking ? 'Live Tracking' : 'Offline'}
              </span>
            </div>
            <button
              onClick={() => setIsLiveTracking(!isLiveTracking)}
              className={`btn-outline ${isLiveTracking ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'}`}
            >
              {isLiveTracking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={exportData} className="btn-primary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
          </div>
        </motion.div>

        {/* Event Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeEvents.map(event => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEvent(event)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEvent?.id === event.id
                    ? 'border-ocean-500 bg-ocean-50'
                    : 'border-gray-200 hover:border-ocean-300'
                }`}
              >
                <h3 className="font-bold text-gray-800 mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{event.totalWaste}kg / {event.targetWaste}kg</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(event.totalWaste / event.targetWaste) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{eventStats.totalParticipants}</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{eventStats.activeParticipants}</div>
            <div className="text-sm text-gray-600">Currently Active</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{eventStats.helpNeeded}</div>
            <div className="text-sm text-gray-600">Need Help</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{eventStats.totalWaste}kg</div>
            <div className="text-sm text-gray-600">Waste Collected</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card text-center"
          >
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{eventStats.avgEfficiency}%</div>
            <div className="text-sm text-gray-600">Avg Efficiency</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Live Participants Table */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold gradient-text">Live Participant Tracking</h2>
                <div className="flex items-center space-x-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ocean-500"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-ocean-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="break">On Break</option>
                    <option value="help_needed">Need Help</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <button className="btn-outline text-sm">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredParticipants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, y: 10 }}
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
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white">
                          <span className="text-xs font-bold text-purple-600">{participant.level}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-800">{participant.name}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{participant.currentZone}</span>
                          <span>•</span>
                          <span>{participant.sessionTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${getStatusColor(participant.status)}`}>
                            {getStatusIcon(participant.status)}
                            <span>{participant.status.replace('_', ' ')}</span>
                          </span>
                          <span className="text-xs text-gray-500">{participant.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{participant.wasteCollected}kg</div>
                      <div className="text-sm text-gray-600">{participant.points} points</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1 text-xs">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span>{participant.streak}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <TrendingUp className="h-3 w-3 text-blue-500" />
                          <span>{participant.efficiency}%</span>
                        </div>
                        {participant.status === 'help_needed' && (
                          <button
                            onClick={() => sendHelpToParticipant(participant.id)}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Send Help
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Real-time Updates & Achievements */}
          <div className="space-y-6">
            
            {/* Real-time Milestones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Live Achievements</span>
              </h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {realTimeData.map((milestone) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      milestone.type === 'personal' 
                        ? 'bg-blue-50 border-blue-500'
                        : milestone.type === 'team'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-purple-50 border-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{milestone.user}</span>
                      <span className="text-xs text-gray-500">{milestone.time}</span>
                    </div>
                    <div className="text-sm text-gray-700">{milestone.achievement}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        +{milestone.points} points
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        milestone.type === 'personal' 
                          ? 'bg-blue-100 text-blue-800'
                          : milestone.type === 'team'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {milestone.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Zone Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Zone Performance</span>
              </h3>
              
              <div className="space-y-3">
                {selectedEvent?.zones.map((zone, index) => {
                  const zoneParticipants = liveParticipants.filter(p => p.currentZone === zone)
                  const zoneWaste = zoneParticipants.reduce((sum, p) => sum + p.wasteCollected, 0)
                  const zoneEfficiency = zoneParticipants.length > 0 
                    ? Math.round(zoneParticipants.reduce((sum, p) => sum + p.efficiency, 0) / zoneParticipants.length)
                    : 0
                  
                  return (
                    <div key={zone} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{zone}</span>
                        <span className="text-sm text-gray-600">{zoneParticipants.length} participants</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">{zoneWaste}kg collected</span>
                        <span className="text-blue-600">{zoneEfficiency}% efficiency</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${zoneEfficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Broadcast Message
                </button>
                <button className="w-full btn-outline text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Award Bonus Points
                </button>
                <button className="w-full btn-outline text-sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Request Photo Updates
                </button>
                <button className="w-full btn-outline text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Session Data
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLiveTracking
