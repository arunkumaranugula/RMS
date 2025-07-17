import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Link, Alert, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { loadUsers } from '../data/userStorage';

interface LoginPageProps {
  onSignupClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignupClick }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Username and password are required.');
      return;
    }
    const users = loadUsers();
    const user = users.find(u => u.username === form.username && u.password === form.password);
    if (!user) {
      setError('Invalid username or password.');
      return;
    }
    dispatch(login(user));
    // Optionally, redirect or show profile after login
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} />
            <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
          </Stack>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Link href="#" underline="hover" onClick={e => { e.preventDefault(); onSignupClick(); }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
