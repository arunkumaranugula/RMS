import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

import { logout } from '../redux/userSlice';

interface TopBarProps {
  onLoginClick: () => void;
  onMenuClick?: () => void;
}


import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const TopBar: React.FC<TopBarProps> = ({ onLoginClick, onMenuClick }) => {
  // removed unused theme and isDesktop
  const user = useAppSelector(state => (state as any).user.user);
  const isAuthenticated = useAppSelector(state => (state as any).user.isAuthenticated);
  const dispatch = useAppDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        {onMenuClick && (
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Resource Management System
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography sx={{ mr: 2 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
