import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { year: '2019', citations: 145 },
  { year: '2020', citations: 198 },
  { year: '2021', citations: 256 },
  { year: '2022', citations: 312 },
  { year: '2023', citations: 289 },
  { year: '2024', citations: 50 },
];

export const CitationsChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Citations per Year
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Bar 
            dataKey="citations" 
            fill="#059669" 
            radius={[8, 8, 0, 0]}
            name="Citations"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};