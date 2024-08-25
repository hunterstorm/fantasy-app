import React from 'react'
import { Stack } from '@mui/material'

import { PositionTable } from '../../components'

function PlayersView() {
  return (
    <Stack p={2}>
        <PositionTable />
    </Stack> 
  )
}

export default PlayersView