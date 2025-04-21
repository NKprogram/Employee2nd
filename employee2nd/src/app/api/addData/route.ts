// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '../../../../lib/mongodb';

// export async function POST(req: NextRequest) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('testdb'); // Replace with your actual database name
//     const collection = db.collection('testCollection'); // Replace with your actual collection name

//     const data = await req.json(); // Parse JSON body
//     const result = await collection.insertOne(data); // Insert the data

//     return NextResponse.json({ success: true, data: result });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
//   }
// }



/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Stub response – MongoDB skipped.',
  });
}
