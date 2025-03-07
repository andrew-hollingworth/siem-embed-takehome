import React, { useState, useEffect } from 'react'
import Cpu from './components/Cpu.jsx'
import os from 'node:os';
import BasicLineChart from './components/Chart.jsx'
import Button from '@mui/material/Button';
import './App.css'


const App = () => {

  const [cpu, setCpu] = useState([Math.floor(Math.random() * 10)]);
  const [time, setTime] = useState([Date.now()]);

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

  useEffect(() => {

    const interval = setInterval(() => {
      setTimeModule(Date.now());
      setCpuModule(Math.floor(Math.random() * 10));
    }, 10000);
    return () => clearInterval(interval);
  }, [setCpuModule, setTimeModule]);

  return (
    <>
      <BasicLineChart
        cpu={cpu}
        time={time}
      />
      <Button
        variant="outlined"
        onClick={() => {
          // setTimeModule(getTime)
          // setCpuModule(getCpu)
          console.log(cpu, time)
        }
        }
      >
        test
      </Button>
      {/* <Cpu 
        setCpuModule={setCpuModule}
        cpu={cpu}
        setTimeModule={setTimeModule}
        time={time}
      /> */}
    </>
  )
}

export default App
