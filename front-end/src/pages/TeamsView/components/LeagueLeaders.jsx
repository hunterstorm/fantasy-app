import React from 'react'
import { Grid, Card, CardHeader, CardContent, FormControl, InputLabel, Select, MenuItem, Box, Stack, Typography } from '@mui/material';
import { formatParams, getOrdinalSuffix } from '../../../utils';

export default function LeagueLeaders({leaders, selectedStat, onChange}) {

    
  const LeaderItem = ({ statName, teams }) => (
    <Box p={2}>
      <Stack direction="column" spacing={2}>
        {teams.map((team, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2}>
            <Typography
              color={index === 0 ? 'primary' : 'text.secondary'}
              variant={index === 0 ? "h5" : "h6"}
              sx={{ fontFamily: '"Rowdies", san-serif' }}
            >
              {getOrdinalSuffix(index + 1)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={team.photo_URL}
                alt={team.team_full_name}
                style={{ height: 50, width: 50, objectFit: 'contain', marginRight: 16 }}
              />
              <Box>
                <Typography variant="h4">{team[statName]}</Typography>
                <Typography variant="h6" color="text.secondary">{team.posteam}</Typography>
              </Box>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );

  return (
    
    <Card>
      <CardHeader title="League Leaders" titleTypographyProps={{ color: 'primary' }} />
      <CardContent>
        {leaders && (
          <FormControl fullWidth>
            <InputLabel>Select Statistic</InputLabel>
            <Select
              value={selectedStat}
              onChange={(e) => onChange(e)}
              label="Select Statistic"
            >
              {Object.keys(leaders).map((statName, index) => (
                <MenuItem key={index} value={statName}>
                  {formatParams(statName)}
                </MenuItem>
              ))}
            </Select>
            {selectedStat && (
              <Box pt={2}>
                <LeaderItem statName={selectedStat} teams={leaders[selectedStat]} />
              </Box>
            )}
          </FormControl>
        )}
      </CardContent>
    </Card>
  )
}
