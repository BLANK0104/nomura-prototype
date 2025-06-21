import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // Mock users database
  const mockUsers = [
    {
      id: 1,
      email: 'admin@mumbaibeachcleanup.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-01-15',
      eventsParticipated: 25,
      wasteCollected: 150,
      impactPoints: 2500,
      badges: ['Platform Admin', 'Eco Warrior', 'Beach Guardian', 'Community Leader'],
      location: 'Mumbai, Maharashtra',
      permissions: ['all']
    },
    {
      id: 2,
      email: 'moderator@cleanup.com',
      password: 'mod123',
      name: 'Sarah Moderator',
      role: 'moderator',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-02-10',
      eventsParticipated: 20,
      wasteCollected: 120,
      impactPoints: 2000,
      badges: ['Content Moderator', 'Community Leader', 'Eco Warrior'],
      location: 'Bandra, Mumbai'
    },
    {
      id: 3,
      email: 'volunteer@cleanup.com',
      password: 'volunteer123',
      name: 'Rahul Volunteer',
      role: 'volunteer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-02-10',
      eventsParticipated: 15,
      wasteCollected: 98,
      impactPoints: 1650,
      badges: ['Consistency Champion', 'Weekend Warrior', 'Event Organizer'],
      location: 'Juhu, Mumbai'
    },
    {
      id: 4,
      email: 'user@example.com',
      password: 'user123',
      name: 'Priya Regular User',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-03-20',
      eventsParticipated: 8,
      wasteCollected: 45,
      impactPoints: 890,
      badges: ['First Timer', 'Plastic Fighter'],
      location: 'Bandra, Mumbai'
    }
  ]

  useEffect(() => {
    // Check for stored auth token/user
    const storedUser = localStorage.getItem('beachCleanupUser')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('beachCleanupUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      )
      
      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('beachCleanupUser', JSON.stringify(userWithoutPassword))
      
      toast.success(`Welcome back, ${foundUser.name}!`)
      return userWithoutPassword
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('beachCleanupUser')
    toast.success('Logged out successfully')
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email)
      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'user',
        joinedDate: new Date().toISOString().split('T')[0],
        eventsParticipated: 0,
        wasteCollected: 0,
        impactPoints: 0,
        badges: ['New Member'],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0ea5e9&color=fff`
      }

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('beachCleanupUser', JSON.stringify(userWithoutPassword))
      
      toast.success(`Welcome to Mumbai Beach Cleanup, ${newUser.name}!`)
      return userWithoutPassword
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('beachCleanupUser', JSON.stringify(updatedUser))
      toast.success('Profile updated successfully')
      return updatedUser
    } catch (error) {
      toast.error('Failed to update profile')
      throw error
    }
  }
  const isAdmin = user?.role === 'admin'
  const isVolunteer = user?.role === 'volunteer'
  const isModerator = user?.role === 'moderator'

  // Permission system
  const permissions = {
    canViewAllUsers: isAdmin || isModerator,
    canManageEvents: isAdmin || isModerator,
    canViewAnalytics: isAdmin || isModerator,
    canModerateContent: isAdmin || isModerator,
    canAccessAdminPanel: isAdmin,
    canCreateEvents: isAdmin || isModerator || (isVolunteer && user?.eventsParticipated > 10),
    canViewDetailedReports: isAdmin || isModerator,
    canManageUsers: isAdmin,
    canViewUserProfiles: isAdmin || isModerator,
    canEditSettings: isAdmin
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAdmin,
    isVolunteer,
    isModerator,
    permissions,
    mockUsers
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
