import { getPayload } from 'payload'
import configPromise from '@payload-config'
import dynamic from 'next/dynamic'

// Dynamic import pour réduire le bundle initial
const RealisationsClient = dynamic(
  () => import('@/components/realisations/RealisationsClient').then((mod) => mod.RealisationsClient),
  { ssr: true }
)

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

  return (
    <div className="realisations-page relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-20 lg:pb-40 lg:pt-20">
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 z-0 h-[min(720px,85vh)] w-full max-w-[1600px] -translate-x-1/2"
        aria-hidden
      />
      <RealisationsClient projects={projects} />
    </div>
  )
}