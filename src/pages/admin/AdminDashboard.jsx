import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  TrendingUp,
  MapPin,
  Award,
  Bell,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Clock,
  Target
} from 'lucide-react'

const AdminDashboard = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3, path: '/admin' },
    { id: 'users', name: 'Users', icon: Users, path: '/admin/users' },
    { id: 'events', name: 'Events', icon: Calendar, path: '/admin/events' },
    { id: 'content', name: 'Content', icon: FileText, path: '/admin/content' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/admin/settings' }
  ]

  const AdminSidebar = () => (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-ocean-500" />
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {sidebarItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-ocean-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )

  const AdminOverview = () => {
    const stats = [
      { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
      { title: 'Active Events', value: '28', change: '+5%', icon: Calendar, color: 'from-green-500 to-emerald-500' },
      { title: 'This Month Cleanups', value: '156', change: '+25%', icon: MapPin, color: 'from-purple-500 to-pink-500' },
      { title: 'Total Impact Points', value: '45.2K', change: '+18%', icon: Award, color: 'from-orange-500 to-red-500' }
    ]

    const recentUsers = [
      { id: 1, name: 'Amit Patel', email: 'amit@example.com', joined: '2024-06-20', status: 'active' },
      { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', joined: '2024-06-19', status: 'active' },
      { id: 3, name: 'Rajesh Kumar', email: 'rajesh@example.com', joined: '2024-06-18', status: 'pending' },
      { id: 4, name: 'Priya Singh', email: 'priya@example.com', joined: '2024-06-17', status: 'active' }
    ]

    const recentEvents = [
      { id: 1, title: 'Juhu Beach Cleanup', date: '2024-06-25', participants: 45, status: 'upcoming' },
      { id: 2, title: 'Marine Drive Cleanup', date: '2024-06-28', participants: 32, status: 'upcoming' },
      { id: 3, title: 'Versova Beach Cleanup', date: '2024-06-22', participants: 78, status: 'completed' },
      { id: 4, title: 'Bandra Beach Cleanup', date: '2024-06-20', participants: 56, status: 'completed' }
    ]

    return (
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-green-600 text-sm font-medium flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.title}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Users</h3>
              <Link to="/admin/users" className="text-ocean-600 hover:text-ocean-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-ocean-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{user.joined}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Events</h3>
              <Link to="/admin/events" className="text-ocean-600 hover:text-ocean-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{event.title}</div>
                      <div className="text-sm text-gray-600">{event.participants} participants</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {event.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{event.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const users = [
      { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'user', status: 'active', events: 8, joined: '2024-03-20' },
      { id: 2, name: 'Rahul Mehta', email: 'rahul@example.com', role: 'user', status: 'active', events: 15, joined: '2024-02-10' },
      { id: 3, name: 'Admin User', email: 'admin@mumbaibeachcleanup.com', role: 'admin', status: 'active', events: 25, joined: '2023-01-15' },
      { id: 4, name: 'Anita Desai', email: 'anita@example.com', role: 'user', status: 'inactive', events: 3, joined: '2024-04-15' },
      { id: 5, name: 'Vikram Patel', email: 'vikram@example.com', role: 'user', status: 'active', events: 12, joined: '2024-01-20' }
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Events</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-ocean-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{user.events}</td>
                    <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-600 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-green-600">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const AdminEvents = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showCreateEvent, setShowCreateEvent] = useState(false)

    const events = [
      {
        id: 1,
        title: 'Juhu Beach Morning Cleanup',
        date: '2024-06-25',
        time: '06:00 AM',
        location: 'Juhu Beach, Mumbai',
        organizer: 'Mumbai Beach Cleanup Team',
        participants: 45,
        maxParticipants: 100,
        status: 'upcoming',
        category: 'Beach Cleanup',
        created: '2024-06-01',
        description: 'Weekly beach cleanup with breakfast included.'
      },
      {
        id: 2,
        title: 'Marine Drive Evening Session',
        date: '2024-06-28',
        time: '05:00 PM',
        location: 'Marine Drive, Mumbai',
        organizer: 'Green Mumbai Initiative',
        participants: 32,
        maxParticipants: 60,
        status: 'upcoming',
        category: 'Street Cleanup',
        created: '2024-06-02',
        description: 'Evening cleanup along Marine Drive promenade.'
      },
      {
        id: 3,
        title: 'Versova Community Drive',
        date: '2024-06-22',
        time: '07:00 AM',
        location: 'Versova Beach, Mumbai',
        organizer: 'Versova Residents Association',
        participants: 78,
        maxParticipants: 80,
        status: 'completed',
        category: 'Beach Cleanup',
        created: '2024-05-28',
        description: 'Large-scale community cleanup with refreshments.'
      },
      {
        id: 4,
        title: 'Volunteer Training Workshop',
        date: '2024-07-01',
        time: '10:00 AM',
        location: 'Community Center, Bandra',
        organizer: 'Training Team',
        participants: 18,
        maxParticipants: 25,
        status: 'upcoming',
        category: 'Training',
        created: '2024-06-10',
        description: 'Training session for new volunteers.'
      }
    ]

    const filteredEvents = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter
      return matchesSearch && matchesStatus
    })

    const getStatusColor = (status) => {
      switch (status) {
        case 'upcoming': return 'bg-blue-100 text-blue-800'
        case 'ongoing': return 'bg-green-100 text-green-800'
        case 'completed': return 'bg-gray-100 text-gray-800'
        case 'cancelled': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
            <p className="text-gray-600">Create, edit, and manage cleanup events</p>
          </div>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-800">
                  {events.filter(e => e.status === 'upcoming').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Participants</p>
                <p className="text-2xl font-bold text-gray-800">
                  {events.reduce((sum, e) => sum + e.participants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Participation</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(events.reduce((sum, e) => sum + (e.participants / e.maxParticipants * 100), 0) / events.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Event</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Participants</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-800">{event.title}</div>
                        <div className="text-gray-500 text-xs">{event.category}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-gray-800">{event.date}</div>
                        <div className="text-gray-500 text-xs">{event.time}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{event.location}</td>
                    <td className="py-3 px-4">
                      <div className="text-gray-800">{event.participants}/{event.maxParticipants}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-ocean-500 h-1 rounded-full"
                          style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-600 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-green-600">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const AdminContent = () => {
    const [activeContentTab, setActiveContentTab] = useState('posts')
    
    const posts = [
      {
        id: 1,
        title: 'Amazing Beach Cleanup at Juhu',
        author: 'Priya Sharma',
        date: '2024-06-20',
        status: 'published',
        likes: 45,
        comments: 12,
        category: 'Event Report'
      },
      {
        id: 2,
        title: 'New Volunteer Training Program',
        author: 'Admin Team',
        date: '2024-06-18',
        status: 'published',
        likes: 23,
        comments: 8,
        category: 'Announcement'
      },
      {
        id: 3,
        title: 'Community Impact Report - May 2024',
        author: 'Mumbai Beach Cleanup',
        date: '2024-06-15',
        status: 'draft',
        likes: 0,
        comments: 0,
        category: 'Report'
      }
    ]

    const achievements = [
      { id: 1, name: 'Beach Guardian', description: 'Clean 5 different beaches', icon: '🏖️', earned: 234 },
      { id: 2, name: 'Eco Warrior', description: 'Participate in 20+ cleanups', icon: '🌍', earned: 156 },
      { id: 3, name: 'Community Leader', description: 'Organize 10+ events', icon: '👥', earned: 45 },
      { id: 4, name: 'Plastic Fighter', description: 'Remove 100kg+ plastic', icon: '♻️', earned: 89 }
    ]

    const challenges = [
      { id: 1, name: '30-Day Beach Guardian', participants: 234, active: true },
      { id: 2, name: 'Plastic-Free Weekend', participants: 89, active: true },
      { id: 3, name: 'Community Impact Challenge', participants: 156, active: false }
    ]

    const contentTabs = [
      { id: 'posts', name: 'Posts & Articles', icon: FileText },
      { id: 'achievements', name: 'Achievements', icon: Award },
      { id: 'challenges', name: 'Challenges', icon: TrendingUp }
    ]

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
            <p className="text-gray-600">Manage posts, achievements, and community challenges</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Content</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {contentTabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveContentTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeContentTab === tab.id
                        ? 'border-ocean-500 text-ocean-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeContentTab === 'posts' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Community Posts</h3>
                  <div className="flex items-center space-x-2">
                    <button className="btn-outline text-sm">Export</button>
                    <button className="btn-primary text-sm">New Post</button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Author</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Engagement</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map(post => (
                        <tr key={post.id} className="border-t border-gray-100">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-800">{post.title}</div>
                              <div className="text-gray-500 text-xs">{post.category}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-800">{post.author}</td>
                          <td className="py-3 px-4 text-gray-600">{post.date}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-800">{post.likes} likes, {post.comments} comments</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-600 hover:text-blue-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-green-600">
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeContentTab === 'achievements' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Achievement Badges</h3>
                  <button className="btn-primary text-sm">Create Badge</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{achievement.earned} users earned</span>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-gray-600 hover:text-green-600">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeContentTab === 'challenges' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Community Challenges</h3>
                  <button className="btn-primary text-sm">Create Challenge</button>
                </div>
                
                <div className="space-y-3">
                  {challenges.map(challenge => (
                    <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{challenge.name}</h4>
                          <p className="text-sm text-gray-600">{challenge.participants} participants</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            challenge.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {challenge.active ? 'Active' : 'Inactive'}
                          </span>
                          <button className="p-1 text-gray-600 hover:text-green-600">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const AdminSettings = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState('general')
    
    const settingsTabs = [
      { id: 'general', name: 'General', icon: Settings },
      { id: 'users', name: 'User Management', icon: Users },
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'integrations', name: 'Integrations', icon: Upload }
    ]

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Platform Settings</h2>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {settingsTabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeSettingsTab === tab.id
                        ? 'border-ocean-500 text-ocean-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeSettingsTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Mumbai Beach Cleanup"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@mumbaibeachcleanup.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Auto-approve events</label>
                        <p className="text-sm text-gray-500">Automatically approve new events created by volunteers</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Event reminders</label>
                        <p className="text-sm text-gray-500">Send email reminders to registered participants</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default event duration (hours)
                      </label>
                      <input
                        type="number"
                        defaultValue="3"
                        min="1"
                        max="12"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Points & Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points per cleanup event
                      </label>
                      <input
                        type="number"
                        defaultValue="150"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points per kg waste collected
                      </label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bonus points for organizing
                      </label>
                      <input
                        type="number"
                        defaultValue="300"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary">Save Settings</button>
                </div>
              </div>
            )}

            {activeSettingsTab === 'users' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Registration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Open registration</label>
                        <p className="text-sm text-gray-500">Allow anyone to register for an account</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email verification required</label>
                        <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Admin approval required</label>
                        <p className="text-sm text-gray-500">New accounts need admin approval</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Role Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Administrator</div>
                        <div className="text-sm text-gray-500">Full access to all platform features</div>
                      </div>
                      <span className="text-sm text-gray-600">2 users</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Moderator</div>
                        <div className="text-sm text-gray-500">Can moderate content and manage events</div>
                      </div>
                      <span className="text-sm text-gray-600">5 users</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Volunteer</div>
                        <div className="text-sm text-gray-500">Can create events and access volunteer features</div>
                      </div>
                      <span className="text-sm text-gray-600">156 users</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">User</div>
                        <div className="text-sm text-gray-500">Basic access to platform features</div>
                      </div>
                      <span className="text-sm text-gray-600">2,684 users</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Event reminders</label>
                        <p className="text-sm text-gray-500">Send reminders 24 hours before events</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">New user welcome emails</label>
                        <p className="text-sm text-gray-500">Send welcome email to new users</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Weekly digest</label>
                        <p className="text-sm text-gray-500">Send weekly summary of platform activity</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Achievement notifications</label>
                        <p className="text-sm text-gray-500">Notify users when they earn new badges</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">New user registrations</label>
                        <p className="text-sm text-gray-500">Get notified when new users register</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Event creation</label>
                        <p className="text-sm text-gray-500">Get notified when volunteers create new events</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Content reports</label>
                        <p className="text-sm text-gray-500">Get notified when content is reported</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Third-party Integrations</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">Google Maps API</div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">For location services and event mapping</p>
                      <button className="btn-outline text-sm">Configure</button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">SendGrid Email</div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">For sending email notifications and newsletters</p>
                      <button className="btn-outline text-sm">Configure</button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">Social Media APIs</div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Not Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">For social media sharing and authentication</p>
                      <button className="btn-primary text-sm">Connect</button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">Weather API</div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Connected
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">For weather information in event planning</p>
                      <button className="btn-outline text-sm">Configure</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Export</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">User Data Export</div>
                        <div className="text-sm text-gray-500">Export all user data in CSV format</div>
                      </div>
                      <button className="btn-outline text-sm flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Event Data Export</div>
                        <div className="text-sm text-gray-500">Export all event data in CSV format</div>
                      </div>
                      <button className="btn-outline text-sm flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Analytics Report</div>
                        <div className="text-sm text-gray-500">Generate comprehensive analytics report</div>
                      </div>
                      <button className="btn-outline text-sm flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Generate</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users" element={<AdminUsers />} />          <Route path="/events" element={<AdminEvents />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
