import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Waves, 
  Users, 
  Calendar, 
  BarChart3, 
  Award, 
  MapPin,
  Camera,
  Mic,
  Recycle,
  Heart,
  ArrowRight,
  Play,
  Star
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Social Community Platform",
      description: "Connect with like-minded volunteers, share cleanup photos, and build lasting environmental friendships.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Intelligent Event Management",
      description: "AI-powered event planning with weather predictions, optimal timing, and automated notifications.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mic,
      title: "Voice Assistant Gamification",
      description: "Real-time leaderboards, AI trash identification, and voice-guided cleanup activities.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics & Reports",
      description: "Track your environmental impact with visual reports and before/after photo comparisons.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "ML-powered recommendations, eco-education modules, and wellness tracking.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Recycle,
      title: "Resource Management",
      description: "QR code equipment tracking, skill matching, and digital marketplace for recyclables.",
      color: "from-teal-500 to-green-500"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Volunteers", icon: Users },
    { number: "500+", label: "Beach Cleanups", icon: Calendar },
    { number: "2.5 Tons", label: "Waste Collected", icon: Recycle },
    { number: "50+", label: "Beaches Cleaned", icon: MapPin }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Environmental Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c505?w=150&h=150&fit=crop&crop=face",
      quote: "This platform transformed how I engage with environmental causes. The community is amazing!"
    },
    {
      name: "Rahul Mehta",
      role: "Regular Volunteer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The AI features help me track my impact and stay motivated. It's like having a personal eco-coach."
    },
    {
      name: "Anita Desai",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Organizing cleanup events has never been easier. The predictive features are game-changing!"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 20,
                height: Math.random() * 100 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Waves className="h-20 w-20 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Keep Mumbai's
              <br />
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                Beaches Clean
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join our AI-powered community platform to organize, participate, and track your environmental impact. 
              Together, we're creating cleaner beaches and a sustainable future for Mumbai.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/events" className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Join Next Cleanup</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button className="flex items-center space-x-2 text-white hover:text-green-300 transition-colors">
                <Play className="h-5 w-5" />
                <span>Watch How It Works</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-r from-ocean-500 to-green-500 text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Six Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines social networking, AI intelligence, and environmental action 
              to create the ultimate beach cleanup experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card group hover:shadow-2xl"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real environmental heroes making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-ocean-200"
                  />
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div>
                  <div className="font-bold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Make a Difference?
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of volunteers who are already making Mumbai's beaches cleaner and more beautiful. 
              Every action counts, every cleanup matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-ocean-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Join the Community</span>
              </Link>
              
              <Link to="/events" className="border-2 border-white text-white hover:bg-white hover:text-ocean-600 font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>View Upcoming Events</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
