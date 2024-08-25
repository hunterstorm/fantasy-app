import React from 'react';
import { Grid, Stack, Typography, Card, CardContent, Box, Divider } from '@mui/material';
import { getOrdinalSuffix } from '../../../../utils';

const StatItem = ({ label, value, icon, rank }) => (
  <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center',  minWidth: 200 }}>
    <Stack direction="row" spacing={2} alignItems="center">
      {icon && <Box>{icon}</Box>}
      <Box>
        <Typography color="text.secondary" variant="h6">
          {label}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="h5" fontWeight="bold">
            {value}
            </Typography>
            {rank &&             
                <Typography variant="h5" color="primary"  sx={{fontFamily:'"Rowdies", sans-serif'}}>
                    {getOrdinalSuffix(rank)}
                </Typography>
            }
        </Stack>
      </Box>
    </Stack>
  </Grid>
);

export default function PositionCard({sections}) {

  return (
    <Stack spacing={4}>
      {sections.map((section) => (
        <Card key={section.title} sx={{ borderRadius: 5, p: 2, boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {section.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3} alignItems="center" >
              {section.stats.map((stat, index) => (
                <StatItem key={index} {...stat}/>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
