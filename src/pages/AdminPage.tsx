import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Box, Typography, TextField, Button, Alert, Stack, CircularProgress } from '@mui/material';

const AdminPage: React.FC = () => {
  const { contract, account, role } = useWeb3();
  const [formateur, setFormateur] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddFormateur = async () => {
    setSuccess(null); setError(null);
    if (!contract) return setError('Contrat non chargé');
    setLoadingAdd(true);
    try {
      const tx = await contract.addFormateur(formateur);
      await tx.wait();
      setSuccess('Formateur ajouté avec succès !');
      setFormateur('');
    } catch (err: any) {
      setError('Erreur lors de l\'ajout du formateur.');
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleRemoveFormateur = async () => {
    setSuccess(null); setError(null);
    if (!contract) return setError('Contrat non chargé');
    setLoadingRemove(true);
    try {
      const tx = await contract.removeFormateur(formateur);
      await tx.wait();
      setSuccess('Formateur supprimé avec succès !');
      setFormateur('');
    } catch (err: any) {
      setError('Erreur lors de la suppression du formateur.');
    } finally {
      setLoadingRemove(false);
    }
  };

  const handleWithdraw = async () => {
    setSuccess(null); setError(null);
    if (!contract) return setError('Contrat non chargé');
    setLoadingWithdraw(true);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSuccess('Fonds retirés avec succès !');
    } catch (err: any) {
      setError('Erreur lors du retrait des fonds.');
    } finally {
      setLoadingWithdraw(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Espace Administrateur</Typography>
      <Typography variant="body1" gutterBottom>Gestion des formateurs & retrait des fonds</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <TextField
          label="Adresse du formateur"
          value={formateur}
          onChange={e => setFormateur(e.target.value)}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAddFormateur} disabled={loadingAdd}>
          {loadingAdd ? <CircularProgress size={20} /> : 'Ajouter'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleRemoveFormateur} disabled={loadingRemove}>
          {loadingRemove ? <CircularProgress size={20} /> : 'Supprimer'}
        </Button>
      </Stack>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="success" onClick={handleWithdraw} disabled={loadingWithdraw}>
          {loadingWithdraw ? <CircularProgress size={20} /> : 'Retirer les fonds du contrat'}
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default AdminPage; 