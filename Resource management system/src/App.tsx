

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MemberInfo from './components/MemberInfo';
import MemberList from './components/MemberList';
import LandingImages from './components/LandingImages';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAppSelector } from './redux/hooks';



function App() {
  const [showSignup, setShowSignup] = React.useState(false);
  const [menu, setMenu] = React.useState('Member Info');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isAuthenticated = useAppSelector(state => (state as any).user.isAuthenticated);
  const prevAuth = React.useRef(isAuthenticated);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowSignup(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleMenuSelect = (item: string) => {
    setMenu(item);
    // Removed setDrawerOpen(false) to keep menu open after selection
  };

  // Navigate to Member Info after login
  React.useEffect(() => {
    if (!prevAuth.current && isAuthenticated) {
      setMenu('Member Info');
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        <LandingImages />
        <Box sx={{ mt: 6, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {showSignup ? (
              <SignupPage onLoginClick={handleShowLogin} />
            ) : (
              <LoginPage onSignupClick={handleShowSignup} />
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1201 }}>
        <TopBar onLoginClick={handleShowLogin} onMenuClick={isAuthenticated ? handleDrawerOpen : undefined} />
      </Box>
      <Box sx={{ display: 'flex', mt: 8 }}>
        {isDesktop ? (
          <>
            {drawerOpen && (
              <Box sx={{ width: 240, bgcolor: 'background.paper', boxShadow: 1, position: 'fixed', top: 64, bottom: 0, left: 0 }}>
                <SideMenu selected={menu} onSelect={handleMenuSelect} />
              </Box>
            )}
            <Box sx={{ 
                flexGrow: 1, 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center',
                width: '100%',
                marginLeft: drawerOpen ? '240px' : 0,
                transition: 'margin-left 0.2s'
              }}>
              <Box sx={{ 
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {menu === 'Member Info' && <MemberInfo />}
                {menu === 'Member List' && <MemberList />}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Drawer 
              open={drawerOpen} 
              onClose={handleDrawerClose} 
              anchor="top" 
              PaperProps={{ 
                sx: { 
                  mt: 8,
                  maxHeight: 'calc(100vh - 64px)',
                  overflow: 'auto'
                } 
              }}
            >
              <SideMenu selected={menu} onSelect={handleMenuSelect} />
            </Drawer>
            <Box sx={{ flexGrow: 1, p: 3, display: 'flex', width: '100%' }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                {menu === 'Member Info' && <MemberInfo />}
                {menu === 'Member List' && <MemberList />}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
