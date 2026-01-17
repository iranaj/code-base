"use client";

import React from 'react';
import HeroSlideForm from 'components/admin/HeroSlideForm';

export default function CreateHeroSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-header text-primary-900 mb-6">Create Hero Slide</h1>
      <HeroSlideForm />
    </div>
  );
}
