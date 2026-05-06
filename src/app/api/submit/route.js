import { NextResponse } from 'next/server';

import addtodb from '@/addtodb';

export async function POST(request) {
  const body = await request.json();

  if (body.pgn) {
    
  return NextResponse.json(await addtodb(body.pgn), { status: 201 })
  } else {
    return NextResponse.json({
      message: "no."
    }, { status: 400 })
  }
  
}