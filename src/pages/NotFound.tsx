import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => (
  <Box sx={{ mt: 10, textAlign: 'center' }}>
    <Typography variant="h2" color="error" gutterBottom>
      404
    </Typography>
    <Typography variant="h5">Page non trouvée</Typography>
  </Box>
);

export default NotFound; 