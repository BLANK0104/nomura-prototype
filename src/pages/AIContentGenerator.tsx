import {
    AutoAwesome as AIIcon,
    ContentCopy as CopyIcon,
    Download as DownloadIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function AIContentGenerator() {
    const { isAdmin } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [prompt, setPrompt] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isAdmin) {
        return (
            <Alert severity="error">
                Access denied. This page is only available for administrators.
            </Alert>
        );
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPrompt('');
        setGeneratedContent('');
    };

    const generateContent = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        // Simulate AI content generation
        await new Promise(resolve => setTimeout(resolve, 2000));

        const contentTemplates = {
            0: { // Social Posts
                title: 'Beach Cleanup Social Media Post', content: `Join us for an amazing beach cleanup this Saturday!

Location: Juhu Beach, Mumbai
Date: This Saturday, 9 AM
Goal: Collect 500kg of waste and make our beach pristine!

Why participate?
- Protect marine life
- Build community connections  
- Earn volunteer certificates
- Enjoy refreshments & snacks

Bring: Sunscreen, water bottle, and enthusiasm! 
We'll provide: Gloves, bags, and cleanup tools

Tag a friend who cares about our oceans!
#MumbaiBeachCleanup #CleanWave #OceanConservation #VolunteerMumbai

Together, we can make waves of change!`
            },
            1: { // Event Descriptions
                title: 'Beach Cleanup Event Description',
                content: `Mumbai Beach Cleanup Initiative - Community Action Day

Event Overview:
Join CleanWave Mumbai for a comprehensive beach restoration event focused on environmental conservation and community engagement. This organized cleanup will combine environmental action with educational activities and community building.

Event Details:
• Duration: 4 hours (including breaks)
• Activities: Beach cleanup, waste sorting, environmental education
• Equipment provided: Professional cleanup tools, safety gear, refreshments
• Community impact: Direct beach restoration and awareness building

What to Expect:
1. Welcome & Safety Briefing (30 minutes)
2. Organized Cleanup Activity (2.5 hours)
3. Waste Sorting & Data Collection (30 minutes)
4. Community Discussion & Refreshments (30 minutes)

Benefits for Participants:
- Hands-on environmental impact
- Community networking opportunities
- Digital certificates of participation
- Educational resources about ocean conservation
- Professional photos for social media

Registration includes cleanup materials, safety equipment, refreshments, and a digital impact certificate. Join us in making a tangible difference for Mumbai's coastal environment!`
            },
            2: { // Educational Content
                title: 'Ocean Conservation Educational Content',
                content: `Understanding Ocean Plastic Pollution: A Guide for Beach Cleanup Volunteers

The Challenge:
Every year, 8 million tons of plastic waste enters our oceans. Mumbai's beaches face significant pollution challenges due to urban runoff, improper waste disposal, and marine debris.

Key Facts:
• Plastic takes 400-1000 years to decompose in marine environments
• 80% of ocean plastic originates from land-based sources
• Marine animals mistake plastic for food, leading to injury and death
• Microplastics enter the food chain, affecting human health

Types of Beach Waste:
1. Single-use plastics (bottles, bags, straws)
2. Fishing gear and marine equipment
3. Food packaging and containers
4. Personal care items
5. Construction debris

Impact of Beach Cleanups:
✓ Immediate environmental improvement
✓ Data collection for policy advocacy
✓ Community awareness and education
✓ Protection of marine ecosystems
✓ Reduction of plastic entering ocean food chains

How You Can Help:
- Participate in regular cleanup events
- Practice zero-waste lifestyle choices
- Educate friends and family about ocean conservation
- Support businesses with sustainable practices
- Advocate for policy changes in waste management

Together, we can restore Mumbai's beaches and protect our marine environment for future generations.`
            }
        };

        const content = contentTemplates[tabValue as keyof typeof contentTemplates];
        setGeneratedContent(content.content);
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
    };

    const downloadContent = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'ai-generated-content.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    AI Content Generator
                </Typography>

                <Card>
                    <CardContent>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="Social Media Posts" />
                                <Tab label="Event Descriptions" />
                                <Tab label="Educational Content" />
                            </Tabs>
                        </Box>

                        <TabPanel value={tabValue} index={0}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Generate Social Media Content
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Create engaging social media posts for beach cleanup events and environmental awareness.
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Describe your event or message"
                                placeholder="e.g., Weekend beach cleanup at Juhu Beach with 50 volunteers..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Generate Event Descriptions
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Create detailed, professional event descriptions for cleanup events and volunteer activities.
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Event details and requirements"
                                placeholder="e.g., 4-hour community beach cleanup with educational activities..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Generate Educational Content
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Create informative content about ocean conservation, environmental impact, and sustainability.
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Educational topic or theme"
                                placeholder="e.g., Impact of plastic pollution on marine life..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </TabPanel>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Button
                                variant="contained"
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AIIcon />}
                                onClick={generateContent}
                                disabled={!prompt.trim() || loading}
                            >
                                {loading ? 'Generating...' : 'Generate Content'}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => setGeneratedContent('')}
                                disabled={!generatedContent}
                            >
                                Clear
                            </Button>
                        </Box>

                        {generatedContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            Generated Content
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                startIcon={<CopyIcon />}
                                                onClick={copyToClipboard}
                                            >
                                                Copy
                                            </Button>
                                            <Button
                                                size="small"
                                                startIcon={<DownloadIcon />}
                                                onClick={downloadContent}
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            whiteSpace: 'pre-wrap',
                                            fontFamily: 'monospace',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {generatedContent}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                <Alert severity="info" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                        This AI content generator creates sample content for testing purposes.
                        In a production environment, this would integrate with actual AI services like OpenAI GPT or similar platforms.
                    </Typography>
                </Alert>
            </Box>
        </motion.div>
    );
}
