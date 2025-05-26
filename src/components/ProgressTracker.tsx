import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, Stack } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';

const ProgressTracker: React.FC = () => {
  const { contract, account, role } = useWeb3();
  // Pour l'apprenant : suivi de ses progrès
  const [courseName, setCourseName] = useState('');
  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Pour le formateur : mise à jour du progrès d'un apprenant
  const [learner, setLearner] = useState('');
  const [newProgress, setNewProgress] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState<string | null>(null);
  const [errorUpdate, setErrorUpdate] = useState<string | null>(null);

  // Apprenant : récupérer son progrès
  const handleGetProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setProgress(null);
    if (!contract || !account) return setError('Contrat non chargé');
    setLoading(true);
    try {
      const prog = await contract.getProgress(courseName, account);
      setProgress(prog);
      setSuccess('Progrès récupéré !');
    } catch (err: any) {
      setError('Erreur lors de la récupération du progrès.');
    } finally {
      setLoading(false);
    }
  };

  // Formateur : mettre à jour le progrès d'un apprenant
  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorUpdate(null);
    setSuccessUpdate(null);
    if (!contract) return setErrorUpdate('Contrat non chargé');
    setLoadingUpdate(true);
    try {
      const tx = await contract.updateProgress(courseName, learner, parseInt(newProgress));
      await tx.wait();
      setSuccessUpdate('Progrès mis à jour !');
      setLearner('');
      setNewProgress('');
    } catch (err: any) {
      setErrorUpdate('Erreur lors de la mise à jour du progrès.');
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Suivi des progrès</Typography>
      {role === 'apprenant' && (
        <form onSubmit={handleGetProgress}>
          <Stack spacing={2}>
            <TextField
              label="Nom du cours"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Voir mon progrès'}
            </Button>
            {progress !== null && <Alert severity="info">Progrès : {progress}%</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </form>
      )}
      {role === 'formateur' && (
        <form onSubmit={handleUpdateProgress}>
          <Stack spacing={2}>
            <TextField
              label="Nom du cours"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              required
            />
            <TextField
              label="Adresse de l'apprenant"
              value={learner}
              onChange={e => setLearner(e.target.value)}
              required
            />
            <TextField
              label="Nouveau progrès (%)"
              value={newProgress}
              onChange={e => setNewProgress(e.target.value)}
              type="number"
              inputProps={{ min: 0, max: 100 }}
              required
            />
            <Button type="submit" variant="contained" disabled={loadingUpdate}>
              {loadingUpdate ? <CircularProgress size={20} /> : 'Mettre à jour le progrès'}
            </Button>
            {successUpdate && <Alert severity="success">{successUpdate}</Alert>}
            {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default ProgressTracker; 