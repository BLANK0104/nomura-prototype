import {
  Edit,
  EmojiEvents,
  Favorite,
  FitnessCenter,
  LocationOn,
  Psychology,
  School,
  TrendingUp
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  LinearProgress,
  Rating,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const VolunteerProfile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [moodRating, setMoodRating] = useState(4);
  const [fitnessLevel, setFitnessLevel] = useState(7);

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

  const userProfile = {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 2024',
    avatar: 'V',
    level: 'Beach Protector',
    points: 1750,
    badges: ['Weekend Warrior', 'Photo Expert', 'Team Player'],
    skills: ['Photography', 'Team Leadership', 'Data Collection', 'Environmental Education'],
    interests: ['Beach Cleanup', 'Marine Conservation', 'Photography', 'Community Building'],
    availability: {
      weekends: true,
      weekdays: false,
      mornings: true,
      evenings: false,
    },
    personalBest: {
      singleEventWaste: '45kg',
      longestStreak: '12 days',
      eventsOrganized: 3,
      volunteersRecruited: 8,
    },
    impactStats: {
      wasteCollected: '220kg',
      eventsJoined: 19,
      co2Reduced: '11.2kg',
      treesEquivalent: '3.8',
    }
  };

  const recommendations = [
    {
      id: 1,
      title: 'Juhu Beach Morning Cleanup',
      date: '2025-06-25',
      reason: 'Perfect match for your morning availability and photography skills',
      confidence: 95,
    },
    {
      id: 2,
      title: 'Marine Drive Photo Documentation',
      date: '2025-06-28',
      reason: 'Seeking volunteers with photography expertise',
      confidence: 88,
    },
    {
      id: 3,
      title: 'Versova Community Workshop',
      date: '2025-07-02',
      reason: 'Leadership opportunity based on your team skills',
      confidence: 82,
    },
  ];

  const ecoEducationModules = [
    {
      id: 1,
      title: 'Marine Ecosystem Basics',
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: 'Plastic Pollution Impact',
      progress: 75,
      completed: false,
    },
    {
      id: 3,
      title: 'Waste Sorting Techniques',
      progress: 40,
      completed: false,
    },
    {
      id: 4,
      title: 'Community Engagement',
      progress: 0,
      completed: false,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Volunteer Profile
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Personalized experience with AI-powered recommendations
        </Typography>
      </Box>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', fontSize: 32 }}>
                {userProfile.avatar}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {userProfile.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(!editMode)}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      color: 'white',
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                  >
                    {editMode ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  {userProfile.level} • {userProfile.points} points
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocationOn sx={{ fontSize: 18 }} />
                  <Typography variant="body2">
                    {userProfile.location} • Member since {userProfile.joinDate}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {userProfile.badges.map((badge, index) => (
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
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {userProfile.impactStats.wasteCollected}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Waste Collected
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {userProfile.impactStats.eventsJoined}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Events Joined
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {userProfile.impactStats.co2Reduced}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  CO₂ Reduced
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {userProfile.impactStats.treesEquivalent}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Trees Equivalent
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Personal Details & Preferences */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Personal Details & Preferences
              </Typography>

              {editMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={userProfile.email}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    defaultValue={userProfile.location}
                    variant="outlined"
                  />

                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Availability
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel
                        control={<Switch defaultChecked={userProfile.availability.weekends} />}
                        label="Available on weekends"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked={userProfile.availability.weekdays} />}
                        label="Available on weekdays"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked={userProfile.availability.mornings} />}
                        label="Prefer morning events"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked={userProfile.availability.evenings} />}
                        label="Prefer evening events"
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      Skills & Expertise
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {userProfile.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      Interests
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {userProfile.interests.map((interest, index) => (
                        <Chip
                          key={index}
                          label={interest}
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Personal Best Records
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                      <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {userProfile.personalBest.singleEventWaste}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Single Event Collection
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {userProfile.personalBest.longestStreak}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Longest Streak
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {userProfile.personalBest.eventsOrganized}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Events Organized
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {userProfile.personalBest.volunteersRecruited}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Volunteers Recruited
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Wellness Tracking */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Favorite sx={{ mr: 2, color: 'error.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Wellness Tracking
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Today's Mood
                  </Typography>
                </Box>
                <Rating
                  value={moodRating}
                  onChange={(_, value) => setMoodRating(value || 0)}
                  size="large"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  How are you feeling today?
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FitnessCenter sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Fitness Level
                  </Typography>
                </Box>
                <Slider
                  value={fitnessLevel}
                  onChange={(_, value) => setFitnessLevel(value as number)}
                  min={1}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                  color="success"
                />
                <Typography variant="body2" color="text.secondary">
                  Rate your current fitness level (1-10)
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Wellness Goals
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Monthly Steps</Typography>
                      <Typography variant="body2">85%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={85} color="success" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Outdoor Activities</Typography>
                      <Typography variant="body2">92%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={92} color="primary" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* AI Recommendations */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI-Powered Recommendations
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recommendations.map((rec) => (
                <Card key={rec.id} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          {rec.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {rec.date}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {rec.reason}
                        </Typography>
                        <Chip
                          label={`${rec.confidence}% match`}
                          color={rec.confidence > 90 ? 'success' : rec.confidence > 80 ? 'primary' : 'default'}
                          size="small"
                        />
                      </Box>
                      <Button variant="outlined" sx={{ ml: 2 }}>
                        Join Event
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Eco-Education Progress */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ mr: 2, color: 'secondary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Eco-Education Progress
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {ecoEducationModules.map((module) => (
                <Box key={module.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {module.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {module.progress}%
                      </Typography>
                      {module.completed && (
                        <EmojiEvents sx={{ color: 'warning.main', fontSize: 20 }} />
                      )}
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={module.progress}
                    color={module.completed ? 'success' : 'primary'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  {!module.completed && module.progress > 0 && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    >
                      Continue Learning
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VolunteerProfile;
