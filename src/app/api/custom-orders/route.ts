import config from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

export async function POST(req: Request){
  const payload = await getPayload({ config });
  const data = await req.json();

  // -- Sanity checks --
  // sjekk 1: navn:
  if(!data.customerName){
    return NextResponse.json({error: 'Missing customer name'}, {status: 400})
  };

  // sjekk 2: kontaktinfo
  if(!data.customerInfo){
    return NextResponse.json({error:'Missing customer info mail/phone'}, {status: 400})
  };

  // sjekk 3: minst 1 vare i items[]
  if(!Array.isArray(data.items) || data.items.length === 0){
    return NextResponse.json({error: 'No books selected'}, {status: 400})
  };

  // sjekk 4: alle items er i riktig format
  for(const item of data.items){
    if(!item.book || !item.bookQuantity){
      return NextResponse.json({error:'invalid format'}, {status:400})
    }
  }

  const order = await payload.create({
    collection: 'orders',
    data
  })

  return NextResponse.json(order);
}