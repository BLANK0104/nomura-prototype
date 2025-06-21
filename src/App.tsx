import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AIContentGenerator from './pages/AIContentGenerator';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import EventManagement from './pages/EventManagement';
import Gamification from './pages/Gamification';
import ResourceManagement from './pages/ResourceManagement';
import ScheduleCleanup from './pages/ScheduleCleanup';
import SocialFeed from './pages/SocialFeed';
import UserProgress from './pages/UserProgress';
import VolunteerProfile from './pages/VolunteerProfile';

// Ocean/Beach themed color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#0077be', // Ocean blue
      light: '#4da6d9',
      dark: '#005a91',
    },
    secondary: {
      main: '#26a69a', // Teal/turquoise
      light: '#6bb6ae',
      dark: '#00695c',
    },
    background: {
      default: '#f8fffe',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50', // Green for environmental themes
    },
    warning: {
      main: '#ff9800', // Sandy orange
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 119, 190, 0.1)',
          borderRadius: 16,
        },
      },
    },
  },
});

function AppContent() {
  const { user, login } = useAuth();

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard />
            </motion.div>
          } />
          <Route path="/social" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SocialFeed />
            </motion.div>
          } />
          <Route path="/events" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EventManagement />
            </motion.div>
          } />
          <Route path="/gamification" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Gamification />
            </motion.div>
          } />
          <Route path="/analytics" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Analytics />
            </motion.div>
          } />
          <Route path="/profile" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VolunteerProfile />
            </motion.div>
          } />          <Route path="/resources" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResourceManagement />
            </motion.div>
          } />
          <Route path="/schedule" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ScheduleCleanup />
            </motion.div>
          } />
          <Route path="/user-progress" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserProgress />
            </motion.div>
          } />
          <Route path="/ai-content" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIContentGenerator />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
