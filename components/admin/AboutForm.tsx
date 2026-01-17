"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { en, persian } from 'utils/translations';

interface LocalizedString {
  en: string;
  fa: string;
}

interface BulletItem {
  en: string;
  fa: string;
}

interface AboutContent {
  title: LocalizedString;
  p1: LocalizedString;
  p2: LocalizedString;
  mission: {
    title: LocalizedString;
    p1: LocalizedString;
    p2: LocalizedString;
    bullets: BulletItem[];
  };
  vision: {
    title: LocalizedString;
    p1: LocalizedString;
  };
}

const buildDefaultContent = (): AboutContent => {
  const enBullets = [
    en.about.mission_statement.bullet1,
    en.about.mission_statement.bullet2,
    en.about.mission_statement.bullet3,
    en.about.mission_statement.bullet4,
    en.about.mission_statement.bullet5,
    en.about.mission_statement.bullet6,
    en.about.mission_statement.bullet7,
  ].filter(Boolean);

  const faBullets = [
    persian.about.mission_statement.bullet1,
    persian.about.mission_statement.bullet2,
    persian.about.mission_statement.bullet3,
    persian.about.mission_statement.bullet4,
    persian.about.mission_statement.bullet5,
    persian.about.mission_statement.bullet6,
    persian.about.mission_statement.bullet7,
  ].filter(Boolean);

  const max = Math.max(enBullets.length, faBullets.length, 1);
  const bullets = Array.from({ length: max }).map((_, index) => ({
    en: enBullets[index] || '',
    fa: faBullets[index] || '',
  }));

  return {
    title: { en: en.about.title, fa: persian.about.title },
    p1: { en: en.about.p1, fa: persian.about.p1 },
    p2: { en: en.about.p2, fa: persian.about.p2 },
    mission: {
      title: { en: en.about.mission_statement.title, fa: persian.about.mission_statement.title },
      p1: { en: en.about.mission_statement.p1, fa: persian.about.mission_statement.p1 },
      p2: { en: en.about.mission_statement.p2, fa: persian.about.mission_statement.p2 },
      bullets,
    },
    vision: {
      title: { en: en.about.vision_statement.title, fa: persian.about.vision_statement.title },
      p1: { en: en.about.vision_statement.p1, fa: persian.about.vision_statement.p1 },
    },
  };
};

const mergeContent = (base: AboutContent, incoming: AboutContent): AboutContent => {
  const bullets = Array.isArray(incoming?.mission?.bullets)
    ? incoming.mission.bullets
    : base.mission.bullets;

  return {
    title: { ...base.title, ...incoming?.title },
    p1: { ...base.p1, ...incoming?.p1 },
    p2: { ...base.p2, ...incoming?.p2 },
    mission: {
      title: { ...base.mission.title, ...incoming?.mission?.title },
      p1: { ...base.mission.p1, ...incoming?.mission?.p1 },
      p2: { ...base.mission.p2, ...incoming?.mission?.p2 },
      bullets: bullets.length > 0 ? bullets : base.mission.bullets,
    },
    vision: {
      title: { ...base.vision.title, ...incoming?.vision?.title },
      p1: { ...base.vision.p1, ...incoming?.vision?.p1 },
    },
  };
};

export default function AboutForm() {
  const [formData, setFormData] = useState<AboutContent>(buildDefaultContent());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/about-content');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setFormData(mergeContent(buildDefaultContent(), data));
          }
        }
      } catch (error) {
        toast.error('Failed to load about content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateField = (path: (string | number)[], value: string) => {
    setFormData((prev) => {
      const next = structuredClone(prev) as AboutContent;
      let ref: any = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        ref = ref[path[i]];
      }
      ref[path[path.length - 1]] = value;
      return next;
    });
  };

  const addBullet = () => {
    setFormData((prev) => ({
      ...prev,
      mission: {
        ...prev.mission,
        bullets: [...prev.mission.bullets, { en: '', fa: '' }],
      },
    }));
  };

  const removeBullet = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mission: {
        ...prev.mission,
        bullets: prev.mission.bullets.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/about-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('About content updated');
      } else {
        const errData = await response.json();
        toast.error(errData.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-project-gray-400">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl bg-white p-8 rounded-xl border border-project-gray-200 shadow-sm">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-primary-900">Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Title (English)</label>
            <input
              type="text"
              value={formData.title.en}
              onChange={(e) => updateField(['title', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">عنوان (فارسی)</label>
            <input
              type="text"
              value={formData.title.fa}
              onChange={(e) => updateField(['title', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Intro Paragraph 1 (English)</label>
            <textarea
              rows={4}
              value={formData.p1.en}
              onChange={(e) => updateField(['p1', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">پاراگراف ۱ (فارسی)</label>
            <textarea
              rows={4}
              value={formData.p1.fa}
              onChange={(e) => updateField(['p1', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Intro Paragraph 2 (English)</label>
            <textarea
              rows={4}
              value={formData.p2.en}
              onChange={(e) => updateField(['p2', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">پاراگراف ۲ (فارسی)</label>
            <textarea
              rows={4}
              value={formData.p2.fa}
              onChange={(e) => updateField(['p2', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-primary-900">Mission Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Mission Title (English)</label>
            <input
              type="text"
              value={formData.mission.title.en}
              onChange={(e) => updateField(['mission', 'title', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">عنوان مأموریت (فارسی)</label>
            <input
              type="text"
              value={formData.mission.title.fa}
              onChange={(e) => updateField(['mission', 'title', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Mission Paragraph 1 (English)</label>
            <textarea
              rows={4}
              value={formData.mission.p1.en}
              onChange={(e) => updateField(['mission', 'p1', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">پاراگراف ۱ مأموریت (فارسی)</label>
            <textarea
              rows={4}
              value={formData.mission.p1.fa}
              onChange={(e) => updateField(['mission', 'p1', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Mission Paragraph 2 (English)</label>
            <textarea
              rows={4}
              value={formData.mission.p2.en}
              onChange={(e) => updateField(['mission', 'p2', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">پاراگراف ۲ مأموریت (فارسی)</label>
            <textarea
              rows={4}
              value={formData.mission.p2.fa}
              onChange={(e) => updateField(['mission', 'p2', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-project-gray-700">Mission Bullets</h3>
            <button
              type="button"
              onClick={addBullet}
              className="px-3 py-1.5 text-sm border border-project-gray-200 rounded-lg hover:bg-project-gray-50"
            >
              Add Bullet
            </button>
          </div>

          {formData.mission.bullets.map((bullet, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-project-gray-100 rounded-lg p-4">
              <div>
                <label className="block text-xs font-medium text-project-gray-600 mb-1">Bullet {index + 1} (English)</label>
                <input
                  type="text"
                  value={bullet.en}
                  onChange={(e) => updateField(['mission', 'bullets', index, 'en'], e.target.value)}
                  className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div dir="rtl">
                <label className="block text-xs font-medium text-project-gray-600 mb-1">گزینه {index + 1} (فارسی)</label>
                <input
                  type="text"
                  value={bullet.fa}
                  onChange={(e) => updateField(['mission', 'bullets', index, 'fa'], e.target.value)}
                  className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeBullet(index)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-primary-900">Vision Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Vision Title (English)</label>
            <input
              type="text"
              value={formData.vision.title.en}
              onChange={(e) => updateField(['vision', 'title', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">عنوان چشم‌انداز (فارسی)</label>
            <input
              type="text"
              value={formData.vision.title.fa}
              onChange={(e) => updateField(['vision', 'title', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-project-gray-700 mb-1">Vision Paragraph (English)</label>
            <textarea
              rows={4}
              value={formData.vision.p1.en}
              onChange={(e) => updateField(['vision', 'p1', 'en'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div dir="rtl">
            <label className="block text-sm font-medium text-project-gray-700 mb-1">پاراگراف چشم‌انداز (فارسی)</label>
            <textarea
              rows={4}
              value={formData.vision.p1.fa}
              onChange={(e) => updateField(['vision', 'p1', 'fa'], e.target.value)}
              className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-project-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
