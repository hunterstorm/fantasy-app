import { useEffect } from 'react'
import { Stack } from '@mui/material'

import { PositionTable } from '../../components'
import { usePageContext } from '../../providers/PageProvider';

export default function PlayersView() {

  const { setPageProps } = usePageContext();

  const title = "Players";

  useEffect(() => {
      setPageProps({ title: title })
  },[setPageProps])

  return (
    <Stack p={2}>
        <PositionTable />
    </Stack> 
  )
}