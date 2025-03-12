import React, { useState, useEffect } from 'react'
import EventTimeline from './components/Timeline'
import CpuGraph from './components/CpuGraph.jsx'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// background 1d1c1f

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

    const getCpuModule = () => {
      fetch('http://localhost:3001/os-info')
        .then((response) => response.json())
        .then((data) => cpuAvg(data.cpulength, data.loadavg[0]))
        .then((value) => setCpuModule(value))
    }

    //Get data every 10 seconds
    const interval = setInterval(() => {
      setTimeModule(Date.now());
      getCpuModule()
    }, 10000);
    return () => clearInterval(interval);
  }, [cpu, time]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
