import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Link, Alert, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/membersSlice';
import { loadUsers, saveUsers } from '../data/userStorage';

interface SignupFormProps {
  onLoginClick: () => void;
}

const SignupPage: React.FC<SignupFormProps> = ({ onLoginClick }) => {
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    dob: '',
    phoneNumber: '',
    emailId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // Basic validation
    if (!form.username || !form.password || !form.firstName || !form.lastName || !form.dob || !form.phoneNumber || !form.emailId) {
      setError('All fields are required.');
      return;
    }
    // Check for existing user
    const users = loadUsers();
    if (users.some(u => u.username === form.username)) {
      setError('Username already exists.');
      return;
    }
    // Save user
    const newUsers = [...users, form];
    saveUsers(newUsers);
    dispatch(addMember(form));
    setSuccess(true);
    setTimeout(() => {
      onLoginClick();
    }, 1200);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Signup successful! Redirecting to login...</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} required />
            <Box display="flex" gap={2}>
              <TextField fullWidth label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
              <TextField fullWidth label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
            </Box>
            <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
            <TextField fullWidth label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            <TextField fullWidth label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
            <TextField fullWidth label="Email ID" name="emailId" value={form.emailId} onChange={handleChange} required />
            <Button fullWidth variant="contained" color="primary" type="submit">Sign Up</Button>
          </Stack>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="#" underline="hover" onClick={onLoginClick}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
