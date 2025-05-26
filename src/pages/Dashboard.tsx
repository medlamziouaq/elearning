import React, { useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Button } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';
import MintCertificateForm from '../components/MintCertificateForm';
import MyCertificates from '../components/MyCertificates';
import ProgressTracker from '../components/ProgressTracker';
import AdminPanel from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { account, role, connect } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate('/login');
    }
  }, [account, navigate]);

  if (!account) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Veuillez vous connecter avec MetaMask pour accéder à votre dashboard.
        </Alert>
        <Button variant="contained" color="primary" onClick={connect}>
          Se connecter avec MetaMask
        </Button>
      </Box>
    );
  }

  if (!role) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Connecté en tant que : <b>{role}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Adresse : {account}
        </Typography>
        {role === 'admin' && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>Espace Administrateur</Typography>
            <Typography>Gestion des formateurs, retrait des fonds, gestion avancée.</Typography>
            <MintCertificateForm />
            <AdminPanel />
            {/* TODO: Ajouter les fonctionnalités admin ici */}
          </>
        )}
        {role === 'formateur' && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>Espace Formateur</Typography>
            <Typography>Mint de certificats, suivi des apprenants.</Typography>
            <MintCertificateForm />
            <ProgressTracker />
            {/* TODO: Ajouter les fonctionnalités formateur ici */}
          </>
        )}
        {role === 'apprenant' && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>Espace Apprenant</Typography>
            <Typography>Liste de vos certificats, suivi de vos progrès.</Typography>
            <MyCertificates />
            <ProgressTracker />
            {/* TODO: Ajouter les fonctionnalités apprenant ici */}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard; 