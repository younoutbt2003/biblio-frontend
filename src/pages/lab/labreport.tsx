import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { StatCard } from '../../components/common/statcard';
import { 
  FileText, 
  Calendar, 
  Building2, 
  TrendingUp,
  Download,
  Eye,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

const recentReports = [
  {
    id: '1',
    title: 'Q4 2023 Lab Performance Report',
    date: '2024-01-10',
    type: 'Quarterly',
    format: 'PDF',
    size: '4.8 MB',
    teams: 5
  },
  {
    id: '2',
    title: 'Annual Lab Report 2023',
    date: '2024-01-05',
    type: 'Annual',
    format: 'Excel',
    size: '8.2 MB',
    teams: 5
  },
  {
    id: '3',
    title: 'Lab Comparison Analysis - November',
    date: '2023-12-01',
    type: 'Comparative',
    format: 'PowerPoint',
    size: '6.5 MB',
    teams: 5
  },
  {
    id: '4',
    title: 'Q3 2023 Lab Summary',
    date: '2023-10-05',
    type: 'Quarterly',
    format: 'PDF',
    size: '4.2 MB',
    teams: 5
  },
];

export const LabReport: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-12-months');
  const [selectedType, setSelectedType] = useState('comprehensive');
  const [selectedFormats, setSelectedFormats] = useState({
    pdf: true,
    excel: false,
    pptx: false
  });
  const [includeTeamBreakdown, setIncludeTeamBreakdown] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(true);

  const stats = {
    reportsGenerated: 24,
    lastReport: 'Jan 10, 2024',
    totalPublications: 698,
    activeTeams: 5
  };

  const handleGenerateReport = () => {
    console.log('Generating lab report...', {
      period: selectedPeriod,
      type: selectedType,
      formats: selectedFormats,
      includeTeamBreakdown,
      includeComparison
    });
    // TODO: API call
  };

  return (
    <Layout 
      title="Lab Report" 
      subtitle="Generate comprehensive reports for your laboratory's research output"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Reports Generated"
          value={stats.reportsGenerated}
          iconColor="bg-primary-600"
        />
        <StatCard
          icon={Calendar}
          label="Last Report"
          value={stats.lastReport}
          iconColor="bg-success-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Publications"
          value={stats.totalPublications}
          iconColor="bg-purple-600"
        />
        <StatCard
          icon={Building2}
          label="Active Teams"
          value={stats.activeTeams}
          iconColor="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Report Settings */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Generate New Lab Report</h3>

          <div className="space-y-6">
            {/* Report Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Report Period
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'last-12-months', label: 'Last 12 Months' },
                  { value: 'last-3-years', label: 'Last 3 Years' },
                  { value: 'all-time', label: 'All Time' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedPeriod(option.value)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      selectedPeriod === option.value
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'comprehensive', label: 'Comprehensive Report', desc: 'Full lab analytics and metrics' },
                  { value: 'executive', label: 'Executive Summary', desc: 'High-level overview for leadership' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedType(option.value)}
                    className={`px-4 py-4 rounded-lg border-2 transition-all text-left ${
                      selectedType === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`text-sm font-medium ${
                      selectedType === option.value ? 'text-primary-600' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Additional Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTeamBreakdown}
                    onChange={(e) => setIncludeTeamBreakdown(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Team-by-Team Breakdown</span>
                    <p className="text-xs text-gray-500">Detailed metrics for each team</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeComparison}
                    onChange={(e) => setIncludeComparison(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Inter-Lab Comparison</span>
                    <p className="text-xs text-gray-500">Compare with other labs in institute</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Export Format
              </label>
              <div className="space-y-2">
                {[
                  { key: 'pdf', label: 'PDF Document', icon: FileText },
                  { key: 'excel', label: 'Excel Spreadsheet', icon: FileSpreadsheet },
                  { key: 'pptx', label: 'PowerPoint Presentation', icon: FileImage }
                ].map((format) => (
                  <label key={format.key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFormats[format.key as keyof typeof selectedFormats]}
                      onChange={(e) => setSelectedFormats({
                        ...selectedFormats,
                        [format.key]: e.target.checked
                      })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <format.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{format.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateReport}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Generate Lab Report
            </button>
          </div>
        </div>

        {/* Report Preview & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4" style={{ height: '300px' }}>
              <div className="text-center text-gray-500 mt-24">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Preview will appear here</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <p><strong>Period:</strong> {selectedPeriod.replace('-', ' ')}</p>
              <p><strong>Type:</strong> {selectedType}</p>
              <p><strong>Formats:</strong> {Object.entries(selectedFormats)
                .filter(([_, checked]) => checked)
                .map(([format]) => format.toUpperCase())
                .join(', ') || 'None selected'}</p>
              <p><strong>Teams:</strong> 5 teams included</p>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary-900 mb-2">
              💡 Report Tips
            </h4>
            <ul className="text-xs text-primary-800 space-y-1">
              <li>• Include team breakdown for detailed insights</li>
              <li>• Use Excel for data analysis</li>
              <li>• PowerPoint is great for presentations</li>
              <li>• PDF is best for archiving</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Lab Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReports.map((report) => (
            <div key={report.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{report.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.format}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.size}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.teams} teams</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};