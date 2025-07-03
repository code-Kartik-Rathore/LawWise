import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import EventIcon from '@mui/icons-material/Event';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ background: '#ffffff', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            LawWise
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/news"
              startIcon={<NewspaperIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              News
            </Button>
{/*             <Button
              component={RouterLink}
              to="/blogs"
              startIcon={<BookIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              Blogs
            </Button> */}
            <Button
              component={RouterLink}
              to="/document-analysis"
              startIcon={<DescriptionIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              Analyze Documents
            </Button>
            <Button
              component={RouterLink}
              to="/community"
              startIcon={<ForumIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              Community
            </Button>
            <Button
              component={RouterLink}
              to="/book-appointment"
              startIcon={<EventIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: '#2563EB',
                },
              }}
            >
              Book Consultation
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={() => navigate('/profile')}
                  sx={{ color: 'text.primary' }}
                >
                  <PersonIcon />
                </IconButton>
                <Button
                  onClick={logout}
                  variant="outlined"
                  sx={{
                    borderColor: '#2563EB',
                    color: '#2563EB',
                    '&:hover': {
                      borderColor: '#1E40AF',
                      backgroundColor: 'rgba(37, 99, 235, 0.04)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1E40AF 0%, #0284C7 100%)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
