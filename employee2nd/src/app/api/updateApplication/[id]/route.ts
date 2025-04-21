import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('employee2ndDB');
    const { id } = params;
    const data = await request.json(); // Get the updated data

    const result = await db.collection('Application').updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json({ success: true, message: 'Application updated successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
