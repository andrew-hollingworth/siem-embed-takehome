import React, { useEffect, useState } from 'react';
import { LinePlot, LineChart } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const CpuGraph = (props) => {
  const [range, setRange] = useState([props.time[0], (props.time[0] + 600000)]);

  useEffect(() => {
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

    handleRange(props.time)
  }, [props]);

  return (
<LineChart
      xAxis={[
        {
          scaleType: "time",
          data: props.time,
          min: range[0],
          max: range[1],
          label: 'Time'
        },
      ]}
      height={400}
      series={[
        {
          type: 'line',
          data: props.cpu
        },
      ]}
      yAxis={[{
        min: 0,
        max: 2,
        label: 'CPU'
      }]}
    />
  );
}

export default CpuGraph