import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Award, 
  Download, 
  Share2, 
  Eye,
  Calendar,
  MapPin,
  Users,
  Star,
  Trophy,
  FileText as CertificateIcon,
  Printer,
  Mail,
  CheckCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react'

const Certificates = () => {
  const { user, permissions, isAdmin, mockUsers } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: 'Beach Cleanup Champion',
      description: 'Awarded for outstanding contribution in beach cleanup activities',
      type: 'participation',
      category: 'cleanup',
      issued: '2024-06-15',
      event: 'Juhu Beach Mega Cleanup',
      organizer: 'Mumbai Beach Cleanup Initiative',
      achievements: ['Collected 25kg waste', 'Led team of 10 volunteers', '5-hour participation'],
      certificateNumber: 'MBC-2024-001-' + (user?.id || '001'),
      status: 'verified',
      downloadUrl: '#',
      shareUrl: '#',
      verificationCode: 'MBC' + Date.now().toString().slice(-6),
      background: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
      signature: 'Dr. Sarah Ocean, Director'
    },
    {
      id: 2,
      title: 'Environmental Leadership Certificate',
      description: 'Recognition for exceptional leadership in environmental conservation',
      type: 'leadership',
      category: 'leadership',
      issued: '2024-05-20',
      event: 'Volunteer Leadership Program',
      organizer: 'Mumbai Environmental Council',
      achievements: ['Organized 5 cleanup events', 'Trained 50+ volunteers', 'Community impact leader'],
      certificateNumber: 'MEC-2024-L-' + (user?.id || '001'),
      status: 'verified',
      downloadUrl: '#',
      shareUrl: '#',
      verificationCode: 'MEC' + Date.now().toString().slice(-6),
      background: 'https://images.unsplash.com/photo-1618477462146-0071f4216b75?w=800&h=600&fit=crop',
      signature: 'Prof. Rahul Green, President'
    },
    {
      id: 3,
      title: 'Plastic Warrior Certificate',
      description: 'Special recognition for dedicated efforts in plastic waste removal',
      type: 'achievement',
      category: 'specialization',
      issued: '2024-04-10',
      event: 'Plastic-Free Mumbai Campaign',
      organizer: 'Zero Waste Mumbai',
      achievements: ['Removed 100kg plastic waste', 'Educated 200+ people', 'Plastic-free lifestyle advocate'],
      certificateNumber: 'ZWM-2024-PW-' + (user?.id || '001'),
      status: 'verified',
      downloadUrl: '#',
      shareUrl: '#',
      verificationCode: 'ZWM' + Date.now().toString().slice(-6),
      background: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=600&fit=crop',
      signature: 'Ms. Priya Clean, Founder'
    },
    {
      id: 4,
      title: 'Community Impact Award',
      description: 'Honoring significant contribution to community environmental awareness',
      type: 'award',
      category: 'impact',
      issued: '2024-03-15',
      event: 'Annual Environmental Awards',
      organizer: 'Green Mumbai Foundation',
      achievements: ['Social media influence', 'Community engagement', 'Awareness campaigns'],
      certificateNumber: 'GMF-2024-CIA-' + (user?.id || '001'),
      status: 'pending_verification',
      downloadUrl: '#',
      shareUrl: '#',
      verificationCode: 'GMF' + Date.now().toString().slice(-6),
      background: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      signature: 'Mr. Amit Green, Director'
    }
  ]

  // Filter certificates based on user permissions
  const visibleCertificates = isAdmin 
    ? certificates // Admin sees all certificates
    : certificates.filter(cert => cert.status === 'verified') // Users see only verified ones

  const filteredCertificates = visibleCertificates.filter(cert => {
    const matchesFilter = activeFilter === 'all' || cert.category === activeFilter
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const certificateTypes = [
    { id: 'all', name: 'All Certificates', icon: CertificateIcon },
    { id: 'cleanup', name: 'Cleanup', icon: Award },
    { id: 'leadership', name: 'Leadership', icon: Trophy },
    { id: 'specialization', name: 'Specialization', icon: Star },
    { id: 'impact', name: 'Impact', icon: Users }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100'
      case 'pending_verification': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'participation': return 'text-blue-600 bg-blue-100'
      case 'leadership': return 'text-purple-600 bg-purple-100'
      case 'achievement': return 'text-green-600 bg-green-100'
      case 'award': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleDownload = (certificate) => {
    console.log('Downloading certificate:', certificate.id)
    // Mock download functionality
  }

  const handleShare = (certificate) => {
    console.log('Sharing certificate:', certificate.id)
    // Mock share functionality
  }

  const handlePrint = (certificate) => {
    console.log('Printing certificate:', certificate.id)
    // Mock print functionality
  }

  const CertificateModal = ({ certificate, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Preview */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 p-8">
          <div className="relative bg-white rounded-lg shadow-lg p-8 border-4 border-yellow-400">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Award className="h-16 w-16 text-yellow-500" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{certificate.title}</h1>
                <p className="text-gray-600">{certificate.description}</p>
              </div>

              <div className="py-4">
                <p className="text-lg text-gray-700 mb-2">This certificate is awarded to</p>
                <h2 className="text-4xl font-bold text-ocean-600 mb-4">{user?.name}</h2>
                <p className="text-gray-600">For outstanding contribution in</p>
                <h3 className="text-xl font-semibold text-gray-800">{certificate.event}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                {certificate.achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end pt-8">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Issued on</p>
                  <p className="font-semibold">{new Date(certificate.issued).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500 mt-2">Certificate No: {certificate.certificateNumber}</p>
                </div>
                
                <div className="text-right">
                  <div className="mb-2">
                    <div className="w-32 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Digital Signature</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{certificate.signature}</p>
                  <p className="text-xs text-gray-600">{certificate.organizer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex justify-between">
          <div className="text-sm text-gray-600">
            <p>Verification Code: <span className="font-mono font-bold">{certificate.verificationCode}</span></p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleDownload(certificate)}
              className="btn-outline flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={() => handlePrint(certificate)}
              className="btn-outline flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
            <button
              onClick={() => handleShare(certificate)}
              className="btn-primary flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

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
                <CertificateIcon className="h-8 w-8" />
                <span>My Certificates</span>
              </h1>
              <p className="text-gray-600">
                View and manage your environmental impact certificates and awards
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{filteredCertificates.filter(c => c.status === 'verified').length}</div>
                <div className="text-xs text-gray-600">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{filteredCertificates.filter(c => c.status === 'pending_verification').length}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {certificateTypes.map(type => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === type.id
                        ? 'bg-ocean-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{type.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCertificate(certificate)}
            >
              {/* Certificate Preview */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-800">{certificate.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{certificate.organizer}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                  {certificate.status.replace('_', ' ')}
                </span>
              </div>

              {/* Certificate Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {certificate.description}
                  </p>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {new Date(certificate.issued).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{certificate.event}</span>
                  </div>
                </div>

                {/* Type Badge */}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(certificate.type)}`}>
                  {certificate.type}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(certificate)
                    }}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(certificate)
                      }}
                      className="text-gray-600 hover:text-green-600"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCertificate(certificate)
                      }}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Certificates Message */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CertificateIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No certificates found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No certificates match your search "${searchTerm}"`
                : 'Participate in more cleanup activities to earn certificates'
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  )
}

export default Certificates