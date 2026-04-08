import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
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
  Cell,
  BarChart,
  Bar
} from 'recharts';

const collaborationTimelineData = [
  { year: '2019', internal: 42, external: 28, interLab: 15 },
  { year: '2020', internal: 55, external: 35, interLab: 20 },
  { year: '2021', internal: 68, external: 45, interLab: 28 },
  { year: '2022', internal: 82, external: 58, interLab: 35 },
  { year: '2023', internal: 98, external: 72, interLab: 42 },
  { year: '2024', internal: 24, external: 18, interLab: 10 },
];

const geographicData = [
  { name: 'Algeria', value: 98, color: '#2563eb' },
  { name: 'France', value: 42, color: '#059669' },
  { name: 'USA', value: 38, color: '#7c3aed' },
  { name: 'UK', value: 28, color: '#ea580c' },
  { name: 'Germany', value: 22, color: '#06b6d4' },
  { name: 'Other', value: 38, color: '#6b7280' },
];

const teamCollaborationData = [
  { team: 'AI Research', internal: 45, external: 28 },
  { team: 'Computer Vision', internal: 38, external: 32 },
  { team: 'NLP Group', internal: 52, external: 38 },
  { team: 'Robotics Lab', internal: 28, external: 22 },
  { team: 'Data Science', internal: 42, external: 30 },
];

const topCollaborators = [
  {
    id: '1',
    name: 'Prof. Jean Dupont',
    institution: 'Sorbonne University',
    country: 'France',
    publications: 28,
    type: 'external',
    avatar: 'JD',
    research: 'Machine Learning'
  },
  {
    id: '2',
    name: 'Dr. Lisa Wang',
    institution: 'MIT',
    country: 'USA',
    publications: 24,
    type: 'external',
    avatar: 'LW',
    research: 'Computer Vision'
  },
  {
    id: '3',
    name: 'Prof. Ahmed Benali',
    institution: 'CERIST',
    country: 'Algeria',
    publications: 32,
    type: 'interlab',
    avatar: 'AB',
    research: 'Artificial Intelligence'
  },
  {
    id: '4',
    name: 'Dr. Sarah Johnson',
    institution: 'Cambridge',
    country: 'UK',
    publications: 18,
    type: 'external',
    avatar: 'SJ',
    research: 'Natural Language Processing'
  },
  {
    id: '5',
    name: 'Dr. Martin Chen',
    institution: 'Stanford',
    country: 'USA',
    publications: 22,
    type: 'external',
    avatar: 'MC',
    research: 'Robotics'
  },
  {
    id: '6',
    name: 'Dr. Elena Martinez',
    institution: 'USTHB - Physics Lab',
    country: 'Algeria',
    publications: 20,
    type: 'interlab',
    avatar: 'EM',
    research: 'Quantum Computing'
  },
];

export const LabCollaboration: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'internal' | 'external' | 'interlab'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalCollaborators: 266,
    internalCollabs: 98,
    externalCollabs: 126,
    interlabCollabs: 42,
    countries: 38
  };

  const filteredCollaborators = topCollaborators.filter(collab => {
    const matchesType = filterType === 'all' || collab.type === filterType;
    const matchesSearch = collab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collab.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Layout 
      title="Lab Collaboration Network" 
      subtitle="Explore and manage your laboratory's research collaborations across all teams"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6">
        <StatCard
          icon={Users}
          label="Total Collaborators"
          value={stats.totalCollaborators}
          trend={22}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={Network}
          label="Internal Collabs"
          value={stats.internalCollabs}
          trend={18}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Globe}
          label="External Collabs"
          value={stats.externalCollabs}
          trend={25}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Inter-Lab Collabs"
          value={stats.interlabCollabs}
          trend={30}
          iconColor="bg-orange-600"
        />
        <StatCard
          icon={Globe}
          label="Countries"
          value={stats.countries}
          iconColor="bg-cyan-600"
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
              <Line 
                type="monotone" 
                dataKey="interLab" 
                stroke="#7c3aed" 
                strokeWidth={2}
                name="Inter-Lab"
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
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
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

      {/* Team Collaboration Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Team Collaboration Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={teamCollaborationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="team" 
              stroke="#9ca3af" 
              style={{ fontSize: '12px' }}
            />
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
            <Bar dataKey="internal" fill="#2563eb" radius={[4, 4, 0, 0]} name="Internal" />
            <Bar dataKey="external" fill="#059669" radius={[4, 4, 0, 0]} name="External" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Collaborators List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Collaborators</h3>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              View Full Network Graph
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
              {(['all', 'internal', 'external', 'interlab'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filterType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'interlab' ? 'Inter-Lab' : type}
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
                      : collab.type === 'external'
                      ? 'bg-gradient-to-br from-success-500 to-success-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  } text-white flex items-center justify-center font-semibold`}>
                    {collab.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{collab.name}</h4>
                    <p className="text-xs text-gray-600">{collab.institution}</p>
                    <p className="text-xs text-gray-500">{collab.country} • {collab.research}</p>
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
                      : collab.type === 'external'
                      ? 'bg-success-50 text-success-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}>
                    {collab.type === 'interlab' ? 'Inter-Lab' : collab.type}
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

      {/* Collaboration Insights */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Most Active Teams
          </h3>
          <div className="space-y-3">
            {[
              { team: 'NLP Research Group', collabs: 90 },
              { team: 'AI Research Team', collabs: 73 },
              { team: 'Computer Vision', collabs: 70 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900">{item.team}</p>
                <span className="text-sm font-semibold text-primary-600">
                  {item.collabs} collabs
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Partner Institutions
          </h3>
          <div className="space-y-3">
            {[
              { institution: 'Sorbonne University', count: 32 },
              { institution: 'MIT', count: 28 },
              { institution: 'Stanford', count: 24 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900">{item.institution}</p>
                <span className="text-sm font-semibold text-success-600">
                  {item.count} pubs
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Emerging Collaborations
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Quantum AI Research', trend: '+150%' },
              { name: 'Healthcare AI', trend: '+120%' },
              { name: 'Edge Computing', trend: '+95%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <span className="text-sm font-semibold text-green-600">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};