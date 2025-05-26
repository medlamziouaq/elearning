import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWeb3 } from '../context/Web3Context';

const LoginPage: React.FC = () => {
  const { account, connect, disconnect } = useWeb3();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Connexion Web3
        </Typography>
        <Typography variant="body1" gutterBottom>
          Connectez-vous avec votre wallet MetaMask pour accéder à la plateforme.
        </Typography>
        {account ? (
          <>
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
              Connecté : {account}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={disconnect}
            >
              Se déconnecter
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<WalletIcon />}
            sx={{ mt: 2 }}
            onClick={connect}
          >
            Se connecter avec MetaMask
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage; 