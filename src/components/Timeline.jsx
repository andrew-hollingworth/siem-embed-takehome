import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'

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
  let cpu = props.cpu
  let time = props.time
  let historyLength = history.length

  const buildTimeline = (historyLength > 1) && history.map((history, index) => {
    if (index > 0) {
      return <TimelineItem key={index}>
        <TimelineOppositeContent color="textSecondary">
          {dayjs(time[history.indexOf]).format('h:mm:ss:A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
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


  useEffect(() => {
    const setHistoryModule = (breach, index) => {
      setHistory([
        ...history,
        { breached: breach, indexOf: index }
      ])
    }

    const evaluateCpu = (cpu, time, history) => {
      let length = time.length
      let historyIndex = history.length - 1
      let lastHistory = history[historyIndex].breached
      if (length < 3) {
        //No need to go any further, cpu can't have breached if we don't have two minute's data
        return
      } else {
        // Calculate the average over the last 2 minutes
        let sum = 0
        for (let i = length - 3; i <= length - 1; i++) {
          sum += cpu[i]
        }
        let avg = sum / 3
        if (lastHistory && avg < 1) {
          // Set breached state and log the index
          setHistoryModule(false, length - 1)
        } else if (!lastHistory && avg > 1) {
          // Set recovered state and log the index
          setHistoryModule(true, length - 1)
        } else {
          return
        }
      }
    }
    evaluateCpu(cpu, time, history)
  }, [cpu, time, history]);

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