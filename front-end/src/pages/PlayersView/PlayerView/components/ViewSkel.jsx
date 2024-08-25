import React from 'react'
import { Skeleton, Stack, Box } from '@mui/material';

export default function ViewSkel() {
  return (
    <>
    <Stack direction="row" alignItems="center" justifyContent="flex-start" width="100%" spacing={2} p={2}>
          <Skeleton variant="circular" width={200} height={200} />
          <Box>
            <Skeleton variant="text" width={300} height={80} />
            <Skeleton variant="text" width={150} height={60} />
          </Box>
        </Stack>
        <Skeleton variant="rectangular" width="100%" height={2} />
        <Box width="100%">
          <Skeleton variant="text" width={350} height={60} />

        </Box>
        <Stack spacing={2} width="100%">
          <Skeleton variant="rectangular" width="100%" height={200} sx={{borderRadius: 5}} />
          <Skeleton variant="rectangular" width="100%" height={240} sx={{borderRadius: 5}} />
          <Skeleton variant="rectangular" width="100%" height={240}  sx={{borderRadius: 5}} />
        </Stack>

        </>
  )
}
