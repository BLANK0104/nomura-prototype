import {
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Mock user progress data
const mockUserProgress = [
    {
        id: 1,
        name: 'Priya Sharma',
        username: 'volunteer1',
        eventsAttended: 12,
        wasteCollected: 45.5,
        hoursContributed: 36,
        level: 'Gold Volunteer',
        badges: 8,
        lastActivity: '2025-06-20',
        progress: 85
    },
    {
        id: 2,
        name: 'Arjun Patel',
        username: 'volunteer2',
        eventsAttended: 8,
        wasteCollected: 32.2,
        hoursContributed: 24,
        level: 'Silver Volunteer',
        badges: 5,
        lastActivity: '2025-06-18',
        progress: 65
    },
    {
        id: 3,
        name: 'Meera Singh',
        username: 'volunteer3',
        eventsAttended: 15,
        wasteCollected: 58.7,
        hoursContributed: 45,
        level: 'Platinum Volunteer',
        badges: 12,
        lastActivity: '2025-06-21',
        progress: 95
    }
];

export default function UserProgress() {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return (
            <Alert severity="error">
                Access denied. This page is only available for administrators.
            </Alert>
        );
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Platinum Volunteer': return 'error';
            case 'Gold Volunteer': return 'warning';
            case 'Silver Volunteer': return 'info';
            default: return 'default';
        }
    };

    const totalStats = {
        totalUsers: mockUserProgress.length,
        totalEvents: mockUserProgress.reduce((sum, user) => sum + user.eventsAttended, 0),
        totalWaste: mockUserProgress.reduce((sum, user) => sum + user.wasteCollected, 0),
        totalHours: mockUserProgress.reduce((sum, user) => sum + user.hoursContributed, 0)
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    User Progress Tracking
                </Typography>

                {/* Summary Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PersonIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {totalStats.totalUsers}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Active Volunteers
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
                                    <ScheduleIcon sx={{ color: 'secondary.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {totalStats.totalEvents}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Events Attended
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
                                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {totalStats.totalWaste.toFixed(1)}kg
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Waste Collected
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
                                    <TrophyIcon sx={{ color: 'warning.main', fontSize: 40 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            {totalStats.totalHours}h
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Hours Contributed
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* User Progress List */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Individual Volunteer Progress
                        </Typography>
                        <List>
                            {mockUserProgress.map((user) => (
                                <ListItem
                                    key={user.id}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        mb: 2,
                                        '&:last-child': { mb: 0 }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                                            {user.name.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {user.name}
                                                </Typography>
                                                <Chip
                                                    label={user.level}
                                                    size="small"
                                                    color={getLevelColor(user.level) as any}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 1 }}>
                                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                                    <Grid item xs={6} sm={3}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Events: <strong>{user.eventsAttended}</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Waste: <strong>{user.wasteCollected}kg</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Hours: <strong>{user.hoursContributed}h</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Badges: <strong>{user.badges}</strong>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Box sx={{ mb: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Overall Progress
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {user.progress}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={user.progress}
                                                        sx={{ height: 8, borderRadius: 4 }}
                                                    />
                                                </Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Last activity: {user.lastActivity}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </motion.div>
    );
}
