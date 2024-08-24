import { Box, Drawer, Typography, useTheme, useMediaQuery } from '@mui/material';
import { NavSection } from './components';

const drawerWidth = 380; 

export default function NavDrawer({open, toggleDrawer}) {
 
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>

      <Drawer
        variant={isMdDown ? 'temporary' : 'permanent'}
        open={isMdDown ? open : true}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box p={4}>
          <NavSection />
        </Box>
      </Drawer>
    </>
  );
}
