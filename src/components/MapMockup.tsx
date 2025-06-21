import { Layers, MyLocation, ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

interface MapMockupProps {
    height?: number | string;
    showControls?: boolean;
    markers?: Array<{
        lat: number;
        lng: number;
        title: string;
        type: 'cleanup' | 'completed' | 'planned';
    }>;
}

const MapMockup: React.FC<MapMockupProps> = ({
    height = 400,
    showControls = true,
    markers = []
}) => {
    const defaultMarkers = [
        { lat: 19.0176, lng: 72.8562, title: 'Juhu Beach Cleanup', type: 'cleanup' as const },
        { lat: 19.1076, lng: 72.8262, title: 'Versova Beach - Completed', type: 'completed' as const },
        { lat: 18.9067, lng: 72.8147, title: 'Marine Drive - Planned', type: 'planned' as const },
    ];

    const activeMarkers = markers.length > 0 ? markers : defaultMarkers;

    return (
        <Paper
            sx={{
                position: 'relative',
                height,
                overflow: 'hidden',
                background: 'linear-gradient(45deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Map Background Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3,
                }}
            />

            {/* Google Maps Logo */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#666',
                }}
            >
                Google
            </Box>

            {/* Map Controls */}
            {showControls && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <IconButton
                        size="small"
                        sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                        <ZoomIn fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                        <ZoomOut fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                        <Layers fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                        <MyLocation fontSize="small" />
                    </IconButton>
                </Box>
            )}

            {/* Markers */}
            {activeMarkers.map((marker, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 20}%`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50% 50% 50% 0',
                            backgroundColor:
                                marker.type === 'cleanup' ? '#4caf50' :
                                    marker.type === 'completed' ? '#2196f3' : '#ff9800',
                            transform: 'rotate(-45deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                transform: 'rotate(45deg)',
                            }}
                        />
                    </Box>
                    <Chip
                        label={marker.title}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: -40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '10px',
                            height: 20,
                            whiteSpace: 'nowrap',
                            display: { xs: 'none', sm: 'flex' },
                        }}
                    />
                </Box>
            ))}

            {/* Center Mumbai Indicator */}
            <Typography
                variant="caption"
                sx={{
                    position: 'absolute',
                    bottom: 50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                Mumbai, Maharashtra
            </Typography>
        </Paper>
    );
};

export default MapMockup;
