import React from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { CollabGraph } from '../../components/collaboration/collabgraph';
import { TopCollaborators } from '../../components/collaboration/topcollaborators';
import { CollabTimeline } from '../../components/collaboration/collabtimeline';
import { ResearchCommunities } from '../../components/collaboration/researchcommunities';
import { Users, FileText, Building2 } from 'lucide-react';

export const Collaboration: React.FC = () => {
  const stats = {
    collaborators: 35,
    jointPapers: 156,
    institutions: 12,
  };

  return (
    <Layout
      title="Collaboration Network"
      subtitle="Visualize and analyze your research collaborations across the globe."
    >
      {/* Graph + Right Panel */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CollabGraph />
        </div>
        <div className="flex flex-col gap-6">
          <TopCollaborators />
          <CollabTimeline />
          <ResearchCommunities />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Collaborators"
          value={stats.collaborators}
          trend={4}
          iconColor="bg-blue-600"
        />
        <StatCard
          icon={FileText}
          label="Joint Papers"
          value={stats.jointPapers}
          trend={12}
          iconColor="bg-green-600"
        />
        <StatCard
          icon={Building2}
          label="Institutions"
          value={stats.institutions}
          iconColor="bg-purple-600"
        />
      </div>
    </Layout>
  );
};