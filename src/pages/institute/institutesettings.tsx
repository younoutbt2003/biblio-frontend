import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Building2,
  Shield,
  Database,
  Save,
  Camera,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader,
  Globe,
  Users
} from 'lucide-react';

const InstituteSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile States
  const [profileData, setProfileData] = useState({
    firstName: 'Ahmed',
    lastName: 'Benali',
    email: 'ahmed.benali@usthb.dz',
    phone: '+213 555 123 456',
    position: 'Institute Director',
    department: 'Computer Science Institute',
    bio: 'Leading research initiatives in artificial intelligence and distributed systems at USTHB.'
  });

  // Password States
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Notification States
  const [notifications, setNotifications] = useState({
    emailNewLab: true,
    emailNewPublication: true,
    emailWeeklyReport: true,
    pushNewLab: false,
    pushNewPublication: true,
    pushWeeklyReport: false
  });

  // Institute Settings States
  const [instituteSettings, setInstituteSettings] = useState({
    instituteName: 'Computer Science Institute - USTHB',
    instituteCode: 'CSI-USTHB',
    address: 'BP 32 El-Alia, Bab-Ezzouar, Algiers 16111',
    website: 'https://usthb.dz',
    maxLabsPerDirector: 3,
    maxTeamsPerLab: 10,
    maxResearchersPerTeam: 15
  });

  // Tabs
  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'institute', label: 'Institut', icon: Building2 },
    { id: 'system', label: 'Système', icon: Database }
  ];

  // Handler pour sauvegarder
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Remplacer par l'appel API réel
      console.log('Saving settings:', {
        profile: profileData,
        notifications,
        institute: instituteSettings
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (err: any) {
      console.error('Save error:', err);
      setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handler pour changer le mot de passe
  const handleChangePassword = async () => {
    setError(null);

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Appel API pour changer le mot de passe
      console.log('Changing password...');
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (err: any) {
      console.error('Password change error:', err);
      setError('Erreur lors du changement de mot de passe');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Paramètres de l'Institut</h1>
              <p className="text-gray-600">Gérez vos préférences et configurations</p>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-700">
                Paramètres sauvegardés avec succès !
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Tabs */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Informations du Profil</h2>
                      <p className="text-sm text-gray-600">Mettez à jour vos informations personnelles</p>
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{profileData.position}</p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Changer la photo
                      </button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Prénom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="email@usthb.dz"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+213 555 123 456"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        value={profileData.position}
                        onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Directeur d'Institut"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Département
                      </label>
                      <input
                        type="text"
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Institut d'Informatique"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Biographie
                      </label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Parlez-nous de vous..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Paramètres de Sécurité</h2>
                      <p className="text-sm text-gray-600">Gérez votre mot de passe et sécurité</p>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Changer le Mot de Passe</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Entrez le mot de passe actuel"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Entrez le nouveau mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirmez le nouveau mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-3">Exigences du mot de passe :</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          Au moins 8 caractères
                        </li>
                        <li className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          Lettres majuscules et minuscules
                        </li>
                        <li className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          Au moins un chiffre
                        </li>
                        <li className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          Au moins un caractère spécial
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      disabled={isSaving}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Modification en cours...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Changer le mot de passe
                        </>
                      )}
                    </button>
                  </div>

                  {/* Sessions actives */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Sessions Actives</h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Session actuelle - Chrome sur Windows</p>
                          <p className="text-sm text-gray-600">Alger, Algérie • Actif maintenant</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Actif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Préférences de Notifications</h2>
                      <p className="text-sm text-gray-600">Choisissez comment être notifié</p>
                    </div>
                  </div>

                  {/* Email Notifications */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications Email</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Nouveau Laboratoire Créé</p>
                          <p className="text-sm text-gray-600">Recevoir un email lors de la création d'un nouveau laboratoire</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.emailNewLab}
                          onChange={(e) => setNotifications({ ...notifications, emailNewLab: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Nouvelle Publication Ajoutée</p>
                          <p className="text-sm text-gray-600">Recevoir un email pour les nouvelles publications</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.emailNewPublication}
                          onChange={(e) => setNotifications({ ...notifications, emailNewPublication: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Rapport Hebdomadaire</p>
                          <p className="text-sm text-gray-600">Recevoir un résumé hebdomadaire des activités</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.emailWeeklyReport}
                          onChange={(e) => setNotifications({ ...notifications, emailWeeklyReport: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications Push</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Nouveau Laboratoire Créé</p>
                          <p className="text-sm text-gray-600">Notifications navigateur</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.pushNewLab}
                          onChange={(e) => setNotifications({ ...notifications, pushNewLab: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Nouvelle Publication Ajoutée</p>
                          <p className="text-sm text-gray-600">Notifications navigateur</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.pushNewPublication}
                          onChange={(e) => setNotifications({ ...notifications, pushNewPublication: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-900">Rapport Hebdomadaire</p>
                          <p className="text-sm text-gray-600">Notifications navigateur</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.pushWeeklyReport}
                          onChange={(e) => setNotifications({ ...notifications, pushWeeklyReport: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* INSTITUTE TAB */}
              {activeTab === 'institute' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Paramètres de l'Institut</h2>
                      <p className="text-sm text-gray-600">Configurations générales de l'institut</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom de l'Institut
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={instituteSettings.instituteName}
                          onChange={(e) => setInstituteSettings({ ...instituteSettings, instituteName: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Code de l'Institut
                      </label>
                      <input
                        type="text"
                        value={instituteSettings.instituteCode}
                        onChange={(e) => setInstituteSettings({ ...instituteSettings, instituteCode: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Site Web
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={instituteSettings.website}
                          onChange={(e) => setInstituteSettings({ ...instituteSettings, website: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          rows={3}
                          value={instituteSettings.address}
                          onChange={(e) => setInstituteSettings({ ...instituteSettings, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Labs par Directeur
                      </label>
                      <input
                        type="number"
                        value={instituteSettings.maxLabsPerDirector}
                        onChange={(e) => setInstituteSettings({ ...instituteSettings, maxLabsPerDirector: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Équipes par Lab
                      </label>
                      <input
                        type="number"
                        value={instituteSettings.maxTeamsPerLab}
                        onChange={(e) => setInstituteSettings({ ...instituteSettings, maxTeamsPerLab: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Chercheurs par Équipe
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={instituteSettings.maxResearchersPerTeam}
                          onChange={(e) => setInstituteSettings({ ...instituteSettings, maxResearchersPerTeam: parseInt(e.target.value) })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Zone Dangereuse
                      </h3>
                      <p className="text-sm text-red-700 mb-4">
                        Ces actions sont irréversibles. Veuillez être certain avant de continuer.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                        Réinitialiser Toutes les Données
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SYSTEM TAB */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Informations Système</h2>
                      <p className="text-sm text-gray-600">Détails et état du système</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                      <p className="text-sm text-blue-600 mb-1 font-medium">Version</p>
                      <p className="font-bold text-blue-900 text-lg">BiblioPro v2.0.1</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl">
                      <p className="text-sm text-purple-600 mb-1 font-medium">Dernière Mise à Jour</p>
                      <p className="font-bold text-purple-900 text-lg">17 Avril 2026</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-600 mb-1 font-medium">État Base de Données</p>
                      <p className="font-bold text-green-900 flex items-center gap-2 text-lg">
                        <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></span>
                        Connectée
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-600 mb-1 font-medium">État API</p>
                      <p className="font-bold text-green-900 flex items-center gap-2 text-lg">
                        <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></span>
                        Opérationnelle
                      </p>
                    </div>
                  </div>

                  {/* About */}
                  <div className="pt-6">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-2xl">BiblioPro</h4>
                          <p className="text-blue-100">Système de Gestion de Recherche</p>
                        </div>
                      </div>
                      <p className="text-blue-50 leading-relaxed mb-4">
                        BiblioPro est une application complète de gestion bibliométrique conçue pour l'USTHB. 
                        Elle aide à gérer les publications de recherche, suivre les citations et analyser l'impact académique 
                        à travers les laboratoires et les équipes.
                      </p>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-xs text-blue-100">
                          © 2024-2026 Université des Sciences et de la Technologie Houari Boumediene
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button (appears for all tabs except System) */}
              {activeTab !== 'system' && (
                <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-4">
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                  >
                    {isSaving ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Sauvegarde en cours...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Sauvegarder les Modifications
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteSettings;