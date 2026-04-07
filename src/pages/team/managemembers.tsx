import React, { useState } from 'react';
import { TeamLayout } from '../../components/layout/teamlayout';
import { StatCard } from '../../components/common/statcard';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Award,
  Search,
  Mail,
  Edit,
  Trash2,
  X
} from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@usthb.dz',
    role: 'Senior Researcher',
    status: 'active',
    initials: 'AH',
    gradient: 'from-blue-500 to-indigo-600',
    publications: 24,
    hIndex: 12,
    joinDate: '2020-01-15',
    orcid: '0000-0002-1234-5678'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@usthb.dz',
    role: 'Researcher',
    status: 'active',
    initials: 'SJ',
    gradient: 'from-green-500 to-emerald-600',
    publications: 32,
    hIndex: 15,
    joinDate: '2019-06-10',
    orcid: '0000-0003-2345-6789'
  },
  {
    id: '3',
    name: 'Dr. Martin Chen',
    email: 'martin.chen@usthb.dz',
    role: 'Researcher',
    status: 'active',
    initials: 'MC',
    gradient: 'from-purple-500 to-violet-600',
    publications: 28,
    hIndex: 14,
    joinDate: '2021-03-22',
    orcid: '0000-0001-3456-7890'
  },
  {
    id: '4',
    name: 'Dr. Elena Martinez',
    email: 'elena.martinez@usthb.dz',
    role: 'Post-Doc',
    status: 'active',
    initials: 'EM',
    gradient: 'from-orange-500 to-amber-600',
    publications: 18,
    hIndex: 10,
    joinDate: '2022-09-05',
    orcid: '0000-0004-4567-8901'
  },
];

export const ManageMembers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [addMethod, setAddMethod] = useState<'orcid' | 'email' | 'manual'>('orcid');

  const stats = {
    totalMembers: 12,
    activeMembers: 11,
    newThisYear: 2,
    avgPublications: 23
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleDelete = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member from the team?')) {
      console.log('Delete member:', memberId);
      // TODO: API call
    }
  };

  return (
    <TeamLayout 
      title="Manage Members" 
      subtitle="Add, edit, and organize your team members"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Members"
          value={stats.totalMembers}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={UserCheck}
          label="Active Members"
          value={stats.activeMembers}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={UserPlus}
          label="New This Year"
          value={stats.newThisYear}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Award}
          label="Avg Publications"
          value={stats.avgPublications}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Members ({filteredMembers.length})</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Invite Members
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
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
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ORCID
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
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.gradient} text-white flex items-center justify-center font-semibold text-sm mr-3`}>
                        {member.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={`https://orcid.org/${member.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      {member.orcid}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{member.publications}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{member.hIndex}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="p-1 text-primary-600 hover:text-primary-700"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Remove"
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

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Team Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Add Method Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'orcid', label: 'By ORCID' },
                { id: 'email', label: 'By Email' },
                { id: 'manual', label: 'Manual' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setAddMethod(method.id as any)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    addMethod === method.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* Add by ORCID */}
            {addMethod === 'orcid' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ORCID iD
                  </label>
                  <input
                    type="text"
                    placeholder="0000-0002-1825-0097"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Data will be automatically imported from ORCID
                  </p>
                </div>
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Add Member
                </button>
              </div>
            )}

            {/* Add by Email */}
            {addMethod === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="member@university.dz"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    An invitation will be sent to this email
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Researcher</option>
                    <option>Senior Researcher</option>
                    <option>Post-Doc</option>
                    <option>PhD Student</option>
                  </select>
                </div>
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Send Invitation
                </button>
              </div>
            )}

            {/* Manual Add */}
            {addMethod === 'manual' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Researcher</option>
                    <option>Senior Researcher</option>
                    <option>Post-Doc</option>
                    <option>PhD Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ORCID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="0000-0002-1825-0097"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Add Member
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </TeamLayout>
  );
};