"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, VideoCameraIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'react-hot-toast';

interface EventItem {
  _id: string;
  title: { en: string; fa: string };
  date: string;
  location: string;
  isVirtual: boolean;
}

export default function EventsList() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en-US';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Event deleted');
        fetchItems(); // Refresh list
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-header text-primary-900">Manage Events</h1>
        <Link 
          href={`/${locale}/admin/events/create`}
          className="bg-primary-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Create New
        </Link>
      </div>

      <div className="bg-white border border-project-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-project-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-project-gray-400">No events found. Schedule one to get started.</div>
        ) : (
          <table className="min-w-full divide-y divide-project-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Event Title (English)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-project-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-project-gray-200">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                    {item.title.en}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-project-gray-500">
                    {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-project-gray-500">
                    <div className="flex items-center gap-1">
                      {item.isVirtual ? <VideoCameraIcon className="w-4 h-4" /> : <MapPinIcon className="w-4 h-4" />}
                      <span className="truncate max-w-[150px]">{item.isVirtual ? 'Virtual Event' : item.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/${locale}/admin/events/${item._id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                       <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
