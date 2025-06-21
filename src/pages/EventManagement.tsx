import {
  Add,
  CloudQueue,
  Edit,
  LocationOn,
  People,
  Psychology,
  Schedule,
  TrendingUp
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import MapMockup from '../components/MapMockup';
import WeatherMockup from '../components/WeatherMockup';

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: 'Juhu Beach Mega Cleanup',
    date: '2025-06-25',
    time: '06:00',
    location: 'Juhu Beach, Mumbai',
    description: 'Join us for the biggest beach cleanup of the year! We aim to collect 500kg of waste.',
    volunteers: 45,
    maxVolunteers: 60,
    organizer: 'Priya Sharma',
    weather: 'Sunny, 28°C',
    predictedTurnout: 52,
    wasteEstimate: '480kg',
    difficulty: 'Medium',
    equipment: ['Gloves', 'Bags', 'Grabbers', 'Weighing Scale'],
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Marine Drive Dawn Clean',
    date: '2025-06-28',
    time: '05:30',
    location: 'Marine Drive, Mumbai',
    description: 'Early morning cleanup to catch the sunrise while making a difference.',
    volunteers: 32,
    maxVolunteers: 40,
    organizer: 'Rajesh Kumar',
    weather: 'Partly Cloudy, 26°C',
    predictedTurnout: 38,
    wasteEstimate: '320kg',
    difficulty: 'Easy',
    equipment: ['Gloves', 'Bags', 'First Aid Kit'],
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Versova Restoration Project',
    date: '2025-07-02',
    time: '06:30',
    location: 'Versova Beach, Mumbai',
    description: 'Continuing our restoration efforts at Versova - bringing back the natural beauty.',
    volunteers: 28,
    maxVolunteers: 50,
    organizer: 'Anita Desai',
    weather: 'Cloudy, 27°C',
    predictedTurnout: 45,
    wasteEstimate: '600kg',
    difficulty: 'Hard',
    equipment: ['Heavy Duty Gloves', 'Bags', 'Shovels', 'Water'],
    status: 'upcoming',
  },
];

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleJoinEvent = (eventId: number) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, volunteers: event.volunteers + 1 }
        : event
    ));
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
              Event Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Plan, organize, and optimize beach cleanup events with AI insights
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateEvent}
            sx={{ height: 'fit-content' }}
          >
            Create Event
          </Button>
        </Box>

        {/* AI Insights Panel */}
        <motion.div variants={itemVariants}>
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                AI Event Optimization Insights
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CloudQueue sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Weather Forecast</Typography>
                  </Box>
                  <Typography variant="body2">
                    Optimal cleanup conditions this weekend. 85% chance of sunny weather.
                  </Typography>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Psychology sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Turnout Prediction</Typography>
                  </Box>
                  <Typography variant="body2">
                    ML model predicts 15% higher attendance for morning events this month.
                  </Typography>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUp sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Impact Forecast</Typography>
                  </Box>
                  <Typography variant="body2">
                    Expected to collect 1,400kg waste across all upcoming events.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Events List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {events.map((event) => (
          <motion.div key={event.id} variants={itemVariants}>
            <Card sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 119, 190, 0.15)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {event.title}
                      </Typography>
                      <Chip
                        label={event.difficulty}
                        color={getDifficultyColor(event.difficulty) as any}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {event.description}
                    </Typography>

                    {/* Event Details Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Schedule sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {event.date} at {event.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {event.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <People sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {event.volunteers}/{event.maxVolunteers} volunteers
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CloudQueue sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {event.weather}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Psychology sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Predicted turnout: {event.predictedTurnout}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TrendingUp sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Estimated waste: {event.wasteEstimate}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Equipment List */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Equipment Provided:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {event.equipment.map((item, index) => (
                          <Chip
                            key={index}
                            label={item}
                            size="small"
                            variant="outlined"
                            sx={{ backgroundColor: 'background.default' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Organizer */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 32, height: 32 }}>
                        {event.organizer.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Organized by
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {event.organizer}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={event.volunteers >= event.maxVolunteers}
                      sx={{ minWidth: 120 }}
                    >
                      {event.volunteers >= event.maxVolunteers ? 'Full' : 'Join Event'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      sx={{ minWidth: 120 }}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>

                {/* Progress Bar */}
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Registration Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round((event.volunteers / event.maxVolunteers) * 100)}%
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: '100%',
                    height: 8,
                    backgroundColor: 'grey.200',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{
                      width: `${(event.volunteers / event.maxVolunteers) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                      transition: 'width 0.3s ease'
                    }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Create/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Event Title"
              variant="outlined"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="time"
                label="Time"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              variant="outlined"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                type="number"
                label="Max Volunteers"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select label="Difficulty">
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedEvent ? 'Update Event' : 'Create Event'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Weather and Location Planning */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        <WeatherMockup
          compact={isSmallScreen}
          data={{
            location: 'Event Location',
            temperature: 28,
            condition: 'sunny',
            humidity: 65,
            windSpeed: 8,
            visibility: 12,
            pressure: 1015,
          }}
        />
        <MapMockup
          height={isSmallScreen ? 250 : 300}
          markers={[
            { lat: 19.0176, lng: 72.8562, title: 'Next Event - Juhu Beach', type: 'planned' },
            { lat: 19.1076, lng: 72.8262, title: 'Ongoing - Versova Beach', type: 'cleanup' },
          ]}
        />
      </Box>
    </motion.div>
  );
};

export default EventManagement;
