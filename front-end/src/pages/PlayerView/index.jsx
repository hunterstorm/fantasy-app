import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils';
import { Avatar, Box, Grid, Stack, Typography, CardHeader, Divider } from '@mui/material'

export default function PlayerView() {
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState();

  const { position, id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/PositionData/position/${position}/id/${id}`);
        setPlayer(response.data)
      } catch (err) {
        console.error(err)
      }finally {
        setIsLoading(false);
      }
    }

    if(position && id) {
      fetchData();
    }
 
  },[])
  return (
    <Box bgcolor="white" p={3} sx={{borderRadius: 10}}>
      <Stack alignItems="flex-start" spacing={2}>
        <CardHeader 
          title={
            <Typography variant="h2">
              {player?.player_display_name}
            </Typography>} 
          avatar={
            <Avatar sx={{width: 200, height: 200}} src={player?.headshot_url} />} 
          subheader={
            <Typography color="text.secondary" variant="h4">
            {player?.position}
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: 'inline-block', height: '0.75em'}} />
            {player?.recent_team}
          </Typography>
          }
        />
        <Box width="100%">      
          <Typography color="text.secondary" variant="h3">
          Last Season (2023)
          </Typography>
        </Box>
        <Grid container >
        <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
          <Stack spacing={1}>            
            <Typography color="text.secondary" variant="h4">
              Total PPR
            </Typography>
            <Typography variant="h5">
              {player?.total_ppr}
            </Typography>
          </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}> 
              <Typography color="text.secondary" variant="h4">
                Total Receptions
              </Typography>
              <Typography variant="h5">
                {player?.total_rec}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}> 
              <Typography color="text.secondary" variant="h4">
                Total Rec TD
              </Typography>
              <Typography variant="h5">
                {player?.total_rec_tds}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}> 
              <Typography color="text.secondary" variant="h4">
                Total Rec Yards
              </Typography>
              <Typography variant="h5">
                {player?.total_rec_yards}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}> 
              <Typography color="text.secondary" variant="h4">
                Avg Target Share
              </Typography>
              <Typography variant="h5">
                {(player?.avg_target_share * 100).toFixed(0)}%
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}> 
              <Typography color="text.secondary" variant="h4">
                Avg Rec EPA
              </Typography>
              <Typography variant="h5">
                {player?.avg_rec_epa}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="h4">
                Total Targets
              </Typography>
              <Typography variant="h5">
                {player?.total_targets}
              </Typography>
            </Stack>
          </Grid>
          <Grid item sx={{ p:2 }} xs={12} sm={6} lg={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="h4">
                Total YAC
              </Typography>
              <Typography variant="h5">
                {player?.total_yac}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

