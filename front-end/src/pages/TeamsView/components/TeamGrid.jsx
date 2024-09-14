import { Grid, Card, CardActionArea, CardContent, Typography, CardMedia } from '@mui/material';

export default function TeamGrid({teams, handleClick}) {
  return (
    <Grid container spacing={3}>

    
      {teams?.map((team) => (
          <Grid item xs={12} sm={6} md={3} key={team.team_id}>
            <Card onClick={() => handleClick(team)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={team.photo_URL}
                  alt={team.team_full_name}
                />
                <CardContent>
                  <Typography variant="h6">{team.team_full_name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
      ))}
    </Grid>
  )
}
