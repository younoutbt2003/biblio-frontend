import React from 'react';

const timelineData = [
  { year: '2020', height: 20 },
  { year: '2021', height: 35 },
  { year: '2022', height: 50 },
  { year: '2023', height: 70 },
  { year: '2024', height: 90 },
];

export const CollabTimeline: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Collaboration Timeline</h3>
      <div className="flex items-end justify-between gap-1 h-20 px-1">
        {timelineData.map((d, i) => (
          <div key={d.year} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t transition-all"
              style={{
                height: `${d.height}%`,
                backgroundColor: i === timelineData.length - 1 ? '#2563eb' : '#bfdbfe',
              }}
            />
            <span className="text-[10px] text-gray-400 mt-1">{d.year}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 text-center mt-2">
        New collaborations established per year
      </p>
    </div>
  );
};
