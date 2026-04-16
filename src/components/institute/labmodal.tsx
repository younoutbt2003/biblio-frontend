import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Briefcase,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

interface LabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (labData: LabFormData) => void;
  mode: 'create' | 'edit';
  initialData?: LabFormData;
  isLoading?: boolean;
}

export interface LabFormData {
  id?: number;
  name: string;
  researchArea: string;
  directorEmail: string;
  description?: string;
}

const LabModal: React.FC<LabModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  mode,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<LabFormData>({
    name: '',
    researchArea: '',
    directorEmail: '',
    description: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LabFormData, string>>>({});
  const [directorExists, setDirectorExists] = useState<boolean | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          researchArea: '',
          directorEmail: '',
          description: ''
        });
      }
      setErrors({});
      setDirectorExists(null);
    }
  }, [isOpen, mode, initialData]);

  // Research areas
  const researchAreas = [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Robotics',
    'Data Science',
    'Bioinformatics',
    'Cybersecurity',
    'Quantum Computing',
    'IoT & Embedded Systems',
    'Blockchain',
    'Cloud Computing',
    'Other'
  ];

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LabFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Lab name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Lab name must be at least 3 characters';
    }

    if (!formData.researchArea) {
      newErrors.researchArea = 'Research area is required';
    }

    if (!formData.directorEmail.trim()) {
      newErrors.directorEmail = 'Director email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.directorEmail)) {
      newErrors.directorEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if director exists (mock)
  const checkDirectorExists = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDirectorExists(null);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock: emails ending with @usthb.dz exist
      const exists = email.endsWith('@usthb.dz');
      setDirectorExists(exists);
    }, 500);
  };

  const handleEmailBlur = () => {
    checkDirectorExists(formData.directorEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (mode === 'create' && directorExists === false) {
      setErrors({ ...errors, directorEmail: 'Director must have an existing account' });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof LabFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Laboratory' : 'Edit Laboratory'}
              </h2>
              <p className="text-sm text-gray-600">
                {mode === 'create' 
                  ? 'Add a new research laboratory to the institute' 
                  : 'Update laboratory information'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lab Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Laboratory Name *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Artificial Intelligence Research Lab"
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Research Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Research Area *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={formData.researchArea}
                onChange={(e) => handleChange('researchArea', e.target.value)}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.researchArea ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select a research area</option>
                {researchAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            {errors.researchArea && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.researchArea}
              </p>
            )}
          </div>

          {/* Director Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lab Director Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.directorEmail}
                onChange={(e) => handleChange('directorEmail', e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="director@usthb.dz"
                disabled={isLoading || mode === 'edit'}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.directorEmail ? 'border-red-300 bg-red-50' : 
                  directorExists === true ? 'border-green-300 bg-green-50' :
                  directorExists === false ? 'border-red-300 bg-red-50' :
                  'border-gray-300'
                }`}
              />
              {directorExists === true && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
              )}
              {directorExists === false && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5" />
              )}
            </div>
            {errors.directorEmail && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.directorEmail}
              </p>
            )}
            {directorExists === true && !errors.directorEmail && (
              <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Director account found
              </p>
            )}
            {directorExists === false && !errors.directorEmail && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                No account found with this email
              </p>
            )}
            {mode === 'edit' && (
              <p className="mt-1 text-sm text-gray-500">
                Director cannot be changed after lab creation
              </p>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the laboratory's research focus and objectives..."
              rows={4}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.description?.length || 0} / 500 characters
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Important Information</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>The director must have an existing researcher account</li>
                  <li>Director will be automatically assigned as Lab Chief</li>
                  <li>Lab name and research area can be changed later</li>
                  <li>Director cannot be changed after lab creation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || (mode === 'create' && directorExists === false)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {mode === 'create' ? 'Creating...' : 'Saving...'}
                </>
              ) : (
                mode === 'create' ? 'Create Laboratory' : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabModal;