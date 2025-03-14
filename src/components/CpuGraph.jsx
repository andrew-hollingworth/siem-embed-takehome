import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
// import EventId from './EventId'

import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";

const CpuGraph = (props) => {
  /// X-Axis range state
  const [range, setRange] = useState([props.time[0], props.time[0] + 600000]);
  // Move the time range of x-axis along with the data
  const handleRange = (time) => {
    let length = time.length;
    if (length > 61) {
      let max = length - 1;
      let min = length - 61;
      setRange([time[min], time[max]]);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleRange(props.time);
  }, [props]);

  return (
    <Box height="48vh" width="40vw">
      <LineChart
        margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
        axisHighlight={{ x: "line" }}
        series={[
          {
            type: "line",
            data: props.cpu,
            color: "#b973ff",
          },
        ]}
        xAxis={[
          {
            data: props.time,
            min: range[0],
            max: range[1],
            label: "Time",
            datakey: "time",
            tickMinStep: 60000,
            valueFormatter: (time) => `${dayjs(time).format("h:mm:ss:A")}`,
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 2,
            label: "Average CPU Usage",
          },
        ]}
      >
        {/* This was going to be a component highlighting the graph tick that corresponded to the Timeline Event on Hover. */}
        {/* <EventId
      range={range}
      cpu={props.cpu}
      time={props.time}
      anchor={props.anchor}
      setAnchor={props.setAnchor}
      highlightedItem={props.highlightedItem}
      setHighlightedItem={props.setHighlightedItem}
    /> */}
      </LineChart>
    </Box>
  );
};

export default CpuGraph;
