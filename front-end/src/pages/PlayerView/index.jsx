import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils';
import { Avatar, Box, Grid, Stack, Typography, CardHeader, Divider } from '@mui/material'
import { PositionCard } from './components';
import getPositionSections from './getPositionSections';



export default function PlayerView() {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState( { player: {}, rankings: {}});

  const {player, rankings } = playerData; 

  const sections = getPositionSections(player, rankings)
  console.log(sections)

  const { position, id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/PositionData/position/${position}/id/${id}`);
        setPlayerData(response.data)
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
    <Box  p={3} sx={{borderRadius: 10}}>
      <Stack alignItems="flex-start" spacing={2}>
        <CardHeader 
          title={
            <Typography variant="h2" color="white">
              {player?.player_display_name}
            </Typography>} 
          avatar={
            <Avatar sx={{width: 200, height: 200}} src={player?.headshot_url} />} 
          subheader={
            <Typography color="grey" variant="h4">
            {player?.position}
            <Divider color='white' orientation="vertical" flexItem sx={{ mx: 2, display: 'inline-block', height: '0.75em'}} />
            {player?.recent_team}
          </Typography>
          }
        />
        <Box width="100%">      
          <Typography color="white" variant="h3">
            Last Season (2023)
          </Typography>
        </Box>
        {(player?.position === "WR" || player?.position === "TE") && <PositionCard {...{playerData, sections: sections.wr}} />}
        {player?.position === "RB" && <PositionCard {...{playerData, sections: sections.rb}} />}

      </Stack>
    </Box>
  )
}

