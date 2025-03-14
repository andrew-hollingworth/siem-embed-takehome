import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

const EventTimeline = (props) => {
  const [history, setHistory] = useState([{ breached: false, indexOf: 0 }]);
  // let open = props.anchor;
  let cpu = props.cpu;
  let time = props.time;
  let historyLength = history.length;

  //////// Hover Behavior////////////// (Sidelined feature due to time constraints)
  // const handleOpen = (event) => {
  //   props.setAnchor(event.currentTarget);
  //   const propValue = event.currentTarget.getAttribute('datakey')
  //   props.setHighlightedItem(propValue)
  // };
  // const handleClose = () => {
  //   props.setAnchor(null);
  // };

  const setHistoryModule = useCallback(
    (breach, index) => {
      setHistory([...history, { breached: breach, indexOf: index }]);
    },
    [history]
  );

  const cpuAvg = (cpu, time) => {
    let length = time.length;
    let avg;
    if (length < 12) {
      return;
    } else {
      let sum = 0;
      for (let i = length - 12; i <= length - 1; i++) {
        sum += cpu[i];
      }
      avg = sum / 12;
    }
    return avg;
  };

  // Handles the condition for alerts and recovery
  const handleHistoryModule = useCallback(
    (avg, history, time) => {
      let historyIndex = history.length - 1;
      let lastHistory = history[historyIndex].breached;
      let timeIndex = time.length - 1;
      if (lastHistory && avg < 1) {
        // Set recovered state and log the index
        setHistoryModule(false, timeIndex);
      } else if (!lastHistory && avg > 1) {
        // Set breached state and log the index
        setHistoryModule(true, timeIndex);
      } else {
        return;
      }
    },
    [setHistoryModule]
  );

  const buildTimeline =
    historyLength > 1 &&
    history.map((history, index) => {
      if (index > 0) {
        return (
          <TimelineItem
            data-testid="timelineitem"
            key={index}
            // onMouseEnter={handleOpen}
            // onMouseLeave={handleClose}
            datakey={history.indexOf}
          >
            <TimelineOppositeContent
              color={history.breached ? "error" : "success"}
            >
              {dayjs(time[history.indexOf]).format("h:mm:ss:A")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={history.breached ? "error" : "success"} />
              {historyLength - 1 > index ? (
                <>
                  <TimelineConnector data-testid="timelineconnector" />
                </>
              ) : (
                <></>
              )}
            </TimelineSeparator>
            {history.breached ? (
              <>
                <TimelineContent>
                  High CPU load generated an alert: load of{" "}
                  {cpu[history.indexOf]} at{" "}
                  {dayjs(time[history.indexOf]).format("MMM D h:mm:ss:A")}
                </TimelineContent>
              </>
            ) : (
              <>
                <TimelineContent>
                  Recovered: CPU fell below 1 over the past 2 minutes at:{" "}
                  {dayjs(time[history.indexOf]).format("MMM D h:mm:ss:A")}
                </TimelineContent>
              </>
            )}
          </TimelineItem>
        );
      } else {
        return;
      }
    });

  useEffect(() => {
    handleHistoryModule(cpuAvg(cpu, time), history, time);
  }, [cpu, time, history, handleHistoryModule]);

  return (
    <Timeline
      data-testid="timeline"
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {buildTimeline}
    </Timeline>
  );
};

export default EventTimeline;
