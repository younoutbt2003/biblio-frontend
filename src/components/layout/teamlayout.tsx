import React from 'react';
import { TeamSidebar } from './teamsidebar';
import { Header } from './header';

interface TeamLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}
export const TeamLayout: React.FC<TeamLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return  (
    <div className="flex h-screen bg-gray-50">
      <TeamSidebar />
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