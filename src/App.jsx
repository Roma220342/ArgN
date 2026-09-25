import { useEffect, useState } from 'react'
import {
  EmptyRowCard,
  Header,
  NextTourCard,
  PendingCard,
  Play,
  RecapCard,
  RowCard,
  Section,
  StatusBar,
  TabBar,
} from './components.jsx'
import { Icon } from './icons.jsx'

const SUMMARY =
  'Prospect toured A2 and A3 floor plans at Whitney at the Heights, drawn by the layout quality and the…'
const RECAP_META = '9:15 AM · Up to $2,300 · Move-in Sep 29'

const PLAY_COPY = {
  title: 'Find their must-have',
  instruction:
    'Ask what their next home absolutely needs to have. Use their answer to guide what you show.',
  context: 'Try this on your next tour.',
}

/* ------------------------------------------------ a day with scheduled tours */

function TodayScheduled() {
  return (
    <div className="sheet">
      <div className="zone-tint">
        <Header />
        <div className="zone-tint__content">
          <Play eyebrow="Today's Play" {...PLAY_COPY} />
          <Section label="Upcoming" action="Show more">
            <NextTourCard
              name="Maya Chen"
              when="in 20 min"
              meta="11:00 - 11:30 AM · One-bedroom · Move-in Oct 1"
              quote="“I work from home, so a quiet space matters.”"
            />
            <RowCard title="Sam Rivera" meta="3:00 - 3:30 PM · One-bedroom" />
          </Section>
        </div>
      </div>

      <Section label="Earlier today" action="Show less">
        <PendingCard title="Tour" meta="Pending upload..." />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
      </Section>
    </div>
  )
}

/* ------------------------------------------------ a day with no scheduled tours */

// One ground, no zone boundary: with no history below there is nothing for a
// second zone to separate, and a line that promises content it cannot deliver
// reads as a screen that failed to load.
function TodayNoTours() {
  return (
    <div className="sheet sheet--empty">
      <div className="zone-plain">
        <Header />
        <div className="zone-plain__content">
          <Play eyebrow="Next Play" {...PLAY_COPY} />
          <Section label="Upcoming">
            <EmptyRowCard title="No tours scheduled today" />
          </Section>
        </div>
      </div>
      <div className="emptystate">
        <span className="emptystate__icon">
          <Icon name="buildings" color="#6e6e68" />
        </span>
        <p className="emptystate__hint">Your tours appear here</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------ shell */

const STATES = [
  { path: '/', label: 'Scheduled tours', Screen: TodayScheduled, scrolls: true },
  { path: '/empty', label: 'No tours', Screen: TodayNoTours, scrolls: false },
]

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (next) => {
    window.history.pushState({}, '', next)
    setPath(next)
  }

  return [path, go]
}

export default function App() {
  const [path, go] = useRoute()
  const state = STATES.find((s) => s.path === path) ?? STATES[0]
  const { Screen, scrolls } = state

  return (
    <div className="stage">
      <nav className="switcher">
        {STATES.map((s) => (
          <button
            key={s.path}
            type="button"
            data-active={s.path === state.path}
            onClick={() => go(s.path)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="device">
        <div className={scrolls ? 'scroll' : 'scroll scroll--static scroll--nomask'}>
          <Screen />
        </div>
        {/* progressive blur: content slides under the clock and softens
            instead of hitting a hard edge or a block of colour */}
        <div className="topblur" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <StatusBar />
        <TabBar />
      </div>
    </div>
  )
}
