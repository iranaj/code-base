"use client";

import React, { useEffect, useState, use } from 'react';
import HeroSlideForm from 'components/admin/HeroSlideForm';
import { toast } from 'react-hot-toast';

export default function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/hero-slides/${id}`);
        if (response.ok) {
          const item = await response.json();
          setData(item);
        } else {
          toast.error('Failed to fetch hero slide');
        }
      } catch (error) {
        toast.error('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Hero slide not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold font-header text-primary-900 mb-6">Edit Hero Slide</h1>
      <HeroSlideForm initialData={data} isEditing={true} />
    </div>
  );
}
