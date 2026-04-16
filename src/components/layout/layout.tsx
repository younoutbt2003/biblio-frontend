import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { TeamSidebar } from './teamsidebar';
import { LabSidebar } from './labsidebar';
import InstituteSidebar from '../institute/institutesidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const getSidebarComponent = () => {
    const path = location.pathname;
    
    if (path.startsWith('/institute')) {
      return <InstituteSidebar />;
    }
    if (path.startsWith('/lab')) {
      return <LabSidebar />;
    }
    if (path.startsWith('/team')) {
      return <TeamSidebar />;
    }
    return <Sidebar />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {getSidebarComponent()}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};