import { NextResponse } from 'next/server';
import connectDB from 'lib/db';
import Event from 'models/Event';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    await connectDB();
    // Sort events by date descending
    const items = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching event items:', error);
    return NextResponse.json({ error: 'Failed to fetch event items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const newItem = await Event.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating event item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
