import { useEffect, useState } from 'react';
import * as React from 'react'
import axios from 'axios';
import config from '../config.json';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Custom component for rendering images
const ImageCell = ({ value }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <TableCell align="center">
      {error ? (
        'Image Not Available'
      ) : (
        <img
          src={value}
          style={{ width: '80px', height: '80px' }}
          onError={handleError}
        />
      )}
    </TableCell>
  );
};

const columns = [
  {
    id: 'headshot_url',
    minWidth: 80,
    align: 'center',
    // Use the custom ImageCell component for rendering images
    render: (value) => <ImageCell value={value} />,
  },
  { id: 'player_display_name', label: 'Player Name', minWidth: 170 },
  { id: 'total_receiving_yards', label: 'Total Receiving Yards', minWidth: 100 },
  { id: 'total_receptions', label: 'Total Receptions', minWidth: 170, align: 'right' },
  { id: 'total_targets', label: 'Total Targets', minWidth: 170, align: 'right' },
  { id: 'total_receiving_tds', label: 'Total Receiving TDs', minWidth: 170, align: 'right' },
  { id: 'total_yac', label: 'Total YAC', minWidth: 170, align: 'right' },
];

function DisplayReceivingYards() {
  const apiRoot = config.SERVER_ROOT;
  const apiKey = config.API_KEY;

  const [receivingLeadersData, setReceivingLeadersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`${apiRoot}/ReceivingLeaders`, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        // Add an index property to each data entry
        const dataWithIndex = res.data.map((entry, index) => ({ ...entry, index: index + 1 }));
        setReceivingLeadersData(dataWithIndex);
        console.log(dataWithIndex);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Paper sx={{ display:'flex',flexDirection:'column',alignSelf:'center', overflow: 'hidden',margin:'250px' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Add a counter column */}
              <TableCell>Rank</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {receivingLeadersData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex} hover role="checkbox" tabIndex={-1}>
                  {/* Display the counter value */}
                  <TableCell>{row.index}</TableCell>
                  {columns.map((column) => (
                    <React.Fragment key={column.id}>
                      {column.render ? (
                        column.render(row[column.id])
                      ) : (
                        <TableCell align={column.align}>{row[column.id]}</TableCell>
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={receivingLeadersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DisplayReceivingYards;
