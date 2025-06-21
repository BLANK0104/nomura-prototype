import {
    Air,
    Cloud,
    Grain,
    Speed,
    Visibility,
    Water,
    WbSunny
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';

interface WeatherData {
    location: string;
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    forecast?: Array<{
        day: string;
        high: number;
        low: number;
        condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
    }>;
}

interface WeatherMockupProps {
    data?: WeatherData;
    compact?: boolean;
}

const WeatherMockup: React.FC<WeatherMockupProps> = ({
    data,
    compact = false
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const defaultData: WeatherData = {
        location: 'Mumbai, Maharashtra',
        temperature: 32,
        condition: 'sunny',
        humidity: 68,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        forecast: [
            { day: 'Today', high: 32, low: 26, condition: 'sunny' },
            { day: 'Tomorrow', high: 30, low: 25, condition: 'cloudy' },
            { day: 'Sunday', high: 28, low: 24, condition: 'rainy' },
            { day: 'Monday', high: 31, low: 25, condition: 'sunny' },
        ]
    };

    const weatherData = data || defaultData;

    const getWeatherIcon = (condition: string, size: 'small' | 'medium' | 'large' = 'medium') => {
        const iconProps = {
            fontSize: size,
            sx: {
                color: condition === 'sunny' ? '#ffa726' :
                    condition === 'cloudy' ? '#90a4ae' :
                        condition === 'rainy' ? '#42a5f5' : '#66bb6a'
            }
        };

        switch (condition) {
            case 'sunny': return <WbSunny {...iconProps} />;
            case 'cloudy': return <Cloud {...iconProps} />;
            case 'rainy': return <Grain {...iconProps} />;
            case 'windy': return <Air {...iconProps} />;
            default: return <WbSunny {...iconProps} />;
        }
    };

    if (compact) {
        return (
            <Paper
                sx={{
                    p: 2,
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    borderRadius: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getWeatherIcon(weatherData.condition, 'large')}
                        <Box>
                            <Typography variant="h4" component="span" fontWeight="bold">
                                {weatherData.temperature}°
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                                {weatherData.location}
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label={`${weatherData.windSpeed} km/h`}
                        icon={<Air />}
                        size="small"
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    />
                </Box>
            </Paper>
        );
    }

    return (
        <Paper
            sx={{
                p: { xs: 2, sm: 3 },
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                borderRadius: 2
            }}
        >
            {/* Current Weather */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Current Weather
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getWeatherIcon(weatherData.condition, 'large')}
                        <Box>
                            <Typography variant="h3" component="div" fontWeight="bold">
                                {weatherData.temperature}°C
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {weatherData.location}
                            </Typography>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {weatherData.condition}
                            </Typography>
                        </Box>
                    </Box>
                    {/* Weather Details */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 1,
                        maxWidth: { xs: '100%', sm: 300 }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Water fontSize="small" color="primary" />
                            <Typography variant="body2">
                                {weatherData.humidity}%
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Air fontSize="small" color="primary" />
                            <Typography variant="body2">
                                {weatherData.windSpeed} km/h
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Visibility fontSize="small" color="primary" />
                            <Typography variant="body2">
                                {weatherData.visibility} km
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Speed fontSize="small" color="primary" />
                            <Typography variant="body2">
                                {weatherData.pressure} hPa
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Forecast */}
            {weatherData.forecast && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        4-Day Forecast
                    </Typography>          <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                        gap: 1
                    }}>
                        {weatherData.forecast.map((day, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    p: 1.5,
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    borderRadius: 2
                                }}
                            >
                                <Typography variant="body2" fontWeight="bold" gutterBottom>
                                    {day.day}
                                </Typography>
                                {getWeatherIcon(day.condition, 'medium')}
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {day.high}°
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {day.low}°
                                    </Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Weather API Attribution */}
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: 'block',
                    textAlign: 'right',
                    mt: 2,
                    fontSize: '10px'
                }}
            >
                Weather data from OpenWeatherMap API
            </Typography>
        </Paper>
    );
};

export default WeatherMockup;
