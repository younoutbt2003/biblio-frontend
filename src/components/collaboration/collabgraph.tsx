import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Camera, ChevronDown } from 'lucide-react';

const nodes = [
  { id: 'me', x: 310, y: 240, r: 22, label: 'ME', sub: 'Dr. Julian Vance', color: '#2563eb', textColor: '#fff' },
  { id: 'a', x: 330, y: 120, r: 14, color: '#3b82f6' },
  { id: 'b', x: 185, y: 185, r: 12, color: '#93c5fd' },
  { id: 'c', x: 435, y: 195, r: 14, color: '#3b82f6' },
  { id: 'd', x: 160, y: 295, r: 10, color: '#cbd5e1' },
  { id: 'e', x: 425, y: 330, r: 20, color: '#1d4ed8' },
];

const edges = [['me', 'a'], ['me', 'b'], ['me', 'c'], ['me', 'd'], ['me', 'e']];
const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export const CollabGraph: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Interactive Collaboration Graph</h3>
        <div className="flex items-center gap-2">
          {[ZoomIn, ZoomOut, RotateCcw, Camera].map((Icon, i) => (
            <button key={i} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400">
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        {['Institution', 'Country', 'Year'].map((f) => (
          <button key={f} className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            {f} <ChevronDown size={13} />
          </button>
        ))}
        <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
          <input type="checkbox" className="rounded accent-blue-600" /> International only
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
          <input type="checkbox" className="rounded accent-blue-600" /> Same institution
        </label>
      </div>

      {/* SVG Graph */}
      <div className="bg-gray-50 rounded-lg overflow-hidden" style={{ height: 340 }}>
        <svg width="100%" height="100%" viewBox="0 0 620 420">
          {edges.map(([from, to], i) => {
            const a = nodeMap[from];
            const b = nodeMap[to];
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#bfdbfe" strokeWidth="1.5" />
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
              {node.label && (
                <>
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.textColor || '#fff'} fontSize={10} fontWeight="700">
                    {node.label}
                  </text>
                  <text x={node.x} y={node.y + node.r + 14} textAnchor="middle" fill="#64748b" fontSize={9}>
                    {node.sub}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="font-medium uppercase tracking-wide">Frequency</span>
          {[{ color: '#cbd5e1', label: 'Occasional' }, { color: '#93c5fd', label: 'Regular' }, { color: '#2563eb', label: 'Frequent' }].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="font-medium uppercase tracking-wide">Node Size</span>
          <span>S (1-4)</span><span>M (5-9)</span><span>L (10+)</span>
        </div>
      </div>
    </div>
  );
};