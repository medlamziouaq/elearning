import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert, Link } from '@mui/material';
import { ethers } from 'ethers';

const MyCoursesPage: React.FC = () => {
  const { contract, account, role } = useWeb3();
  const [courses, setCourses] = useState<any[]>([]);
  const [progresses, setProgresses] = useState<{ [courseName: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [minting, setMinting] = useState<string | null>(null);
  const [certLinks, setCertLinks] = useState<{ [courseName: string]: string }>({});

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!contract || !account) return;
      setLoading(true);
      setError(null);
      try {
        const allCourses = await contract.getAllCourses();
        // Filtrer les cours où l'utilisateur est inscrit
        const enrolledCourses = [];
        for (const course of allCourses) {
          const isEnrolled = await contract.enrolled(course.name, account);
          if (isEnrolled) {
            enrolledCourses.push(course);
          }
        }
        setCourses(enrolledCourses);
        // Récupérer la progression pour chaque cours
        const progressesObj: { [courseName: string]: number } = {};
        for (const course of enrolledCourses) {
          const prog = await contract.getProgress(course.name, account);
          progressesObj[course.name] = Number(prog);
        }
        setProgresses(progressesObj);
      } catch (err: any) {
        setError('Erreur lors de la récupération de vos cours');
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [contract, account, success]);

  const handleMintCertificate = async (course: any) => {
    if (!contract || !account) return;
    setMinting(course.name);
    setError(null);
    setSuccess(null);
    try {
      // Pour la démo, on génère un tokenURI factice (à remplacer par un vrai lien IPFS si besoin)
      const tokenURI = `https://certs.example.com/${course.name}_${account}.json`;
      const tx = await contract.mintCertificate(account, course.name, tokenURI);
      await tx.wait();
      setSuccess('Certificat minté avec succès !');
      setCertLinks(prev => ({ ...prev, [course.name]: tokenURI }));
    } catch (err: any) {
      setError('Erreur lors du mint du certificat : ' + (err.reason || err.message));
    } finally {
      setMinting(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom>Mes cours</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {courses.length === 0 && !loading && <Typography>Vous n'êtes inscrit à aucun cours.</Typography>}
      {courses.map((course, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{course.name}</Typography>
            <Typography>{course.description}</Typography>
            <Typography>Formateur : {course.formateur}</Typography>
            <Typography>Progression : {progresses[course.name] || 0}%</Typography>
            {progresses[course.name] === 100 && !certLinks[course.name] && (
              <Button variant="contained" color="success" onClick={() => handleMintCertificate(course)} disabled={minting === course.name}>
                {minting === course.name ? <CircularProgress size={20} /> : 'Obtenir mon certificat NFT'}
              </Button>
            )}
            {certLinks[course.name] && (
              <Link href={certLinks[course.name]} target="_blank" rel="noopener">
                Voir mon certificat NFT
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyCoursesPage; 