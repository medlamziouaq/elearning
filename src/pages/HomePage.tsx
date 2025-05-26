import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, background: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h3" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
          Plateforme Décentralisée de Cours en Ligne
        </Typography>
        <Typography variant="h6" gutterBottom color="secondary">
          Publiez, suivez et certifiez vos compétences grâce à la blockchain.
        </Typography>
        <Stack spacing={2} mt={3}>
          <Typography>- Certificats NFT après réussite</Typography>
          <Typography>- Paiement des cours en crypto</Typography>
          <Typography>- Suivi des progrès sur la blockchain</Typography>
          <Typography>- Gestion des rôles (apprenant, formateur, admin)</Typography>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<WalletIcon />}
          sx={{ mt: 4, px: 5, fontSize: 18, borderRadius: 8, boxShadow: 2 }}
          href="/login"
        >
          Se connecter avec MetaMask
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage; 