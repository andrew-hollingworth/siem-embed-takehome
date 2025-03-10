import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { number } from './services/cpu-helper'
import os from 'node:os';
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

  const [cpu, setCpu] = useState([Math.floor(Math.random() * 3)]);
  const [time, setTime] = useState([Date.now()]);

  useEffect(() => {
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
    //Get data every 10 seconds
    const interval = setInterval(() => {
      setTimeModule(Date.now());
      setCpuModule(Math.floor(Math.random() * 4));
    }, 10000);
    return () => clearInterval(interval);
  }, [cpu, time]);

  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 3,
        width: 1
        },
      }}
    >
      <Paper 
        size={8}
        square={false}
      >
      <CpuGraph
        cpu={cpu}
        time={time}
      />
      </Paper>
      <Paper 
      size={4}
      square={false}
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
