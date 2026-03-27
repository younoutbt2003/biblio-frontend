import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { year: '2019', count: 4 },
  { year: '2020', count: 5 },
  { year: '2021', count: 6 },
  { year: '2022', count: 7 },
  { year: '2023', count: 8 },
  { year: '2024', count: 12 },
];

export const PublicationTimeline: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Publication Timeline</h3>
        <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
          Last 6 Years <ChevronDown size={13} />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={32}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Publications">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.year === '2024' ? '#2563eb' : '#bfdbfe'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};