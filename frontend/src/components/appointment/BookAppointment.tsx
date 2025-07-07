import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { AppointmentsProvider } from './context/AppointmentsContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/navigation/Navbar';
import LandingPage from './components/home/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BlogList from './components/blog/BlogList';
import DocumentAnalyzer from './components/document/DocumentAnalyzer';
import NewsSection from './components/news/NewsSection';
import MotionButton from './components/MotionButton';
import Footer from './components/layout/Footer';
import LegalChatbot from './components/chat/LegalChatbot';
import Community from './components/community/Community';
import BookAppointment from './components/appointment/BookAppointment';
import VideoCall from './components/video/VideoCall';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Bright blue
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#38BDF8', // Sky blue
      light: '#7DD3FC',
      dark: '#0284C7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02857em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
          boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1E40AF 0%, #0284C7 100%)',
            boxShadow: '0 6px 20px 0 rgba(37, 99, 235, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px 0 rgba(37, 99, 235, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 48px 0 rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
            color: '#ffffff',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppointmentsProvider>
        <Router>
          <Navbar />
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)',
            }}
          >
            <Container sx={{ py: 4, flex: 1 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/news" element={<NewsSection />} />
                {/* <Route path="/blogs" element={<BlogList />} /> */}
                <Route path="/document-analysis" element={<DocumentAnalyzer />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/book-appointment"
                  element={
                    <ProtectedRoute>
                      <BookAppointment />
                    </ProtectedRoute>
                  }
                />
                <Route path="/video-call"
                  element={
                    <ProtectedRoute>
                      <VideoCall onEndCall={() => window.history.back()} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Container>

            <Footer />
            <LegalChatbot />
          </Box>
        </Router>
        </AppointmentsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;











