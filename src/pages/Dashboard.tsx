import {
  CalendarToday,
  Event,
  LocationOn,
  Nature,
  People,
  PlayArrow,
  TrendingUp,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import MapMockup from '../components/MapMockup';
import ResponsiveChart from '../components/ResponsiveChart';
import WeatherMockup from '../components/WeatherMockup';

// Mock data
const upcomingEvents = [
  {
    id: 1,
    title: 'Juhu Beach Cleanup',
    date: '2025-06-25',
    time: '6:00 AM',
    volunteers: 45,
    location: 'Juhu Beach, Mumbai',
  },
  {
    id: 2,
    title: 'Marine Drive Restoration',
    date: '2025-06-28',
    time: '5:30 AM',
    volunteers: 32,
    location: 'Marine Drive, Mumbai',
  },
  {
    id: 3,
    title: 'Versova Beach Initiative',
    date: '2025-07-02',
    time: '6:30 AM',
    volunteers: 28,
    location: 'Versova Beach, Mumbai',
  },
];

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  const chartData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 180 },
    { name: 'Apr', value: 220 },
    { name: 'May', value: 280 },
    { name: 'Jun', value: 320 },
  ];

  const wasteTypeData = [
    { name: 'Plastic Bottles', value: 35 },
    { name: 'Food Packaging', value: 25 },
    { name: 'Cigarette Butts', value: 20 },
    { name: 'Metal Cans', value: 12 },
    { name: 'Other', value: 8 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Welcome to CleanWave Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Making Mumbai's beaches cleaner, one wave at a time
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Impact Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          <motion.div variants={itemVariants}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      2,450
                    </Typography>
                    <Typography variant="body2">
                      Total Waste Collected (kg)
                    </Typography>
                  </Box>
                  <Nature sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      156
                    </Typography>
                    <Typography variant="body2">
                      Active Volunteers
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      23
                    </Typography>
                    <Typography variant="body2">
                      Events This Month
                    </Typography>
                  </Box>
                  <Event sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      87%
                    </Typography>
                    <Typography variant="body2">
                      Goal Progress
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upcoming Beach Cleanup Events
                </Typography>
                <Button variant="contained" startIcon={<Event />}>
                  Create Event
                </Button>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {upcomingEvents.map((event) => (
                  <Card key={event.id} sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 119, 190, 0.15)',
                    }
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.date} at {event.time}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'secondary.main' }}>
                            {event.volunteers}
                          </Avatar>
                          <Typography variant="body2">
                            {event.volunteers} volunteers
                          </Typography>
                        </Box>
                        <Button size="small" variant="outlined" startIcon={<PlayArrow />}>
                          Join
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    height: 60
                  }}
                >
                  Report Beach Issue
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    height: 60
                  }}
                >
                  Start Voice Assistant
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    height: 60
                  }}
                >
                  Upload Cleanup Photo
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    height: 60
                  }}
                >
                  View Leaderboard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Features Showcase */}
        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                AI-Powered Features
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>Smart Waste Detection</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Upload photos to automatically identify and categorize different types of waste using AI
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                    Try AI Detection
                  </Button>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>Predictive Analytics</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    ML-powered insights predict optimal cleanup times and volunteer recommendations
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                    View Predictions
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather and Map Section */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          mb: 3
        }}>
          <WeatherMockup compact={isMobile} />
          <MapMockup height={isMobile ? 250 : 300} />
        </Box>


        {/* Charts Section */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mb: 3
        }}>
          <ResponsiveChart
            data={chartData}
            type="area"
            title="Monthly Cleanup Progress"
            height={isMobile ? 250 : 300}
          />
          <ResponsiveChart
            data={wasteTypeData}
            type="pie"
            title="Waste Types Collected"
            height={isMobile ? 250 : 300}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
