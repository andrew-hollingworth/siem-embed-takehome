import React,  { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    time: 1,
    cpu: 2400,
  },
  {
    time: 2,
    cpu: 2210,
  },
  {
    time: 3,
    cpu: 2290,
  },
  {
    time: 4,
    cpu: 2000,
  },
  {
    time: 5,
    cpu: 2181,
  },
  {
    time: 6,
    cpu: 2500,
  },
  {
    time: 7,
    cpu: 2100,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="time" />
          <YAxis dataKey="cpu" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>

    );
  }
}
