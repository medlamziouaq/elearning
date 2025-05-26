import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, deepPurple, pink, grey } from '@mui/material/colors';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import AppLayout from './components/AppLayout';
import CoursesPage from './pages/CoursesPage';
import MyCoursesPage from './pages/MyCoursesPage';
import ManageCoursesPage from './pages/ManageCoursesPage';
import AdminPage from './pages/AdminPage';
import RoleGuard from './components/RoleGuard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: deepPurple[600] },
    secondary: { main: pink[400] },
    background: {
      default: grey[50],
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px 0 rgba(80, 80, 160, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #7b1fa2 0%, #1976d2 100%)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/my-courses" element={
              <RoleGuard allowed={['apprenant']}>
                <MyCoursesPage />
              </RoleGuard>
            } />
            <Route path="/manage-courses" element={
              <RoleGuard allowed={['formateur']}>
                <ManageCoursesPage />
              </RoleGuard>
            } />
            <Route path="/admin" element={
              <RoleGuard allowed={['admin']}>
                <AdminPage />
              </RoleGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
