import { getPayload } from 'payload'
import config from '@/payload.config'
import './globals.css'
import payloadConfig from '@/payload.config'

export default async function HomePage() {
   const payload = await getPayload({config});
   const queryResults = await payload.find({
    collection:'books',
    depth:2,
   })
  return (
    <div >
      <h1 className='text-amber-950'>Hello world</h1>
    </div>
  )
}
