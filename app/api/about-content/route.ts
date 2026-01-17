import { NextResponse } from 'next/server';
import connectDB from 'lib/db';
import AboutContent from 'models/AboutContent';
import { auth } from '@clerk/nextjs/server';
import { en, persian } from 'utils/translations';

const buildDefaultContent = () => {
  const enBullets = [
    en.about.mission_statement.bullet1,
    en.about.mission_statement.bullet2,
    en.about.mission_statement.bullet3,
    en.about.mission_statement.bullet4,
    en.about.mission_statement.bullet5,
    en.about.mission_statement.bullet6,
    en.about.mission_statement.bullet7,
  ].filter(Boolean);

  const faBullets = [
    persian.about.mission_statement.bullet1,
    persian.about.mission_statement.bullet2,
    persian.about.mission_statement.bullet3,
    persian.about.mission_statement.bullet4,
    persian.about.mission_statement.bullet5,
    persian.about.mission_statement.bullet6,
    persian.about.mission_statement.bullet7,
  ].filter(Boolean);

  const max = Math.max(enBullets.length, faBullets.length);
  const bullets = Array.from({ length: max }).map((_, index) => ({
    en: enBullets[index] || '',
    fa: faBullets[index] || '',
  }));

  return {
    title: { en: en.about.title, fa: persian.about.title },
    p1: { en: en.about.p1, fa: persian.about.p1 },
    p2: { en: en.about.p2, fa: persian.about.p2 },
    mission: {
      title: { en: en.about.mission_statement.title, fa: persian.about.mission_statement.title },
      p1: { en: en.about.mission_statement.p1, fa: persian.about.mission_statement.p1 },
      p2: { en: en.about.mission_statement.p2, fa: persian.about.mission_statement.p2 },
      bullets,
    },
    vision: {
      title: { en: en.about.vision_statement.title, fa: persian.about.vision_statement.title },
      p1: { en: en.about.vision_statement.p1, fa: persian.about.vision_statement.p1 },
    },
  };
};

export async function GET() {
  try {
    await connectDB();
    let item = await AboutContent.findOne({}).sort({ createdAt: -1 });

    if (!item) {
      const payload = buildDefaultContent();
      item = await AboutContent.create(payload);
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const existing = await AboutContent.findOne({}).sort({ createdAt: -1 });
    if (existing) {
      const updated = await AboutContent.findByIdAndUpdate(existing._id, body, {
        new: true,
        runValidators: true,
      });
      return NextResponse.json(updated);
    }

    const created = await AboutContent.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
}
