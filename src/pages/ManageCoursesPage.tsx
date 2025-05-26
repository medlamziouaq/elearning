import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert, TextField, Stack } from '@mui/material';
import { ethers } from 'ethers';

const ManageCoursesPage: React.FC = () => {
  const { contract, account, role } = useWeb3();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [progressInputs, setProgressInputs] = useState<{ [key: string]: string }>({});
  const [updating, setUpdating] = useState<string | null>(null);
  const [minting, setMinting] = useState<string | null>(null);
  const [learners, setLearners] = useState<{ [courseName: string]: string[] }>({});
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!contract || !account) return;
      setLoading(true);
      setError(null);
      try {
        const allCourses = await contract.getAllCourses();
        const mine = allCourses.filter((c: any) => c.formateur.toLowerCase() === account.toLowerCase());
        setMyCourses(mine);
        // Pour chaque cours, trouver les inscrits
        const learnersObj: { [courseName: string]: string[] } = {};
        const progressesObj: { [key: string]: number } = {};
        for (const course of mine) {
          // On ne peut pas lister tous les inscrits on-chain sans event indexé, donc on simule pour la démo
          // À remplacer par un backend ou un event indexé pour la prod
          learnersObj[course.name] = [];
        }
        setLearners(learnersObj);
        setProgresses(progressesObj);
      } catch (err: any) {
        setError('Erreur lors de la récupération de vos cours');
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [contract, account, success]);

  // Pour la démo, lister les inscrits manuellement (à remplacer par un backend ou un event indexé)
  // Ici, on suppose que le formateur connaît les adresses des inscrits

  const handleUpdateProgress = async (courseName: string, learner: string) => {
    if (!contract || !account) return;
    setUpdating(courseName + learner);
    setError(null);
    setSuccess(null);
    try {
      const newProgress = Number(progressInputs[courseName + learner]);
      const tx = await contract.updateProgress(courseName, learner, newProgress);
      await tx.wait();
      setSuccess('Progression mise à jour !');
    } catch (err: any) {
      setError('Erreur lors de la mise à jour : ' + (err.reason || err.message));
    } finally {
      setUpdating(null);
    }
  };

  const handleMintCertificate = async (courseName: string, learner: string) => {
    if (!contract || !account) return;
    setMinting(courseName + learner);
    setError(null);
    setSuccess(null);
    try {
      const tokenURI = `https://certs.example.com/${courseName}_${learner}.json`;
      const tx = await contract.mintCertificate(learner, courseName, tokenURI);
      await tx.wait();
      setSuccess('Certificat minté avec succès !');
    } catch (err: any) {
      setError('Erreur lors du mint : ' + (err.reason || err.message));
    } finally {
      setMinting(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Gestion de mes cours</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {myCourses.length === 0 && !loading && <Typography>Vous n'avez créé aucun cours.</Typography>}
      {myCourses.map((course, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{course.name}</Typography>
            <Typography>{course.description}</Typography>
            <Typography>Apprenants inscrits :</Typography>
            {learners[course.name] && learners[course.name].length === 0 && (
              <Typography variant="body2">Aucun inscrit (démo : à remplacer par une vraie liste)</Typography>
            )}
            {learners[course.name] && learners[course.name].map((learner, lidx) => (
              <Box key={lidx} sx={{ mb: 1, mt: 1, pl: 2, borderLeft: '2px solid #eee' }}>
                <Typography variant="body2">{learner}</Typography>
                <Typography variant="body2">Progression : {progresses[course.name + learner] || 0}%</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    label="Nouvelle progression (%)"
                    size="small"
                    type="number"
                    value={progressInputs[course.name + learner] || ''}
                    onChange={e => setProgressInputs({ ...progressInputs, [course.name + learner]: e.target.value })}
                    inputProps={{ min: 0, max: 100 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={updating === course.name + learner}
                    onClick={() => handleUpdateProgress(course.name, learner)}
                  >
                    {updating === course.name + learner ? <CircularProgress size={16} /> : 'Mettre à jour'}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={minting === course.name + learner}
                    onClick={() => handleMintCertificate(course.name, learner)}
                  >
                    {minting === course.name + learner ? <CircularProgress size={16} /> : 'Minter Certificat'}
                  </Button>
                </Stack>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ManageCoursesPage; 