import React from 'react';
import { TeamLayout } from '../../components/layout/teamlayout';
import { StatCard } from '../../components/common/statcard';
import { FileText, TrendingUp, Trophy, Users } from 'lucide-react';
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
const teamProductionData = [
  { year: '2019', publications: 22 },
  { year: '2020', publications: 28 },
  { year: '2021', publications: 35 },
  { year: '2022', publications: 42 },
  { year: '2023', publications: 48 },
  { year: '2024', publications: 10 },
];

const memberContributionData = [
  { name: 'Dr. Ahmed Hassan', publications: 24, citations: 580, hIndex: 12 },
  { name: 'Dr. Sarah Johnson', publications: 32, citations: 890, hIndex: 15 },
  { name: 'Dr. Martin Chen', publications: 28, citations: 720, hIndex: 14 },
  { name: 'Dr. Elena Martinez', publications: 18, citations: 450, hIndex: 10 },
  { name: 'Dr. Karim Benali', publications: 22, citations: 610, hIndex: 11 },
];

const teamMembers = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    role: 'Senior Researcher',
    initials: 'AH',
    gradient: 'from-blue-500 to-indigo-600',
    publications: 24,
    hIndex: 12,
    joinDate: '2020-01-15'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    role: 'Researcher',
    initials: 'SJ',
    gradient: 'from-green-500 to-emerald-600',
    publications: 32,
    hIndex: 15,
    joinDate: '2019-06-10'
  },
  {
    id: '3',
    name: 'Dr. Martin Chen',
    role: 'Researcher',
    initials: 'MC',
    gradient: 'from-purple-500 to-violet-600',
    publications: 28,
    hIndex: 14,
    joinDate: '2021-03-22'
  },
  {
    id: '4',
    name: 'Dr. Elena Martinez',
    role: 'Post-Doc',
    initials: 'EM',
    gradient: 'from-orange-500 to-amber-600',
    publications: 18,
    hIndex: 10,
    joinDate: '2022-09-05'
  },
  {
    id: '5',
    name: 'Dr. Karim Benali',
    role: 'PhD Student',
    initials: 'KB',
    gradient: 'from-pink-500 to-rose-600',
    publications: 22,
    hIndex: 11,
    joinDate: '2023-01-12'
  },
  {
    id: '6',
    name: 'Dr. Lisa Anderson',
    role: 'Researcher',
    initials: 'LA',
    gradient: 'from-cyan-500 to-blue-600',
    publications: 26,
    hIndex: 13,
    joinDate: '2020-08-18'
  },
];

export const TeamDashboard: React.FC = () => {
  const stats = {
    totalPublications: 156,
    totalCitations: 4520,
    avgHIndex: 24,
    teamMembers: 12
  };

  return (
    <TeamLayout 
      title="Team Dashboard" 
      subtitle="AI Research Team • 12 members • Last updated: 1 hour ago"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
          📊 Generate Report
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
          ✉️ Email Team
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
          📈 Compare Teams
        </button>
        <button className="px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
          🔗 Collaboration Network
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Total Publications"
          value={stats.totalPublications}
          trend={18}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Citations"
          value={stats.totalCitations.toLocaleString()}
          trend={14}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Trophy}
          label="Average H-Index"
          value={stats.avgHIndex}
          trend={4}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Users}
          label="Team Members"
          value={stats.teamMembers}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Team Production Over Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Production Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={teamProductionData}>
              <defs>
                <linearGradient id="colorPubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="publications" 
                stroke="#2563eb" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPubs)"
                name="Publications"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Member Contributions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Member Contributions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memberContributionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120}
                stroke="#9ca3af" 
                style={{ fontSize: '11px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="publications" fill="#2563eb" radius={[0, 4, 4, 0]} name="Publications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Team Members ({teamMembers.length})</h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            + Add Member
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  H-Index
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.gradient} text-white flex items-center justify-center font-semibold text-sm mr-3`}>
                        {member.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{member.publications}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{member.hIndex}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(member.joinDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Collaborators */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Frequent Collaborators
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Dr. Lisa Wang', institution: 'MIT', count: 12 },
              { name: 'Prof. John Smith', institution: 'Stanford', count: 8 },
              { name: 'Dr. Maria Garcia', institution: 'Cambridge', count: 6 },
            ].map((collab, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{collab.name}</p>
                  <p className="text-xs text-gray-500">{collab.institution}</p>
                </div>
                <span className="text-sm font-medium text-primary-600">
                  {collab.count} publications
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Collaboration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Internal Collaboration
          </h3>
          <div className="space-y-4">
            {[
              { pair: 'Ahmed & Sarah', count: 8 },
              { pair: 'Martin & Elena', count: 6 },
              { pair: 'Sarah & Karim', count: 5 },
            ].map((collab, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-900">{collab.pair}</p>
                <span className="text-sm font-medium text-success-600">
                  {collab.count} joint pubs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeamLayout>
  );
};