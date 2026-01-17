"use client";

import React from 'react';
import AdvocacyForm from 'components/admin/AdvocacyForm';

export default function CreateAdvocacyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-header text-primary-900 mb-6">Create New Advocacy Campaign</h1>
      <AdvocacyForm />
    </div>
  );
}
