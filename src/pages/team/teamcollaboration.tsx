import React, { useState } from 'react';
import { TeamLayout } from '../../components/layout/teamlayout';
import { Users, Globe, TrendingUp, Network, Search } from 'lucide-react';
import { StatCard } from '../../components/common/statcard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const collaborationTimelineData = [
  { year: '2019', internal: 8, external: 5 },
  { year: '2020', internal: 12, external: 7 },
  { year: '2021', internal: 15, external: 10 },
  { year: '2022', internal: 18, external: 14 },
  { year: '2023', internal: 22, external: 18 },
  { year: '2024', internal: 6, external: 5 },
];

const geographicData = [
  { name: 'Algeria', value: 28, color: '#2563eb' },
  { name: 'France', value: 12, color: '#059669' },
  { name: 'USA', value: 8, color: '#7c3aed' },
  { name: 'UK', value: 6, color: '#ea580c' },
  { name: 'Other', value: 11, color: '#6b7280' },
];

const topCollaborators = [
  {
    id: '1',
    name: 'Dr. Lisa Wang',
    institution: 'MIT',
    country: 'USA',
    publications: 12,
    type: 'external',
    avatar: 'LW'
  },
  {
    id: '2',
    name: 'Prof. Jean Dupont',
    institution: 'Sorbonne University',
    country: 'France',
    publications: 10,
    type: 'external',
    avatar: 'JD'
  },
  {
    id: '3',
    name: 'Dr. Ahmed Hassan',
    institution: 'USTHB',
    country: 'Algeria',
    publications: 24,
    type: 'internal',
    avatar: 'AH'
  },
  {
    id: '4',
    name: 'Dr. Sarah Johnson',
    institution: 'Cambridge',
    country: 'UK',
    publications: 8,
    type: 'external',
    avatar: 'SJ'
  },
  {
    id: '5',
    name: 'Dr. Martin Chen',
    institution: 'USTHB',
    country: 'Algeria',
    publications: 18,
    type: 'internal',
    avatar: 'MC'
  },
];

export const TeamCollaboration: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'internal' | 'external'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalCollaborators: 45,
    internalCollabs: 28,
    externalCollabs: 17,
    countries: 23
  };

  const filteredCollaborators = topCollaborators.filter(collab => {
    const matchesType = filterType === 'all' || collab.type === filterType;
    const matchesSearch = collab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collab.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <TeamLayout 
      title="Collaboration Network" 
      subtitle="Explore and manage your team's research collaborations"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Collaborators"
          value={stats.totalCollaborators}
          trend={15}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={Network}
          label="Internal Collaborations"
          value={stats.internalCollabs}
          trend={12}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Globe}
          label="External Collaborations"
          value={stats.externalCollabs}
          trend={18}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Countries"
          value={stats.countries}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Collaboration Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Collaboration Timeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={collaborationTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="internal" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Internal"
              />
              <Line 
                type="monotone" 
                dataKey="external" 
                stroke="#059669" 
                strokeWidth={2}
                name="External"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Geographic Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={geographicData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {geographicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Collaborators List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Collaborators</h3>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              View Network Graph
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collaborators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'internal', 'external'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filterType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCollaborators.map((collab) => (
            <div key={collab.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${
                    collab.type === 'internal' 
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                      : 'bg-gradient-to-br from-success-500 to-success-600'
                  } text-white flex items-center justify-center font-semibold`}>
                    {collab.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{collab.name}</h4>
                    <p className="text-xs text-gray-600">{collab.institution}</p>
                    <p className="text-xs text-gray-500">{collab.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{collab.publications}</p>
                    <p className="text-xs text-gray-500">Joint Publications</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    collab.type === 'internal'
                      ? 'bg-primary-50 text-primary-600'
                      : 'bg-success-50 text-success-600'
                  }`}>
                    {collab.type}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeamLayout>
  );
};