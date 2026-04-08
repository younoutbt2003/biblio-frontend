import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { TeamSidebar } from './teamsidebar';
import { LabSidebar } from './labsidebar';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  const location = useLocation();
  
  // Déterminer le sidebar selon la route
  const getSidebarComponent = () => {
    if (location.pathname.startsWith('/lab')) {
      return LabSidebar;
    }
    if (location.pathname.startsWith('/team')) {
      return TeamSidebar;
    }
    return Sidebar;
  };
  
  const SidebarComponent = getSidebarComponent();

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarComponent />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};