'use client';

import { useState, useEffect } from 'react';
import { updateMultipleSettings, getAllSettings } from '@/app/admin/settings/actions';

interface SiteSettingsFormProps {
  onSave?: () => void;
}

export default function SiteSettingsForm({ onSave }: SiteSettingsFormProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    websiteName: '',
    websiteNameAmharic: '',
    domainName: '',
    taglineEnglish: '',
    taglineAmharic: '',
    logoUrl: '',
    contactEmail: '',
    contactPhone: '',
    aboutTextEnglish: '',
    aboutTextAmharic: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAllSettings();
        setFormData({
          websiteName: settings.websiteName || '',
          websiteNameAmharic: settings.websiteNameAmharic || '',
          domainName: settings.domainName || '',
          taglineEnglish: settings.taglineEnglish || '',
          taglineAmharic: settings.taglineAmharic || '',
          logoUrl: settings.logoUrl || '',
          contactEmail: settings.contactEmail || '',
          contactPhone: settings.contactPhone || '',
          aboutTextEnglish: settings.aboutTextEnglish || '',
          aboutTextAmharic: settings.aboutTextAmharic || '',
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await updateMultipleSettings(formData);
      if (result.success) {
        alert('Settings updated successfully!');
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
        <p className="text-[var(--color-ink-soft)]">Loading settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">Website Branding</h2>

        {/* Logo Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-4">
            Logo URL
          </label>
          <input
            type="url"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          />
          {formData.logoUrl && (
            <div className="mt-4">
              <p className="text-sm text-[var(--color-ink-soft)] mb-2">Logo Preview:</p>
              <img src={formData.logoUrl} alt="Logo" className="h-12 w-auto" onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} />
            </div>
          )}
        </div>

        {/* Website Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Website Name (English)
            </label>
            <input
              type="text"
              name="websiteName"
              value={formData.websiteName}
              onChange={handleChange}
              placeholder="Amharic Proverbs Archive"
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Website Name (Amharic)
            </label>
            <input
              type="text"
              name="websiteNameAmharic"
              value={formData.websiteNameAmharic}
              onChange={handleChange}
              placeholder="ምሳሌያዊ አነጋገሮች"
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
        </div>

        {/* Taglines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Tagline (English)
            </label>
            <input
              type="text"
              name="taglineEnglish"
              value={formData.taglineEnglish}
              onChange={handleChange}
              placeholder="Wisdom from the ages..."
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Tagline (Amharic)
            </label>
            <input
              type="text"
              name="taglineAmharic"
              value={formData.taglineAmharic}
              onChange={handleChange}
              placeholder="ምስጢር የእውቀት..."
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
        </div>

        {/* Domain Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
            Domain Name
          </label>
          <input
            type="text"
            name="domainName"
            value={formData.domainName}
            onChange={handleChange}
            placeholder="example.com"
            className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@example.com"
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
        </div>
      </div>

      {/* About Text */}
      <div>
        <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">About Your Website</h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
            About Text (English)
          </label>
          <textarea
            name="aboutTextEnglish"
            value={formData.aboutTextEnglish}
            onChange={handleChange}
            placeholder="Tell visitors about your website..."
            rows={4}
            className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
            About Text (Amharic)
          </label>
          <textarea
            name="aboutTextAmharic"
            value={formData.aboutTextAmharic}
            onChange={handleChange}
            placeholder="ስለ ዌብሳይተሪ ንገር..."
            rows={4}
            className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-6 border-t border-[var(--color-border-eth)]">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-[var(--color-earth-dark)] text-white rounded-lg hover:bg-[var(--color-earth)] transition-colors disabled:opacity-50 font-medium"
        >
          {submitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
