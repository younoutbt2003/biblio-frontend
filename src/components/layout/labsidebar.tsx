import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Building2,
  Users2,
  FileText, 
  Network, 
  Sparkles, 
  Settings,
  LogOut,
  GitCompare,
  FileBarChart,
  UserPlus
} from 'lucide-react';

const navigation = [
  { 
    section: 'Dashboards',
    items: [
      { name: 'My Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Team Dashboard', href: '/team/dashboard', icon: Users2 },
      { name: 'Lab Dashboard', href: '/lab/dashboard', icon: Building2 },
    ]
  },
  { 
    section: 'Search',
    items: [
      { name: 'My Publications', href: '/publications', icon: FileText },
      { name: 'Lab Collaboration', href: '/lab/collaboration', icon: Network },
      { name: 'AI Recommendations', href: '/lab/ai-recommendations', icon: Sparkles },
    ]
  },
  { 
    section: 'Lab Management',
    items: [
      { name: 'Manage Teams', href: '/lab/manage-teams', icon: UserPlus },
      { name: 'Lab Report', href: '/lab/report', icon: FileBarChart },
      { name: 'Compare Labs', href: '/lab/compare', icon: GitCompare },
    ]
  },
];

export const LabSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">BiblioPro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.section}>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
              {section.section}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Settings */}
        <div className="pt-4">
          <Link
            to="/lab/settings"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
            LC
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Lab Chief</p>
            <p className="text-xs text-gray-500">AI & ML Laboratory</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};