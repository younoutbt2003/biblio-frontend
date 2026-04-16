import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter
} from 'lucide-react';
import LabCard from '../../components/institute/labcard';
import LabModal from '../../components/institute/labmodal';
import type { LabFormData } from '../../components/institute/labmodal';

interface Lab {
  id: number;
  name: string;
  director: string;
  directorEmail: string;
  researchArea: string;
  teamCount: number;
  memberCount: number;
  publicationCount: number;
  avgHIndex: number;
  totalCitations: number;
  createdAt: string;
  status: 'active' | 'inactive';
}

const InstituteManageLabs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterArea, setFilterArea] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedLab, setSelectedLab] = useState<LabFormData | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Données des laboratoires
  const labs: Lab[] = [
    {
      id: 1,
      name: 'AI Research Lab',
      director: 'Dr. Rachid Benali',
      directorEmail: 'rachid.benali@usthb.dz',
      researchArea: 'Artificial Intelligence',
      teamCount: 8,
      memberCount: 32,
      publicationCount: 245,
      avgHIndex: 38.2,
      totalCitations: 8934,
      createdAt: '2020-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Bioinformatics Lab',
      director: 'Dr. Amina Kaci',
      directorEmail: 'amina.kaci@usthb.dz',
      researchArea: 'Bioinformatics',
      teamCount: 6,
      memberCount: 24,
      publicationCount: 198,
      avgHIndex: 35.7,
      totalCitations: 7234,
      createdAt: '2019-09-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Computer Vision Lab',
      director: 'Dr. Mohamed Larbi',
      directorEmail: 'mohamed.larbi@usthb.dz',
      researchArea: 'Computer Vision',
      teamCount: 7,
      memberCount: 28,
      publicationCount: 187,
      avgHIndex: 34.1,
      totalCitations: 6892,
      createdAt: '2020-03-22',
      status: 'active'
    },
    {
      id: 4,
      name: 'Cybersecurity Lab',
      director: 'Dr. Sarah Hamdi',
      directorEmail: 'sarah.hamdi@usthb.dz',
      researchArea: 'Cybersecurity',
      teamCount: 5,
      memberCount: 20,
      publicationCount: 156,
      avgHIndex: 31.8,
      totalCitations: 5423,
      createdAt: '2021-01-05',
      status: 'active'
    },
    {
      id: 5,
      name: 'Data Science Lab',
      director: 'Dr. Karim Mansouri',
      directorEmail: 'karim.mansouri@usthb.dz',
      researchArea: 'Data Science',
      teamCount: 6,
      memberCount: 26,
      publicationCount: 142,
      avgHIndex: 30.2,
      totalCitations: 4987,
      createdAt: '2020-11-18',
      status: 'active'
    },
    {
      id: 6,
      name: 'Natural Language Processing Lab',
      director: 'Dr. Fatima Zohra',
      directorEmail: 'fatima.zohra@usthb.dz',
      researchArea: 'Natural Language Processing',
      teamCount: 5,
      memberCount: 22,
      publicationCount: 128,
      avgHIndex: 29.4,
      totalCitations: 4567,
      createdAt: '2021-03-10',
      status: 'active'
    },
    {
      id: 7,
      name: 'Robotics Lab',
      director: 'Dr. Ahmed Benali',
      directorEmail: 'ahmed.benali@usthb.dz',
      researchArea: 'Robotics',
      teamCount: 4,
      memberCount: 18,
      publicationCount: 112,
      avgHIndex: 27.8,
      totalCitations: 3892,
      createdAt: '2021-06-15',
      status: 'active'
    },
    {
      id: 8,
      name: 'Quantum Computing Lab',
      director: 'Dr. Yasmine Cherif',
      directorEmail: 'yasmine.cherif@usthb.dz',
      researchArea: 'Quantum Computing',
      teamCount: 3,
      memberCount: 12,
      publicationCount: 87,
      avgHIndex: 25.6,
      totalCitations: 2945,
      createdAt: '2022-01-20',
      status: 'active'
    },
    {
      id: 9,
      name: 'IoT & Embedded Systems Lab',
      director: 'Dr. Hamza Moussa',
      directorEmail: 'hamza.moussa@usthb.dz',
      researchArea: 'IoT & Embedded Systems',
      teamCount: 4,
      memberCount: 16,
      publicationCount: 95,
      avgHIndex: 24.2,
      totalCitations: 3234,
      createdAt: '2021-09-05',
      status: 'active'
    },
    {
      id: 10,
      name: 'Blockchain Lab',
      director: 'Dr. Salim Hadj',
      directorEmail: 'salim.hadj@usthb.dz',
      researchArea: 'Blockchain',
      teamCount: 3,
      memberCount: 14,
      publicationCount: 76,
      avgHIndex: 22.8,
      totalCitations: 2678,
      createdAt: '2022-04-12',
      status: 'active'
    },
    {
      id: 11,
      name: 'Cloud Computing Lab',
      director: 'Dr. Nadia Boudraa',
      directorEmail: 'nadia.boudraa@usthb.dz',
      researchArea: 'Cloud Computing',
      teamCount: 4,
      memberCount: 17,
      publicationCount: 89,
      avgHIndex: 23.5,
      totalCitations: 2892,
      createdAt: '2021-11-28',
      status: 'active'
    },
    {
      id: 12,
      name: 'Machine Learning Lab',
      director: 'Dr. Omar Djelali',
      directorEmail: 'omar.djelali@usthb.dz',
      researchArea: 'Machine Learning',
      teamCount: 7,
      memberCount: 30,
      publicationCount: 215,
      avgHIndex: 36.9,
      totalCitations: 7823,
      createdAt: '2020-05-08',
      status: 'active'
    },
  ];

  const researchAreas = [
    'all', 
    'Artificial Intelligence', 
    'Bioinformatics', 
    'Computer Vision', 
    'Cybersecurity', 
    'Data Science', 
    'Natural Language Processing',
    'Robotics',
    'Quantum Computing',
    'IoT & Embedded Systems',
    'Blockchain',
    'Cloud Computing',
    'Machine Learning'
  ];

  // Handlers
  const handleCreateLab = () => {
    setModalMode('create');
    setSelectedLab(undefined);
    setShowModal(true);
  };

  const handleEditLab = (labId: number) => {
    const lab = labs.find(l => l.id === labId);
    if (lab) {
      setModalMode('edit');
      setSelectedLab({
        id: lab.id,
        name: lab.name,
        researchArea: lab.researchArea,
        directorEmail: lab.directorEmail,
        description: `${lab.name} focuses on cutting-edge research in ${lab.researchArea}. Our team of ${lab.memberCount} researchers across ${lab.teamCount} teams works on innovative projects.`
      });
      setShowModal(true);
    }
  };

  const handleDeleteLab = (labId: number) => {
    const lab = labs.find(l => l.id === labId);
    if (lab) {
      const confirmMessage = `Are you sure you want to delete "${lab.name}"?\n\nThis will:\n- Remove ${lab.teamCount} teams\n- Affect ${lab.memberCount} members\n- Archive ${lab.publicationCount} publications\n\nThis action cannot be undone.`;
      
      if (window.confirm(confirmMessage)) {
        console.log('Deleting lab:', labId);
        // TODO: Implement API call
        alert(`Laboratory "${lab.name}" has been deleted successfully.`);
      }
    }
  };

  const handleViewLab = (labId: number) => {
    console.log('Viewing lab details:', labId);
    // TODO: Navigate to lab details page
    alert(`Navigating to lab ${labId} details...`);
  };

  const handleModalSubmit = async (data: LabFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting lab data:', data);
      setIsLoading(false);
      setShowModal(false);
      
      // Show success message
      if (modalMode === 'create') {
        alert(`✅ Laboratory "${data.name}" created successfully!\n\nDirector: ${data.directorEmail}\nResearch Area: ${data.researchArea}`);
      } else {
        alert(`✅ Laboratory "${data.name}" updated successfully!`);
      }
    }, 1500);
  };

  // Filtering
  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.director.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = filterArea === 'all' || lab.researchArea === filterArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Laboratories</h1>
          <p className="text-gray-600 mt-1">
            {labs.length} total laboratories • {filteredLabs.length} showing
          </p>
        </div>
        <button 
          onClick={handleCreateLab}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
        >
          <Plus className="w-5 h-5" />
          Create New Lab
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search labs or directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter by Research Area */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
            >
              {researchAreas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Research Areas' : area}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard
              key={lab.id}
              lab={lab}
              onEdit={handleEditLab}
              onDelete={handleDeleteLab}
              onView={handleViewLab}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No laboratories found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterArea !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first laboratory to get started'}
          </p>
          {(searchQuery || filterArea !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterArea('all');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <LabModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        mode={modalMode}
        initialData={selectedLab}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InstituteManageLabs;