import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/researcher/dashboard';
import { Publications } from '../pages/researcher/publications';
import { Collaboration } from '../pages/researcher/collaboration';
import { Register } from '../pages/auth/register';
import { Login } from '../pages/auth/login';
import { Settings } from '../pages/researcher/settings';
// Team Leader Pages
import { TeamDashboard } from '../pages/team/teamdashboard';
import { TeamCollaboration } from '../pages/team/teamcollaboration';
import { ManageMembers } from '../pages/team/managemembers';
import { TeamReport } from '../pages/team/teamreport';
import { CompareTeams } from '../pages/team/compareteams';
// lab cheif pages 
import { LabDashboard } from '../pages/lab/labdashboard';
import { ManageTeams } from '../pages/lab/manageteams';
import { LabReport } from '../pages/lab/labreport';
import { CompareLabs } from '../pages/lab/comparelabs';
import { LabCollaboration } from '../pages/lab/labcollaboration';


export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/settings" element={<Settings />} />
        {/* Team Leader Routes */}
        <Route path="/team/dashboard" element={<TeamDashboard />} />
        <Route path="/team/collaboration" element={<TeamCollaboration />} />
        <Route path="/team/manage-members" element={<ManageMembers />} />
        <Route path="/team/report" element={<TeamReport />} />
        <Route path="/team/compare" element={<CompareTeams />} />
        <Route path="/team/settings" element={<Settings />} />
         {/* Lab Chief Routes */}
        <Route path="/lab/dashboard" element={<LabDashboard />} />
        <Route path="/lab/manage-teams" element={<ManageTeams />} />
        <Route path="/lab/report" element={<LabReport />} />
        <Route path="/lab/compare" element={<CompareLabs />} />
        <Route path="/lab/collaboration" element={<LabCollaboration />} />
        <Route path="/lab/settings" element={<Settings />} />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};