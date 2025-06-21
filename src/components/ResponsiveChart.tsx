import {
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface ChartData {
    name: string;
    value: number;
    [key: string]: any;
}

interface ResponsiveChartProps {
    data: ChartData[];
    type: 'line' | 'area' | 'bar' | 'pie';
    title?: string;
    height?: number;
    colors?: string[];
    dataKey?: string;
    xAxisKey?: string;
}

const ResponsiveChart: React.FC<ResponsiveChartProps> = ({
    data,
    type,
    title,
    height = 300,
    colors = ['#3282b8', '#0f4c75', '#bbe1fa', '#1e88e5', '#42a5f5'],
    dataKey = 'value',
    xAxisKey = 'name'
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const responsiveHeight = isMobile ? height * 0.7 : height;
    const fontSize = isMobile ? 10 : 12;

    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey={xAxisKey}
                            fontSize={fontSize}
                            angle={isMobile ? -45 : 0}
                            textAnchor={isMobile ? 'end' : 'middle'}
                            height={isMobile ? 60 : 30}
                        />
                        <YAxis fontSize={fontSize} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: fontSize
                            }}
                        />
                        <Legend fontSize={fontSize} />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colors[0]}
                            strokeWidth={2}
                            dot={{ fill: colors[0], strokeWidth: 2, r: isMobile ? 3 : 4 }}
                            activeDot={{ r: isMobile ? 5 : 6, stroke: colors[0], strokeWidth: 2 }}
                        />
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey={xAxisKey}
                            fontSize={fontSize}
                            angle={isMobile ? -45 : 0}
                            textAnchor={isMobile ? 'end' : 'middle'}
                            height={isMobile ? 60 : 30}
                        />
                        <YAxis fontSize={fontSize} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: fontSize
                            }}
                        />
                        <Legend fontSize={fontSize} />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colors[0]}
                            fill={`${colors[0]}40`}
                            strokeWidth={2}
                        />
                    </AreaChart>
                );

            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey={xAxisKey}
                            fontSize={fontSize}
                            angle={isMobile ? -45 : 0}
                            textAnchor={isMobile ? 'end' : 'middle'}
                            height={isMobile ? 60 : 30}
                        />
                        <YAxis fontSize={fontSize} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: fontSize
                            }}
                        />
                        <Legend fontSize={fontSize} />
                        <Bar
                            dataKey={dataKey}
                            fill={colors[0]}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                );

            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={isMobile ? 60 : 80}
                            innerRadius={isMobile ? 25 : 35}
                            paddingAngle={2}
                            dataKey={dataKey}
                            label={!isMobile}
                            labelLine={false}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: fontSize
                            }}
                        />
                        <Legend
                            fontSize={fontSize}
                            layout={isMobile ? 'horizontal' : 'vertical'}
                            align={isMobile ? 'center' : 'right'}
                            verticalAlign={isMobile ? 'bottom' : 'middle'}
                            wrapperStyle={{ paddingTop: isMobile ? '20px' : '0' }}
                        />
                    </PieChart>
                );

            default:
                return null;
        }
    };

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            {title && (
                <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                >
                    {title}
                </Typography>
            )}      <Box sx={{ width: '100%', height: responsiveHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart() || <div>Chart not available</div>}
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default ResponsiveChart;
