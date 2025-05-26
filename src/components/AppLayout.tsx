import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';

const drawerWidth = 220;

const AppLayout: React.FC = () => {
  const { role } = useWeb3();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Plateforme E-Learning Blockchain
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link as any} to="/">
              <ListItemText primary="Accueil" />
            </ListItem>
            <ListItem button component={Link as any} to="/courses">
              <ListItemText primary="Cours" />
            </ListItem>
            {role === 'apprenant' && (
              <ListItem button component={Link as any} to="/my-courses">
                <ListItemText primary="Mes cours" />
              </ListItem>
            )}
            {role === 'formateur' && (
              <ListItem button component={Link as any} to="/manage-courses">
                <ListItemText primary="Gestion des cours" />
              </ListItem>
            )}
            {role === 'admin' && (
              <ListItem button component={Link as any} to="/admin">
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            <ListItem button component={Link as any} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout; 