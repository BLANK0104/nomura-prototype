import {
  Assessment,
  Compare,
  Download,
  Map,
  PhotoCamera,
  TrendingUp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import MapMockup from '../components/MapMockup';
import ResponsiveChart from '../components/ResponsiveChart';
import WeatherMockup from '../components/WeatherMockup';

const Analytics: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');

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

  const impactData = [
    { name: 'Jan', value: 1200, volunteers: 45 },
    { name: 'Feb', value: 1800, volunteers: 62 },
    { name: 'Mar', value: 2400, volunteers: 78 },
    { name: 'Apr', value: 3200, volunteers: 95 },
    { name: 'May', value: 4100, volunteers: 120 },
    { name: 'Jun', value: 5200, volunteers: 148 },
  ];

  const locationData = [
    { name: 'Juhu Beach', value: 2800 },
    { name: 'Versova Beach', value: 2200 },
    { name: 'Marine Drive', value: 1800 },
    { name: 'Worli Seaface', value: 1200 },
    { name: 'Bandra Bandstand', value: 900 },
  ];
  const beachMarkers = [
    { lat: 19.0176, lng: 72.8562, title: 'Juhu Beach - 2.8kg cleaned', type: 'completed' as const },
    { lat: 19.1076, lng: 72.8262, title: 'Versova Beach - 2.2kg cleaned', type: 'completed' as const },
    { lat: 18.9067, lng: 72.8147, title: 'Marine Drive - 1.8kg cleaned', type: 'completed' as const },
    { lat: 19.0728, lng: 72.8326, title: 'Worli Seaface - 1.2kg cleaned', type: 'completed' as const },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Comprehensive insights into cleanup impact and progress
        </Typography>
      </Box>

      {/* Key Metrics */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Overall Impact Metrics
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  2,450kg
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Waste Collected
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  156
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Active Volunteers
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  23
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Events This Month
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  12.5km
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Beach Areas Cleaned
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Waste Collection Analytics */}
        <motion.div variants={itemVariants}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Assessment sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Waste Collection Analytics
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Waste Distribution
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Plastic (45%)</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>1,102kg</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                      <Box sx={{ width: '45%', height: '100%', backgroundColor: '#ff6b6b', borderRadius: 4 }} />
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Metal (25%)</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>612kg</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                      <Box sx={{ width: '25%', height: '100%', backgroundColor: '#4ecdc4', borderRadius: 4 }} />
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Glass (15%)</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>367kg</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                      <Box sx={{ width: '15%', height: '100%', backgroundColor: '#45b7d1', borderRadius: 4 }} />
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Others (15%)</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>369kg</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                      <Box sx={{ width: '15%', height: '100%', backgroundColor: '#96ceb4', borderRadius: 4 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Button variant="outlined" startIcon={<Download />} fullWidth>
                Download Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div variants={itemVariants}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Environmental Impact
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.dark' }}>
                    125.8
                  </Typography>
                  <Typography variant="body2" color="success.dark">
                    Tons CO₂ Emissions Prevented
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'primary.light', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                    42.3
                  </Typography>
                  <Typography variant="body2" color="primary.dark">
                    Trees Worth of Impact
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'secondary.light', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.dark' }}>
                    1,890
                  </Typography>
                  <Typography variant="body2" color="secondary.dark">
                    Marine Lives Protected
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Beach Location Analytics */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Map sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Beach Location Progress
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<Map />}>
                View Full Map
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Juhu Beach
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Most active cleanup location
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Progress</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>78%</Typography>
                </Box>
                <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                  <Box sx={{ width: '78%', height: '100%', backgroundColor: 'primary.main', borderRadius: 4 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  890kg collected • 15 events
                </Typography>
              </Card>

              <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Marine Drive
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Strategic cleanup zone
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Progress</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>65%</Typography>
                </Box>
                <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                  <Box sx={{ width: '65%', height: '100%', backgroundColor: 'secondary.main', borderRadius: 4 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  720kg collected • 12 events
                </Typography>
              </Card>

              <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Versova Beach
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Restoration focus area
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Progress</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>52%</Typography>
                </Box>
                <Box sx={{ width: '100%', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
                  <Box sx={{ width: '52%', height: '100%', backgroundColor: 'warning.main', borderRadius: 4 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  840kg collected • 18 events
                </Typography>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Before/After Comparison */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Compare sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Before & After Gallery
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<PhotoCamera />}>
                Upload Photos
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Card sx={{ overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: 'error.light' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.dark' }}>
                    Before Cleanup
                  </Typography>
                </Box>
                <Box sx={{
                  height: 200,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Beach covered with plastic waste and debris
                  </Typography>
                </Box>
              </Card>

              <Card sx={{ overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: 'success.light' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark' }}>
                    After Cleanup
                  </Typography>
                </Box>
                <Box sx={{
                  height: 200,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Clean, pristine beach ready for families
                  </Typography>
                </Box>
              </Card>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                AI automatically analyzes before/after photos to quantify cleanup impact
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="95% Waste Reduction" color="success" />
                <Chip label="12 Species Protected" color="primary" />
                <Chip label="500m² Area Restored" color="secondary" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Analytics with Charts and Maps */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Comprehensive Impact Analysis
        </Typography>

        {/* Impact Charts Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mb: 3
        }}>
          <ResponsiveChart
            data={impactData}
            type="line"
            title="Waste Collection Over Time"
            height={isMobile ? 250 : 350}
            dataKey="value"
          />
          <ResponsiveChart
            data={locationData}
            type="bar"
            title="Collection by Location"
            height={isMobile ? 250 : 350}
          />
        </Box>

        {/* Location Analytics with Map */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mb: 3
        }}>
          <MapMockup
            height={isMobile ? 300 : 400}
            markers={beachMarkers}
            showControls={!isMobile}
          />
          <Box>
            <Typography variant="h6" gutterBottom>
              Location Performance
            </Typography>
            {locationData.map((location, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {location.value}kg
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(location.value / Math.max(...locationData.map(l => l.value))) * 100}
                  sx={{ borderRadius: 1 }}
                />
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Weather Impact Analysis */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 3
        }}>
          <WeatherMockup compact={false} />
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weather Impact Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Optimal cleanup conditions: Sunny weather with low wind speeds result in 40% higher volunteer participation and 25% more efficient waste collection.
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              mt: 2
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="success.main">85%</Typography>
                <Typography variant="body2">Sunny Days Success</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="warning.main">65%</Typography>
                <Typography variant="body2">Cloudy Days Success</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error.main">30%</Typography>
                <Typography variant="body2">Rainy Days Success</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Analytics;
