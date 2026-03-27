import React from 'react';

const venues = [
  { name: 'Nature', pubs: 12, impact: 69.5, color: '#ef4444' },
  { name: 'Science', pubs: 8, impact: 63.7, color: '#f97316' },
  { name: 'Cell', pubs: 6, impact: 66.8, color: '#f97316' },
  { name: 'IEEE Transactions', pubs: 5, impact: 24.3, color: '#8b5cf6' },
];

export const TopVenues: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Publication Venues</h3>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {venues.map((v) => (
          <div key={v.name} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
              {v.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{v.name}</p>
              <p className="text-xs text-gray-400">{v.pubs} Publications</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ backgroundColor: v.color + '20', color: v.color }}
              >
                Impact {v.impact}
              </span>
              <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(v.impact / 70) * 100}%`, backgroundColor: v.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};