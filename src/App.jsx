import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import EventTimeline from './components/Timeline'
import CpuGraph from './components/CpuGraph.jsx'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import './App.css'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const App = () => {

  const [cpu, setCpu] = useState([0]);
  const [time, setTime] = useState([Date.now()]);

  useEffect(() => {
    const cpuAvg = (cpus, loadavg) => {
      let value = loadavg/cpus
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
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 3,
        minWidth: 400,
        height: 500
        },
      }}
    > 
      <Paper 
        size={8}
        sx={{ width:2/3}}
      >
      <CpuGraph
        cpu={cpu}
        time={time}
      />
      </Paper>
      <Paper 
      sx={{ width:1/3, overflow: 'scroll', maxHeight: 500 }}
      >
      <EventTimeline
        cpu={cpu}
        time={time}
      />
      </Paper>
    </Box>

  )
}

export default App
