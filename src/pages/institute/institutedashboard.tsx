import React from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Award,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const InstituteDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Total Labs',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Building2,
      color: 'blue'
    },
    {
      label: 'Lab Directors',
      value: '12',
      change: '+1',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Total Researchers',
      value: '248',
      change: '+18',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      label: 'Total Teams',
      value: '64',
      change: '+5',
      trend: 'up',
      icon: Users,
      color: 'orange'
    },
    {
      label: 'Total Publications',
      value: '1,847',
      change: '+127',
      trend: 'up',
      icon: FileText,
      color: 'indigo'
    },
    {
      label: 'Average H-Index',
      value: '24.5',
      change: '+1.2',
      trend: 'up',
      icon: Award,
      color: 'pink'
    },
    {
      label: 'Total Citations',
      value: '45,892',
      change: '+3,241',
      trend: 'up',
      icon: TrendingUp,
      color: 'cyan'
    },
    {
      label: 'Active Collaborations',
      value: '89',
      change: '+12',
      trend: 'up',
      icon: Activity,
      color: 'emerald'
    },
  ];

  const topLabs = [
    { name: 'AI Research Lab', director: 'Dr. Rachid Benali', teams: 8, researchers: 32, hIndex: 38.2, publications: 245 },
    { name: 'Bioinformatics Lab', director: 'Dr. Amina Kaci', teams: 6, researchers: 24, hIndex: 35.7, publications: 198 },
    { name: 'Computer Vision Lab', director: 'Dr. Mohamed Larbi', teams: 7, researchers: 28, hIndex: 34.1, publications: 187 },
    { name: 'Cybersecurity Lab', director: 'Dr. Sarah Hamdi', teams: 5, researchers: 20, hIndex: 31.8, publications: 156 },
    { name: 'Data Science Lab', director: 'Dr. Karim Mansouri', teams: 6, researchers: 26, hIndex: 30.2, publications: 142 },
  ];

  const recentActivities = [
    { action: 'New Lab Created', lab: 'Quantum Computing Lab', time: '2 hours ago', type: 'create' },
    { action: 'Director Assigned', lab: 'NLP Research Lab', director: 'Dr. Ahmed Hassan', time: '5 hours ago', type: 'assign' },
    { action: '23 Publications Imported', lab: 'AI Research Lab', time: '1 day ago', type: 'import' },
    { action: 'New Team Created', lab: 'Computer Vision Lab', team: 'Image Processing Team', time: '2 days ago', type: 'team' },
    { action: 'Lab Report Generated', lab: 'Bioinformatics Lab', time: '3 days ago', type: 'report' },
  ];

  // Fonction helper pour obtenir les classes de couleur
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-600';
      case 'pink':
        return 'bg-pink-100 text-pink-600';
      case 'cyan':
        return 'bg-cyan-100 text-cyan-600';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Institute Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of all laboratories and research activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm">this month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Labs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Top Performing Labs</h2>
              <p className="text-gray-600 text-sm mt-1">Ranked by H-Index</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topLabs.map((lab, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{lab.name}</p>
                        <p className="text-sm text-gray-600">{lab.director} • {lab.teams} teams • {lab.researchers} researchers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{lab.hIndex}</p>
                      <p className="text-xs text-gray-500">H-Index</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'create' ? 'bg-green-500' :
                      activity.type === 'assign' ? 'bg-blue-500' :
                      activity.type === 'import' ? 'bg-purple-500' :
                      activity.type === 'team' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.lab}</p>
                      {activity.director && (
                        <p className="text-xs text-gray-500">{activity.director}</p>
                      )}
                      {activity.team && (
                        <p className="text-xs text-gray-500">{activity.team}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;