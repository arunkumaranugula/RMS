import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAppSelector } from '../redux/hooks';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Box sx={{ 
    display: 'flex',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    '&:last-child': {
      borderBottom: 'none'
    }
  }}>
    <Box sx={{ 
      width: '40%',
      p: 2, 
      bgcolor: 'rgba(0, 0, 0, 0.02)',
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      display: 'flex',
      alignItems: 'center',
      minWidth: '200px'
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
    <Box sx={{ 
      width: '60%',
      p: 2,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Typography>
        {value}
      </Typography>
    </Box>
  </Box>
);

const MemberInfo: React.FC = () => {
  const user = useAppSelector(state => (state as any).user.user);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" sx={{ pt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6">No user info available.</Typography>
        </Paper>
      </Box>
    );
  }

  const userInfo = [
    { label: 'Username', value: user.username },
    { label: 'First Name', value: user.firstName },
    { label: 'Last Name', value: user.lastName },
    { label: 'Email', value: user.emailId },
    { label: 'Phone', value: user.phoneNumber },
    { label: 'Date of Birth', value: user.dob }
  ];

  return (
    <Box display="flex" justifyContent="center" width="100%" sx={{ pt: 4 }}>
      <Paper sx={{ 
        width: '100%',
        maxWidth: '800px',
        overflow: 'hidden',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: 1
      }}>
        <Box sx={{ p: 3, borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Member Info</Typography>
        </Box>
        <Box>
          {userInfo.map(info => (
            <InfoRow key={info.label} label={info.label} value={info.value} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default MemberInfo;
