import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Grid, } from '@mui/material';
import API from '../../API';
import { TeamGrid, LeagueLeaders, TeamPageHeader, OffDefEpa } from './components';

export default function TeamsGridView() {
  const [teams, setTeams] = useState([]);
  const [leaders, setLeaders] = useState(null);
  const [selectedStat, setSelectedStat] = useState('');
  
  const nav = useNavigate();

  useEffect(() => {
    API.teams.getAll().then((r) => {
      setTeams(r);
    });

    API.teams.getLeaders().then((r) => {
      setLeaders(r);
      if (r && Object.keys(r).length > 0) {
        setSelectedStat(Object.keys(r)[0]); // Set the first stat as default selected
      }
    });
  }, []);

  const handleTeamClick = (team) => {
    nav(`${team.posteam}`);
    console.log('Selected team:', team);
  };

  const handleSelectChange = (event) => {
    setSelectedStat(event.target.value);
  };


  return (
    <Stack rowGap={2}>
      <Typography variant="h2" color="white" gutterBottom>
        Teams
      </Typography>
      {/* <TeamPageHeader />  */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <LeagueLeaders {...{leaders, selectedStat, onChange:(e) => handleSelectChange(e)}} />
        </Grid>
        <Grid item xs={12} md={8}>
          <OffDefEpa />
        </Grid>
      </Grid>
      
      <TeamGrid {...{teams, handleClick:(team) => handleTeamClick(team)}} />
    </Stack>
  );
}
