"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface HeroSlideFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function HeroSlideForm({ initialData, isEditing = false }: HeroSlideFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    textEn: '',
    textFa: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        textEn: initialData.text?.en || '',
        textFa: initialData.text?.fa || '',
        order: typeof initialData.order === 'number' ? initialData.order : 0,
        isActive: typeof initialData.isActive === 'boolean' ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      text: { en: formData.textEn, fa: formData.textFa },
      order: Number(formData.order) || 0,
      isActive: formData.isActive,
    };

    try {
      const url = isEditing
        ? `/api/hero-slides/${initialData._id}`
        : '/api/hero-slides';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(isEditing ? 'Updated successfully' : 'Created successfully');
        router.back();
        router.refresh();
      } else {
        const errData = await response.json();
        toast.error(errData.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-8 rounded-xl border border-project-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-project-gray-700 mb-1">Text (English)</label>
          <textarea
            name="textEn"
            value={formData.textEn}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div dir="rtl">
          <label className="block text-sm font-medium text-project-gray-700 mb-1">متن (فارسی)</label>
          <textarea
            name="textFa"
            value={formData.textFa}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-project-gray-700 mb-1">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-xs text-project-gray-400 mt-1">Lower numbers show first.</p>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleCheckbox}
            className="h-4 w-4 text-primary-900 border-project-gray-300 rounded"
          />
          <label className="text-sm text-project-gray-700">Active</label>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-project-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-4 px-6 py-2 text-project-gray-600 hover:text-project-gray-800 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Slide' : 'Create Slide')}
        </button>
      </div>
    </form>
  );
}
