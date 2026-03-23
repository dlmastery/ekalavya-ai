import { ResponsiveLayout } from '@/components/ekalavya/responsive-layout'
import { GreetingBanner } from './_components/greeting-banner'
import { ContinueCard } from './_components/continue-card'
import { QuickActions } from './_components/quick-actions'
import { ProgressRings } from './_components/progress-rings'
import { TopicGrid } from './_components/topic-grid'

export default function HomePage() {
  return (
    <ResponsiveLayout>
      <div className="flex flex-col gap-5 px-4 py-6">
        <GreetingBanner />
        <ContinueCard />
        <QuickActions />
        <section aria-label="Your progress">
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">
            Your Progress
          </h2>
          <ProgressRings />
        </section>
        <section aria-label="Your topics">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Topics
          </h2>
          <TopicGrid />
        </section>
      </div>
    </ResponsiveLayout>
  )
}
