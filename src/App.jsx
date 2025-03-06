import React, { useState } from 'react'
import Cpu from './components/Cpu.jsx'
import os from 'node:os';
import BasicLineChart from './components/Chart.jsx'
import Button from '@mui/material/Button';
import './App.css'


const App = (props) => {
  const [cpu, setCpu] = useState([1, 2, 3, 5, 8, 10]);
  const [time, setTime] = useState([1741230702480, 1741230704096, 1741230717779, 1741230718705, 1741230719352, 1741230719781]);

  const getTime = Date.now()
  const getCpu = os.cpus().length

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

  return (
    <>
      <BasicLineChart
        cpu={cpu}
        time={time}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setTimeModule(getTime)
          setCpuModule(getCpu)
        }
        }
      >
        test
      </Button>
      <Cpu 
        setCpuModule={setCpuModule}
        cpu={cpu}
        setTimeModule={setTimeModule}
        time={time}
      />
      {/* <Events /> */}
      {/* <Cpu /> */}
    </>
  )
}

export default App
