import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  FileSpreadsheet,
  FileImage,
  Eye,
  Loader
} from 'lucide-react';
import jsPDF from 'jspdf';

interface Report {
  id: number;
  name: string;
  type: string;
  format: string;
  size: string;
  generatedDate: string;
  description: string;
  labs: string;
  metrics: string[];
}

const InstituteReports: React.FC = () => {
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('this-year');
  const [downloadingReport, setDownloadingReport] = useState<number | null>(null);
  const [previewingReport, setPreviewingReport] = useState<number | null>(null);

  const reports: Report[] = [
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

  // ✅✅✅ FONCTION PRINCIPALE DE TÉLÉCHARGEMENT ✅✅✅
  const handleDownload = async (report: Report) => {
    setDownloadingReport(report.id);

    try {
      // Simulation de génération (2 secondes)
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (report.format === 'PDF') {
        // Générer le PDF avec une meilleure mise en page
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);

        // ========================================
        // HEADER - En-tête avec fond coloré
        // ========================================
        pdf.setFillColor(37, 99, 235); // Bleu
        pdf.rect(0, 0, pageWidth, 50, 'F');
        
        // Titre principal
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(24);
        pdf.text(report.name, pageWidth / 2, 20, { align: 'center' });
        
        // Sous-titre
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.text(report.description, pageWidth / 2, 32, { align: 'center', maxWidth: contentWidth - 20 });

        // Date de génération
        pdf.setFontSize(9);
        pdf.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}`, pageWidth / 2, 43, { align: 'center' });

        let yPos = 65;

        // ========================================
        // SECTION 1 - Informations du rapport
        // ========================================
        pdf.setTextColor(0, 0, 0);
        
        // Titre de section
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(37, 99, 235);
        pdf.text('Report Information', margin, yPos);
        
        // Ligne sous le titre
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos + 2, margin + 50, yPos + 2);
        yPos += 12;

        // Contenu de la section
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(60, 60, 60);

        const infoData = [
          { label: 'Report Type', value: report.type.replace('-', ' ').toUpperCase() },
          { label: 'Format', value: report.format },
          { label: 'Scope', value: report.labs },
          { label: 'Original Date', value: new Date(report.generatedDate).toLocaleDateString() }
        ];

        infoData.forEach((item) => {
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(37, 99, 235);
          pdf.text(`${item.label}:`, margin, yPos);
          
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(60, 60, 60);
          pdf.text(item.value, margin + 50, yPos);
          yPos += 7;
        });

        yPos += 8;

        // ========================================
        // SECTION 2 - Métriques couvertes
        // ========================================
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(37, 99, 235);
        pdf.text('Key Metrics Covered', margin, yPos);
        
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos + 2, margin + 50, yPos + 2);
        yPos += 12;

        // Métriques en badges
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        
        let xPos = margin;
        report.metrics.forEach((metric) => {
          const textWidth = pdf.getTextWidth(metric) + 8;
          
          // Vérifier si on doit passer à la ligne
          if (xPos + textWidth > pageWidth - margin) {
            xPos = margin;
            yPos += 10;
          }

          // Badge
          pdf.setFillColor(219, 234, 254); // Bleu clair
          pdf.roundedRect(xPos, yPos - 5, textWidth, 8, 2, 2, 'F');
          
          pdf.setTextColor(30, 64, 175); // Bleu foncé
          pdf.text(metric, xPos + 4, yPos);
          
          xPos += textWidth + 5;
        });

        yPos += 18;

        // ========================================
        // SECTION 3 - Résumé des performances
        // ========================================
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(37, 99, 235);
        pdf.text('Research Performance Summary', margin, yPos);
        
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos + 2, margin + 70, yPos + 2);
        yPos += 15;

        // Tableau des statistiques avec meilleure typographie
        const stats = [
        { metric: 'Total Publications', value: '1,847', trend: '+ 12.5%', color: [34, 197, 94] },
        { metric: 'Total Citations', value: '45,892', trend: '+ 8.3%', color: [34, 197, 94] },
        { metric: 'Average H-Index', value: '24.5', trend: '+ 5.2%', color: [34, 197, 94] },
        { metric: 'Active Collaborations', value: '89', trend: '+ 15.6%', color: [34, 197, 94] },
        { metric: 'Total Researchers', value: '248', trend: '+ 7.8%', color: [34, 197, 94] }
      ];

        stats.forEach((stat, index) => {
          // Fond alterné pour les lignes
          if (index % 2 === 0) {
            pdf.setFillColor(249, 250, 251);
            pdf.rect(margin, yPos - 6, contentWidth, 10, 'F');
          }

          // Métrique
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(11);
          pdf.setTextColor(60, 60, 60);
          pdf.text(stat.metric, margin + 3, yPos);

          // Valeur
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(12);
          pdf.setTextColor(30, 64, 175);
          pdf.text(stat.value, margin + 80, yPos);

          // Tendance
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          pdf.setTextColor(stat.color[0], stat.color[1], stat.color[2]);
          pdf.text(stat.trend, margin + 120, yPos);

          yPos += 10;
        });

        yPos += 10;

        // ========================================
        // SECTION 4 - Conclusion
        // ========================================
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(37, 99, 235);
        pdf.text('Conclusion', margin, yPos);
        
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos + 2, margin + 35, yPos + 2);
        yPos += 12;

        // Texte de conclusion
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(60, 60, 60);
        
        const conclusionText = `This report provides a comprehensive overview of the research activities and performance metrics for ${report.labs}. The data demonstrates positive trends across all key performance indicators, indicating strong research output and collaboration.`;
        
        const splitConclusion = pdf.splitTextToSize(conclusionText, contentWidth);
        pdf.text(splitConclusion, margin, yPos);
        yPos += splitConclusion.length * 6 + 10;

        const recommendationText = `For detailed analysis and recommendations, please refer to the specific sections of this report or contact the Institute Administration for further insights.`;
        
        const splitRecommendation = pdf.splitTextToSize(recommendationText, contentWidth);
        pdf.text(splitRecommendation, margin, yPos);

        // ========================================
        // FOOTER - Pied de page
        // ========================================
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(9);
        pdf.setTextColor(107, 114, 128);
        
        // Ligne de séparation
        pdf.setDrawColor(229, 231, 235);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
        
        // Texte du footer
        pdf.text('Generated by BiblioPro - USTHB Institute Research Management System', pageWidth / 2, pageHeight - 18, { align: 'center' });
        pdf.text(`© ${new Date().getFullYear()} University of Science and Technology Houari Boumediene`, pageWidth / 2, pageHeight - 12, { align: 'center' });
        
        // Numéro de page
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.text('Page 1', pageWidth - margin, pageHeight - 12, { align: 'right' });

        // Télécharger
        pdf.save(`${report.name}.pdf`);
        
      } else if (report.format === 'Excel') {
        // Générer un CSV pour Excel
        const csvContent = [
          ['Metric', 'Value', 'Trend'],
          ['Total Publications', '1,847', '+12.5%'],
          ['Total Citations', '45,892', '+8.3%'],
          ['Average H-Index', '24.5', '+5.2%'],
          ['Active Collaborations', '89', '+15.6%'],
          ['Total Researchers', '248', '+7.8%']
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${report.name}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
      } else if (report.format === 'PNG') {
        // Générer une image avec Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d')!;

        // Fond
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);

        // En-tête
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(0, 0, 800, 80);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(report.name, 400, 50);

        // Contenu
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Research Performance Summary', 50, 130);
        
        const statsList = [
          'Total Publications: 1,847 (↑ 12.5%)',
          'Total Citations: 45,892 (↑ 8.3%)',
          'Average H-Index: 24.5 (↑ 5.2%)',
          'Active Collaborations: 89 (↑ 15.6%)',
          'Total Researchers: 248 (↑ 7.8%)'
        ];

        statsList.forEach((stat, index) => {
          ctx.fillText(stat, 50, 170 + (index * 30));
        });

        // Télécharger
        canvas.toBlob((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${report.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }
        });
      }

      console.log(`✅ Downloaded: ${report.name}`);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('❌ Failed to generate report. Please try again.');
    } finally {
      setDownloadingReport(null);
    }
  };

  // Fonction pour prévisualiser
  const handlePreview = async (report: Report) => {
    setPreviewingReport(report.id);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Générer le HTML et l'ouvrir dans un nouvel onglet
      const htmlContent = generateReportHTML(report);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
    } catch (error) {
      console.error('Preview error:', error);
      alert('❌ Failed to load preview.');
    } finally {
      setPreviewingReport(null);
    }
  };

  // Fonction pour générer le contenu HTML du rapport
  const generateReportHTML = (report: Report): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #1e40af;
            margin: 0;
            font-size: 28px;
          }
          .section {
            margin: 30px 0;
          }
          .section h2 {
            color: #1e40af;
            border-left: 4px solid #2563eb;
            padding-left: 15px;
          }
          .stats-table {
            width: 100%;
            border-collapse: collapse;
          }
          .stats-table th {
            background: #1e40af;
            color: white;
            padding: 12px;
            text-align: left;
          }
          .stats-table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${report.name}</h1>
          <p>${report.description}</p>
        </div>
        <div class="section">
          <h2>Performance Summary</h2>
          <table class="stats-table">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Trend</th></tr>
            </thead>
            <tbody>
              <tr><td>Total Publications</td><td>1,847</td><td>↑ 12.5%</td></tr>
              <tr><td>Total Citations</td><td>45,892</td><td>↑ 8.3%</td></tr>
              <tr><td>Average H-Index</td><td>24.5</td><td>↑ 5.2%</td></tr>
              <tr><td>Active Collaborations</td><td>89</td><td>↑ 15.6%</td></tr>
              <tr><td>Total Researchers</td><td>248</td><td>↑ 7.8%</td></tr>
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;
  };

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

  const getFormatClasses = (format: string) => {
    switch (format) {
      case 'PDF':
        return { bg: 'bg-red-100', text: 'text-red-600', icon: FileText };
      case 'Excel':
        return { bg: 'bg-green-100', text: 'text-green-600', icon: FileSpreadsheet };
      case 'PNG':
        return { bg: 'bg-blue-100', text: 'text-blue-600', icon: FileImage };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', icon: FileText };
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
          const formatInfo = getFormatClasses(report.format);
          const FormatIcon = formatInfo.icon;
          const isDownloading = downloadingReport === report.id;
          const isPreviewing = previewingReport === report.id;

          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* Report Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formatInfo.bg}`}>
                      <FormatIcon className={`w-6 h-6 ${formatInfo.text}`} />
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

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    {/* Download Button */}
                    <button 
                      onClick={() => handleDownload(report)}
                      disabled={isDownloading || isPreviewing}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                    >
                      {isDownloading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download
                        </>
                      )}
                    </button>

                    {/* Preview Button */}
                    <button 
                      onClick={() => handlePreview(report)}
                      disabled={isDownloading || isPreviewing}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                    >
                      {isPreviewing ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Preview
                        </>
                      )}
                    </button>
                  </div>
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
              setDateRange('all-time');
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