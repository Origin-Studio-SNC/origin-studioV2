import { Reveal } from '@/components/motion/Reveal'

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  await props.params
  return (
    <div className="mx-auto min-w-0 max-w-2xl px-5 py-16 sm:py-24">
      <Reveal>
        <p className="text-foreground/60">
          Page article en cours de mise en place.
        </p>
      </Reveal>
    </div>
  )
}
  