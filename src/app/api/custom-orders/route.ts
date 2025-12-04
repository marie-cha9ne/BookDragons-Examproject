import config from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

export async function POST(req: Request){
  const payload = await getPayload({ config });
  const data = await req.json();

  const order = await payload.create({
    collection: 'orders',
    data
  })

  return NextResponse.json(order);
}