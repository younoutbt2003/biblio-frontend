import React from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { PublicationsChart } from '../../components/charts/publicationschart';
import { CitationsChart } from '../../components/charts/citationchart';
import { PublicationsTable } from '../../components/dashboard/publicationstable';
import { FileText, TrendingUp, Trophy, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = {
    publications: 42,
    citations: 1250,
    hIndex: 18,
    collaborators: 35
  };

  return (
    <Layout 
      title="Dashboard" 
      subtitle="Welcome back, Dr. Rachid Benali"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Publications"
          value={stats.publications}
          trend={12}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Citations"
          value={stats.citations.toLocaleString()}
          trend={8}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={Trophy}
          label="H-Index"
          value={stats.hIndex}
          trend={5}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Users}
          label="Collaborators"
          value={stats.collaborators}
          trend={-3}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <PublicationsChart />
        <CitationsChart />
      </div>

      {/* Publications Table */}
      <PublicationsTable />
    </Layout>
  );
};