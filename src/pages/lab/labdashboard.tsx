import React from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { 
  FileText, 
  TrendingUp, 
  Trophy, 
  Users,
  Building2,
  Globe,
  Award,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

// Données mockées
const labProductionData = [
  { year: '2019', publications: 85, citations: 2100 },
  { year: '2020', publications: 102, citations: 2680 },
  { year: '2021', publications: 128, citations: 3420 },
  { year: '2022', publications: 156, citations: 4250 },
  { year: '2023', publications: 185, citations: 5180 },
  { year: '2024', publications: 42, citations: 1200 },
];

const teamPerformanceData = [
  { name: 'AI Research Team', publications: 156, members: 12, avgHIndex: 24 },
  { name: 'Computer Vision', publications: 142, members: 10, avgHIndex: 22 },
  { name: 'NLP Group', members: 14, publications: 168, avgHIndex: 26 },
  { name: 'Robotics Lab', publications: 98, members: 8, avgHIndex: 18 },
  { name: 'Data Science Team', publications: 134, members: 11, avgHIndex: 21 },
];

const researchAreas = [
  { area: 'Artificial Intelligence', teams: 3, publications: 466, percentage: 42 },
  { area: 'Machine Learning', teams: 2, publications: 290, percentage: 26 },
  { area: 'Computer Vision', teams: 2, publications: 240, percentage: 22 },
  { area: 'Robotics', teams: 1, publications: 98, percentage: 10 },
];

const teams = [
  {
    id: '1',
    name: 'AI Research Team',
    leader: 'Dr. Rachid Benali',
    members: 12,
    publications: 156,
    citations: 4520,
    hIndex: 24,
    status: 'active',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    name: 'Computer Vision Team',
    leader: 'Dr. Sarah Johnson',
    members: 10,
    publications: 142,
    citations: 4180,
    hIndex: 22,
    status: 'active',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: '3',
    name: 'NLP Research Group',
    leader: 'Dr. Ahmed Hassan',
    members: 14,
    publications: 168,
    citations: 4890,
    hIndex: 26,
    status: 'active',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: '4',
    name: 'Robotics Lab',
    leader: 'Dr. Martin Chen',
    members: 8,
    publications: 98,
    citations: 2640,
    hIndex: 18,
    status: 'active',
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    id: '5',
    name: 'Data Science Team',
    leader: 'Dr. Elena Martinez',
    members: 11,
    publications: 134,
    citations: 3780,
    hIndex: 21,
    status: 'active',
    gradient: 'from-pink-500 to-rose-600'
  },
];

export const LabDashboard: React.FC = () => {
  const stats = {
    totalPublications: 698,
    totalCitations: 20010,
    avgHIndex: 22.2,
    activeTeams: 5,
    totalMembers: 55,
    internationalCollabs: 86,
    researchGrants: 18,
    labRanking: 3
  };

  return (
    <Layout 
      title="Lab Dashboard" 
      subtitle="AI & Machine Learning Laboratory • 5 teams • 55 researchers"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors">
          📊 Generate Lab Report
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors">
          ✉️ Email All Teams
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors">
          📈 Compare Labs
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors">
          🎯 Strategic Planning
        </button>
      </div>

      {/* Stats Cards - 2 rows */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Total Publications"
          value={stats.totalPublications}
          trend={22}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Citations"
          value={stats.totalCitations.toLocaleString()}
          trend={18}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Trophy}
          label="Average H-Index"
          value={stats.avgHIndex}
          trend={8}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Building2}
          label="Active Teams"
          value={stats.activeTeams}
          iconColor="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Members"
          value={stats.totalMembers}
          iconColor="bg-cyan-600"
        />
        <StatCard
          icon={Globe}
          label="International Collabs"
          value={stats.internationalCollabs}
          trend={24}
          iconColor="bg-indigo-600"
        />
        <StatCard
          icon={Award}
          label="Research Grants"
          value={stats.researchGrants}
          trend={15}
          iconColor="bg-emerald-600"
        />
        <StatCard
          icon={Target}
          label="Lab Ranking"
          value={`#${stats.labRanking}`}
          iconColor="bg-amber-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Lab Production Over Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lab Production & Impact
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={labProductionData}>
              <defs>
                <linearGradient id="colorPubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="publications" 
                stroke="#2563eb" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPubs)"
                name="Publications"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="citations" 
                stroke="#059669" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCitations)"
                name="Citations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                style={{ fontSize: '11px' }}
                angle={-15}
                textAnchor="end"
                height={80}
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
              <Bar dataKey="publications" fill="#2563eb" radius={[4, 4, 0, 0]} name="Publications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Research Areas */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Research Areas Distribution
        </h3>
        <div className="space-y-4">
          {researchAreas.map((area, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{area.area}</p>
                  <p className="text-xs text-gray-500">
                    {area.teams} teams • {area.publications} publications
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary-600">
                  {area.percentage}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 transition-all duration-300"
                  style={{ width: `${area.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Lab Teams ({teams.length})</h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            + Create New Team
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  H-Index
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${team.gradient} text-white flex items-center justify-center font-semibold text-sm mr-3`}>
                        {team.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{team.leader}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{team.members}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{team.publications}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{team.citations.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{team.hIndex}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Teams
          </h3>
          <div className="space-y-4">
            {[
              { name: 'NLP Research Group', metric: '168 publications', rank: 1 },
              { name: 'AI Research Team', metric: '156 publications', rank: 2 },
              { name: 'Computer Vision', metric: '142 publications', rank: 3 },
            ].map((team, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    team.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    team.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {team.rank}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{team.name}</p>
                    <p className="text-xs text-gray-500">{team.metric}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grants */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Grants Awarded
          </h3>
          <div className="space-y-4">
            {[
              { title: 'AI in Healthcare', amount: '$250K', team: 'AI Research' },
              { title: 'Computer Vision for Robotics', amount: '$180K', team: 'CV Team' },
              { title: 'NLP for Education', amount: '$150K', team: 'NLP Group' },
            ].map((grant, idx) => (
              <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{grant.title}</p>
                  <span className="text-sm font-semibold text-success-600">{grant.amount}</span>
                </div>
                <p className="text-xs text-gray-500">{grant.team}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Milestones */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Milestones
          </h3>
          <div className="space-y-4">
            {[
              { milestone: '20,000th Citation', date: '2 days ago' },
              { milestone: 'New Industry Partnership', date: '1 week ago' },
              { milestone: 'Top 3 Lab Ranking', date: '2 weeks ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.milestone}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};