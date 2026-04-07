import React, { useState } from 'react';
import { TeamLayout } from '../../components/layout/teamlayout';
import { StatCard } from '../../components/common/statcard';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Données pour le graphique radar
const radarData = [
  { metric: 'Publications', yourTeam: 85, teamA: 92, teamB: 78, average: 85 },
  { metric: 'Citations', yourTeam: 72, teamA: 95, teamB: 88, average: 85 },
  { metric: 'H-Index', yourTeam: 88, teamA: 85, teamB: 75, average: 83 },
  { metric: 'Collaborations', yourTeam: 90, teamA: 70, teamB: 65, average: 75 },
  { metric: 'Grants', yourTeam: 78, teamA: 82, teamB: 72, average: 77 },
  { metric: 'Impact', yourTeam: 82, teamA: 88, teamB: 80, average: 83 }
];

// Données pour le graphique de tendance
const publicationsTrendData = [
  { year: '2019', yourTeam: 22, teamA: 28, teamB: 18 },
  { year: '2020', yourTeam: 28, teamA: 32, teamB: 22 },
  { year: '2021', yourTeam: 35, teamA: 38, teamB: 28 },
  { year: '2022', yourTeam: 42, teamA: 45, teamB: 35 },
  { year: '2023', yourTeam: 48, teamA: 52, teamB: 42 },
  { year: '2024', yourTeam: 10, teamA: 12, teamB: 8 }
];

// Équipes disponibles
const availableTeams = [
  {
    id: 'team-a',
    name: 'Computer Vision Team',
    lab: 'AI & ML Lab',
    members: 10,
    selected: true
  },
  {
    id: 'team-b',
    name: 'NLP Research Group',
    lab: 'AI & ML Lab',
    members: 14,
    selected: true
  },
  {
    id: 'team-c',
    name: 'Robotics Lab',
    lab: 'Engineering',
    members: 8,
    selected: false
  },
  {
    id: 'team-d',
    name: 'Medical AI Team',
    lab: 'Healthcare',
    members: 12,
    selected: false
  }
];

// Données de comparaison
const comparisonData = [
  {
    metric: 'Total Publications',
    yourTeam: { value: 156, rank: 2 },
    teamA: { value: 168, rank: 1 },
    teamB: { value: 142, rank: 3 },
    average: 155
  },
  {
    metric: 'Publications per Member',
    yourTeam: { value: 13.0, rank: 1 },
    teamA: { value: 16.8, rank: 1 },
    teamB: { value: 10.1, rank: 3 },
    average: 13.3
  },
  {
    metric: 'Total Citations',
    yourTeam: { value: 4520, rank: 3 },
    teamA: { value: 5890, rank: 1 },
    teamB: { value: 5120, rank: 2 },
    average: 5177
  },
  {
    metric: 'Average H-Index',
    yourTeam: { value: 24, rank: 2 },
    teamA: { value: 26, rank: 1 },
    teamB: { value: 22, rank: 3 },
    average: 24
  },
  {
    metric: 'Team Members',
    yourTeam: { value: 12, rank: 2 },
    teamA: { value: 10, rank: 3 },
    teamB: { value: 14, rank: 1 },
    average: 12
  },
  {
    metric: 'International Collaborations',
    yourTeam: { value: 28, rank: 2 },
    teamA: { value: 32, rank: 1 },
    teamB: { value: 24, rank: 3 },
    average: 28
  },
  {
    metric: 'Industry Partnerships',
    yourTeam: { value: 8, rank: 1 },
    teamA: { value: 6, rank: 2 },
    teamB: { value: 4, rank: 3 },
    average: 6
  },
  {
    metric: 'Research Grants',
    yourTeam: { value: 5, rank: 2 },
    teamA: { value: 6, rank: 1 },
    teamB: { value: 4, rank: 3 },
    average: 5
  }
];

export const CompareTeams: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState(availableTeams);

  const stats = {
    yourRank: 2,
    growth: 18,
    teamsCompared: 3,
    aboveAverage: 3
  };

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(teams =>
      teams.map(team =>
        team.id === teamId ? { ...team, selected: !team.selected } : team
      )
    );
  };

  const getPerformanceColor = (rank: number) => {
    if (rank === 1) return 'text-blue-600';
    if (rank === 2) return 'text-green-600';
    if (rank === 3) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceIndicator = (rank: number) => {
    if (rank === 1) return '🔵';
    if (rank === 2) return '🟢';
    if (rank === 3) return '🟡';
    return '🔴';
  };

  return (
    <TeamLayout 
      title="Compare Teams" 
      subtitle="Benchmark your team's performance against others"
    >
      {/* Team Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Select Teams to Compare
        </h3>

        <div className="space-y-3">
          {/* Your Team */}
          <div className="p-4 bg-primary-50 border-2 border-primary-600 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">AI Research Team (Your Team)</p>
                  <p className="text-xs text-gray-600">AI & ML Lab • 12 members</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                Selected
              </span>
            </div>
          </div>

          {/* Other Teams */}
          <p className="text-sm font-medium text-gray-700 mt-4 mb-2">
            Compare with: (Select up to 3 teams)
          </p>
          
          {selectedTeams.map((team) => (
            <label
              key={team.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                team.selected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={team.selected}
                    onChange={() => toggleTeam(team.id)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{team.name}</p>
                    <p className="text-xs text-gray-600">{team.lab} • {team.members} members</p>
                  </div>
                </div>
                {team.selected && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Comparing
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {selectedTeams.filter(t => t.selected).length} teams selected for comparison
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Last 5 years</option>
            <option>Last 3 years</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Trophy}
          label="Your Rank"
          value={`#${stats.yourRank}`}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Growth vs Average"
          value={`+${stats.growth}%`}
          trend={stats.growth}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Users}
          label="Teams Compared"
          value={stats.teamsCompared}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={Target}
          label="Above Average"
          value={`${stats.aboveAverage} areas`}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Performance Comparison</h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            Export Comparison
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-primary-50">
                  Your Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Computer Vision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NLP Research
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 bg-primary-50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {row.yourTeam.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.yourTeam.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {row.teamA.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.teamA.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {row.teamB.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.teamB.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {row.average.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-medium text-gray-700">Legend:</span>
            <div className="flex items-center gap-2">
              <span>🔵</span>
              <span className="text-gray-600">Best</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🟢</span>
              <span className="text-gray-600">Above Average</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🟡</span>
              <span className="text-gray-600">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔴</span>
              <span className="text-gray-600">Below Average</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Multi-Dimensional Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <Radar 
                name="Your Team" 
                dataKey="yourTeam" 
                stroke="#2563eb" 
                fill="#2563eb" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Computer Vision" 
                dataKey="teamA" 
                stroke="#059669" 
                fill="#059669" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="NLP Research" 
                dataKey="teamB" 
                stroke="#7c3aed" 
                fill="#7c3aed" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Average" 
                dataKey="average" 
                stroke="#9ca3af" 
                fill="none" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Publications Trend (2019-2024)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={publicationsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
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
              <Line 
                type="monotone" 
                dataKey="yourTeam" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Your Team"
                dot={{ fill: '#2563eb', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="teamA" 
                stroke="#059669" 
                strokeWidth={2}
                name="Computer Vision"
                dot={{ fill: '#059669', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="teamB" 
                stroke="#7c3aed" 
                strokeWidth={2}
                name="NLP Research"
                dot={{ fill: '#7c3aed', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparison Insights & Recommendations
        </h3>

        <div className="space-y-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Your Team's Strengths</h4>
            </div>
            <ul className="space-y-2 ml-10">
              <li className="text-sm text-gray-700">
                • <strong>Publications per member:</strong> 13.0 (highest among compared teams)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Industry partnerships:</strong> 8 partnerships (leading position)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>International collaborations:</strong> 28 (above average)
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Areas for Improvement</h4>
            </div>
            <ul className="space-y-2 ml-10">
              <li className="text-sm text-gray-700">
                • <strong>Total citations:</strong> 4,520 (below Computer Vision's 5,890)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Research grants:</strong> 5 grants (could improve to match leaders)
              </li>
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Strategic Recommendations</h4>
            </div>
            <ul className="space-y-2 ml-10">
              <li className="text-sm text-gray-700">
                • Analyze Computer Vision Team's citation strategy to improve impact
              </li>
              <li className="text-sm text-gray-700">
                • Focus on high-impact journals to increase citation count
              </li>
              <li className="text-sm text-gray-700">
                • Leverage industry partnerships for collaborative research grants
              </li>
              <li className="text-sm text-gray-700">
                • Continue maintaining strong publication output per member
              </li>
            </ul>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Benchmarking Summary</h4>
            <p className="text-sm text-gray-700">
              Your team ranks <strong>#2 out of 3</strong> teams compared. You excel in <strong>publications per member</strong> and <strong>industry partnerships</strong>, but have opportunities to improve <strong>total citations</strong> and <strong>research grants</strong>. Overall performance score: <strong>82/100</strong>.
            </p>
          </div>
        </div>
      </div>
    </TeamLayout>
  );
};