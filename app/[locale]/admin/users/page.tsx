"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { UserCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';

interface ClerkUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
  publicMetadata: {
    role?: string;
  };
  lastSignInAt: number | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to load users');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentRole?: string) => {
    if (userId === currentUser?.id) {
      if (!confirm('Warning: You are about to remove your own admin privileges. You will lose access to this dashboard immediately. Are you sure?')) {
        return;
      }
    }

    const newRole = currentRole === 'admin' ? null : 'admin';

    try {
      // Optimistic update
      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, publicMetadata: { ...u.publicMetadata, role: newRole as string } }
          : u
      ));

      const response = await fetch(`/api/users/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        toast.success(`User role updated to ${newRole ? 'Admin' : 'Regular User'}`);
      } else {
        toast.error('Failed to update role');
        // Revert on failure
        fetchUsers();
      }
    } catch (error) {
      toast.error('An error occurred');
      fetchUsers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-header text-primary-900 mb-6">Manage Users</h1>
      
      <div className="bg-white border border-project-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-project-gray-400">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-project-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider">Last Active</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-project-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-project-gray-200">
                {users.map((user) => {
                   const isAdmin = user.publicMetadata?.role === 'admin';
                   return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                            <UserCircleIcon className="w-6 h-6" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-primary-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs text-project-gray-400 font-mono">
                                {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-project-gray-500">{user.emailAddresses[0]?.emailAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isAdmin ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-project-gray-500">
                        {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleAdminRole(user.id, user.publicMetadata?.role)}
                          className={`
                            inline-flex items-center gap-1.5 px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                            ${isAdmin 
                              ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500' 
                              : 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                            }
                          `}
                        >
                          {isAdmin ? (
                             <>Remove Admin</>
                          ) : (
                             <>
                               <CheckBadgeIcon className="w-4 h-4" />
                               Make Admin
                             </>
                          )}
                        </button>
                      </td>
                    </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
