import React, { useState } from 'react';
import { Search, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight, Plus, RefreshCw } from 'lucide-react';

const publicationsData = [
  { title: 'Deep Learning for Genomic Prediction in Large-Scale...', year: 2024, journal: 'Nature Genetics', citations: 12, type: 'Article' },
  { title: 'Quantum Supremacy in Noisy Intermediate-Scale D...', year: 2023, journal: 'Physical Review X', citations: 84, type: 'Review' },
  { title: 'Advancements in CRISPR-Cas9 Precision Editing', year: 2023, journal: 'Science', citations: 45, type: 'Article' },
  { title: 'Sustainable AI: Reducing Carbon Footprint of Models', year: 2022, journal: 'IEEE TPAMI', citations: 28, type: 'Article' },
  { title: 'Machine Learning in Climate Change Adaptation', year: 2022, journal: 'Cell Reports', citations: 15, type: 'Article' },
];

export const PublicationsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Table Header Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-64">
            <Search size={14} className="text-gray-400" />
            <input
              className="text-sm outline-none text-gray-600 w-full bg-transparent"
              placeholder="Search publications..."
            />
          </div>
          {['Year', 'Type', 'Journal'].map((f) => (
            <button key={f} className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
              {f} <ChevronDown size={13} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
            Newest First <ChevronDown size={13} />
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
            <RefreshCw size={13} /> Sync Data
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={14} /> Add Publication
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-400 border-b border-gray-100">
            <th className="text-left pb-3 font-medium">TITLE</th>
            <th className="text-left pb-3 font-medium">YEAR</th>
            <th className="text-left pb-3 font-medium">JOURNAL</th>
            <th className="text-left pb-3 font-medium">CITATIONS</th>
            <th className="text-left pb-3 font-medium">TYPE</th>
            <th className="text-left pb-3 font-medium">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {publicationsData.map((pub, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3.5 font-medium text-gray-800 max-w-xs truncate pr-4">{pub.title}</td>
              <td className="py-3.5 text-gray-500">{pub.year}</td>
              <td className="py-3.5 text-gray-500">{pub.journal}</td>
              <td className="py-3.5">
                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {pub.citations} Cit.
                </span>
              </td>
              <td className="py-3.5 text-gray-500">{pub.type}</td>
              <td className="py-3.5">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-2">
        <span className="text-xs text-gray-400">
          Showing <strong className="text-gray-600">1-5</strong> of <strong className="text-gray-600">42</strong> publications
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30" disabled={currentPage === 1}>
            <ChevronLeft size={15} />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors ${
                currentPage === p ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
          <button className="p-1.5 text-gray-400 hover:text-gray-600">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};