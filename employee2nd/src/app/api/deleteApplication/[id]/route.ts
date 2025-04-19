import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Ensure ObjectId is imported from 'mongodb'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('employee2ndDB');
    const { id } = params;

    // Ensure id is correctly formatted as ObjectId
    const result = await db.collection('Application').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: 'Application deleted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
