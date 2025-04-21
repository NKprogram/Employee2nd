// import { NextResponse } from 'next/server';
// import clientPromise from '../../../../lib/mongodb';

// export async function POST(request: Request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('employee2ndDB');
//     const data = await request.json();

//     await db.collection('Application').insertOne(data);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 500 });
//   }
// }


/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'

export async function POST(_req: Request) {
  return NextResponse.json({ message: "Stubbed out for now" })
}


