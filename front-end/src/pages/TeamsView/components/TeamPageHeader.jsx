import React from 'react'
import { Grid, Card, Box, Stack, Typography, CardMedia } from '@mui/material';

export default function TeamPageHeader() {
  return (
    <Card sx={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
        <Box
            sx={{
            width: '50%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 3,
            }}
        >
            <Stack>       
                <Typography variant="h4" color="white">
                    Browse all 32 NFL teams
                </Typography>
                <Typography variant="h6" color="white">
                    Find fantasy relevant data about each team in the NFL
                </Typography>
            </Stack>
        </Box>
        <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
            <CardMedia
            component="img"
            image="https://fantasy-app.s3.us-west-2.amazonaws.com/nfl-logo.png"
            alt="NFL Logo"
            sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }}
            />
        </Box>
    </Card>
  )
}