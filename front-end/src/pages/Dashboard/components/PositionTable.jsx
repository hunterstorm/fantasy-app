import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PositionTable = () => {
  const displayNames = {
    player_display_name: 'Player',
    recent_team: 'Recent Team',
    position: 'Position',
    total_ppr: 'Total PPR',
    total_pass_yds: 'Total Pass Yards',
    total_completions: 'Total Completions',
    total_attempts: 'Total Attempts',
    comp_rate: 'Completion Rate',
    total_pass_tds: 'Total Passing TD',
    total_ints: 'Total INT',
    td_int_rate: 'TD/INT Ratio',
    avg_passing_epa: 'Avg Pass EPA',
    total_carries: 'Total Carries',
    total_rush_yds: 'Total Rush Yards',
    total_targets: 'Total Targets',
    avg_target_share: 'Avg Target Share',
    total_rec: 'Total Receptions',
    total_rec_yards: 'Total Receiving Yards',
    total_yac: 'Total YAC',
    total_rec_tds: 'Total Receiving TD',
    avg_rec_epa: 'Avg Receiving EPA',
    total_rush_tds: 'Total Rush TD',
    total_rec_yds: 'Total Receiving Yards',
    total_touches: 'Total Touches',
    avg_rush_epa: 'Average Rush EPA',
    total_tds: 'Total TD',
    total_fg_att: 'Total FG Attempts',
    total_fg_made: 'Total FG Made',
    total_fg_missed: 'Total FG Missed',
    fg_pct: 'FG %',
    avg_make_yds: 'Average Yards/Make',
    avg_miss_yds: 'Averages Yards/Miss',
    total_pat_att: 'Total PAT Attempts',
    pat_missed: 'Total PAT missed',
  };

  const [positionData, setPositionData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('qbs');
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [loading, setLoading] = useState(false);


  const nav= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/PositionData/${selectedPosition}`);

        const updatedData = response.data.map((item) =>
          Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key, value === null ? 'n/a' : value])
          )
        );

        setPositionData(updatedData);

        const columns = Object.keys(updatedData[0] || {}).map((key) => ({ 
          field: key,
          headerName: key === 'headshot_url' ? '' : displayNames[key] || key,
          width: key === 'headshot_url' ? 105 : 150,
          sortable: true,
          renderCell: (params) => (
            <Box>
              {key === 'headshot_url' ? (
                params.value !== 'n/a' && params.value ? (
                  <img src={params.value} alt="headshot" style={{ width: 105, height: 85 }} />
                ) : (
                  'n/a'
                )
              ) : (
                params.value
              )}
            </Box>
          ),
        }));


        const headshotColumnIndex = columns.findIndex((column) => column.field === 'headshot_url');
        const reorderedColumns = [...columns];
        if (headshotColumnIndex !== -1) {
          reorderedColumns.unshift(reorderedColumns.splice(headshotColumnIndex, 1)[0]);
        }

        const newVisibleColumns = reorderedColumns.filter(
          (column) => column.field !== 'player_id' && column.field !== 'player_name'
        );

        setVisibleColumns(newVisibleColumns);
      } catch (error) {
        console.error('Error fetching position data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPosition]);

  const handleNavigate = (id) => {
      const selectedPlayer = positionData.find((player) => player.player_id === id )
      nav(`players/${selectedPlayer.position}/${selectedPlayer.player_id}`)
  }

  const handlePositionChange = (event, newValue) => {
    setSelectedPosition(newValue);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius:7, display:'flex', justifyContent:'center' }}>
        <Tabs
          value={selectedPosition}
          onChange={handlePositionChange}
          centered
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          allowScrollButtonsMobile
          scrollButtons="auto"
        
          sx={{p:3}}
        >
          <Tab label="Quarterbacks" value="qbs" />
          <Tab label="Wide Receivers" value="wrs" />
          <Tab label="Runningbacks" value="rbs" />
          <Tab label="Tight Ends" value="tes" />
          <Tab label="Kickers" value="ks" />
        </Tabs>
      </Box>
      <Box
        sx={{
          height: 600,
          width: '100%',
          display: 'flex',
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius:10,
        }}
      >
        <DataGrid
          rows={positionData}
          columns={visibleColumns.filter((column) => column.field !== 'headshot_url')}
          disableSelectionOnClick
          getRowId={(row) => row.player_id || row.player_display_name} // Ensure a unique ID
          loading={loading}
          onRowClick={({row}) => handleNavigate(row.player_id) }
          sx={{
            ".MuiDataGrid-cell:focus": { outline: "none" },
            "& .MuiDataGrid-row:hover": { cursor: "pointer" },
            "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
            "& .MuiDataGrid-columnHeader:hover": { cursor: "default" },
            borderRadius:10,
            p:4
          }}
        />
      </Box>
    </Stack>
  );
};

export default PositionTable;
