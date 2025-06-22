import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  Star, 
  Target,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Medal,
  Zap,
  ChevronRight,
  ChevronLeft,
  Flag,
  Timer,
  BarChart3
} from 'lucide-react'

const Assessments = () => {
  const { user, permissions } = useAuth()
  const [activeAssessment, setActiveAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  // Mock assessment data
  const assessments = [
    {
      id: 1,
      title: 'Beach Cleanup Basics',
      description: 'Test your knowledge of fundamental beach cleanup principles and safety protocols.',
      difficulty: 'Beginner',
      duration: 10, // minutes
      questions: 15,
      points: 100,
      category: 'fundamentals',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      completed: true,
      score: 85,
      completedDate: '2024-06-15',
      certificate: true,
      questions_data: [
        {
          id: 1,
          question: 'What is the most important safety equipment for beach cleanup?',
          options: [
            'Gloves and sturdy shoes',
            'Sunglasses and hat',
            'Water bottle',
            'Trash bags'
          ],
          correct: 0,
          explanation: 'Gloves and sturdy shoes protect you from sharp objects and injuries during cleanup.'
        },
        {
          id: 2,
          question: 'Which type of waste is most commonly found on Mumbai beaches?',
          options: [
            'Glass bottles',
            'Plastic items',
            'Metal cans',
            'Paper waste'
          ],
          correct: 1,
          explanation: 'Plastic items including bottles, bags, and food containers are the most common beach waste.'
        },
        {
          id: 3,
          question: 'What should you do if you find medical waste on the beach?',
          options: [
            'Pick it up immediately',  
            'Leave it and mark the area',
            'Notify event organizers',
            'Take a photo and move on'
          ],
          correct: 2,
          explanation: 'Medical waste should never be handled by volunteers. Always notify event organizers immediately.'
        }
        // More questions would be added here
      ]
    },
    {
      id: 2,
      title: 'Marine Ecosystem Protection',
      description: 'Learn about marine life protection and how pollution affects ocean ecosystems.',
      difficulty: 'Intermediate',
      duration: 15,
      questions: 20,
      points: 200,
      category: 'environmental',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      completed: false,
      score: null,
      completedDate: null,
      certificate: true,
      questions_data: [
        {
          id: 1,
          question: 'How long does it take for a plastic bottle to decompose in the ocean?',
          options: [
            '10-20 years',
            '50-100 years',
            '200-450 years',
            '1000+ years'
          ],
          correct: 2,
          explanation: 'Plastic bottles can take 200-450 years to decompose, causing long-term environmental damage.'
        },
        {
          id: 2,
          question: 'Which marine animals are most affected by plastic pollution?',
          options: [
            'Fish only',
            'Sea turtles and seabirds',
            'Dolphins and whales',
            'All marine life'
          ],
          correct: 3,
          explanation: 'All marine life is affected by plastic pollution through ingestion, entanglement, and habitat destruction.'
        }
        // More questions would be added here
      ]
    },
    {
      id: 3,
      title: 'Waste Segregation & Recycling',
      description: 'Master the art of proper waste segregation and understand recycling processes.',
      difficulty: 'Intermediate',
      duration: 12,
      questions: 18,
      points: 150,
      category: 'practical',
      icon: RotateCcw,
      color: 'from-purple-500 to-pink-500',
      completed: false,
      score: null,
      completedDate: null,
      certificate: true,
      questions_data: [
        {
          id: 1,
          question: 'Which items should go in the plastic recycling bin?',
          options: [
            'All plastic items',
            'Only plastic bottles',
            'Clean plastic containers with recycling symbols',
            'Any plastic waste'
          ],
          correct: 2,
          explanation: 'Only clean plastic containers with proper recycling symbols should go in recycling bins.'
        }
        // More questions would be added here
      ]
    },
    {
      id: 4,
      title: 'Advanced Cleanup Techniques',
      description: 'Learn advanced techniques for organizing large-scale cleanup events.',
      difficulty: 'Advanced',
      duration: 20,
      questions: 25,
      points: 300,
      category: 'leadership',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      completed: false,
      score: null,
      completedDate: null,
      certificate: true,
      locked: !permissions?.canCreateEvents,
      questions_data: [
        {
          id: 1,
          question: 'What is the optimal team size for a beach cleanup section?',
          options: [
            '3-5 people',
            '6-10 people',
            '11-15 people',
            '16-20 people'
          ],
          correct: 1,
          explanation: '6-10 people per section allows for effective coordination while maintaining manageable group dynamics.'
        }
        // More questions would be added here
      ]
    }
  ]

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      handleSubmitAssessment()
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const startAssessment = (assessment) => {
    setActiveAssessment(assessment)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeLeft(assessment.duration * 60) // Convert minutes to seconds
    setIsActive(true)
    setShowResults(false)
    setAssessmentResults(null)
  }

  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < activeAssessment.questions_data.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitAssessment = () => {
    setIsActive(false)
    
    // Calculate score
    const totalQuestions = activeAssessment.questions_data.length
    let correctAnswers = 0
    
    activeAssessment.questions_data.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++
      }
    })
    
    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= 70
    
    const results = {
      score,
      correctAnswers,
      totalQuestions,
      passed,
      points: passed ? activeAssessment.points : Math.floor(activeAssessment.points * 0.5),
      timeSpent: (activeAssessment.duration * 60) - timeLeft,
      certificate: passed && activeAssessment.certificate
    }
    
    setAssessmentResults(results)
    setShowResults(true)
  }

  const resetAssessment = () => {
    setActiveAssessment(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeLeft(0)
    setIsActive(false)
    setShowResults(false)
    setAssessmentResults(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Assessment Results View
  if (showResults && assessmentResults) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <div className="mb-6">
              {assessmentResults.passed ? (
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Medal className="h-12 w-12 text-white" />
                </div>
              )}
              
              <h2 className="text-3xl font-bold gradient-text mb-2">
                {assessmentResults.passed ? 'Congratulations!' : 'Good Effort!'}
              </h2>
              <p className="text-gray-600">
                {assessmentResults.passed ? 'You passed the assessment!' : 'Keep learning and try again!'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{assessmentResults.score}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {assessmentResults.correctAnswers}/{assessmentResults.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{assessmentResults.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {formatTime(assessmentResults.timeSpent)}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAssessment}
                className="btn-outline flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Assessments</span>
              </button>
              
              {assessmentResults.certificate && (
                <button className="btn-primary flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Download Certificate</span>
                </button>
              )}
              
              {!assessmentResults.passed && (
                <button
                  onClick={() => startAssessment(activeAssessment)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Assessment Taking View
  if (activeAssessment && !showResults) {
    const currentQ = activeAssessment.questions_data[currentQuestion]
    const progress = ((currentQuestion + 1) / activeAssessment.questions_data.length) * 100

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-ocean-50 to-green-50">
        <div className="max-w-4xl mx-auto">
          
          {/* Assessment Header */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{activeAssessment.title}</h2>
                <p className="text-gray-600">
                  Question {currentQuestion + 1} of {activeAssessment.questions_data.length}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-orange-600">
                  <Timer className="h-5 w-5" />
                  <span className="font-bold">{formatTime(timeLeft)}</span>
                </div>
                
                <button
                  onClick={resetAssessment}
                  className="text-gray-600 hover:text-red-600"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-ocean-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {currentQ.question}
              </h3>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(currentQ.id, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedAnswers[currentQ.id] === index
                        ? 'border-ocean-500 bg-ocean-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQ.id] === index
                          ? 'border-ocean-500 bg-ocean-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQ.id] === index && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="btn-outline flex items-center space-x-2 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              {currentQuestion === activeAssessment.questions_data.length - 1 ? (
                <button
                  onClick={handleSubmitAssessment}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Flag className="h-4 w-4" />
                  <span>Submit Assessment</span>
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Main Assessments List View
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
            🧠 Knowledge Assessments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Test your knowledge, earn points, and unlock certificates through our gamified learning system
          </p>
        </motion.div>

        {/* User Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card text-center">
            <Brain className="h-8 w-8 text-ocean-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {assessments.filter(a => a.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          
          <div className="card text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {assessments.filter(a => a.completed).reduce((sum, a) => sum + (a.points || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          
          <div className="card text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {assessments.filter(a => a.completed && a.certificate && a.score >= 70).length}
            </div>
            <div className="text-sm text-gray-600">Certificates</div>
          </div>
          
          <div className="card text-center">
            <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {assessments.filter(a => a.completed).length > 0 
                ? Math.round(assessments.filter(a => a.completed).reduce((sum, a) => sum + a.score, 0) / assessments.filter(a => a.completed).length)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </div>
        </motion.div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => {
            const Icon = assessment.icon
            
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card hover:shadow-lg transition-shadow ${
                  assessment.locked ? 'opacity-60' : ''
                }`}
              >
                {/* Assessment Header */}
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${assessment.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{assessment.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                      {assessment.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {assessment.description}
                  </p>
                </div>

                {/* Assessment Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{assessment.questions}</div>
                    <div className="text-xs text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{assessment.duration}m</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{assessment.points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                </div>

                {/* Completion Status */}
                {assessment.completed && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Completed</span>
                      </div>
                      <div className="text-sm font-bold text-green-800">{assessment.score}%</div>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Completed on {assessment.completedDate}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => startAssessment(assessment)}
                  disabled={assessment.locked}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                    assessment.locked
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : assessment.completed
                      ? 'bg-ocean-100 text-ocean-700 hover:bg-ocean-200'
                      : 'bg-ocean-500 text-white hover:bg-ocean-600'
                  }`}
                >
                  <Play className="h-4 w-4" />
                  <span>
                    {assessment.locked 
                      ? 'Locked' 
                      : assessment.completed 
                      ? 'Retake Assessment' 
                      : 'Start Assessment'
                    }
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Assessments
