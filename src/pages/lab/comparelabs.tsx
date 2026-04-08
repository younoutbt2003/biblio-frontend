import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { 
  Trophy, 
  TrendingUp, 
  Building2, 
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Données pour le graphique radar
const radarData = [
  { metric: 'Publications', yourLab: 88, labA: 95, labB: 82, average: 88 },
  { metric: 'Citations', yourLab: 85, labA: 92, labB: 78, average: 85 },
  { metric: 'H-Index', yourLab: 90, labA: 88, labB: 85, average: 88 },
  { metric: 'Teams', yourLab: 75, labA: 85, labB: 70, average: 77 },
  { metric: 'Grants', yourLab: 82, labA: 90, labB: 75, average: 82 },
  { metric: 'Collaborations', yourLab: 92, labA: 88, labB: 80, average: 87 }
];

// Données pour le graphique de tendance
const publicationsTrendData = [
  { year: '2019', yourLab: 85, labA: 92, labB: 78 },
  { year: '2020', yourLab: 102, labA: 110, labB: 88 },
  { year: '2021', yourLab: 128, labA: 135, labB: 105 },
  { year: '2022', yourLab: 156, labA: 168, labB: 128 },
  { year: '2023', yourLab: 185, labA: 195, labB: 152 },
  { year: '2024', yourLab: 42, labA: 48, labB: 35 }
];

// Données pour le graphique de citations
const citationsTrendData = [
  { year: '2019', yourLab: 2100, labA: 2450, labB: 1980 },
  { year: '2020', yourLab: 2680, labA: 3100, labB: 2420 },
  { year: '2021', yourLab: 3420, labA: 3950, labB: 3080 },
  { year: '2022', yourLab: 4250, labA: 4880, labB: 3850 },
  { year: '2023', yourLab: 5180, labA: 5920, labB: 4680 },
  { year: '2024', yourLab: 1200, labA: 1450, labB: 1080 }
];

// Laboratoires disponibles
const availableLabs = [
  {
    id: 'lab-a',
    name: 'Advanced Computing Lab',
    institute: 'MIT',
    teams: 6,
    selected: true
  },
  {
    id: 'lab-b',
    name: 'Data Science Research Lab',
    institute: 'Stanford',
    teams: 4,
    selected: true
  },
  {
    id: 'lab-c',
    name: 'Robotics & Automation Lab',
    institute: 'Carnegie Mellon',
    teams: 5,
    selected: false
  },
  {
    id: 'lab-d',
    name: 'Machine Learning Lab',
    institute: 'Berkeley',
    teams: 7,
    selected: false
  }
];

// Données de comparaison
const comparisonData = [
  {
    metric: 'Total Publications',
    yourLab: { value: 698, rank: 2 },
    labA: { value: 752, rank: 1 },
    labB: { value: 624, rank: 3 },
    average: 691
  },
  {
    metric: 'Publications per Team',
    yourLab: { value: 139.6, rank: 1 },
    labA: { value: 125.3, rank: 2 },
    labB: { value: 156.0, rank: 1 },
    average: 140.3
  },
  {
    metric: 'Total Citations',
    yourLab: { value: 20010, rank: 2 },
    labA: { value: 23450, rank: 1 },
    labB: { value: 18240, rank: 3 },
    average: 20567
  },
  {
    metric: 'Average H-Index',
    yourLab: { value: 22.2, rank: 2 },
    labA: { value: 24.8, rank: 1 },
    labB: { value: 20.5, rank: 3 },
    average: 22.5
  },
  {
    metric: 'Number of Teams',
    yourLab: { value: 5, rank: 2 },
    labA: { value: 6, rank: 1 },
    labB: { value: 4, rank: 3 },
    average: 5
  },
  {
    metric: 'Total Members',
    yourLab: { value: 55, rank: 2 },
    labA: { value: 68, rank: 1 },
    labB: { value: 48, rank: 3 },
    average: 57
  },
  {
    metric: 'International Collaborations',
    yourLab: { value: 86, rank: 1 },
    labA: { value: 72, rank: 2 },
    labB: { value: 58, rank: 3 },
    average: 72
  },
  {
    metric: 'Research Grants',
    yourLab: { value: 18, rank: 2 },
    labA: { value: 22, rank: 1 },
    labB: { value: 14, rank: 3 },
    average: 18
  },
  {
    metric: 'Industry Partnerships',
    yourLab: { value: 12, rank: 1 },
    labA: { value: 10, rank: 2 },
    labB: { value: 8, rank: 3 },
    average: 10
  },
  {
    metric: 'PhD Students',
    yourLab: { value: 28, rank: 2 },
    labA: { value: 32, rank: 1 },
    labB: { value: 22, rank: 3 },
    average: 27
  }
];

export const CompareLabs: React.FC = () => {
  const [selectedLabs, setSelectedLabs] = useState(availableLabs);

  const stats = {
    yourRank: 2,
    growth: 24,
    labsCompared: 3,
    aboveAverage: 4
  };

  const toggleLab = (labId: string) => {
    setSelectedLabs(labs =>
      labs.map(lab =>
        lab.id === labId ? { ...lab, selected: !lab.selected } : lab
      )
    );
  };

  const getPerformanceIndicator = (rank: number) => {
    if (rank === 1) return '🔵';
    if (rank === 2) return '🟢';
    if (rank === 3) return '🟡';
    return '🔴';
  };

  return (
    <Layout 
      title="Compare Labs" 
      subtitle="Benchmark your laboratory's performance against other research labs"
    >
      {/* Lab Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Select Labs to Compare
        </h3>

        <div className="space-y-3">
          {/* Your Lab */}
          <div className="p-4 bg-primary-50 border-2 border-primary-600 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">AI & Machine Learning Laboratory (Your Lab)</p>
                  <p className="text-xs text-gray-600">USTHB • 5 teams • 55 members</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                Selected
              </span>
            </div>
          </div>

          {/* Other Labs */}
          <p className="text-sm font-medium text-gray-700 mt-4 mb-2">
            Compare with: (Select up to 3 labs)
          </p>
          
          {selectedLabs.map((lab) => (
            <label
              key={lab.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                lab.selected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={lab.selected}
                    onChange={() => toggleLab(lab.id)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{lab.name}</p>
                    <p className="text-xs text-gray-600">{lab.institute} • {lab.teams} teams</p>
                  </div>
                </div>
                {lab.selected && (
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
            {selectedLabs.filter(l => l.selected).length} labs selected for comparison
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
          icon={Building2}
          label="Labs Compared"
          value={stats.labsCompared}
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
                  Your Lab
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Advanced Computing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Science Lab
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
                        {row.yourLab.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.yourLab.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {row.labA.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.labA.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {row.labB.value.toLocaleString()}
                      </span>
                      <span className="text-lg">
                        {getPerformanceIndicator(row.labB.rank)}
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
            Multi-Dimensional Lab Performance
          </h3>
          <ResponsiveContainer width="100%" height={340}>
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
                name="Your Lab" 
                dataKey="yourLab" 
                stroke="#2563eb" 
                fill="#2563eb" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Advanced Computing" 
                dataKey="labA" 
                stroke="#059669" 
                fill="#059669" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar 
                name="Data Science" 
                dataKey="labB" 
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

        {/* Publications Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Publications Trend (2019-2024)
          </h3>
          <ResponsiveContainer width="100%" height={340}>
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
                dataKey="yourLab" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Your Lab"
                dot={{ fill: '#2563eb', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="labA" 
                stroke="#059669" 
                strokeWidth={2}
                name="Advanced Computing"
                dot={{ fill: '#059669', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="labB" 
                stroke="#7c3aed" 
                strokeWidth={2}
                name="Data Science"
                dot={{ fill: '#7c3aed', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Citations Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Citations Impact Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={citationsTrendData}>
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
            <Bar dataKey="yourLab" fill="#2563eb" name="Your Lab" radius={[4, 4, 0, 0]} />
            <Bar dataKey="labA" fill="#059669" name="Advanced Computing" radius={[4, 4, 0, 0]} />
            <Bar dataKey="labB" fill="#7c3aed" name="Data Science" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparison Insights & Strategic Recommendations
        </h3>

        <div className="space-y-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Your Lab's Strengths</h4>
            </div>
            <ul className="space-y-2 ml-10">
              <li className="text-sm text-gray-700">
                • <strong>Publications per team:</strong> 139.6 (highest efficiency among compared labs)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>International collaborations:</strong> 86 partnerships (leading in global reach)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Industry partnerships:</strong> 12 partnerships (strongest industry connections)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Collaboration network:</strong> 92/100 score (excellent collaborative culture)
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
                • <strong>Total publications:</strong> 698 vs. 752 (Advanced Computing Lab leads by 7.7%)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Total citations:</strong> 20,010 vs. 23,450 (gap of 3,440 citations)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Research grants:</strong> 18 vs. 22 (opportunity to secure 4 more grants)
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Team size:</strong> 5 teams vs. 6 (potential to expand research capacity)
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
                • <strong>Citation strategy:</strong> Study Advanced Computing Lab's publication venues to increase impact
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Team expansion:</strong> Consider creating a 6th specialized team to match top performers
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Grant acquisition:</strong> Leverage strong industry partnerships to secure joint research funding
              </li>
              <li className="text-sm text-gray-700">
                • <strong>PhD recruitment:</strong> Increase PhD students from 28 to 32+ to boost research capacity
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Maintain strengths:</strong> Continue building on collaboration networks and industry ties
              </li>
              <li className="text-sm text-gray-700">
                • <strong>Quality focus:</strong> Your high publications-per-team ratio shows efficiency - scale this model
              </li>
            </ul>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Benchmarking Summary</h4>
            <p className="text-sm text-gray-700">
              Your lab ranks <strong>#2 out of 3</strong> labs compared with an overall performance score of <strong>86/100</strong>. 
              You excel in <strong>efficiency metrics</strong> (publications per team, collaborations, industry partnerships) 
              but have opportunities to improve <strong>scale metrics</strong> (total publications, citations, grants). 
              Your lab demonstrates <strong>high-quality research</strong> with strong international and industry connections. 
              The path to #1 ranking involves strategic expansion while maintaining your efficient collaborative culture.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};