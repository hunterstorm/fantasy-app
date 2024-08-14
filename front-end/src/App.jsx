import PositionTable from './pages/Dashboard/components/PositionTable'
import Routes from './Routes';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App
