import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { LineChart } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const CpuGraph = (props) => {
  const [range, setRange] = useState([props.time[0], (props.time[0] + 600000)]);

  const handleRange = (time) => {
      let length = time.length
      if (length > 61) {
        let max = length - 1
        let min = length - 61
        setRange([time[min], time[max]])
      } else {
        return
      }
    }
    
  useEffect(() => {

    handleRange(props.time)
  }, [props]);

  return (
    <LineChart
      height={400}
      highlightedItem={props.highlightedItem}
      onHighlightChange={props.setHighlightedItem}
      series={[
        {
          type: 'line',
          data: props.cpu,
          color: '#b973ff'
        },
      ]}
      xAxis={[
        {
          data: props.time,
          min: range[0],
          max: range[1],
          label: 'Time',
          datakey: 'time',
          valueFormatter: (time) =>
            `${dayjs(time).format('h:mm:ss:A')}`
        },
      ]}
      yAxis={[{
        min: 0,
        max: 2,
        label: 'Average CPU Usage'
      }]}
    />
  );
}

export default CpuGraph