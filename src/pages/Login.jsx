import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Waves, 
  User,
  MapPin,
  Phone
} from 'lucide-react'

const Login = () => {
  const { login, register, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  
  const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm()
  
  const from = location.state?.from?.pathname || '/dashboard'

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await login(data.email, data.password)
        navigate(from, { replace: true })
      } else {
        await register(data)
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    reset()
  }

  const demoCredentials = [
    { email: 'admin@mumbaibeachcleanup.com', password: 'admin123', role: 'Admin' },
    { email: 'user@example.com', password: 'user123', role: 'User' },
    { email: 'volunteer@cleanup.com', password: 'volunteer123', role: 'Volunteer' }
  ]

  const fillDemo = (credentials) => {
    reset({
      email: credentials.email,
      password: credentials.password
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Waves className="h-24 w-24 text-ocean-500" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
                </motion.div>
              </div>
              
              <h2 className="text-4xl font-bold gradient-text">
                Mumbai Beach Cleanup
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Join our AI-powered community platform to make a real environmental impact. 
                Connect, organize, and track your contribution to cleaner beaches.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">AI-powered event management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Real-time impact tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Gamified volunteering experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Community social platform</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </h3>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>

            {/* Demo Credentials */}
            {isLogin && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <button
                      key={index}
                      onClick={() => fillDemo(cred)}
                      className="w-full text-left p-2 text-xs bg-white rounded border hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <span>{cred.email}</span>
                        <span className="text-blue-600 font-medium">{cred.role}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...registerField('name', { 
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    {...registerField('email', { 
                      required: 'Email is required',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerField('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        {...registerField('location', { required: 'Location is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="Mumbai, Maharashtra"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        {...registerField('phone', { required: 'Phone number is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="loading-wave w-6 h-6"></div>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-ocean-600 hover:text-ocean-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
