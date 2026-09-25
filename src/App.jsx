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

/* ------------------------------------------------ Today Scroll */

function TodayScroll() {
  return (
    <div className="sheet">
      <div className="zone-tint">
        <Header />
        <div className="zone-tint__content">
          <Play eyebrow="Today's Play" {...PLAY_COPY} />
          <Section label="Upcoming" action="Show 4 more">
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

      <Section label="Unfinished tours" action="Show more">
        <RowCard
          title="2BR B2 Floorplan Tour"
          meta="Confirm units shown"
          tone="tint"
          icon="info"
        />
        <RowCard
          title="Tour - Aug 13, 7:26 PM"
          meta="Finish details to upload"
          tone="tint"
          icon="info"
        />
      </Section>

      <Section label="Earlier today" action="Show less">
        <PendingCard title="Tour" meta="Pending upload..." />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
      </Section>

      <Section label="Yesterday" action="Show less">
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard
          title="Althea A - 2BR Downstairs Sept Move"
          meta={RECAP_META}
          summary={SUMMARY}
        />
        <RecapCard title="2BR B2 Floorplan Tour" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
      </Section>
    </div>
  )
}

/* ------------------------------------------------ Today Scroll — No Upcoming */

function TodayNoUpcoming() {
  return (
    <div className="sheet">
      <div className="zone-tint">
        <Header />
        <div className="zone-tint__content">
          <Play eyebrow="Next Play" {...PLAY_COPY} />
          <Section label="Upcoming">
            <EmptyRowCard title="No tours scheduled today" />
          </Section>
        </div>
      </div>

      <Section label="Yesterday" action="Show less">
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard
          title="Althea A - 2BR Downstairs Sept Move"
          meta={RECAP_META}
          summary={SUMMARY}
        />
        <RecapCard title="2BR B2 Floorplan Tour" meta={RECAP_META} summary={SUMMARY} />
        <RecapCard title="Tyler - 1BR Heights Layout" meta={RECAP_META} summary={SUMMARY} />
      </Section>
    </div>
  )
}

/* ------------------------------------------------ Today Empty */

function TodayEmpty() {
  return (
    <div className="sheet sheet--empty">
      <div className="zone-plain">
        <Header />
        <Section label="Upcoming">
          <EmptyRowCard title="No tours scheduled today" />
        </Section>
      </div>
      <div className="emptystate">
        <span className="emptystate__icon"><Icon name="buildings" color="#6e6e68" /></span>
        <div className="emptystate__text">
          <p className="emptystate__title">No tours yet</p>
          <p className="emptystate__hint">Start your next tour to see it here.</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------ shell */

const STATES = [
  { path: '/', label: 'Scheduled', Screen: TodayScroll, scrolls: true },
  { path: '/no-upcoming', label: 'No tours', Screen: TodayNoUpcoming, scrolls: true },
  { path: '/empty', label: 'New account', Screen: TodayEmpty, scrolls: false },
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
