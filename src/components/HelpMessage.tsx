import { CONFIG } from '@/constants';

export const HelpMessage: React.FC = () => (
  <div style={{ fontFamily: 'monospace', color: CONFIG.colors.text }}>
    <div
      style={{
        color: CONFIG.colors.primary,
        fontWeight: 'bold',
        marginBottom: '12px',
      }}
    >
      AVAILABLE COMMANDS
    </div>
    <div style={{ marginLeft: '16px' }}>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          home
        </span>{' '}
        - Clear screen and show summary
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          about
        </span>{' '}
        - Detailed information about me
        <div style={{ marginLeft: '16px', fontSize: '0.9em', opacity: 0.8 }}>
          Options: -o, --output (download resume PDF)
        </div>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          help
        </span>{' '}
        - Show this help message
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          open
        </span>{' '}
        - Open social pages
        <div style={{ marginLeft: '16px', fontSize: '0.9em', opacity: 0.8 }}>
          --linkedin, -l Go to LinkedIn
          <br />
          --github, -g Go to GitHub
        </div>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          msgme
        </span>{' '}
        - Send me a message
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          su
        </span>{' '}
        &lt;user&gt; - Switch user
      </div>
    </div>
    <div
      style={{
        marginTop: '16px',
        color: CONFIG.colors.text,
        opacity: 0.7,
        fontSize: '0.9em',
      }}
    >
      TIP: Use TAB to autocomplete commands
    </div>
  </div>
);
