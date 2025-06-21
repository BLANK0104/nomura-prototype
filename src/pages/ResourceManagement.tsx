import {
  Add,
  Business,
  CheckCircle,
  Email,
  Handshake,
  Inventory,
  Pending,
  People,
  QrCode,
  Storefront,
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Mock data
const equipment = [
  {
    id: 'EQ001',
    name: 'Heavy Duty Gloves',
    quantity: 45,
    available: 38,
    location: 'Mumbai Central Warehouse',
    qrCode: 'QR_EQ001',
    lastChecked: '2025-06-20',
  },
  {
    id: 'EQ002',
    name: 'Waste Collection Bags',
    quantity: 200,
    available: 156,
    location: 'Juhu Storage',
    qrCode: 'QR_EQ002',
    lastChecked: '2025-06-21',
  },
  {
    id: 'EQ003',
    name: 'Weighing Scales',
    quantity: 8,
    available: 6,
    location: 'Marine Drive Hub',
    qrCode: 'QR_EQ003',
    lastChecked: '2025-06-19',
  },
  {
    id: 'EQ004',
    name: 'First Aid Kits',
    quantity: 12,
    available: 10,
    location: 'Versova Base',
    qrCode: 'QR_EQ004',
    lastChecked: '2025-06-21',
  },
];

const volunteers = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'P',
    skills: ['Photography', 'Team Leadership', 'Data Analysis'],
    experience: 'Expert',
    availability: 'Weekends',
    location: 'Bandra',
    matchScore: 95,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    avatar: 'R',
    skills: ['Tech Support', 'AI Tools', 'Documentation'],
    experience: 'Advanced',
    availability: 'Flexible',
    location: 'Andheri',
    matchScore: 89,
  },
  {
    id: 3,
    name: 'Anita Desai',
    avatar: 'A',
    skills: ['Community Outreach', 'Event Planning', 'Training'],
    experience: 'Expert',
    availability: 'Mornings',
    location: 'Juhu',
    matchScore: 92,
  },
];

const corporatePartners = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    logo: 'TC',
    contribution: '₹2,50,000',
    type: 'Financial',
    status: 'Active',
    impactArea: 'Equipment & Technology',
    contactPerson: 'Mr. Anil Gupta',
    nextMeeting: '2025-06-28',
  },
  {
    id: 2,
    name: 'GreenLife Industries',
    logo: 'GL',
    contribution: '₹1,80,000',
    type: 'Equipment',
    status: 'Active',
    impactArea: 'Waste Processing',
    contactPerson: 'Ms. Sneha Patel',
    nextMeeting: '2025-07-05',
  },
  {
    id: 3,
    name: 'OceanCare Foundation',
    logo: 'OC',
    contribution: '₹3,20,000',
    type: 'Mixed',
    status: 'Pending',
    impactArea: 'Research & Development',
    contactPerson: 'Dr. Vikram Mehta',
    nextMeeting: '2025-06-30',
  },
];

const ResourceManagement: React.FC = () => {
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

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

  const handleQRScan = (equipment: any) => {
    setSelectedEquipment(equipment);
    setOpenQRDialog(true);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 70) return 'success';
    if (percentage > 30) return 'warning';
    return 'error';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Resource Management
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Digital integration for equipment tracking and partnerships
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Inventory sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {equipment.length}
              </Typography>
              <Typography variant="body2">
                Equipment Types
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {volunteers.length}
              </Typography>
              <Typography variant="body2">
                Skilled Volunteers
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Business sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {corporatePartners.length}
              </Typography>
              <Typography variant="body2">
                Corporate Partners
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <QrCode sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                98%
              </Typography>
              <Typography variant="body2">
                QR Tracking Accuracy
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Equipment Tracking */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <QrCode sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Equipment Tracking with QR Codes
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<Add />}>
                Add Equipment
              </Button>
            </Box>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Last Checked</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={`${item.available}/${item.quantity}`}
                            color={getAvailabilityColor(item.available, item.quantity) as any}
                            size="small"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.lastChecked}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<QrCode />}
                          onClick={() => handleQRScan(item)}
                        >
                          QR Scan
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Volunteer Skill Matching */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <People sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Volunteer Skill Matching
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {volunteers.map((volunteer) => (
                  <Card key={volunteer.id} sx={{ border: '1px solid', borderColor: 'divider' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {volunteer.avatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {volunteer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {volunteer.experience} • {volunteer.location}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${volunteer.matchScore}% match`}
                          color={volunteer.matchScore > 90 ? 'success' : 'primary'}
                          size="small"
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Skills:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {volunteer.skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Available: {volunteer.availability}
                        </Typography>
                        <Button size="small" variant="outlined">
                          Assign Task
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Digital Marketplace */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Storefront sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Digital Marketplace
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Connect collected recyclables with local buyers
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Plastic Bottles (PET)
                    </Typography>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                      ₹12/kg
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available: 340kg • Buyer: Mumbai Recycling Co.
                  </Typography>
                  <Button size="small" variant="contained" fullWidth>
                    Contact Buyer
                  </Button>
                </Card>

                <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Aluminum Cans
                    </Typography>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                      ₹85/kg
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available: 125kg • Buyer: GreenMetal Industries
                  </Typography>
                  <Button size="small" variant="contained" fullWidth>
                    Contact Buyer
                  </Button>
                </Card>

                <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Mixed Paper
                    </Typography>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                      ₹8/kg
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available: 89kg • Buyer: Paper Revival Ltd.
                  </Typography>
                  <Button size="small" variant="contained" fullWidth>
                    Contact Buyer
                  </Button>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Corporate Partnership Portal */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Handshake sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Corporate Partnership Portal
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenPartnerDialog(true)}
              >
                Add Partner
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {corporatePartners.map((partner) => (
                <Card key={partner.id} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 50, height: 50 }}>
                        {partner.logo}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {partner.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {partner.impactArea} • Contact: {partner.contactPerson}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right', mr: 2 }}>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {partner.contribution}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {partner.type}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {partner.status === 'Active' ? (
                          <CheckCircle sx={{ color: 'success.main' }} />
                        ) : (
                          <Pending sx={{ color: 'warning.main' }} />
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Next meeting: {partner.nextMeeting}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Email />}
                      >
                        Send Update
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* QR Code Dialog */}
      <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>QR Code Scanner</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            {selectedEquipment && (
              <>
                <Box sx={{
                  width: 200,
                  height: 200,
                  margin: '0 auto 20px',
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2
                }}>
                  <QrCode sx={{ fontSize: 80, color: 'text.secondary' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {selectedEquipment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  ID: {selectedEquipment.id} | QR: {selectedEquipment.qrCode}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Current Status: {selectedEquipment.available}/{selectedEquipment.quantity} available
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button variant="contained">Check Out</Button>
                  <Button variant="outlined">Check In</Button>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQRDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Partner Dialog */}
      <Dialog open={openPartnerDialog} onClose={() => setOpenPartnerDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Corporate Partner</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Contact Person"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Contribution Amount"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Impact Area"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Partnership Details"
              multiline
              rows={3}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPartnerDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenPartnerDialog(false)}>
            Add Partner
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default ResourceManagement;
