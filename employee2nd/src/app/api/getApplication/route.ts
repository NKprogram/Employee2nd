import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('employee2ndDB');
    const applications = await db.collection('Application').find({}).toArray();

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
