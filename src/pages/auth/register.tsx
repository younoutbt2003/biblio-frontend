import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowRight, Sparkles, X, User, GraduationCap } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrcidModal, setShowOrcidModal] = useState(false);
  const [isResearcher, setIsResearcher] = useState<boolean | null>(null);
  const [orcid, setOrcid] = useState('');
  const [orcidError, setOrcidError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  const validateORCID = (orcid: string) => /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/.test(orcid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeToTerms: '' };
    let hasError = false;

    if (!formData.firstName.trim()) { newErrors.firstName = 'First name is required'; hasError = true; }
    if (!formData.lastName.trim()) { newErrors.lastName = 'Last name is required'; hasError = true; }
    if (!formData.email) { newErrors.email = 'Email is required'; hasError = true; }
    else if (!validateEmail(formData.email)) { newErrors.email = 'Invalid email format'; hasError = true; }
    if (!formData.password) { newErrors.password = 'Password is required'; hasError = true; }
    else if (!validatePassword(formData.password)) { newErrors.password = 'Min. 8 characters with uppercase, lowercase, and number'; hasError = true; }
    if (!formData.confirmPassword) { newErrors.confirmPassword = 'Please confirm your password'; hasError = true; }
    else if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; hasError = true; }
    if (!formData.agreeToTerms) { newErrors.agreeToTerms = 'You must accept the terms and conditions'; hasError = true; }

    setErrors(newErrors);
    if (!hasError) {
      setIsLoading(true);
      setTimeout(() => { setIsLoading(false); setShowOrcidModal(true); }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleResearcherChoice = (choice: boolean) => {
    setIsResearcher(choice);
    if (!choice) setTimeout(() => navigate('/dashboard'), 300);
  };

  const handleOrcidSubmit = () => {
    if (!orcid.trim()) { setOrcidError('ORCID is required for researchers'); return; }
    if (!validateORCID(orcid)) { setOrcidError('Invalid ORCID format (e.g., 0000-0002-1825-0097)'); return; }
    navigate('/dashboard');
  };

  const handleSkipOrcid = () => navigate('/dashboard');

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { strength: 0, label: '', color: '' };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^a-zA-Z\d]/.test(p)) s++;
    if (s <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (s <= 3) return { strength: 66, label: 'Medium', color: 'bg-orange-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();
  const isFormReady = formData.firstName && formData.lastName && formData.email &&
    formData.password && formData.confirmPassword && formData.agreeToTerms;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#2563EB' }}>BiblioPro</h1>
            <p className="text-gray-600">Join our research community</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-sm text-gray-600 mt-1">Fill in your information to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Rachid"
                    className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    style={{ focusRingColor: '#3B82F6' } as React.CSSProperties} />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Benali"
                    className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none transition-all`} />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rachid.benali@university.dz"
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none transition-all`} />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none transition-all pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-red-600' : passwordStrength.label === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>{passwordStrength.label}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: `${passwordStrength.strength}%` }} />
                    </div>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Min. 8 characters, 1 uppercase, 1 lowercase, 1 number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none transition-all pr-12`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="mt-1 flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" /><span>Passwords match</span>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-start cursor-pointer">
                  <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
                    className={`w-4 h-4 mt-1 border-gray-300 rounded ${errors.agreeToTerms ? 'border-red-500' : ''}`} />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="font-medium hover:underline" style={{ color: '#2563EB' }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="font-medium hover:underline" style={{ color: '#2563EB' }}>Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                  className={`relative w-full py-4 px-6 rounded-xl font-bold text-base text-white flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden shadow-lg active:scale-[0.98] ${isLoading ? 'cursor-wait opacity-80' : 'cursor-pointer'}`}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-xl">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  </span>
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Creating your account...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Create My Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">🔒 Your data is secure and encrypted</p>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold hover:underline" style={{ color: '#2563EB' }}>Sign in</Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">© 2026 BiblioPro. All rights reserved.</p>
        </div>
      </div>

      {/* ORCID Modal */}
      {showOrcidModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={handleSkipOrcid} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>

            {/* Step 1: Are you a researcher? */}
            {isResearcher === null && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EFF6FF' }}>
                  <GraduationCap className="w-8 h-8" style={{ color: '#2563EB' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">One Last Step!</h3>
                <p className="text-gray-500 mb-8">Are you a researcher or academic?</p>

                <div className="space-y-3">
                  {/* ✅ YES button — gradient bleu visible, cliquable */}
                  <button
                    type="button"
                    onClick={() => handleResearcherChoice(true)}
                    style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                    className="w-full py-4 px-6 rounded-xl font-bold text-white text-base flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-transform duration-150 cursor-pointer"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Yes, I'm a Researcher</span>
                    <ArrowRight className="w-5 h-5 ml-auto" />
                  </button>

                  {/* NO button */}
                  <button
                    type="button"
                    onClick={() => handleResearcherChoice(false)}
                    className="w-full py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <User className="w-5 h-5" />
                    <span>No, Skip This Step</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Enter ORCID */}
            {isResearcher === true && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="https://orcid.org/assets/vectors/orcid.logo.icon.svg" alt="ORCID" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enter Your ORCID</h3>
                  <p className="text-sm text-gray-600">Link your ORCID to access your publications and metrics</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ORCID iD</label>
                  <input
                    type="text"
                    value={orcid}
                    maxLength={19}
                    autoFocus
                    onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9X]/gi, '');
                        value = value.slice(0, 16);

                        const formatted = value.match(/.{1,4}/g)?.join('-') || '';
                        setOrcid(formatted);
                        setOrcidError('');
                    }}
                    placeholder="0000-0002-1825-0097"
                    className={`w-full px-4 py-3 border ${
                        orcidError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:outline-none transition-all`}
                    />
                  {orcidError && <p className="mt-1 text-sm text-red-600">{orcidError}</p>}
                  <p className="mt-1 text-xs text-gray-500">Format: 0000-0002-1825-0097</p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleOrcidSubmit}
                    style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                    className="w-full py-3 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <span>Continue with ORCID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={handleSkipOrcid}
                    className="w-full py-3 px-6 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-all cursor-pointer">
                    Skip for Now
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Don't have an ORCID?{' '}
                  <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer"
                    className="font-medium hover:underline" style={{ color: '#2563EB' }}>Create one here</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};