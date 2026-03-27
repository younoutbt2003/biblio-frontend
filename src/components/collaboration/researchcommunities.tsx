import React from 'react';

const communities = [
  { label: 'AI & ML', color: '#3b82f6' },
  { label: 'Medical Imaging', color: '#22c55e' },
  { label: 'NLP', color: '#a855f7' },
  { label: 'Robotics', color: '#f97316' },
];

export const ResearchCommunities: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Research Communities</h3>
      <div className="flex flex-wrap gap-2">
        {communities.map((c) => (
          <span
            key={c.label}
            className="text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: c.color + '18', color: c.color }}
          >
            ● {c.label}
          </span>
        ))}
      </div>
    </div>
  );
};