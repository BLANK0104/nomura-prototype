import {
  Add,
  Comment,
  EmojiEvents,
  Favorite,
  FavoriteBorder,
  LocationOn,
  PhotoCamera,
  Share,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Fab,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Mock data for social posts
const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Priya Sharma',
      avatar: 'P',
      badges: ['Environmental Hero', 'Beach Champion'],
    },
    timestamp: '2 hours ago',
    location: 'Juhu Beach, Mumbai',
    content: 'Amazing cleanup session today! Collected 50kg of plastic waste with our amazing team. The before and after photos show the incredible impact we can make together!',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    likes: 47,
    comments: 12,
    isLiked: false,
    impact: {
      wasteCollected: '50kg',
      co2Saved: '2.5kg',
      treesEquivalent: '0.8',
    }
  },
  {
    id: 2,
    user: {
      name: 'Rajesh Kumar',
      avatar: 'R',
      badges: ['AI Pioneer', 'Waste Detective'],
    },
    timestamp: '4 hours ago',
    location: 'Marine Drive, Mumbai',
    content: 'Used our AI waste detection feature today - it correctly identified 95% of plastic types! Technology making cleanup efforts more efficient. #TechForGood #CleanIndia',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
    likes: 32,
    comments: 8,
    isLiked: true,
    impact: {
      wasteCollected: '35kg',
      co2Saved: '1.8kg',
      treesEquivalent: '0.6',
    }
  },
  {
    id: 3,
    user: {
      name: 'Anita Desai',
      avatar: 'A',
      badges: ['Community Leader', 'Volunteer Mentor'],
    },
    timestamp: '1 day ago',
    location: 'Versova Beach, Mumbai',
    content: 'Mentoring 15 new volunteers today! Their enthusiasm is contagious. We sorted waste into 8 categories and learned about proper recycling techniques.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    likes: 68,
    comments: 15,
    isLiked: false,
    impact: {
      wasteCollected: '120kg',
      co2Saved: '6.2kg',
      treesEquivalent: '2.1',
    }
  },
];

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
          Community Feed
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Share your cleanup journey and inspire others!
        </Typography>
      </Box>

      {/* Create Post Button */}
      <motion.div variants={itemVariants}>
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>V</Avatar>
              <TextField
                fullWidth
                placeholder="Share your cleanup experience..."
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
              <Button
                variant="contained"
                startIcon={<PhotoCamera />}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                Upload Photo
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts Feed */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {posts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Card sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 119, 190, 0.15)',
              }
            }}>
              {/* Post Header */}
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {post.user.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {post.user.name}
                      </Typography>
                      {post.user.badges.map((badge, index) => (
                        <Chip
                          key={index}
                          label={badge}
                          size="small"
                          icon={<EmojiEvents />}
                          sx={{
                            backgroundColor: 'secondary.light',
                            color: 'secondary.dark',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {post.timestamp}
                      </Typography>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">
                        {post.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Post Content */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>

                {/* Environmental Impact Stats */}
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 2,
                  p: 2,
                  backgroundColor: 'background.default',
                  borderRadius: 2,
                  mb: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                      {post.impact.wasteCollected}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Waste Collected
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                      {post.impact.co2Saved}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      CO₂ Reduced
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 700 }}>
                      {post.impact.treesEquivalent}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Trees Equivalent
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              {/* Post Image */}
              <CardMedia
                component="img"
                height="300"
                image={post.image}
                alt="Cleanup activity"
                sx={{ objectFit: 'cover' }}
              />

              {/* Post Actions */}
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() => handleLike(post.id)}
                      sx={{ color: post.isLiked ? 'error.main' : 'text.secondary' }}
                    >
                      {post.isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {post.likes}
                    </Typography>

                    <IconButton sx={{ color: 'text.secondary', ml: 2 }}>
                      <Comment />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {post.comments}
                    </Typography>

                    <IconButton sx={{ color: 'text.secondary', ml: 2 }}>
                      <Share />
                    </IconButton>
                  </Box>

                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add post"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Add />
      </Fab>
    </motion.div>
  );
};

export default SocialFeed;
