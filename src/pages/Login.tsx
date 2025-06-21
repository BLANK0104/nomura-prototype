import {
    Alert,
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    Cloud,
    Eye,
    EyeOff,
    Fish,
    Heart,
    Lock,
    MapPin,
    Recycle,
    Star,
    Sun,
    User,
    Waves
} from 'lucide-react';
import React, { useState } from 'react';

interface LoginProps {
    onLogin: (user: { username: string; role: 'admin' | 'user'; name: string }) => void;
}

const FloatingIcon = ({
    icon: Icon,
    delay = 0,
    duration = 3,
    x = 0,
    y = 0,
    size = 24,
    color = 'primary.main',
    opacity = 0.6
}: {
    icon: React.ComponentType<any>;
    delay?: number;
    duration?: number;
    x?: number;
    y?: number;
    size?: number;
    color?: string;
    opacity?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, x: x - 20, y: y - 20 }}
        animate={{
            opacity: [0, opacity, 0],
            x: [x - 20, x, x + 20],
            y: [y - 20, y, y - 40],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
        }}
        style={{
            position: 'absolute',
            zIndex: 0,
            color: color,
        }}
    >
        <Icon size={size} />
    </motion.div>
);

export default function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Hardcoded credentials for prototype testing
        if ((username === 'admin' && password === 'admin123') ||
            (username.startsWith('volunteer') && password === 'user123')) {
            onLogin({
                username,
                role: username === 'admin' ? 'admin' : 'user',
                name: username === 'admin' ? 'Admin User' : `Volunteer ${username.slice(-1) || '1'}`
            });
        } else {
            setError('Invalid credentials. Please check your username and password.');
        }

        setLoading(false);
    };

    const handleGoogleLogin = () => {
        // Google OAuth mockup - in production this would integrate with Google OAuth
        setLoading(true);
        setTimeout(() => {
            onLogin({
                username: 'google_user',
                role: 'user',
                name: 'Google User'
            });
        }, 2000);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 35%,
                    ${alpha(theme.palette.info.main, 0.8)} 70%,
                    ${alpha(theme.palette.success.main, 0.9)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                px: 2,
            }}
        >
            {/* Floating Background Icons */}
            <FloatingIcon icon={Waves} delay={0} x={100} y={150} size={30} color={alpha('#ffffff', 0.3)} />
            <FloatingIcon icon={Fish} delay={1} x={300} y={200} size={24} color={alpha('#ffffff', 0.2)} />
            <FloatingIcon icon={Recycle} delay={2} x={800} y={100} size={28} color={alpha('#ffffff', 0.4)} />
            <FloatingIcon icon={Heart} delay={0.5} x={150} y={400} size={20} color={alpha('#ffffff', 0.3)} />
            <FloatingIcon icon={Star} delay={1.5} x={600} y={350} size={22} color={alpha('#ffffff', 0.25)} />
            <FloatingIcon icon={Sun} delay={2.5} x={50} y={300} size={26} color={alpha('#ffffff', 0.35)} />
            <FloatingIcon icon={Cloud} delay={3} x={700} y={250} size={32} color={alpha('#ffffff', 0.2)} />
            <FloatingIcon icon={MapPin} delay={0.8} x={400} y={80} size={18} color={alpha('#ffffff', 0.4)} />

            {/* Glassmorphism Background Shapes */}
            <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: 200,
                    height: 200,
                    background: alpha('#ffffff', 0.1),
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha('#ffffff', 0.2)}`,
                    zIndex: 0,
                }}
            />
            <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    width: 150,
                    height: 150,
                    background: alpha('#ffffff', 0.08),
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${alpha('#ffffff', 0.15)}`,
                    zIndex: 0,
                }}
            />

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ zIndex: 1, width: '100%', maxWidth: 450 }}
            >
                <Card
                    sx={{
                        backdropFilter: 'blur(20px)',
                        background: alpha('#ffffff', 0.95),
                        border: `1px solid ${alpha('#ffffff', 0.3)}`,
                        borderRadius: 4,
                        boxShadow: `0 25px 50px ${alpha('#000000', 0.15)}`,
                        overflow: 'visible',
                        position: 'relative',
                    }}
                >
                    {/* Header Section */}
                    <Box sx={{ textAlign: 'center', pt: 6, pb: 4, px: 4 }}>
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.3,
                                type: 'spring',
                                stiffness: 200,
                                damping: 15
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    mx: 'auto',
                                    mb: 3,
                                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    border: `3px solid ${alpha('#ffffff', 0.8)}`,
                                }}
                            >
                                <Waves size={40} />
                            </Avatar>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    mb: 1
                                }}
                            >
                                Mumbai Beach Cleanup Platform
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    opacity: 0.8
                                }}
                            >
                                Sign in to continue making a difference
                            </Typography>
                        </motion.div>
                    </Box>

                    {/* Login Form */}
                    <Box sx={{ px: 4, pb: 4 }}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            color: 'error.main'
                                        }
                                    }}
                                >
                                    {error}
                                </Alert>
                            </motion.div>
                        )}

                        <Box component="form" onSubmit={handleLogin}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <TextField
                                    fullWidth
                                    label="Username or Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    margin="normal"
                                    required
                                    autoComplete="username"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <User size={20} color={theme.palette.text.secondary} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: alpha('#ffffff', 0.8),
                                            '&:hover': {
                                                backgroundColor: alpha('#ffffff', 0.9),
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: '#ffffff',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    margin="normal"
                                    required
                                    autoComplete="current-password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock size={20} color={theme.palette.text.secondary} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: alpha('#ffffff', 0.8),
                                            '&:hover': {
                                                backgroundColor: alpha('#ffffff', 0.9),
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: '#ffffff',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        py: 1.8,
                                        borderRadius: 2,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            transform: 'translateY(-2px)',
                                        },
                                        '&:disabled': {
                                            background: alpha(theme.palette.action.disabled, 0.5),
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <Divider sx={{ my: 3, '&::before, &::after': { borderColor: alpha('#000', 0.1) } }}>
                                    <Typography variant="body2" color="text.secondary">
                                        or continue with
                                    </Typography>
                                </Divider>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        borderColor: alpha('#000', 0.12),
                                        color: 'text.primary',
                                        backgroundColor: '#ffffff',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: alpha('#000', 0.04),
                                            borderColor: alpha('#000', 0.2),
                                            transform: 'translateY(-1px)',
                                            boxShadow: `0 6px 20px ${alpha('#000', 0.1)}`,
                                        },
                                        '&:disabled': {
                                            backgroundColor: alpha('#000', 0.02),
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                    startIcon={
                                        <Box
                                            component="img"
                                            src="data:image/svg+xml,%3Csvg width='18' height='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M17.6 9.2l-.1-1.8H9v3.4h4.8c-.2 1-.8 1.8-1.5 2.3v2h2.4c1.4-1.3 2.2-3.2 2.2-5.4z' fill='%234285F4'/%3E%3Cpath d='M9 18c2.1 0 3.9-.7 5.2-1.9l-2.4-2c-.7.5-1.6.8-2.8.8-2.1 0-3.9-1.4-4.5-3.4H1.9v2.1C3.2 16.2 5.9 18 9 18z' fill='%2334A853'/%3E%3Cpath d='M4.5 10.7c-.2-.5-.2-1.1 0-1.6V7H1.9c-.6 1.2-.6 2.6 0 3.8l2.6-2.1z' fill='%23FBBC05'/%3E%3Cpath d='M9 3.6c1.2 0 2.3.4 3.1 1.2l2.3-2.3C12.9.9 11.1 0 9 0 5.9 0 3.2 1.8 1.9 4.4l2.6 2.1C5.1 5 6.9 3.6 9 3.6z' fill='%23EA4335'/%3E%3C/g%3E%3C/svg%3E"
                                            alt="Google"
                                            sx={{ width: 18, height: 18 }}
                                        />
                                    }
                                >
                                    {loading ? 'Connecting...' : 'Continue with Google'}
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>

                    {/* Subtle Test Credentials Hint */}
                    <Box sx={{ px: 4, pb: 3 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                opacity: 0.6,
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                display: 'block'
                            }}
                        >
                            Test: admin/admin123 or volunteer1/user123
                        </Typography>
                    </Box>
                </Card>
            </motion.div>
        </Box>
    );
}
