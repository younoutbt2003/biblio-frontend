import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { 
  Users, 
  Award,
  Building2,
  Search,
  Edit,
  Trash2,
  UserPlus,
  X,
  CheckCircle
} from 'lucide-react';

const teams = [
  {
    id: '1',
    name: 'AI Research Team',
    leader: 'Dr. Rachid Benali',
    leaderEmail: 'rachid.benali@usthb.dz',
    members: 12,
    publications: 156,
    citations: 4520,
    hIndex: 24,
    researchArea: 'Artificial Intelligence',
    status: 'active',
    createdDate: '2020-01-15',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    name: 'Computer Vision Team',
    leader: 'Dr. Sarah Johnson',
    leaderEmail: 'sarah.johnson@usthb.dz',
    members: 10,
    publications: 142,
    citations: 4180,
    hIndex: 22,
    researchArea: 'Computer Vision',
    status: 'active',
    createdDate: '2019-08-20',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: '3',
    name: 'NLP Research Group',
    leader: 'Dr. Ahmed Hassan',
    leaderEmail: 'ahmed.hassan@usthb.dz',
    members: 14,
    publications: 168,
    citations: 4890,
    hIndex: 26,
    researchArea: 'Natural Language Processing',
    status: 'active',
    createdDate: '2019-03-10',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: '4',
    name: 'Robotics Lab',
    leader: 'Dr. Martin Chen',
    leaderEmail: 'martin.chen@usthb.dz',
    members: 8,
    publications: 98,
    citations: 2640,
    hIndex: 18,
    researchArea: 'Robotics',
    status: 'active',
    createdDate: '2021-06-05',
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    id: '5',
    name: 'Data Science Team',
    leader: 'Dr. Elena Martinez',
    leaderEmail: 'elena.martinez@usthb.dz',
    members: 11,
    publications: 134,
    citations: 3780,
    hIndex: 21,
    researchArea: 'Data Science',
    status: 'active',
    createdDate: '2020-09-18',
    gradient: 'from-pink-500 to-rose-600'
  },
];

export const ManageTeams: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<typeof teams[0] | null>(null);
  const [formData, setFormData] = useState({
    teamName: '',
    researchArea: '',
    leaderEmail: ''
  });

  const stats = {
    totalTeams: 5,
    activeTeams: 5,
    totalMembers: 55,
    avgPublications: 139.6
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.researchArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (team: typeof teams[0]) => {
    setSelectedTeam(team);
    setFormData({
      teamName: team.name,
      researchArea: team.researchArea,
      leaderEmail: team.leaderEmail
    });
    setShowEditModal(true);
  };

  const handleDelete = (teamId: string) => {
    if (confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      console.log('Delete team:', teamId);
      // TODO: API call
    }
  };

  const handleCreateTeam = () => {
    console.log('Creating team:', formData);
    // TODO: API call
    setShowAddModal(false);
  };

  const handleUpdateTeam = () => {
    console.log('Updating team:', selectedTeam?.id, formData);
    // TODO: API call
    setShowEditModal(false);
  };

  return (
    <Layout 
      title="Manage Teams" 
      subtitle="Create, edit, and organize research teams in your laboratory"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Building2}
          label="Total Teams"
          value={stats.totalTeams}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={CheckCircle}
          label="Active Teams"
          value={stats.activeTeams}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Users}
          label="Total Members"
          value={stats.totalMembers}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Award}
          label="Avg Publications"
          value={stats.avgPublications.toFixed(1)}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Teams Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lab Teams ({filteredTeams.length})</h3>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Create New Team
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams by name, leader, or research area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
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
                  Research Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publications
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
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${team.gradient} text-white flex items-center justify-center font-semibold text-sm mr-3`}>
                        {team.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                        <div className="text-xs text-gray-500">
                          Created {new Date(team.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.leader}</div>
                      <div className="text-xs text-gray-500">{team.leaderEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-600">
                      {team.researchArea}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{team.members}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{team.publications}</div>
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
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(team)}
                        className="p-1 text-primary-600 hover:text-primary-700"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(team.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Performance Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Teams by Publications
          </h3>
          <div className="space-y-3">
            {[...teams]
              .sort((a, b) => b.publications - a.publications)
              .slice(0, 3)
              .map((team, idx) => (
                <div key={team.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{team.name}</p>
                      <p className="text-xs text-gray-500">{team.publications} publications</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Largest Teams
          </h3>
          <div className="space-y-3">
            {[...teams]
              .sort((a, b) => b.members - a.members)
              .slice(0, 3)
              .map((team, idx) => (
                <div key={team.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{team.name}</p>
                      <p className="text-xs text-gray-500">{team.members} members</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Highest H-Index
          </h3>
          <div className="space-y-3">
            {[...teams]
              .sort((a, b) => b.hIndex - a.hIndex)
              .slice(0, 3)
              .map((team, idx) => (
                <div key={team.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{team.name}</p>
                      <p className="text-xs text-gray-500">H-Index: {team.hIndex}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Create Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New Team</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                  placeholder="e.g., Quantum Computing Team"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Area
                </label>
                <select
                  value={formData.researchArea}
                  onChange={(e) => setFormData({...formData, researchArea: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select research area</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Natural Language Processing">Natural Language Processing</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Leader Email
                </label>
                <input
                  type="email"
                  value={formData.leaderEmail}
                  onChange={(e) => setFormData({...formData, leaderEmail: e.target.value})}
                  placeholder="leader@university.dz"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  An invitation will be sent to assign the team leader
                </p>
              </div>

              <button
                onClick={handleCreateTeam}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {showEditModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Team</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Area
                </label>
                <select
                  value={formData.researchArea}
                  onChange={(e) => setFormData({...formData, researchArea: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Natural Language Processing">Natural Language Processing</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Leader Email
                </label>
                <input
                  type="email"
                  value={formData.leaderEmail}
                  onChange={(e) => setFormData({...formData, leaderEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleUpdateTeam}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};