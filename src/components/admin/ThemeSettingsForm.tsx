'use client';

import { useState, useEffect } from 'react';
import { updateMultipleSettings, getAllSettings } from '@/app/admin/settings/actions';

interface ThemeSettingsFormProps {
  onSave?: () => void;
}

export default function ThemeSettingsForm({ onSave }: ThemeSettingsFormProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    theme: {
      primaryColor: '#3D1F08',
      secondaryColor: '#C9952A',
      accentColor: '#2A5C45',
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAllSettings();
        if (settings.theme) {
          setFormData({ theme: settings.theme });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleColorChange = (key: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) => {
    setFormData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await updateMultipleSettings({
        theme: formData.theme,
      });
      if (result.success) {
        alert('Theme updated successfully!');
        onSave?.();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving theme');
    } finally {
      setSubmitting(false);
    }
  };

  const colorOptions = {
    primaryColor: { label: 'Primary Color (Dark Background)', hex: '#3D1F08' },
    secondaryColor: { label: 'Secondary Color (Gold Accents)', hex: '#C9952A' },
    accentColor: { label: 'Accent Color (Green Highlights)', hex: '#2A5C45' },
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-ink-soft)]">Loading theme settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-6">Color Palette</h2>
        <p className="text-[var(--color-ink-soft)] mb-8">Customize the colors used throughout your website</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(colorOptions).map(([key, option]) => (
            <div key={key} className="p-6 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-4">
                {option.label}
              </label>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <input
                    type="color"
                    value={formData.theme[key as keyof typeof formData.theme] || option.hex}
                    onChange={(e) =>
                      handleColorChange(key as 'primaryColor' | 'secondaryColor' | 'accentColor', e.target.value)
                    }
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-[var(--color-border-eth)]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.theme[key as keyof typeof formData.theme] || option.hex}
                    onChange={(e) =>
                      handleColorChange(key as 'primaryColor' | 'secondaryColor' | 'accentColor', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-[var(--color-border-eth)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Combinations Preview */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-earth-dark)] mb-4">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header Preview */}
          <div className="p-4 rounded-lg border-2 border-[var(--color-border-eth)]">
            <div
              style={{
                backgroundColor: formData.theme.primaryColor,
                color: '#fff',
              }}
              className="p-4 rounded-lg mb-4"
            >
              <p className="font-bold">Header Preview</p>
              <p className="text-sm opacity-75">Your website title goes here</p>
            </div>
          </div>

          {/* Button Preview */}
          <div className="p-4 rounded-lg border-2 border-[var(--color-border-eth)]">
            <button
              type="button"
              style={{
                backgroundColor: formData.theme.secondaryColor,
              }}
              className="px-4 py-2 text-white rounded-lg font-semibold"
              disabled
            >
              Sample Button
            </button>
          </div>

          {/* Accent Preview */}
          <div className="p-4 rounded-lg border-2 border-[var(--color-border-eth)]">
            <div
              style={{
                borderLeft: `4px solid ${formData.theme.accentColor}`,
                backgroundColor: `${formData.theme.accentColor}15`,
              }}
              className="p-4 rounded"
            >
              <p className="font-semibold" style={{ color: formData.theme.accentColor }}>
                Accent Highlight
              </p>
              <p className="text-sm text-[var(--color-ink-soft)]">This shows how accents appear</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available CSS Variables */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-earth-dark)] mb-4">CSS Variables Reference</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-[var(--color-ink-soft)] mb-4">
            The following CSS variables are updated with your theme colors and can be used in any styles:
          </p>
          <code className="block text-xs font-mono text-[var(--color-earth)]">
            <div>--color-earth-dark: {formData.theme.primaryColor}</div>
            <div>--color-gold: {formData.theme.secondaryColor}</div>
            <div>--color-green-eth: {formData.theme.accentColor}</div>
          </code>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-6 border-t border-[var(--color-border-eth)]">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-[var(--color-earth-dark)] text-white rounded-lg hover:bg-[var(--color-earth)] transition-colors disabled:opacity-50 font-medium"
        >
          {submitting ? 'Saving...' : 'Save Theme'}
        </button>
      </div>
    </form>
  );
}
