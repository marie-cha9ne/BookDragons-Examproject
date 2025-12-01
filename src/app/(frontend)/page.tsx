import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import payloadConfig from '@/payload.config'

export default async function HomePage() {
   const payload = await getPayload({config});
   const queryResults = await payload.find({
    collection:'books',
    depth:2,
   })
  return (
    <div >
      <h1 className='title'>Book Dragons</h1>
    </div>
  )
}
