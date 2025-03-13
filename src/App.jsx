import React, { useState, useEffect } from 'react'
import EventTimeline from './components/Timeline'
import CpuGraph from './components/CpuGraph.jsx'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b973ff',
    },
    secondary: {
      main: '#579edd',
    },
    background: {
      default: '#1d1c1f',
      paper: '#1d1c1f',
    },
    text: {
      primary: 'rgba(255,255,255,0.76)',
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [cpu, setCpu] = useState([0]);
  const [time, setTime] = useState([Date.now()]);
  const [colorMode, setColorMode] = React.useState(theme.palette.mode);
  const [osData, setOsData] = useState({arch: '', freeMem: 0, totalMem: 0, hostname: '', platform: ''});


  const handleOsImport = (data) => {
    const dataOs = {};
      for (const [key, value] of Object.entries(data)) {
        const validKeys = ['arch', 'platform', 'hostname', 'freeMem', 'totalMem']
        validKeys.indexOf(key) >= 0 ? (dataOs[key] = value ): null
      } 
    setOsData(dataOs);
  }


  useEffect(() => {
    const cpuAvg = (cpus, loadavg) => {
      let value = loadavg / cpus
      return value
    }
    const setCpuModule = (newCpu) => {
      setCpu([
        ...cpu,
        newCpu
      ])
    }
    const setTimeModule = (newTime) => {
      setTime([
        ...time,
        newTime
      ])
    }


    const getServer = async () => {
      let resp = await fetch('http://localhost:3001/os-info');
      let data = await resp.json();
      let value = cpuAvg(data.cpulength, data.loadavg[0])
      setCpuModule(value)
      handleOsImport(data)
    }

    //Get data every 10 seconds
    const interval = setInterval(() => {
      setTimeModule(Date.now());
      getServer()
    }, 10000);
    return () => clearInterval(interval);
  }, [cpu, time]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Button
        sx={{ ml: 1 }}
        onClick={() =>
          setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
        color="inherit"
        endIcon={
          colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />
        }
      >
        {colorMode} mode
      </Button> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { sm: 'column', md: 'row' },
          alignItems: 'center',
          '& > :not(style)': {
            m: 2,
            minWidth: 500,
            height: 500
          },
        }}
      >
        <Paper
          sx={{ width: 2 / 3 }}
        >
          <CpuGraph
            cpu={cpu}
            time={time}
            anchor={anchor}
            setAnchor={setAnchor}
            highlightedItem={highlightedItem}
            setHighlightedItem={setHighlightedItem}
          />
        </Paper>
        <Paper
          sx={{ overflow: 'scroll', maxHeight: 500 }}
        >
          <EventTimeline
            anchor={anchor}
            setAnchor={setAnchor}
            highlightedItem={highlightedItem}
            setHighlightedItem={setHighlightedItem}
            cpu={cpu}
            time={time}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  )
}

export default App
