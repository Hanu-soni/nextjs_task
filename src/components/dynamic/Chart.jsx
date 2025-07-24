// components/Chart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 400 },
];

export default function Chart() {
  return (
    <div className="w-full h-64">
      <LineChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
