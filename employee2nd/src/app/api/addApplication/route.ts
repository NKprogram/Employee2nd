import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('employee2ndDB');
    const data = await request.json();

    await db.collection('Application').insertOne(data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
