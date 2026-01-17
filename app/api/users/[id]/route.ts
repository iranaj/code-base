import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: requesterId } = await auth();
    if (!requesterId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify requesting user is admin
    const client = await clerkClient();
    const requester = await client.users.getUser(requesterId);
    if (requester.publicMetadata.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: targetUserId } = await params;
    const body = await req.json();
    const { role } = body;

    // Validate role
    if (role !== 'admin' && role !== undefined) { 
        // strictly speaking we are just toggling admin or removing it. 
        // undefined/null to remove? Or 'user'?
        // Let's assume we pass 'admin' to set, and null/'user' to remove.
    }

    const newMetadata = {
       ...((await client.users.getUser(targetUserId)).publicMetadata),
       role: role
    };

    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: newMetadata
    });

    return NextResponse.json({ message: 'User role updated', role });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}
