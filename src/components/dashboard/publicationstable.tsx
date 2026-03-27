import React from 'react';
import { ExternalLink } from 'lucide-react';

const publications = [
  {
    id: '1',
    title: 'Deep Learning Approaches for Medical Image Analysis',
    authors: 'Benali R., Chen M., Johnson S.',
    year: 2024,
    journal: 'Nature Medicine',
    citations: 15,
    type: 'article' as const,
  },
  {
    id: '2',
    title: 'Machine Learning in Healthcare: A Comprehensive Review',
    authors: 'Benali R., Martinez E.',
    year: 2023,
    journal: 'Journal of Medical AI',
    citations: 87,
    type: 'review' as const,
  },
  {
    id: '3',
    title: 'Neural Networks for Disease Prediction',
    authors: 'Benali R., Hassan A., Liu W.',
    year: 2023,
    journal: 'IEEE Transactions',
    citations: 142,
    type: 'article' as const,
  },
  {
    id: '4',
    title: 'Computer Vision Applications in Medical Diagnosis',
    authors: 'Benali R., Kumar S.',
    year: 2022,
    journal: 'Medical Image Computing',
    citations: 95,
    type: 'conference' as const,
  },
  {
    id: '5',
    title: 'AI-Powered Radiology: Current State and Future Directions',
    authors: 'Benali R., Thompson J., Park K.',
    year: 2022,
    journal: 'Radiology AI',
    citations: 68,
    type: 'article' as const,
  },
];

const typeColors = {
  article: 'bg-blue-100 text-blue-700',
  review: 'bg-purple-100 text-purple-700',
  conference: 'bg-orange-100 text-orange-700',
  book_chapter: 'bg-green-100 text-green-700',
};

export const PublicationsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Publications</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Authors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Journal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Citations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md">
                    {pub.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {pub.authors}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{pub.year}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {pub.journal}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeColors[pub.type]}`}>
                    {pub.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {pub.citations}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1-5</span> of <span className="font-medium">42</span> publications
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};