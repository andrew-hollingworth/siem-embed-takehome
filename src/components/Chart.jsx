import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


const BasicLineChart = (props) => {

  return (  
    <div>
    <LineChart
      xAxis={[
          {
            scaleType: "utc",
            data: props.time,
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