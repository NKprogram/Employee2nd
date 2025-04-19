import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';  // Correct path to mongodb.ts

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('testdb'); // Replace with your actual database name
    const collection = db.collection('testCollection'); // Replace with your actual collection name

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
