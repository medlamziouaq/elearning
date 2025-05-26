import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';

const MintCertificateForm: React.FC = () => {
  const { contract, account } = useWeb3();
  const [to, setTo] = useState('');
  const [courseName, setCourseName] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (!contract) return setError('Contrat non chargé');
    setLoading(true);
    try {
      const tx = await contract.mintCertificate(to, courseName, tokenURI, { value: await contract.mintPrice() });
      await tx.wait();
      setSuccess('Certificat minté avec succès !');
      setTo('');
      setCourseName('');
      setTokenURI('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors du mint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Mint un certificat NFT</Typography>
      <form onSubmit={handleMint}>
        <TextField
          label="Adresse de l'apprenant"
          value={to}
          onChange={e => setTo(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nom du cours"
          value={courseName}
          onChange={e => setCourseName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Token URI (lien du certificat)"
          value={tokenURI}
          onChange={e => setTokenURI(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Minter'}
          </Button>
        </Box>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
    </Box>
  );
};

export default MintCertificateForm; 