import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs'
import cpuAvg from './services'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EventTimeline = (props) => {
  // track the index and state of breaches and recoveries
  const [history, setHistory] = useState([{ breached: false, indexOf: 0 }])

  let open = props.anchor;
  let cpu = props.cpu
  let time = props.time
  let historyLength = history.length

  const handleOpen = (event) => {
    props.setAnchor(event.currentTarget);
    const target = event.currentTarget;
    const propValue = target.getAttribute('datakey')
    console.log(propValue)
  };

  const handleClose = () => {
    props.setAnchor(null);
  };


  const buildTimeline = (historyLength > 1) && history.map((history, index) => {
    if (index > 0) {
      return <TimelineItem
        key={index}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        datakey={history.indexOf}
      >
        <TimelineOppositeContent color={open ? "error" : "success"}>
          {dayjs(time[history.indexOf]).format('h:mm:ss:A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={history.breached ? "error" : "success"} />
          {historyLength - 1 > index ?
            <>
              <TimelineConnector />
            </>
            :
            <>
            </>}
        </TimelineSeparator>
        {history.breached ?
          <>
            <TimelineContent>High CPU load generated an alert: load of {cpu[history.indexOf]} at {dayjs(time[history.indexOf]).format('MMM D h:mm:ss:A')}</TimelineContent>
          </>
          :
          <>
            <TimelineContent>Recovered: CPU fell below 1 over the past 2 minutes at: {dayjs(time[history.indexOf]).format('MMM D h:mm:ss:A')}</TimelineContent>
          </>}
      </TimelineItem>
    }
    else {
      return
    }
  })

  const setHistoryModule = useCallback((breach, index) => {
    setHistory([
      ...history,
      { breached: breach, indexOf: index }
    ])
  }, [history])

  const handleHistoryModule = useCallback((avg, history) =>{
    let historyIndex = history.length - 1
    let lastHistory = history[historyIndex].breached
    if (lastHistory && avg < 0.2) {
      // Set breached state and log the index
      setHistoryModule(false, length - 1)
    } else if (!lastHistory && avg > 0.2) {
      // Set recovered state and log the index
      setHistoryModule(true, length - 1)
    } else {
      return
    }
  }, [setHistoryModule])


  useEffect(() => {
    handleHistoryModule(cpuAvg(cpu, time), history)
  }, [cpu, time, history, handleHistoryModule]);

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {buildTimeline}
    </Timeline>
  );
}

export default EventTimeline