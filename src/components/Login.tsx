import {
    AutoAwesome,
    CloudOutlined,
    EmailOutlined,
    FavoriteOutlined,
    LocationOnOutlined,
    LockOutlined,
    Nature,
    Public,
    RecyclingOutlined,
    StarOutlineRounded,
    Visibility,
    VisibilityOff,
    WaterDrop,
    Waves,
    WbSunnyOutlined
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Fade,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    Zoom,
    alpha,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

interface LoginProps {
    onLogin: (user: { username: string; role: 'admin' | 'user'; name: string }) => void;
}

// Floating Icon Component for Background Animation
const FloatingIcon = ({
    Icon,
    delay = 0,
    duration = 3,
    x = 0,
    y = 0,
    size = 24,
    color = 'rgba(255,255,255,0.3)',
}: {
    Icon: React.ComponentType<any>;
    delay?: number;
    duration?: number;
    x?: number;
    y?: number;
    size?: number;
    color?: string;
}) => (
    <Box
        sx={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            color,
            fontSize: size,
            animation: `float${delay} ${duration}s ease-in-out infinite`,
            zIndex: 0,
            '@keyframes float0': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.3 },
                '50%': { transform: 'translateY(-20px) rotate(5deg)', opacity: 0.6 },
            },
            '@keyframes float1': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.2 },
                '50%': { transform: 'translateY(-15px) rotate(-3deg)', opacity: 0.5 },
            },
            '@keyframes float2': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.4 },
                '50%': { transform: 'translateY(-25px) rotate(8deg)', opacity: 0.7 },
            },
            '@keyframes float3': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.3 },
                '50%': { transform: 'translateY(-18px) rotate(-5deg)', opacity: 0.6 },
            },
        }}
    >
        <Icon sx={{ fontSize: 'inherit' }} />
    </Box>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Hardcoded credentials for prototype testing
    const credentials = {
        admin: { password: 'admin123', role: 'admin' as const, name: 'Administrator' },
        user: { password: 'user123', role: 'user' as const, name: 'User' },
        volunteer1: { password: 'user123', role: 'user' as const, name: 'Priya Sharma' },
        volunteer2: { password: 'user123', role: 'user' as const, name: 'Arjun Patel' },
        volunteer3: { password: 'user123', role: 'user' as const, name: 'Meera Singh' },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate loading for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check credentials
        if (username in credentials) {
            const userCredentials = credentials[username as keyof typeof credentials];
            if (userCredentials.password === password) {
                onLogin({
                    username,
                    role: userCredentials.role,
                    name: userCredentials.name
                });
                setIsLoading(false);
                return;
            }
        }

        setError('Invalid credentials. Please check your username and password.');
        setIsLoading(false);
    };

    const handleGoogleLogin = () => {
        // Google OAuth mockup - in production this would integrate with Google OAuth
        setIsLoading(true);
        setTimeout(() => {
            onLogin({
                username: 'google_user',
                role: 'user',
                name: 'Google User'
            });
            setIsLoading(false);
        }, 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.secondary.main} 35%,
          ${alpha(theme.palette.info.main, 0.8)} 70%,
          ${alpha(theme.palette.success.main, 0.9)} 100%)`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3,
                },
            }}
        >
            {/* Floating Background Icons */}
            <FloatingIcon Icon={Waves} delay={0} x={15} y={20} size={40} />
            <FloatingIcon Icon={RecyclingOutlined} delay={1} x={75} y={15} size={35} />
            <FloatingIcon Icon={WaterDrop} delay={2} x={10} y={70} size={25} />
            <FloatingIcon Icon={Nature} delay={3} x={80} y={75} size={45} />
            <FloatingIcon Icon={FavoriteOutlined} delay={1} x={20} y={50} size={20} />
            <FloatingIcon Icon={StarOutlineRounded} delay={2} x={85} y={45} size={30} />
            <FloatingIcon Icon={CloudOutlined} delay={0} x={60} y={25} size={28} />
            <FloatingIcon Icon={LocationOnOutlined} delay={3} x={45} y={80} size={22} />
            <FloatingIcon Icon={WbSunnyOutlined} delay={1} x={5} y={40} size={32} />
            <FloatingIcon Icon={Public} delay={2} x={90} y={60} size={38} />

            {/* Glassmorphism Background Shapes */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: 200,
                    height: 200,
                    background: alpha('#ffffff', 0.1),
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha('#ffffff', 0.2)}`,
                    animation: 'rotate 20s linear infinite',
                    '@keyframes rotate': {
                        from: { transform: 'rotate(0deg)' },
                        to: { transform: 'rotate(360deg)' },
                    },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    width: 150,
                    height: 150,
                    background: alpha('#ffffff', 0.08),
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${alpha('#ffffff', 0.15)}`,
                    animation: 'morph 25s ease-in-out infinite',
                    '@keyframes morph': {
                        '0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                        '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
                        '50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
                        '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
                    },
                }}
            />

            <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', py: 4, zIndex: 1 }}>
                <Fade in timeout={1000}>
                    <Paper
                        elevation={24}
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            overflow: 'hidden',
                            background: alpha('#ffffff', 0.95),
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${alpha('#ffffff', 0.3)}`,
                            boxShadow: `
                0 25px 50px ${alpha('#000000', 0.15)},
                0 0 0 1px ${alpha('#ffffff', 0.2)},
                inset 0 1px 0 ${alpha('#ffffff', 0.3)}
              `,
                        }}
                    >
                        {/* Header Section */}
                        <Box
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                p: { xs: 3, sm: 4 },
                                textAlign: 'center',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                                    animation: 'shimmer 3s ease-in-out infinite',
                                    '@keyframes shimmer': {
                                        '0%': { opacity: 0.1 },
                                        '50%': { opacity: 0.3 },
                                        '100%': { opacity: 0.1 },
                                    },
                                },
                            }}
                        >
                            <Zoom in timeout={1200}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2,
                                        zIndex: 1,
                                        position: 'relative',
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            background: alpha('#ffffff', 0.2),
                                            mr: 2,
                                            border: `3px solid ${alpha('#ffffff', 0.3)}`,
                                            boxShadow: `0 10px 30px ${alpha('#000000', 0.2)}`,
                                        }}
                                    >
                                        <Waves sx={{ fontSize: 35 }} />
                                    </Avatar>
                                    <Avatar
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            background: alpha('#ffffff', 0.2),
                                            border: `3px solid ${alpha('#ffffff', 0.3)}`,
                                            boxShadow: `0 10px 30px ${alpha('#000000', 0.2)}`,
                                        }}
                                    >
                                        <Nature sx={{ fontSize: 35 }} />
                                    </Avatar>
                                </Box>
                            </Zoom>
                            <Typography
                                variant={isMobile ? "h4" : "h3"}
                                component="h1"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    zIndex: 1,
                                    position: 'relative',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    mb: 1,
                                }}
                            >
                                Mumbai Beach Cleanup
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: 0.95,
                                    zIndex: 1,
                                    position: 'relative',
                                    fontWeight: 500,
                                    mb: 1,
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    opacity: 0.85,
                                    zIndex: 1,
                                    position: 'relative',
                                    fontWeight: 400,
                                }}
                            >
                                Sign in to continue making a difference
                            </Typography>
                        </Box>

                        {/* Login Form */}
                        <Box sx={{ p: { xs: 3, sm: 4 } }}>
                            {error && (
                                <Fade in>
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mb: 3,
                                            borderRadius: 2,
                                            backgroundColor: alpha(theme.palette.error.main, 0.05),
                                            '& .MuiAlert-icon': {
                                                fontSize: '1.2rem',
                                                color: 'error.main'
                                            },
                                        }}
                                    >
                                        {error}
                                    </Alert>
                                </Fade>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Username or Email"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: alpha('#ffffff', 0.8),
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: alpha('#ffffff', 0.9),
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: '#ffffff',
                                                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                                            },
                                        },
                                    }}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                    sx={{
                                                        color: showPassword ? 'primary.main' : 'action.active',
                                                        transition: 'color 0.3s ease',
                                                    }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        mb: 4,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: alpha('#ffffff', 0.8),
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: alpha('#ffffff', 0.9),
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: '#ffffff',
                                                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                                            },
                                        },
                                    }}
                                    required
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoading}
                                    sx={{
                                        mb: 3,
                                        py: 1.8,
                                        borderRadius: 3,
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                                        transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            transform: 'translateY(-2px)',
                                        },
                                        '&:active': {
                                            transform: 'scale(0.98)',
                                        },
                                        '&:disabled': {
                                            background: alpha(theme.palette.action.disabled, 0.5),
                                        },
                                    }}
                                >
                                    {isLoading ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AutoAwesome sx={{ animation: 'spin 1s linear infinite' }} />
                                            Signing In...
                                        </Box>
                                    ) : (
                                        'Sign In to Platform'
                                    )}
                                </Button>
                            </Box>

                            <Divider sx={{ my: 3, '&::before, &::after': { borderColor: alpha('#000', 0.1) } }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        px: 2,
                                        backgroundColor: 'white',
                                        fontWeight: 500,
                                    }}
                                >
                                    or continue with
                                </Typography>
                            </Divider>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={
                                    <Box
                                        component="img"
                                        src="data:image/svg+xml,%3Csvg width='18' height='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M17.6 9.2l-.1-1.8H9v3.4h4.8c-.2 1-.8 1.8-1.5 2.3v2h2.4c1.4-1.3 2.2-3.2 2.2-5.4z' fill='%234285F4'/%3E%3Cpath d='M9 18c2.1 0 3.9-.7 5.2-1.9l-2.4-2c-.7.5-1.6.8-2.8.8-2.1 0-3.9-1.4-4.5-3.4H1.9v2.1C3.2 16.2 5.9 18 9 18z' fill='%2334A853'/%3E%3Cpath d='M4.5 10.7c-.2-.5-.2-1.1 0-1.6V7H1.9c-.6 1.2-.6 2.6 0 3.8l2.6-2.1z' fill='%23FBBC05'/%3E%3Cpath d='M9 3.6c1.2 0 2.3.4 3.1 1.2l2.3-2.3C12.9.9 11.1 0 9 0 5.9 0 3.2 1.8 1.9 4.4l2.6 2.1C5.1 5 6.9 3.6 9 3.6z' fill='%23EA4335'/%3E%3C/g%3E%3C/svg%3E"
                                        alt="Google"
                                        sx={{ width: 18, height: 18 }}
                                    />
                                }
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                sx={{
                                    py: 1.8,
                                    borderRadius: 3,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderColor: alpha('#000', 0.12),
                                    color: 'text.primary',
                                    backgroundColor: '#ffffff',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: alpha('#000', 0.04),
                                        borderColor: alpha('#000', 0.2),
                                        boxShadow: `0 6px 20px ${alpha('#000', 0.1)}`,
                                        transform: 'translateY(-1px)',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    },
                                    '&:disabled': {
                                        backgroundColor: alpha('#000', 0.02),
                                    },
                                }}
                            >
                                {isLoading ? 'Connecting...' : 'Continue with Google'}
                            </Button>

                            {/* Subtle test credentials hint */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    mt: 4,
                                    p: 2,
                                    backgroundColor: alpha('#000', 0.02),
                                    borderRadius: 2,
                                    opacity: 0.7,
                                    fontSize: '0.75rem',
                                }}
                            >
                                Test: admin/admin123 or volunteer1/user123
                            </Typography>
                        </Box>
                    </Paper>
                </Fade>
            </Container>

            <style>
                {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </Box>
    );
};

export default Login;
