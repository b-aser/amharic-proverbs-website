'use client';

import { useState, useEffect } from 'react';
import { getProverbs, addProverb, updateProverb, deleteProverb } from '@/app/admin/settings/actions';

interface Proverb {
  id: string;
  amharic_text: string;
  english_translation: string;
  meaning_amharic: string | null;
  meaning_english: string | null;
  slug: string;
  created_at: string;
  proverb_tags?: Array<{ tag_id: string; tags: { name: string } }>;
}

export default function ProverbManagement() {
  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    amharicText: '',
    englishTranslation: '',
    meaningAmharic: '',
    meaningEnglish: '',
    tags: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProverbs();
  }, []);

  const loadProverbs = async () => {
    setLoading(true);
    try {
      const result = await getProverbs();
      if (result.success) {
        setProverbs(result.proverbs || []);
      }
    } catch (error) {
      console.error('Error loading proverbs:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      amharicText: '',
      englishTranslation: '',
      meaningAmharic: '',
      meaningEnglish: '',
      tags: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (proverb: Proverb) => {
    setFormData({
      amharicText: proverb.amharic_text,
      englishTranslation: proverb.english_translation,
      meaningAmharic: proverb.meaning_amharic || '',
      meaningEnglish: proverb.meaning_english || '',
      tags: proverb.proverb_tags?.map((pt) => pt.tags.name).join(', ') || '',
    });
    setEditingId(proverb.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      let result;
      if (editingId) {
        result = await updateProverb(editingId, {
          amharicText: formData.amharicText,
          englishTranslation: formData.englishTranslation,
          meaningAmharic: formData.meaningAmharic,
          meaningEnglish: formData.meaningEnglish,
          tags: tagsArray,
        });
      } else {
        result = await addProverb({
          amharicText: formData.amharicText,
          englishTranslation: formData.englishTranslation,
          meaningAmharic: formData.meaningAmharic,
          meaningEnglish: formData.meaningEnglish,
          tags: tagsArray,
        });
      }

      if (result.success) {
        setMessage(editingId ? 'Proverb updated successfully!' : 'Proverb added successfully!');
        await loadProverbs();
        resetForm();
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this proverb?')) {
      try {
        const result = await deleteProverb(id);
        if (result.success) {
          setMessage('Proverb deleted successfully!');
          await loadProverbs();
        } else {
          setMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred');
      }
    }
  };

  const filteredProverbs = proverbs.filter(
    (p) =>
      p.amharic_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.english_translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-ink-soft)]">Loading proverbs...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display text-[var(--color-earth-dark)] mb-2">Proverb Management</h2>
          <p className="text-[var(--color-ink-soft)]">Create, edit, and manage proverbs in your database</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-[var(--color-earth-dark)] text-white rounded-lg hover:bg-[var(--color-earth)] transition-colors font-medium"
          >
            + Add New Proverb
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.includes('Error')
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-[var(--color-border-eth)]">
          <h3 className="text-xl font-semibold text-[var(--color-earth-dark)] mb-4">
            {editingId ? 'Edit Proverb' : 'Add New Proverb'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
                Amharic Text *
              </label>
              <input
                type="text"
                value={formData.amharicText}
                onChange={(e) => setFormData({ ...formData, amharicText: e.target.value })}
                placeholder="Enter Amharic proverb text..."
                required
                className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
                English Translation *
              </label>
              <input
                type="text"
                value={formData.englishTranslation}
                onChange={(e) => setFormData({ ...formData, englishTranslation: e.target.value })}
                placeholder="Enter English translation..."
                required
                className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
                  Meaning (Amharic)
                </label>
                <textarea
                  value={formData.meaningAmharic}
                  onChange={(e) => setFormData({ ...formData, meaningAmharic: e.target.value })}
                  placeholder="Explain the meaning in Amharic..."
                  rows={3}
                  className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
                  Meaning (English)
                </label>
                <textarea
                  value={formData.meaningEnglish}
                  onChange={(e) => setFormData({ ...formData, meaningEnglish: e.target.value })}
                  placeholder="Explain the meaning in English..."
                  rows={3}
                  className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="wisdom, unity, family"
                className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-[var(--color-earth-dark)] text-white rounded-lg hover:bg-[var(--color-earth)] transition-colors disabled:opacity-50 font-medium"
              >
                {submitting ? 'Saving...' : editingId ? 'Update Proverb' : 'Add Proverb'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-[var(--color-border-eth)] text-[var(--color-earth-dark)] rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search proverbs by Amharic or English text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-[var(--color-border-eth)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        />
      </div>

      {/* Proverbs List */}
      <div className="space-y-4">
        <div className="text-sm text-[var(--color-ink-soft)] mb-4">
          Showing {filteredProverbs.length} of {proverbs.length} proverbs
        </div>

        {filteredProverbs.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-lg">
            <p className="text-[var(--color-ink-soft)]">No proverbs found</p>
          </div>
        ) : (
          filteredProverbs.map((proverb) => (
            <div
              key={proverb.id}
              className="p-6 border border-[var(--color-border-eth)] rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[var(--color-earth-dark)] mb-1">{proverb.amharic_text}</p>
                  <p className="text-sm text-[var(--color-ink-soft)] mb-2">{proverb.english_translation}</p>
                  {proverb.meaning_amharic && (
                    <p className="text-xs text-[var(--color-ink-soft)] mb-2">
                      <span className="font-semibold">Amharic meaning:</span> {proverb.meaning_amharic}
                    </p>
                  )}
                  {proverb.meaning_english && (
                    <p className="text-xs text-[var(--color-ink-soft)] mb-2">
                      <span className="font-semibold">English meaning:</span> {proverb.meaning_english}
                    </p>
                  )}
                  {proverb.proverb_tags && proverb.proverb_tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {proverb.proverb_tags.map((tag) => (
                        <span
                          key={tag.tag_id}
                          className="px-2 py-1 text-xs bg-[var(--color-gold-pale)] text-[var(--color-earth-dark)] rounded"
                        >
                          {tag.tags.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-[var(--color-ink-soft)] mt-2">
                    Created: {new Date(proverb.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(proverb)}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proverb.id)}
                    className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
