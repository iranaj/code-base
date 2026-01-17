"use client";

import React from "react";
import Link from 'next/link';
import { MegaphoneIcon, CalendarDateRangeIcon, RectangleStackIcon, PhoneIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function AdminDashboard() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en-US';

  const modules = [
    {
      name: 'Manage Advocacy',
      description: 'Create, edit, and publish advocacy campaigns and updates.',
      href: `/${locale}/admin/advocacy`,
      icon: MegaphoneIcon,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      name: 'Manage Events',
      description: 'Schedule upcoming events, manage details, and track registration links.',
      href: `/${locale}/admin/events`,
      icon: CalendarDateRangeIcon,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      name: 'Manage Hero Slides',
      description: 'Update the rotating hero text slides on the homepage.',
      href: `/${locale}/admin/hero-slides`,
      icon: RectangleStackIcon,
      color: 'bg-green-50 text-green-700',
    },
    {
      name: 'Manage Contact Details',
      description: 'Edit contact emails, phone number, address, and map location.',
      href: `/${locale}/admin/contact-details`,
      icon: PhoneIcon,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      name: 'Manage About Page',
      description: 'Update the About page headline, mission, and vision content.',
      href: `/${locale}/admin/about`,
      icon: DocumentTextIcon,
      color: 'bg-rose-50 text-rose-700',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-header font-bold text-primary-900 mb-2">Dashboard</h1>
      <p className="text-project-gray-500 mb-8 max-w-2xl">
        Welcome to the Iranian Jurists CMS. Select a module below to start managing your website content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="group block bg-white border border-project-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-700 font-header">
              {item.name}
            </h3>
            <p className="text-project-gray-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
