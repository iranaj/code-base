import { NextResponse } from 'next/server';
import connectDB from 'lib/db';
import HeroSlide from 'models/HeroSlide';
import { auth } from '@clerk/nextjs/server';
import { en, persian } from 'utils/translations';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const existingCount = await HeroSlide.countDocuments({});
    if (existingCount > 0) {
      return NextResponse.json({ error: 'Hero slides already exist' }, { status: 409 });
    }

    const enSlides = en?.home?.soundbites || [];
    const faSlides = persian?.home?.soundbites || [];
    const max = Math.max(enSlides.length, faSlides.length);

    const payload = Array.from({ length: max }).map((_, index) => {
      const enText = enSlides[index] || '';
      const faText = faSlides[index] || enText;
      return {
        text: { en: enText, fa: faText },
        order: index,
        isActive: true,
      };
    }).filter((item) => item.text.en.trim().length > 0 || item.text.fa.trim().length > 0);

    if (payload.length === 0) {
      return NextResponse.json({ error: 'No default slides found to import' }, { status: 400 });
    }

    const created = await HeroSlide.insertMany(payload);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error seeding hero slides:', error);
    return NextResponse.json({ error: 'Failed to seed hero slides' }, { status: 500 });
  }
}
