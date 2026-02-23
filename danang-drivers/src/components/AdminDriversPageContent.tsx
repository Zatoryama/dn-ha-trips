'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Lock,
  LogOut,
  Edit3,
  ArrowLeft,
  Save,
  X,
  Check,
  AlertCircle,
  User,
  Phone,
  Globe,
  DollarSign,
  MapPin,
  Briefcase,
  Camera,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import type { Driver } from '@/data/drivers';

type ViewState = 'login' | 'list' | 'edit';

export default function AdminDriversPageContent() {
  const { t, lang, setLang } = useTranslation();
  const [view, setView] = useState<ViewState>('login');
  const [token, setToken] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoUpload(file: File) {
    if (!editingDriver || !token) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('driverId', editingDriver.id);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'X-Admin-Token': token },
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      updateField('photo', data.path);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handlePhotoUpload(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handlePhotoUpload(file);
  }

  // Check for existing session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('adminToken');
    if (stored) {
      setToken(stored);
      setView('list');
    }
  }, []);

  // Fetch drivers when entering list view
  useEffect(() => {
    if (view === 'list' && token) {
      fetchDrivers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, token]);

  async function fetchDrivers() {
    const res = await fetch('/api/admin/drivers', {
      headers: { 'X-Admin-Token': token },
    });
    if (res.ok) {
      const data = await res.json();
      setDrivers(data.drivers);
    } else {
      // Token invalid — force re-login
      sessionStorage.removeItem('adminToken');
      setToken('');
      setView('login');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setPassword('');
      setView('list');
    } else {
      setLoginError(t('admin.wrongPassword'));
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setView('login');
  }

  function startEdit(driver: Driver) {
    setEditingDriver({ ...driver });
    setSaveSuccess(false);
    setView('edit');
  }

  async function handleSave() {
    if (!editingDriver) return;
    setSaving(true);
    setSaveSuccess(false);
    const res = await fetch('/api/admin/drivers', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': token,
      },
      body: JSON.stringify(editingDriver),
    });
    setSaving(false);
    if (res.ok) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setView('list');
      }, 1500);
    }
  }

  function updateField<K extends keyof Driver>(field: K, value: Driver[K]) {
    if (!editingDriver) return;
    setEditingDriver({ ...editingDriver, [field]: value });
  }

  function updateArrayField(field: 'languages' | 'services' | 'areas', value: string) {
    if (!editingDriver) return;
    const arr = value.split(',').map((s) => s.trim()).filter(Boolean);
    setEditingDriver({ ...editingDriver, [field]: arr });
  }

  // ───── LOGIN VIEW ─────
  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          {/* Language toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              {lang === 'en' ? 'VI' : 'EN'}
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              {t('admin.loginTitle')}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {t('admin.loginSubtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="label-field">
                {t('admin.passwordLabel')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                placeholder={t('admin.passwordPlaceholder')}
                className={`input-field ${loginError ? 'border-red-500' : ''}`}
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {loginError}
                </p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              <Lock className="w-4 h-4 mr-2" />
              {t('admin.loginButton')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ───── DRIVER LIST VIEW ─────
  if (view === 'list') {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
              {t('admin.listTitle')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {t('admin.listSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200"
            >
              {lang === 'en' ? 'VI' : 'EN'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg border border-gray-200"
            >
              <LogOut className="w-4 h-4" />
              {t('admin.logout')}
            </button>
          </div>
        </div>

        {/* Driver grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-primary-100 flex-shrink-0">
                    {driver.photo && driver.photo.startsWith('/uploads/') ? (
                      <Image src={driver.photo} alt={driver.name} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                    <p className="text-xs text-gray-500">{driver.nameVi}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    driver.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {driver.available ? t('admin.available') : t('admin.unavailable')}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  {driver.vehicleName}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {driver.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  {driver.languages.join(', ')}
                </p>
              </div>

              <button
                onClick={() => startEdit(driver)}
                className="btn-primary w-full text-sm py-2"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                {t('admin.editButton')}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ───── EDIT VIEW ─────
  if (view === 'edit' && editingDriver) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back + language toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('admin.backToList')}
          </button>
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200"
          >
            {lang === 'en' ? 'VI' : 'EN'}
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">
            {t('admin.editTitle')} — {editingDriver.name}
          </h2>

          <div className="space-y-5">
            {/* Profile photo */}
            <div>
              <label className="label-field flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                {t('admin.profilePhoto')}
              </label>
              <div className="flex items-center gap-5">
                {/* Preview */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {editingDriver.photo && editingDriver.photo.startsWith('/uploads/') ? (
                    <Image src={editingDriver.photo} alt={editingDriver.name} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                {/* Upload area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50/50 transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {uploading ? (
                    <p className="text-sm text-primary-600 font-medium">{t('admin.uploading')}</p>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">{t('admin.clickOrDrag')}</p>
                      <p className="text-xs text-gray-400 mt-1">{t('admin.photoFormats')}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-field">{t('admin.nameEn')}</label>
                <input
                  type="text"
                  value={editingDriver.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">{t('admin.nameVi')}</label>
                <input
                  type="text"
                  value={editingDriver.nameVi}
                  onChange={(e) => updateField('nameVi', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Bio fields */}
            <div>
              <label className="label-field">{t('admin.bioEn')}</label>
              <textarea
                value={editingDriver.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows={3}
                className="input-field resize-none"
              />
            </div>
            <div>
              <label className="label-field">{t('admin.bioVi')}</label>
              <textarea
                value={editingDriver.bioVi}
                onChange={(e) => updateField('bioVi', e.target.value)}
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-field flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {t('admin.phone')}
                </label>
                <input
                  type="text"
                  value={editingDriver.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">{t('admin.whatsapp')}</label>
                <input
                  type="text"
                  value={editingDriver.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Vehicle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-field">{t('admin.vehicleName')}</label>
                <input
                  type="text"
                  value={editingDriver.vehicleName}
                  onChange={(e) => updateField('vehicleName', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  {t('admin.pricePerKm')}
                </label>
                <input
                  type="number"
                  value={editingDriver.pricePerKm}
                  onChange={(e) => updateField('pricePerKm', Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            {/* Array fields (comma-separated) */}
            <div>
              <label className="label-field flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {t('admin.languages')}
              </label>
              <input
                type="text"
                value={editingDriver.languages.join(', ')}
                onChange={(e) => updateArrayField('languages', e.target.value)}
                className="input-field"
                placeholder="English, Vietnamese, French"
              />
              <p className="text-xs text-gray-400 mt-1">{t('admin.commaSeparated')}</p>
            </div>

            <div>
              <label className="label-field flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {t('admin.services')}
              </label>
              <input
                type="text"
                value={editingDriver.services.join(', ')}
                onChange={(e) => updateArrayField('services', e.target.value)}
                className="input-field"
                placeholder="Airport Transfer, City Tour, Day Trip"
              />
              <p className="text-xs text-gray-400 mt-1">{t('admin.commaSeparated')}</p>
            </div>

            <div>
              <label className="label-field flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t('admin.areas')}
              </label>
              <input
                type="text"
                value={editingDriver.areas.join(', ')}
                onChange={(e) => updateArrayField('areas', e.target.value)}
                className="input-field"
                placeholder="Da Nang, Hoi An, Hue"
              />
              <p className="text-xs text-gray-400 mt-1">{t('admin.commaSeparated')}</p>
            </div>

            {/* Availability toggle */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div>
                <p className="font-medium text-gray-900">{t('admin.availability')}</p>
                <p className="text-sm text-gray-500">{t('admin.availabilityDesc')}</p>
              </div>
              <button
                type="button"
                onClick={() => updateField('available', !editingDriver.available)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  editingDriver.available ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    editingDriver.available ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex-1 py-3"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {t('admin.saved')}
                  </>
                ) : saving ? (
                  t('admin.saving')
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.saveChanges')}
                  </>
                )}
              </button>
              <button
                onClick={() => setView('list')}
                className="btn-secondary px-6 py-3"
              >
                <X className="w-4 h-4 mr-2" />
                {t('admin.cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
