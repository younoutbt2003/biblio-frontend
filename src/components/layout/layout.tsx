import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
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