import { Icon, IconChevronRight, StatusBarArt } from './icons.jsx'

export function StatusBar() {
  return (
    <div className="statusbar">
      <StatusBarArt />
    </div>
  )
}

export function Header() {
  return (
    <div className="header">
      <p className="header__title">Today</p>
    </div>
  )
}

export function TextButton({ children, chevron = false }) {
  return (
    <button className="textbtn" type="button" tabIndex={-1}>
      {children}
      {chevron && <IconChevronRight size={17} color="#6e6e68" />}
    </button>
  )
}

export function Play({ eyebrow, title, instruction, context }) {
  return (
    <div className="play">
      <div className="play__rule" />
      <div className="play__body">
        <div className="play__head">
          <div className="play__titles">
            <p className="play__eyebrow">{eyebrow}</p>
            <p className="play__title">{title}</p>
          </div>
          <TextButton chevron>View Play</TextButton>
        </div>
        <p className="play__instruction">{instruction}</p>
        <p className="play__context">{context}</p>
      </div>
    </div>
  )
}

export function Section({ label, children, action }) {
  return (
    <div className="section">
      <div className="section__label">
        <span>{label}</span>
      </div>
      <div className="section__list">{children}</div>
      {action && (
        <div className="section__action">
          <TextButton>{action}</TextButton>
        </div>
      )}
    </div>
  )
}

export function NextTourCard({ name, when, meta, quote }) {
  return (
    <div className="nextcard">
      <div className="nextcard__head">
        <div className="nextcard__names">
          <div className="nextcard__nameline">
            <p className="nextcard__name">{name}</p>
            <p className="nextcard__when">{when}</p>
          </div>
          <p className="card__meta">{meta}</p>
        </div>
        <p className="nextcard__quote">{quote}</p>
      </div>
      <div className="nextcard__actions">
        <div className="btn btn--secondary">Prepare</div>
        <div className="btn btn--primary">Start tour</div>
      </div>
    </div>
  )
}

export function RowCard({ title, meta, tone = 'surface', icon = null }) {
  return (
    <div className={`card card--row card--${tone}`}>
      <div className="card__text">
        <p className="card__title">{title}</p>
        <p className="card__meta">{meta}</p>
      </div>
      {icon === 'info' && (
        <span className="card__icon">
          <Icon name="info" color="#bc5d48" />
        </span>
      )}
      {icon === 'spinner' && <Spinner />}
    </div>
  )
}

export function PendingCard({ title, meta }) {
  return (
    <div className="card card--row card--tint card--muted">
      <div className="card__text">
        <p className="card__title">{title}</p>
        <p className="card__meta">{meta}</p>
      </div>
      <Spinner />
    </div>
  )
}

export function RecapCard({ title, meta, summary }) {
  return (
    <div className="card card--stack card--tint">
      <div className="card__text">
        <p className="card__title">{title}</p>
        <p className="card__meta">{meta}</p>
      </div>
      <p className="card__summary">{summary}</p>
    </div>
  )
}

export function EmptyRowCard({ title }) {
  return (
    <div className="card card--row card--surface">
      <div className="card__text">
        <p className="card__title">{title}</p>
      </div>
    </div>
  )
}

function Spinner() {
  const spokes = Array.from({ length: 8 }, (_, i) => i)
  return (
    <svg className="spinner" viewBox="0 0 28 28" aria-hidden>
      {spokes.map((i) => (
        <rect
          key={i}
          x="12.95"
          y="2.2"
          width="2.1"
          height="7"
          rx="1.05"
          fill="rgba(60,60,67,0.6)"
          opacity={1 - i * 0.12}
          transform={`rotate(${i * 45} 14 14)`}
        />
      ))}
    </svg>
  )
}

const TABS = [
  { id: 'today', label: 'Today', icon: 'house' },
  { id: 'tours', label: 'Tours', icon: 'clipboard' },
  { id: 'play', label: 'Play', icon: 'lightbulb' },
  { id: 'settings', label: 'Settings', icon: 'gear' },
]

export function TabBar() {
  return (
    <div className="tabbar">
      <div className="tabbar__pill">
        <span className="glass" />
        {TABS.map(({ id, label, icon }) => {
          const active = id === 'today'
          return (
            <button className="tab" data-active={active} key={id} type="button" tabIndex={-1}>
              {active && <span className="tab__selection" />}
              <span className="tab__icon">
                <Icon name={icon} color={active ? '#1a1e18' : '#6e6e68'} />
              </span>
              <span className="tab__label">{label}</span>
            </button>
          )
        })}
      </div>
      <button className="record" type="button" tabIndex={-1} aria-label="Start tour">
        <span className="record__bg" />
        <span className="record__glass" />
        <span className="record__icon">
          <Icon name="microphone" color="#1a1e18" size={26} />
        </span>
      </button>
    </div>
  )
}
