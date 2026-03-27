import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Sparkles, 
  Settings,
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Publications', href: '/publications', icon: FileText },
  { name: 'Collaboration', href: '/collaboration', icon: Users },
  { name: 'AI Recommendations', href: '/ai-recommendations', icon: Sparkles },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">BiblioPro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
          Dashboards
        </div>
        {navigation.map((item) => {
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
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-semibold text-sm">
            RB
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Dr. Rachid Benali</p>
            <p className="text-xs text-gray-500">Researcher</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};