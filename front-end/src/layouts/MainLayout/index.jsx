import {useState, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Page } from '../../components'
import { NavDrawer, TopBar, Background } from './components';
import { Box, Stack  } from '@mui/material';
import { useAuth } from "../../providers/AuthProvider";
import { getFirebaseToken, messaging } from '../../firebase';

function MainLayout() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const { isSignedIn } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
		getFirebaseToken()
			.then((payload) => {
				console.log(16, payload);
				console.log(payload);
				messaging.onMessage((payload) => {
					console.log("Message received. ", payload);
					// ...
				});
			})
			.catch((e) => console.error(e.message));
		if (!isSignedIn) nav("/login");
	}, [isSignedIn, nav]);

  
  return (
    <>
    {/* <Background /> */}
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