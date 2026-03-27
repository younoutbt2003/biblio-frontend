import React from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { PublicationsTable } from '../../components/publications/publicationstable';
import { PublicationTimeline } from '../../components/publications/publicationtimeline';
import { TopVenues } from '../../components/publications/topvenues';
import { FileText, Calendar, Star, TrendingUp } from 'lucide-react';

export const Publications: React.FC = () => {
  const stats = {
    total: 42,
    thisYear: 4,
    mostCited: 150,
    totalCitations: 285,
  };

  return (
    <Layout
      title="My Publications"
      subtitle="Manage and track all your publications (42 total)"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Total Publications"
          value={stats.total}
          iconColor="bg-blue-600"
        />
        <StatCard
          icon={Calendar}
          label="This Year"
          value={stats.thisYear}
          trend={12}
          iconColor="bg-green-600"
        />
        <StatCard
          icon={Star}
          label="Most Cited"
          value={stats.mostCited}
          iconColor="bg-yellow-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Citations"
          value={stats.totalCitations}
          trend={-8}
          iconColor="bg-purple-600"
        />
      </div>

      {/* Publications Table */}
      <PublicationsTable />

      {/* Bottom Charts */}
      <div className="grid grid-cols-2 gap-6">
        <PublicationTimeline />
        <TopVenues />
      </div>
    </Layout>
  );
};