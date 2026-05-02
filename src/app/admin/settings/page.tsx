'use client';

import { useState } from 'react';
import {
  updateMultipleSettings,
  addProverb,
  updateProverb,
  deleteProverb,
  getProverbs,
  getAllSettings,
  getSetting,
} from './actions';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';
import ThemeSettingsForm from '@/components/admin/ThemeSettingsForm';
import ProverbManagement from '@/components/admin/ProverbManagement';
import SubmissionSettingsForm from '@/components/admin/SubmissionSettingsForm';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'site' | 'theme' | 'submissions' | 'proverbs' | 'advanced'>('site');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const tabs = [
    { id: 'site', label: 'Site Settings', icon: '⚙️' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'proverbs', label: 'Proverbs', icon: '📚' },
    { id: 'submissions', label: 'Submissions', icon: '📝' },
    { id: 'advanced', label: 'Advanced', icon: '🔧' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display text-[var(--color-earth-dark)] mb-2">Platform Settings</h1>
        <p className="text-[var(--color-ink-soft)]">Configure your Amharic Proverbs website</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--color-border-eth)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-[var(--color-earth-dark)] border-b-2 border-[var(--color-gold)]'
                : 'text-[var(--color-ink-soft)] hover:text-[var(--color-earth-dark)]'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border-eth)]">
        {activeTab === 'site' && <SiteSettingsForm onSave={() => setMessage('Site settings updated!')} />}
        {activeTab === 'theme' && <ThemeSettingsForm onSave={() => setMessage('Theme updated!')} />}
        {activeTab === 'proverbs' && <ProverbManagement />}
        {activeTab === 'submissions' && <SubmissionSettingsForm onSave={() => setMessage('Submission settings updated!')} />}
        {activeTab === 'advanced' && (
          <div className="p-8">
            <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">Advanced Settings</h2>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">Advanced features coming soon. Contact support for database maintenance.</p>
              </div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                disabled
              >
                Clear Cache
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
