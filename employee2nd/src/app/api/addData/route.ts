import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';  // Correct path to mongodb.ts

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('testdb'); // Replace with your actual database name
    const collection = db.collection('testCollection'); // Replace with your actual collection name

    const data = await req.json(); // Parse JSON body
    const result = await collection.insertOne(data); // Insert the data

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
