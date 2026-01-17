import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import startApi from '../lib/db'; // We need to import the connection logic
import Advocacy from '../models/Advocacy';
import Event from '../models/Event';
import { en } from '../utils/translations';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // --- Advocacy ---
        console.log('Seeding Advocacy...');
        await Advocacy.deleteMany({}); // Clear existing to prevent duplicates if running multiple times
        
        const advocacyItems = en.advocacy.items.map((item) => {
             // Generate a simple slug
             const slug = item.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            return {
                title: {
                    en: item.title,
                    fa: item.title, // using English as placeholder since source is English
                },
                content: {
                    en: `Link: ${item.link}\nLabel: ${item.link_label || ''}`,
                    fa: `Link: ${item.link}\nLabel: ${item.link_label || ''}`,
                },
                slug: slug,
                publishedAt: new Date(item.date),
                // imageUrl: '', // No image in source
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        if (advocacyItems.length > 0) {
             await Advocacy.insertMany(advocacyItems);
             console.log(`Included ${advocacyItems.length} advocacy items.`);
        }


        // --- Events ---
        console.log('Seeding Events...');
        await Event.deleteMany({});

        const eventItems = en.events.items.map((item: any) => {
            return {
                title: {
                    en: item.title,
                    fa: item.title,
                },
                description: {
                    en: `${item.subtitle || ''}\n\nRecording/Link: ${item.link || ''}`,
                    fa: `${item.subtitle || ''}\n\nRecording/Link: ${item.link || ''}`,
                },
                date: new Date(item.date),
                location: 'TBD', // Source doesn't have location
                isVirtual: true, // Assuming virtual given they have youtube links
                // imageUrl: '',
                registrationLink: item.link,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

         if (eventItems.length > 0) {
             await Event.insertMany(eventItems);
             console.log(`Included ${eventItems.length} event items.`);
        }

        console.log('Database seeding completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
