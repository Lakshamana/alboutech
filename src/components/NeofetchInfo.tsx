import { ASCII_FRAMES, CONFIG } from '@/constants'
import { TrueColorBar } from './TrueColorBar'

export const NeofetchInfo: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        color: CONFIG.colors.text,
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <pre
          style={{ color: CONFIG.colors.primary, margin: 0, fontSize: '0.9em' }}
        >
          {ASCII_FRAMES[0]}
        </pre>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div>
          <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
            {CONFIG.name.split(' ')[0].toLowerCase()}
          </span>
          <span style={{ color: CONFIG.colors.text }}>@</span>
          <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
            {CONFIG.hostname}
          </span>
        </div>

        <div
          style={{
            color: CONFIG.colors.text,
            margin: '4px 0',
            borderBottom: `1px solid ${CONFIG.colors.text}`,
            width: '200px',
          }}
        ></div>

        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            OS:
          </span>{' '}
          Portfolio Linux x86_64
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Host:
          </span>{' '}
          {CONFIG.name}'s Portfolio
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Kernel:
          </span>{' '}
          React-18.3.1
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Uptime:
          </span>{' '}
          Always online
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Packages:
          </span>{' '}
          {CONFIG.headline}
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Shell:
          </span>{' '}
          web-terminal 1.0
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Resolution:
          </span>{' '}
          {window.screen.width}x{window.screen.height}
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Terminal:
          </span>{' '}
          web-browser
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            CPU:
          </span>{' '}
          JavaScript Engine
        </div>
        <div>
          <span style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
            Memory:
          </span>{' '}
          {CONFIG.location} • {CONFIG.email}
        </div>

        <div style={{ margin: '12px 0 8px 0' }}>
          <TrueColorBar />
        </div>

        <div
          style={{
            marginTop: '8px',
            color: CONFIG.colors.user,
            fontSize: '0.9em',
          }}
        >
          Available commands: home, about, help, open, msgme, su
        </div>
        <div
          style={{ color: CONFIG.colors.text, opacity: 0.7, fontSize: '0.9em' }}
        >
          Type 'help' for more information. Press TAB to autocomplete commands.
        </div>
      </div>
    </div>
  )
}
