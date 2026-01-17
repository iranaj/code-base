"use client";

import React from 'react';
import EventForm from 'components/admin/EventForm';

export default function CreateEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-header text-primary-900 mb-6">Schedule New Event</h1>
      <EventForm />
    </div>
  );
}
