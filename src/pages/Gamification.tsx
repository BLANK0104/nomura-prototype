import {
  CameraAlt,
  EmojiEvents,
  Leaderboard,
  Mic,
  PhotoCamera,
  Upload
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'P',
    points: 2450,
    level: 'Environmental Hero',
    wasteCollected: '340kg',
    eventsJoined: 28,
    badges: ['Beach Champion', 'AI Pioneer', 'Community Leader'],
    streak: 15,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    avatar: 'R',
    points: 2120,
    level: 'Waste Warrior',
    wasteCollected: '280kg',
    eventsJoined: 22,
    badges: ['Tech Innovator', 'Mentor', 'Consistency King'],
    streak: 12,
  },
  {
    id: 3,
    name: 'Anita Desai',
    avatar: 'A',
    points: 1980,
    level: 'Ocean Guardian',
    wasteCollected: '260kg',
    eventsJoined: 25,
    badges: ['Volunteer Trainer', 'Impact Creator', 'Sustainability Star'],
    streak: 18,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    avatar: 'V',
    points: 1750,
    level: 'Beach Protector',
    wasteCollected: '220kg',
    eventsJoined: 19,
    badges: ['Weekend Warrior', 'Photo Expert', 'Team Player'],
    streak: 8,
  },
  {
    id: 5,
    name: 'Meera Patel',
    avatar: 'M',
    points: 1650,
    level: 'Eco Enthusiast',
    wasteCollected: '195kg',
    eventsJoined: 17,
    badges: ['Rising Star', 'Dedicated Cleaner', 'Green Thumb'],
    streak: 6,
  },
];

const achievements = [
  {
    id: 1,
    title: 'First Cleanup',
    description: 'Complete your first beach cleanup',
    icon: 'WAVE',
    earned: true,
    points: 100,
  },
  {
    id: 2,
    title: 'Waste Detective',
    description: 'Use AI to identify 50 waste items',
    icon: 'SEARCH',
    earned: true,
    points: 200,
  },
  {
    id: 3,
    title: 'Team Leader',
    description: 'Lead a cleanup team of 10+ volunteers',
    icon: 'Group',
    earned: false,
    points: 300,
  },
  {
    id: 4,
    title: 'Consistency Champion',
    description: 'Attend cleanups for 30 days straight',
    icon: 'Fire',
    earned: false,
    points: 500,
  },
];

const Gamification: React.FC = () => {
  const [openAIDialog, setOpenAIDialog] = useState(false);
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiDetectionResult, setAiDetectionResult] = useState<any>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI detection
        setTimeout(() => {
          setAiDetectionResult({
            wasteTypes: [
              { type: 'Plastic Bottle', confidence: 95, points: 10 },
              { type: 'Cigarette Butt', confidence: 88, points: 5 },
              { type: 'Food Wrapper', confidence: 92, points: 8 },
            ],
            totalPoints: 23,
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceCommand = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsVoiceActive(false);
        // Show voice command result
      }, 3000);
    }
  };

  const currentUser = leaderboardData[3]; // Assuming current user is Vikram Singh

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Gamification & AI Tools
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Level up your cleanup game with AI-powered tools and rewards!
        </Typography>
      </Box>

      {/* User Progress Card */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 60, height: 60, mr: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', fontSize: 24 }}>
                {currentUser.avatar}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {currentUser.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  {currentUser.level} • {currentUser.points} points
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentUser.badges.slice(0, 2).map((badge, index) => (
                    <Chip
                      key={index}
                      label={badge}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  #{leaderboardData.findIndex(user => user.id === currentUser.id) + 1}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Global Rank
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {currentUser.wasteCollected}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Waste Collected
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {currentUser.eventsJoined}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Events Joined
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {currentUser.streak}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Day Streak
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Tools Section */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              AI-Powered Cleanup Tools
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CameraAlt sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Smart Waste Detection
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Upload photos to automatically identify and categorize waste types using AI
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PhotoCamera />}
                  onClick={() => setOpenAIDialog(true)}
                  fullWidth
                >
                  Try AI Detection
                </Button>
              </Card>

              <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Mic sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Voice Assistant
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Use voice commands for hands-free waste sorting and activity tracking
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Mic />}
                  onClick={() => setOpenVoiceDialog(true)}
                  fullWidth
                  color="secondary"
                >
                  Start Voice Assistant
                </Button>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Leaderboard */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Leaderboard sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Global Leaderboard
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {leaderboardData.map((user, index) => (
                  <Box
                    key={user.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: user.id === currentUser.id ? 'primary.light' : 'background.default',
                      borderRadius: 2,
                      border: user.id === currentUser.id ? '2px solid' : '1px solid',
                      borderColor: user.id === currentUser.id ? 'primary.main' : 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mr: 2, width: 30 }}>
                        {index + 1}
                      </Typography>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {user.avatar}
                      </Avatar>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.level} • {user.wasteCollected} collected
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {user.points}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        points
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmojiEvents sx={{ mr: 2, color: 'warning.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Achievements
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {achievements.map((achievement) => (
                  <Box
                    key={achievement.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: achievement.earned ? 'success.light' : 'grey.100',
                      borderRadius: 2,
                      opacity: achievement.earned ? 1 : 0.6,
                    }}
                  >
                    <Typography variant="h4" sx={{ mr: 2 }}>
                      {achievement.icon}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.description}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {achievement.points}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        points
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* AI Detection Dialog */}
      <Dialog open={openAIDialog} onClose={() => setOpenAIDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>AI Waste Detection</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            {!uploadedImage ? (
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<Upload />}
                    sx={{ mb: 2 }}
                  >
                    Upload Image
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary">
                  Upload a photo of waste to identify types and earn points
                </Typography>
              </Box>
            ) : (
              <Box>
                <img
                  src={uploadedImage}
                  alt="Uploaded waste"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                />
                {aiDetectionResult ? (
                  <Box sx={{ mt: 3, textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Detection Results:
                    </Typography>
                    {aiDetectionResult.wasteTypes.map((waste: any, index: number) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">
                          {waste.type} ({waste.confidence}% confidence)
                        </Typography>
                        <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600 }}>
                          +{waste.points} points
                        </Typography>
                      </Box>
                    ))}
                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Total Points Earned: {aiDetectionResult.totalPoints}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      AI is analyzing your image...
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAIDialog(false);
            setUploadedImage(null);
            setAiDetectionResult(null);
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Voice Assistant Dialog */}
      <Dialog open={openVoiceDialog} onClose={() => setOpenVoiceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Voice Assistant</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <IconButton
              onClick={handleVoiceCommand}
              sx={{
                width: 120,
                height: 120,
                backgroundColor: isVoiceActive ? 'error.main' : 'primary.main',
                color: 'white',
                mb: 2,
                '&:hover': {
                  backgroundColor: isVoiceActive ? 'error.dark' : 'primary.dark',
                }
              }}
            >
              <Mic sx={{ fontSize: 48 }} />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {isVoiceActive ? 'Listening...' : 'Tap to start voice command'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try saying: "Record 5 plastic bottles" or "Start cleanup session"
            </Typography>
            {isVoiceActive && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenVoiceDialog(false);
            setIsVoiceActive(false);
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Gamification;
