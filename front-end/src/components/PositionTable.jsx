import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../utils'
import { DataGrid } from '@mui/x-data-grid';



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
    total_pass_tds:'Total Passing TD',
    total_ints:'Total INT',
    td_int_rate:'TD/INT Ratio',
    avg_passing_epa:'Avg Pass EPA',
    total_carries:'Total Carries',
    total_rush_yds:'Total Rush Yards',
    total_targets:'Total Targets',
    avg_target_share:'Avg Target Share',
    total_rec:'Total Receptions',
    total_rec_yards:'Total Receiving Yards',
    total_yac:'Total YAC',
    total_rec_tds:'Total Receiving TD',
    avg_rec_epa:'Avg Receiving EPA',
    total_rush_tds:'Total Rush TD',
    total_rec_yds:'Total Receiving Yards',
    total_touches:'Total Touches',
    avg_rush_epa:'Average Rush EPA',
    total_tds:'Total TD',
    total_fg_att:'Total FG Attempts',
    total_fg_made:'Total FG Made',
    total_fg_missed:'Total FG Missed',
    fg_pct:'FG %',
    avg_make_yds:'Average Yards/Make',
    avg_miss_yds:'Averages Yards/Miss',
    total_pat_att:'Total PAT Attempts',
    pat_missed:'Total PAT missed'
  };

  const initialCacheState = {
    qbs: { data: [], lastFetchTime: null, isDataCached: false },
    wrs: { data: [], lastFetchTime: null, isDataCached: false },
    rbs: { data: [], lastFetchTime: null, isDataCached: false },
    tes: { data: [], lastFetchTime: null, isDataCached: false },
    ks: { data: [], lastFetchTime: null, isDataCached: false },
  };

  const [positionData, setPositionData] = useState(initialCacheState);
  const [selectedPosition, setSelectedPosition] = useState('qbs');
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let updatedData; // Declare updatedData
  
        const cacheKey = selectedPosition.toLowerCase();
        const cache = positionData[cacheKey];
  
        // ... (rest of the code)
  
        if (!cache.lastFetchTime || !cache.isDataCached) {
          const response = await axiosInstance.get(`/PositionData/${selectedPosition}`);
  
          // Process the response as before
          updatedData = response.data.map((item) =>
            Object.fromEntries(
              Object.entries(item).map(([key, value]) => [key, value === null ? 'n/a' : value])
            )
          );
  
          const filteredData = updatedData.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase()
            )
          );
  
          setPositionData((prevData) => ({
            ...prevData,
            [cacheKey]: { data: filteredData, lastFetchTime: new Date(), isDataCached: true },
          }));
        } else {
          const maxAgeInSeconds = 3600;
          const currentTime = new Date().getTime();
  
          if (currentTime - cache.lastFetchTime > maxAgeInSeconds * 1000) {
            setPositionData((prevData) => ({
              ...prevData,
              [cacheKey]: { ...cache, isDataCached: false },
            }));
          }
        }
  
        if (updatedData) {
          const columns = Object.keys(updatedData[0] || {}).map((key) => ({
            field: key,
            headerName: key === 'headshot_url' ? '' : displayNames[key] || key,
            width: key === 'headshot_url' ? 100 : 150,
            sortable: true,
            renderCell: (params) => (
              <div>
                {key === 'headshot_url' ? (
                  params.value === null ? 'n/a' : (
                    <img src={params.value} alt="headshot" style={{ width: 105, height: 85 }} />
                  )
                ) : (
                  params.value === null ? 'n/a' : params.value
                )}
              </div>
            ),
          }));
  
          const headshotColumnIndex = columns.findIndex((column) => column.field === 'headshot_url');
          const reorderedColumns = [...columns];
          reorderedColumns.unshift(reorderedColumns.splice(headshotColumnIndex, 1)[0]);
  
          // Exclude 'player_id' & 'player_name' from visible columns
          const newVisibleColumns = reorderedColumns.filter(
            (column) => column.field !== 'player_id' && column.field !== 'player_name'
          );
  
          setVisibleColumns(newVisibleColumns);
        }
      } catch (error) {
        console.error('Error fetching position data:', error);
      }
    };
  
    fetchData();
  }, [selectedPosition, positionData, displayNames]);

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  return (
    <div>
      <h2>Position Data Table</h2>
      <div>
        <label>
          Select Position:
          <select value={selectedPosition} onChange={handlePositionChange}>
            <option value="qbs">Quarterbacks</option>
            <option value="wrs">Wide Receivers</option>
            <option value="rbs">Runningbacks</option>
            <option value="tes">Tight Ends</option>
            <option value="ks">Kickers</option>
          </select>
        </label>
      </div>
      <div style={{ height: 600, display: 'flex', alignSelf: 'center', backgroundColor: 'white', margin: 200 }}>
      <DataGrid
  rows={positionData[selectedPosition].data}
  columns={visibleColumns}
  pageSize={5}
  checkboxSelection
  disableSelectionOnClick
  getRowId={(row) => row.player_id}
  sortingOrder={['desc', 'asc', null]}
/>
      </div>
    </div>
  );
};

export default PositionTable;