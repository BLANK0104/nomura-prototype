import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    People as PeopleIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for existing cleanups
const mockScheduledCleanups = [
    {
        id: 1,
        title: 'Juhu Beach Weekend Cleanup',
        date: '2025-06-25',
        time: '07:00',
        location: 'Juhu Beach, Mumbai',
        volunteers: 45,
        equipment: ['Gloves', 'Bags', 'Picker tools'],
        status: 'confirmed'
    },
    {
        id: 2,
        title: 'Marine Drive Morning Session',
        date: '2025-06-28',
        time: '06:30',
        location: 'Marine Drive, Mumbai',
        volunteers: 32,
        equipment: ['Gloves', 'Bags'],
        status: 'pending'
    },
    {
        id: 3,
        title: 'Versova Beach Community Drive',
        date: '2025-07-01',
        time: '08:00',
        location: 'Versova Beach, Mumbai',
        volunteers: 78,
        equipment: ['Gloves', 'Bags', 'Picker tools', 'First aid'],
        status: 'confirmed'
    }
];

export default function ScheduleCleanup() {
    const { isAdmin } = useAuth();
    const [open, setOpen] = useState(false);
    const [cleanups, setCleanups] = useState(mockScheduledCleanups);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        maxVolunteers: '',
        equipment: ''
    });

    if (!isAdmin) {
        return (
            <Alert severity="error">
                Access denied. This page is only available for administrators.
            </Alert>
        );
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const newCleanup = {
            id: cleanups.length + 1,
            title: formData.title,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            volunteers: 0,
            equipment: formData.equipment.split(',').map(item => item.trim()),
            status: 'pending' as const
        };

        setCleanups(prev => [...prev, newCleanup]);
        setFormData({
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            maxVolunteers: '',
            equipment: ''
        });
        setOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            default: return 'default';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Schedule Beach Cleanup
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ borderRadius: 3 }}
                    >
                        Schedule New Cleanup
                    </Button>
                </Box>

                {/* Quick Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <EventIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {cleanups.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Scheduled Events
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PeopleIcon sx={{ color: 'secondary.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {cleanups.reduce((sum, cleanup) => sum + cleanup.volunteers, 0)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Volunteers
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ScheduleIcon sx={{ color: 'warning.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {cleanups.filter(c => c.status === 'pending').length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Pending Approval
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocationIcon sx={{ color: 'success.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {new Set(cleanups.map(c => c.location)).size}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Beach Locations
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Scheduled Cleanups List */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Scheduled Cleanups
                        </Typography>
                        <List>
                            {cleanups.map((cleanup) => (
                                <ListItem
                                    key={cleanup.id}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        mb: 1,
                                        '&:last-child': { mb: 0 }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {cleanup.title}
                                                </Typography>
                                                <Chip
                                                    label={cleanup.status.toUpperCase()}
                                                    size="small"
                                                    color={getStatusColor(cleanup.status) as any}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                                    {cleanup.date} at {cleanup.time}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                                    {cleanup.location}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    <PeopleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                                    {cleanup.volunteers} volunteers registered
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                    {cleanup.equipment.map((item, index) => (
                                                        <Chip key={index} label={item} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" sx={{ mr: 1 }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            {/* Schedule New Cleanup Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Schedule New Beach Cleanup</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cleanup Title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="e.g., Juhu Beach, Mumbai"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Max Volunteers"
                                type="number"
                                value={formData.maxVolunteers}
                                onChange={(e) => handleInputChange('maxVolunteers', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Equipment Needed"
                                value={formData.equipment}
                                onChange={(e) => handleInputChange('equipment', e.target.value)}
                                placeholder="Gloves, Bags, Picker tools (comma separated)"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formData.title || !formData.date || !formData.location}
                    >
                        Schedule Cleanup
                    </Button>
                </DialogActions>
            </Dialog>
        </motion.div>
    );
}
