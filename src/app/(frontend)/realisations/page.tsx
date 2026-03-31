import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RealisationsClient } from '@/components/realisations/RealisationsClient'

export default async function RealisationsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
    depth: 1,
    where: {
      _status: { equals: 'published' },
    },
  })

  return <RealisationsClient projects={projects} />
}