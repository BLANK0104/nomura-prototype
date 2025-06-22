import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Waves, 
  Home, 
  Calendar, 
  Users, 
  BarChart3, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Activity,
  Target,
  Award,
  Eye,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react'

const Navigation = () => {
  const { user, logout, isAdmin, permissions } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileMenuOpen(false)
  }

  // Base navigation items for all users
  const baseNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Community', path: '/community', icon: Users },
  ]

  // Regular user items
  const userNavItems = user ? [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  ] : []

  // Admin/Volunteer specific items grouped in dropdown
  const adminNavItems = permissions.canViewAnalytics ? [
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ] : []

  // Gamification items
  const gamificationItems = user ? [
    { name: 'Live Cleanup', path: '/live-cleanup', icon: Activity },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Certificates', path: '/certificates', icon: Target },
  ] : []

  // Admin-only items for dropdown
  const adminOnlyItems = permissions.canAccessAdminPanel ? [
    { name: 'Admin Panel', path: '/admin', icon: Shield },
    { name: 'Live Tracking', path: '/admin-tracking', icon: Eye },
  ] : []

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Waves className="h-8 w-8 text-ocean-500 animate-wave" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Mumbai Beach Cleanup
            </span>
            <span className="text-xl font-bold gradient-text sm:hidden">
              MBC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            
            {/* Base Navigation Items */}
            {baseNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-ocean-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:text-ocean-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* User Navigation Items */}
            {userNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-ocean-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:text-ocean-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Analytics for Admin/Volunteers */}
            {adminNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-ocean-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:text-ocean-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Gamification Dropdown */}
            {user && gamificationItems.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/50 hover:text-ocean-600 transition-all duration-200"
                >
                  <Activity className="h-4 w-4" />
                  <span>Gamification</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAdminDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {gamificationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsAdminDropdownOpen(false)}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            isActive(item.path) ? 'text-ocean-600 bg-ocean-50' : 'text-gray-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                    
                    {/* Admin Only Items */}
                    {adminOnlyItems.length > 0 && (
                      <>
                        <div className="border-t border-gray-200 my-2"></div>
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Admin Tools
                        </div>
                        {adminOnlyItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setIsAdminDropdownOpen(false)}
                              className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                isActive(item.path) ? 'text-ocean-600 bg-ocean-50' : 'text-gray-700'
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </Link>
                          )
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search (Admin only) */}
            {isAdmin && (
              <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/50 transition-colors">
                <Search className="h-4 w-4 text-gray-600" />
              </button>
            )}

            {/* Notifications */}
            {user && (
              <button className="relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/50 transition-colors">
                <Bell className="h-4 w-4 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>  
            )}

            {/* User Menu or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-white/50 rounded-lg p-2 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400 capitalize">{user.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm px-4 py-2"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              {/* Base Items */}
              {baseNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-ocean-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* User Items */}
              {[...userNavItems, ...adminNavItems].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-ocean-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Gamification Items */}
              {user && gamificationItems.length > 0 && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Gamification
                  </div>
                  {gamificationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.path)
                            ? 'bg-ocean-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </>
              )}

              {/* Admin Only Items */}
              {adminOnlyItems.length > 0 && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Admin Tools
                  </div>
                  {adminOnlyItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.path)
                            ? 'bg-ocean-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </>
              )}

              {/* Mobile User Actions */}
              {user && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close dropdowns */}
      {(isProfileMenuOpen || isAdminDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileMenuOpen(false)
            setIsAdminDropdownOpen(false)
          }}
        ></div>
      )}
    </nav>
  )
}

export default Navigation
