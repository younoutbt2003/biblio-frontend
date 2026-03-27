import React from 'react';

const collaborators = [
  { name: 'Dr. Alice Bouchard', papers: 24, color: '#6366f1' },
  { name: 'Dr. Sarah Chen', papers: 18, color: '#8b5cf6' },
  { name: 'Prof. Marco Rossi', papers: 12, color: '#64748b' },
  { name: 'Dr. James Miller', papers: 9, color: '#64748b' },
  { name: 'Li Wei', papers: 4, color: '#94a3b8' },
];

export const TopCollaborators: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Top Collaborators</h3>
        <button className="text-xs text-blue-600 hover:underline">View All</button>
      </div>
      <div className="space-y-3">
        {collaborators.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: c.color }}
            >
              {c.name[3]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{c.name}</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(c.papers / 24) * 100}%`, backgroundColor: c.color }}
                />
              </div>
            </div>
            <span className="text-[11px] text-gray-400 flex-shrink-0">{c.papers} Papers</span>
          </div>
        ))}
      </div>
    </div>
  );
};