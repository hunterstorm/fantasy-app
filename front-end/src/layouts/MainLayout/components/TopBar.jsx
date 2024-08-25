import React from 'react'
import {  Button, Stack, AppBar, Toolbar, Typography } from "@mui/material";
import { Menu } from '@mui/icons-material';
import { useAuth } from '../../../providers/AuthProvider';

export default function TopBar({ open, toggleDrawer }) {
    const { signOut } = useAuth()
  return (
    
        <AppBar>
            <Toolbar>           
                <Stack direction="row" justifyContent="space-between" px={5} alignItems="center" width="100%">
                    <Button icon onClick={toggleDrawer(true)} sx={{color:'white'}}>
                        <Menu />
                    </Button>
                    <Button variant="contained" color="secondary" py={2} onClick={() => signOut()}>
                        Sign Out
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
  )
}