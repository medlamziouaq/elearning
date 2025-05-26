import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Box, Typography, Button, Card, CardContent, CircularProgress, Alert, TextField, Stack } from '@mui/material';
import { ethers } from 'ethers';

const CoursesPage: React.FC = () => {
  const { contract, account, role } = useWeb3();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Formulaire création de cours (formateur)
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!contract) return;
      setLoading(true);
      setError(null);
      try {
        const allCourses = await contract.getAllCourses();
        setCourses(allCourses);
      } catch (err: any) {
        setError('Erreur lors de la récupération des cours');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [contract, success]);

  const handleEnroll = async (course: any) => {
    if (!contract || !account) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const tx = await contract.enroll(course.name, { value: course.price });
      await tx.wait();
      setSuccess('Inscription réussie !');
    } catch (err: any) {
      setError('Erreur lors de l\'inscription : ' + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;
    setCreating(true);
    setError(null);
    setSuccess(null);
    try {
      const tx = await contract.createCourse(
        courseName,
        courseDesc,
        ethers.parseEther(coursePrice)
      );
      await tx.wait();
      setSuccess('Cours créé avec succès !');
      setCourseName('');
      setCourseDesc('');
      setCoursePrice('');
    } catch (err: any) {
      setError('Erreur lors de la création du cours : ' + (err.reason || err.message));
    } finally {
      setCreating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Liste des cours</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {role === 'formateur' && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Créer un nouveau cours</Typography>
          <form onSubmit={handleCreateCourse}>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label="Nom du cours" value={courseName} onChange={e => setCourseName(e.target.value)} required />
              <TextField label="Description" value={courseDesc} onChange={e => setCourseDesc(e.target.value)} required />
              <TextField label="Prix (ETH)" value={coursePrice} onChange={e => setCoursePrice(e.target.value)} required type="number" inputProps={{ min: 0, step: 'any' }} />
              <Button type="submit" variant="contained" color="primary" disabled={creating}>
                {creating ? <CircularProgress size={20} /> : 'Créer'}
              </Button>
            </Stack>
          </form>
        </Box>
      )}
      {courses.length === 0 && !loading && <Typography>Aucun cours disponible.</Typography>}
      {courses.map((course, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{course.name}</Typography>
            <Typography>{course.description}</Typography>
            <Typography>Formateur : {course.formateur}</Typography>
            <Typography>Prix : {ethers.formatEther(course.price)} ETH</Typography>
            {role === 'apprenant' && (
              <Button variant="contained" onClick={() => handleEnroll(course)}>
                S'inscrire
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CoursesPage; 