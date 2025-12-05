import config from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

export async function POST(req: Request){
  const payload = await getPayload({ config });
  const data = await req.json();

  if(!data.customerName){
    return NextResponse.json({error: 'Missing customer name'}, {status: 400})
  };
  if(!data.customerInfo){
    return NextResponse.json({error:'Missing customer info mail/phone'}, {status: 400})
  };
  if(!Array.isArray(data.reserveBook) || data.reserveBook.length === 0){
    return NextResponse.json({error: 'No books selected'}, {status: 400})
  };

  const order = await payload.create({
    collection: 'orders',
    data
  })

  return NextResponse.json(order);
}