import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebarLayout from "components/admin/AdminSidebarLayout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Get the current user
  const user = await currentUser();

  // 2. Check for 'admin' role in publicMetadata
  // Note: We access publicMetadata directly. Type inference works if configured, or just generic Record.
  const isAdmin = user?.publicMetadata?.role === 'admin';

  if (!isAdmin) {
    // Redirect unauthorized users to home page
    redirect('/');
  }

  // 3. Render the interactive client layout
  return (
    <AdminSidebarLayout>
      {children}
    </AdminSidebarLayout>
  );
}
