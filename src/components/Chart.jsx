import React, { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


const BasicLineChart = (props) => {
  let startDate = props.time[0]
  let maxDate = props.time[0] + 30000

  const setMinRange = (time) => {
    let length = time.length
    let newIndex = length - 3
    if (length > 3 ) {
      startDate = time[newIndex]
      console.log('if, startdate: '+startDate)
      return startDate
    } else {
      return startDate = time[0]
    }
  }
  const setMaxRange = (time) => {
    let length = time.length
    let newIndex = length - 1
    if (length > 3 ) {
      maxDate = time[newIndex]
      console.log('if, maxDate: '+maxDate)
      return maxDate
    } else {
      return  maxDate = time[0] + 30000
    }
  }

  useEffect(() => {
    setMinRange(props.time)
    setMaxRange(props.time)
    console.log("outside"+startDate+" "+maxDate)
    }, [props, setMaxRange, setMinRange]);

  return (  
    <div>
    <LineChart
      xAxis={[
          {
            scaleType: "utc",
            data: props.time,
            min: startDate,
            max: maxDate
          },
        ]}
      series={[
        {
          data: props.cpu
        },
      ]}
      width={500}
      height={300}
    />
    </div>
  );
}

export default BasicLineChart