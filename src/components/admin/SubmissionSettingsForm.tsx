'use client';

import { useState, useEffect } from 'react';
import { updateMultipleSettings, getAllSettings } from '@/app/admin/settings/actions';

interface SubmissionSettingsFormProps {
  onSave?: () => void;
}

export default function SubmissionSettingsForm({ onSave }: SubmissionSettingsFormProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    submissionSettings: {
      allowPublicSubmissions: true,
      requireApproval: true,
      maxSubmissionsPerUser: 5,
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAllSettings();
        if (settings.submissionSettings) {
          setFormData({ submissionSettings: settings.submissionSettings });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      submissionSettings: {
        ...prev.submissionSettings,
        [name]: val,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await updateMultipleSettings({
        submissionSettings: formData.submissionSettings,
      });
      if (result.success) {
        alert('Submission settings updated successfully!');
        onSave?.();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving settings');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-ink-soft)]">Loading submission settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">Submission Settings</h2>
        <p className="text-[var(--color-ink-soft)] mb-8">Configure how users can submit new proverbs</p>

        {/* Allow Public Submissions */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="allowPublicSubmissions"
              name="allowPublicSubmissions"
              checked={formData.submissionSettings.allowPublicSubmissions}
              onChange={handleChange}
              className="w-5 h-5 rounded border-[var(--color-border-eth)] cursor-pointer"
            />
            <div className="flex-1">
              <label htmlFor="allowPublicSubmissions" className="block text-sm font-semibold text-[var(--color-earth-dark)] cursor-pointer">
                Allow Public Submissions
              </label>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                If enabled, visitors can submit new proverbs without requiring authentication
              </p>
            </div>
          </div>
        </div>

        {/* Require Approval */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="requireApproval"
              name="requireApproval"
              checked={formData.submissionSettings.requireApproval}
              onChange={handleChange}
              className="w-5 h-5 rounded border-[var(--color-border-eth)] cursor-pointer"
            />
            <div className="flex-1">
              <label htmlFor="requireApproval" className="block text-sm font-semibold text-[var(--color-earth-dark)] cursor-pointer">
                Require Admin Approval
              </label>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                All submissions must be reviewed and approved by an admin before being published
              </p>
            </div>
          </div>
        </div>

        {/* Max Submissions Per User */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-4">
            Maximum Submissions Per User
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              name="maxSubmissionsPerUser"
              value={formData.submissionSettings.maxSubmissionsPerUser}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-20 px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
            <p className="text-xs text-[var(--color-ink-soft)]">submissions per user (set high to allow unlimited)</p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Current Submission Policy</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Public submissions: {formData.submissionSettings.allowPublicSubmissions ? '✓ Enabled' : '✗ Disabled'}
          </li>
          <li>
            • Admin approval: {formData.submissionSettings.requireApproval ? '✓ Required' : '✗ Not required'}
          </li>
          <li>
            • Max submissions per user: {formData.submissionSettings.maxSubmissionsPerUser}
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-6 border-t border-[var(--color-border-eth)]">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-[var(--color-earth-dark)] text-white rounded-lg hover:bg-[var(--color-earth)] transition-colors disabled:opacity-50 font-medium"
        >
          {submitting ? 'Saving...' : 'Save Submission Settings'}
        </button>
      </div>
    </form>
  );
}
