import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Link, CircularProgress, Grid, Alert } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';

interface Certificate {
  tokenId: number;
  courseName: string;
  tokenURI: string;
}

const MyCertificates: React.FC = () => {
  const { contract, account } = useWeb3();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!contract || !account) return;
      setLoading(true);
      setError(null);
      try {
        const balance = await contract.balanceOf(account);
        const certs: Certificate[] = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          const tokenURI = await contract.tokenURI(tokenId);
          // On ne peut pas récupérer le nom du cours directement, donc on l'affiche comme "Certificat #{tokenId}"
          certs.push({ tokenId: tokenId.toNumber(), courseName: `Certificat #${tokenId}`, tokenURI });
        }
        setCertificates(certs);
      } catch (err: any) {
        setError('Erreur lors de la récupération des certificats.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [contract, account]);

  if (!account) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Mes certificats NFT</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {certificates.map(cert => (
          <Grid item xs={12} sm={6} md={4} key={cert.tokenId}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{cert.courseName}</Typography>
                <Typography variant="body2">Token ID : {cert.tokenId}</Typography>
                <Link href={cert.tokenURI} target="_blank" rel="noopener">
                  Voir le certificat
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!loading && certificates.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>Aucun certificat trouvé.</Typography>
      )}
    </Box>
  );
};

export default MyCertificates; 