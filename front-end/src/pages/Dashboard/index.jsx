import { useEffect } from 'react'
import { PositionTable, OffDefEpa } from './components'
import { Divider, Grid, Typography, Stack } from '@mui/material';
import { usePageContext } from '../../providers/PageProvider';

export default function Dashboard() {

    const { setPageProps } = usePageContext();

    const title = "Dashboard";

    useEffect(() => {
        setPageProps({ title: title })
    },[setPageProps])
  return (

    <Stack>
        <Typography variant="h2" color="primary">
            Dashboard
        </Typography>
        <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <Divider 
                        sx={{
                            color:'white',     
                            "&::before, &::after": {
                            borderColor: "secondary.light",
                        },}} 
                    >               
                        <Typography variant="h4">
                            Position Data
                        </Typography>
                    </Divider>
                    <PositionTable />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2} >
                    <Divider 
                        sx={{
                            color:'white',     
                            "&::before, &::after": {
                            borderColor: "secondary.light",
                        },}} 
                    >          
                        <Typography variant="h4">
                            Charts
                        </Typography>
                    </Divider>
                    <OffDefEpa />
                </Stack>
            </Grid>
        </Grid>
    </Stack>
  
   
  )
}