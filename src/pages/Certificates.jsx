import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  Star, 
  Shield, 
  Trophy,
  Medal,
  Crown,
  CheckCircle,
  Eye,
  Filter,
  Search,
  ExternalLink,
  Printer,
  Mail
} from 'lucide-react'

const Certificates = () => {
  const { user, permissions, isAdmin } = useAuth()
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: 'Beach Cleanup Champion',
      description: 'Awarded for participating in 15+ beach cleanup events',
      type: 'participation',
      issueDate: '2024-06-15',
      validUntil: '2025-06-15',
      certificateNumber: 'MBC-2024-001',
      credentialId: 'bc-001-2024',
      issuer: 'Mumbai Beach Cleanup Initiative',
      recipient: user?.name || 'User Name',
      recipientEmail: user?.email || 'user@example.com',
      achievement: 'Participated in 15 beach cleanup events',
      skills: ['Environmental Conservation', 'Community Service', 'Teamwork'],
      verified: true,
      blockchain: true,
      downloadCount: 3,
      sharedCount: 1,
      template: 'standard',
      color: 'from-blue-500 to-cyan-500',
      icon: Trophy,
      qrCode: 'https://certificates.mumbaibeachcleanup.com/verify/bc-001-2024'
    },
    {
      id: 2,
      title: 'Ocean Guardian Certificate',
      description: 'Awarded for collecting 100kg+ of beach waste',
      type: 'impact',
      issueDate: '2024-05-20',
      validUntil: '2025-05-20',
      certificateNumber: 'MBC-2024-002',
      credentialId: 'og-002-2024',
      issuer: 'Mumbai Beach Cleanup Initiative',
      recipient: user?.name || 'User Name',
      recipientEmail: user?.email || 'user@example.com',
      achievement: 'Collected over 100kg of beach waste',
      skills: ['Environmental Impact', 'Waste Management', 'Sustainability'],
      verified: true,
      blockchain: true,
      downloadCount: 5,
      sharedCount: 2,
      template: 'premium',
      color: 'from-green-500 to-emerald-500',
      icon: Shield,
      qrCode: 'https://certificates.mumbaibeachcleanup.com/verify/og-002-2024'
    },
    {
      id: 3,
      title: 'Community Leadership Excellence',
      description: 'Awarded for outstanding leadership in organizing cleanup events',
      type: 'leadership',
      issueDate: '2024-04-10',
      validUntil: '2025-04-10',
      certificateNumber: 'MBC-2024-003',
      credentialId: 'cle-003-2024',
      issuer: 'Mumbai Beach Cleanup Initiative',
      recipient: user?.name || 'User Name',
      recipientEmail: user?.email || 'user@example.com',
      achievement: 'Demonstrated exceptional leadership in organizing 5+ community cleanup events',
      skills: ['Leadership', 'Event Management', 'Community Engagement'],
      verified: true,
      blockchain: true,
      downloadCount: 2,
      sharedCount: 3,
      template: 'premium',
      color: 'from-purple-500 to-pink-500',
      icon: Crown,
      qrCode: 'https://certificates.mumbaibeachcleanup.com/verify/cle-003-2024',
      locked: user?.role === 'user' // Only available for volunteers and above
    },
    {
      id: 4,
      title: 'Environmental Education Specialist',
      description: 'Completed advanced environmental education assessment',
      type: 'education',
      issueDate: '2024-06-01',
      validUntil: '2026-06-01',
      certificateNumber: 'MBC-2024-004',
      credentialId: 'ees-004-2024',
      issuer: 'Mumbai Beach Cleanup Initiative',
      recipient: user?.name || 'User Name',
      recipientEmail: user?.email || 'user@example.com',
      achievement: 'Passed advanced environmental education assessment with 95% score',
      skills: ['Environmental Science', 'Education', 'Marine Conservation'],
      verified: true,
      blockchain: true,
      downloadCount: 1,
      sharedCount: 0,
      template: 'academic',
      color: 'from-yellow-500 to-orange-500',
      icon: Award,
      qrCode: 'https://certificates.mumbaibeachcleanup.com/verify/ees-004-2024'
    }
  ]

  // Filter certificates based on user role
  const visibleCertificates = certificates.filter(cert => {
    if (cert.locked && user?.role === 'user') return false
    return true
  })

  // Apply search and filter
  const filteredCertificates = visibleCertificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || cert.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const certificateTypes = [
    { id: 'all', name: 'All Certificates', icon: Award },
    { id: 'participation', name: 'Participation', icon: Trophy },
    { id: 'impact', name: 'Environmental Impact', icon: Shield },
    { id: 'leadership', name: 'Leadership', icon: Crown },
    { id: 'education', name: 'Education', icon: Medal },
  ]

  const downloadCertificate = (certificate) => {
    console.log(`Downloading certificate: ${certificate.title}`)
    // In a real app, this would generate and download a PDF certificate
  }

  const shareCertificate = (certificate) => {
    console.log(`Sharing certificate: ${certificate.title}`)
    // In a real app, this would open share options
  }

  const verifyCertificate = (certificate) => {
    window.open(certificate.qrCode, '_blank')
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'participation': return Trophy
      case 'impact': return Shield
      case 'leadership': return Crown
      case 'education': return Award
      default: return Medal
    }
  }

  // Certificate Detail Modal
  const CertificateModal = ({ certificate, onClose }) => {
    if (!certificate) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Certificate Preview */}
          <div className="relative">
            {/* Certificate Design */}
            <div className={`bg-gradient-to-br ${certificate.color} p-8 text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/20"></div>
              </div>
              
              <div className="relative z-10 text-center">
                {/* Header */}
                <div className="mb-6">
                  <div className="text-sm opacity-90 mb-2">MUMBAI BEACH CLEANUP INITIATIVE</div>
                  <h1 className="text-4xl font-bold mb-2">CERTIFICATE OF ACHIEVEMENT</h1>
                  <div className="text-sm opacity-90">This certifies that</div>
                </div>
                
                {/* Recipient */}
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2 border-b-2 border-white/30 pb-2 inline-block px-8">
                    {certificate.recipient}
                  </div>
                </div>
                
                {/* Achievement */}
                <div className="mb-6">
                  <div className="text-lg mb-2">has successfully achieved</div>
                  <div className="text-2xl font-bold mb-2">{certificate.title}</div>
                  <div className="text-base opacity-90">{certificate.achievement}</div>
                </div>
                
                {/* Footer */}
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Issue Date</div>
                    <div className="font-semibold">{certificate.issueDate}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2`}>
                      <certificate.icon className="h-8 w-8" />
                    </div>
                    <div className="text-xs opacity-75">Verified</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm opacity-90">Certificate ID</div>
                    <div className="font-semibold text-xs">{certificate.certificateNumber}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certificate Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Certificate Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Certificate Number:</span>
                        <span className="font-medium">{certificate.certificateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credential ID:</span>
                        <span className="font-medium">{certificate.credentialId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">{certificate.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="font-medium">{certificate.validUntil}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Skills Demonstrated</h3>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Verification</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Blockchain Verified</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Digitally Signed</span>
                      </div>
                      <button
                        onClick={() => verifyCertificate(certificate)}
                        className="flex items-center space-x-2 text-ocean-600 hover:text-ocean-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Verify Online</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Statistics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Downloads:</span>
                        <span className="font-medium">{certificate.downloadCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shares:</span>
                        <span className="font-medium">{certificate.sharedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-center space-x-4 mt-6 pt-6 border-t">
                <button
                  onClick={() => downloadCertificate(certificate)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                
                <button
                  onClick={() => shareCertificate(certificate)}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </button>
                
                <button
                  onClick={() => verifyCertificate(certificate)}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Verify</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            🏆 My Certificates
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your earned certificates showcasing environmental achievements and community contributions
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card text-center">
            <Award className="h-8 w-8 text-ocean-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{filteredCertificates.length}</div>
            <div className="text-sm text-gray-600">Total Certificates</div>
          </div>
          
          <div className="card text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {filteredCertificates.filter(c => c.verified).length}
            </div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          
          <div className="card text-center">
            <Download className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {filteredCertificates.reduce((sum, c) => sum + c.downloadCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          
          <div className="card text-center">
            <Share2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {filteredCertificates.reduce((sum, c) => sum + c.sharedCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Shares</div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
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

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {certificateTypes.map(type => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setFilterType(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterType === type.id
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
          {filteredCertificates.map((certificate, index) => {
            const Icon = certificate.icon
            
            return (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCertificate(certificate)}
              >
                {/* Certificate Preview */}
                <div className={`h-32 bg-gradient-to-br ${certificate.color} rounded-lg mb-4 p-4 text-white relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-white"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border border-white"></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between h-full">
                    <div>
                      <div className="text-xs opacity-90 mb-1">CERTIFICATE</div>
                      <div className="font-bold text-sm">{certificate.title}</div>
                    </div>
                    <Icon className="h-8 w-8 opacity-80" />
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{certificate.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {certificate.description}
                    </p>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Issue Date:</span>
                      <span className="font-medium">{certificate.issueDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Valid Until:</span>
                      <span className="font-medium">{certificate.validUntil}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status:</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="text-xs text-gray-600 mb-2">Skills Demonstrated:</div>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{certificate.skills.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadCertificate(certificate)
                      }}
                      className="flex-1 btn-outline text-sm py-1"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        shareCertificate(certificate)
                      }}
                      className="flex-1 btn-outline text-sm py-1"
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No Certificates Message */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No certificates found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No certificates match your search "${searchTerm}"`
                : 'Complete assessments and participate in events to earn certificates'
              }
            </p>
          </motion.div>
        )}

        {/* Certificate Detail Modal */}
        {selectedCertificate && (
          <CertificateModal 
            certificate={selectedCertificate} 
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Certificates
