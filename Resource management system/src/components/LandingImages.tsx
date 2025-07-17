import React from 'react';
import { Box, Typography } from '@mui/material';
import { resourceImages } from '../data/resourceImages';

const LandingImages: React.FC = () => (
  <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={4} mt={4}>
    {resourceImages.map((img, idx) => (
      <Box key={idx}>
        <img src={img} alt={`Resource ${idx + 1}`} style={{ width: 120, height: 120 }} />
      </Box>
    ))}
  </Box>
);

export default LandingImages;
