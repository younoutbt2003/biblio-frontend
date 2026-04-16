import React from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  Award,
  TrendingUp,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  Calendar
} from 'lucide-react';

interface LabCardProps {
  lab: {
    id: number;
    name: string;
    director: string;
    directorEmail: string;
    researchArea: string;
    teamCount: number;
    memberCount: number;
    publicationCount: number;
    avgHIndex: number;
    totalCitations: number;
    createdAt: string;
    status: 'active' | 'inactive';
  };
  onEdit?: (labId: number) => void;
  onDelete?: (labId: number) => void;
  onView?: (labId: number) => void;
}

const LabCard: React.FC<LabCardProps> = ({ lab, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleEdit = () => {
    setShowMenu(false);
    onEdit?.(lab.id);
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete?.(lab.id);
  };

  const handleView = () => {
    setShowMenu(false);
    onView?.(lab.id);
  };

  // Calcul du gradient de couleur basé sur l'ID
  const gradientColors = [
    'from-blue-600 to-purple-600',
    'from-purple-600 to-pink-600',
    'from-green-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-cyan-600 to-blue-600',
    'from-indigo-600 to-purple-600',
  ];
  const gradient = gradientColors[lab.id % gradientColors.length];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      {/* Header avec gradient */}
      <div className={`h-2 bg-gradient-to-r ${gradient} rounded-t-xl`} />
      
      {/* Lab Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Icon */}
            <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
              <Building2 className="w-7 h-7 text-white" />
            </div>
            
            {/* Lab Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-900 truncate">{lab.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  lab.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {lab.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{lab.researchArea}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                Created {new Date(lab.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={handleView}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Lab
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Lab
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Director Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-transparent border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {lab.director.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Lab Director</p>
            <p className="font-semibold text-gray-900 truncate">{lab.director}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
              <Mail className="w-3 h-3 flex-shrink-0" />
              {lab.directorEmail}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Teams */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lab.teamCount}</p>
              <p className="text-xs text-gray-600">Teams</p>
            </div>
          </div>

          {/* Members */}
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lab.memberCount}</p>
              <p className="text-xs text-gray-600">Members</p>
            </div>
          </div>

          {/* Publications */}
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lab.publicationCount}</p>
              <p className="text-xs text-gray-600">Publications</p>
            </div>
          </div>

          {/* H-Index */}
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lab.avgHIndex}</p>
              <p className="text-xs text-gray-600">Avg H-Index</p>
            </div>
          </div>
        </div>

        {/* Citations Bar */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-gray-700">Total Citations</span>
            </div>
            <span className="text-lg font-bold text-cyan-600">
              {lab.totalCitations.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((lab.totalCitations / 10000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <button 
            onClick={handleView}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button 
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit Lab
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabCard;