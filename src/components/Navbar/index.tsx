import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NavList from './NavList';
import styled from 'styled-components';
import { NoStyleLink } from '../StyleLink/NoStyleLink';
import { AuthContext } from '../../contexts';
import { useNavigate, useLocation } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const TitleLink = styled(NoStyleLink)`
    color: white;
    display: block;
  `;

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NavList />
    </Box>
  );

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setUser(null);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <React.Fragment key='left'>
            <MenuIcon
              style={{ cursor: 'pointer' }}
              onClick={toggleDrawer('left', true)}
            />
            <Drawer
              anchor='left'
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </React.Fragment>
          <Typography
            style={{ marginLeft: '20px' }}
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            <TitleLink to='/'>gma-video</TitleLink>
          </Typography>
          {!user && (
            <Button color='inherit'>
              <TitleLink to='/login'>Sign in</TitleLink>
            </Button>
          )}
          {user && (
            <Button onClick={handleLogout} color='inherit'>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
