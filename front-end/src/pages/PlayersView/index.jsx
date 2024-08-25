import React from 'react'
import { Stack } from '@mui/material'

import { PositionTable } from '../../components'

export default function PlayersView() {
  return (
    <Stack p={2}>
        <PositionTable />
    </Stack> 
  )
}