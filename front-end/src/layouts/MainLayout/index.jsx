import {useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Page } from '../../components'
import { NavDrawer, TopBar, Background } from './components';
import { Box, Stack  } from '@mui/material';

function MainLayout() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };
  return (
    <>
    <Background />
      <Box display="flex" height="100%" >
        <TopBar open={open} toggleDrawer={toggleDrawer} />
        <NavDrawer open={open} toggleDrawer={toggleDrawer} />
        <Box width="100%" height="100%" pt={8} pb={9} overflow="auto" zIndex={1}>
          <Page> 
            <Outlet />
          </Page>
        </Box>
      </Box>
    </>
  )
}

export default MainLayout