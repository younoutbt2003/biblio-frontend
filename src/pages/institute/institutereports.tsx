import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

const InstituteReports: React.FC = () => {
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('this-year');

  const reports = [
    {
      id: 1,
      name: 'Annual Research Output Report 2024',
      type: 'annual',
      format: 'PDF',
      size: '2.4 MB',
      generatedDate: '2025-01-15',
      description: 'Complete overview of all laboratories research output for 2024',
      labs: 'All Labs',
      metrics: ['Publications', 'Citations', 'H-Index', 'Collaborations']
    },
    {
      id: 2,
      name: 'Q1 2025 Performance Dashboard',
      type: 'quarterly',
      format: 'Excel',
      size: '1.8 MB',
      generatedDate: '2025-04-01',
      description: 'Quarterly performance metrics and KPIs',
      labs: 'All Labs',
      metrics: ['Team Growth', 'Publication Rate', 'Citation Trends']
    },
    {
      id: 3,
      name: 'AI Research Lab - Detailed Analysis',
      type: 'lab-specific',
      format: 'PDF',
      size: '3.1 MB',
      generatedDate: '2025-03-20',
      description: 'In-depth analysis of AI Research Lab performance',
      labs: 'AI Research Lab',
      metrics: ['Publications', 'Team Structure', 'Collaborations', 'Funding']
    },
    {
      id: 4,
      name: 'Cross-Lab Collaboration Network 2024',
      type: 'collaboration',
      format: 'PNG',
      size: '856 KB',
      generatedDate: '2025-02-10',
      description: 'Visual network graph of inter-lab collaborations',
      labs: 'All Labs',
      metrics: ['Collaboration Network', 'Co-authorships']
    },
    {
      id: 5,
      name: 'Publication Impact Analysis',
      type: 'impact',
      format: 'Excel',
      size: '2.2 MB',
      generatedDate: '2025-03-15',
      description: 'Analysis of publication citations and impact factors',
      labs: 'All Labs',
      metrics: ['Citations per Paper', 'Journal Impact Factors', 'Top Publications']
    },
  ];

  const quickStats = [
    { label: 'Reports Generated', value: '47', icon: FileText, color: 'blue' },
    { label: 'This Month', value: '8', icon: Calendar, color: 'purple' },
    { label: 'Total Size', value: '124 MB', icon: FileSpreadsheet, color: 'green' },
    { label: 'Avg Generation Time', value: '3.2 min', icon: TrendingUp, color: 'orange' },
  ];

  const filteredReports = reports.filter(report => {
    if (reportType !== 'all' && report.type !== reportType) return false;
    return true;
  });

  // Fonction helper pour obtenir les classes de couleur
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Fonction helper pour obtenir les classes de format
  const getFormatClasses = (format: string) => {
    switch (format) {
      case 'PDF':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'Excel':
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'PNG':
        return { bg: 'bg-blue-100', text: 'text-blue-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  // Fonction helper pour obtenir l'icône de format
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return FileText;
      case 'Excel':
        return FileSpreadsheet;
      case 'PNG':
        return FileImage;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and download detailed research reports</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
          <FileText className="w-5 h-5" />
          Generate New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = getColorClasses(stat.color);

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="annual">Annual Reports</option>
              <option value="quarterly">Quarterly Reports</option>
              <option value="lab-specific">Lab-Specific</option>
              <option value="collaboration">Collaboration Analysis</option>
              <option value="impact">Impact Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
              <option value="last-year">Last Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const formatClasses = getFormatClasses(report.format);
          const FormatIcon = getFormatIcon(report.format);

          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* Report Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formatClasses.bg}`}>
                      <FormatIcon className={`w-6 h-6 ${formatClasses.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{report.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.generatedDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">{report.labs}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {report.metrics.map((metric, index) => (
                          <span key={index} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 ml-4">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters</p>
          <button
            onClick={() => {
              setReportType('all');
              setDateRange('this-year');
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default InstituteReports;