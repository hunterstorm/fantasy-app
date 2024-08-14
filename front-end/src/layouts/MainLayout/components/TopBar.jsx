import React from 'react'
import { Box, Button, Stack, AppBar, Toolbar, Typography } from "@mui/material";
import { Menu } from '@mui/icons-material';

export default function TopBar({ open, toggleDrawer }) {
  return (
    
        <AppBar>
            <Toolbar>           
                <Stack direction="row" justifyContent="space-between" px={5} alignItems="center" width="100%">
                    <Button icon onClick={toggleDrawer(true)} sx={{color:'white'}}>
                        <Menu />
                    </Button>
                    <Typography py={2}>
                        Sign in
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
  )
}