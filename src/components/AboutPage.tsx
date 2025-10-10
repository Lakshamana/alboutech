import { CONFIG } from '@/constants';
import { useState, useRef, useEffect } from 'react';

interface AboutPageProps {
  downloadPdf?: boolean;
  onExit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  downloadPdf = false,
  onExit,
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const lineHeight = 24; // approximate line height
      const pageHeight = container.clientHeight;

      switch (e.key) {
        case 'q':
        case 'Escape':
          onExit();
          break;
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          setScrollPosition(prev =>
            Math.min(prev + lineHeight, container.scrollHeight - pageHeight)
          );
          break;
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          setScrollPosition(prev => Math.max(prev - lineHeight, 0));
          break;
        case 'd':
          if (e.ctrlKey) {
            e.preventDefault();
            setScrollPosition(prev =>
              Math.min(
                prev + pageHeight / 2,
                container.scrollHeight - pageHeight
              )
            );
          }
          break;
        case 'u':
          if (e.ctrlKey) {
            e.preventDefault();
            setScrollPosition(prev => Math.max(prev - pageHeight / 2, 0));
          }
          break;
        case 'f':
        case ' ':
          if (!e.ctrlKey) {
            e.preventDefault();
            setScrollPosition(prev =>
              Math.min(prev + pageHeight, container.scrollHeight - pageHeight)
            );
          }
          break;
        case 'b':
          if (!e.ctrlKey) {
            e.preventDefault();
            setScrollPosition(prev => Math.max(prev - pageHeight, 0));
          }
          break;
        case 'g':
          e.preventDefault();
          setScrollPosition(0);
          break;
        case 'G':
          e.preventDefault();
          if (container) {
            setScrollPosition(container.scrollHeight - pageHeight);
          }
          break;
        case 'c':
          if (e.ctrlKey) {
            e.preventDefault();
            onExit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const maxScroll = containerRef.current
    ? containerRef.current.scrollHeight - containerRef.current.clientHeight
    : 0;
  const percentage =
    maxScroll > 0 ? Math.round((scrollPosition / maxScroll) * 100) : 100;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: CONFIG.colors.background,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        ref={containerRef}
        style={{
          fontFamily: 'monospace',
          color: CONFIG.colors.text,
          overflow: 'hidden',
          flex: 1,
          padding: '20px',
          paddingBottom: '60px',
        }}
      >
        <div ref={contentRef} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '1.2em',
              marginBottom: '16px',
            }}
          >
            GUILHERME ALBUQUERQUE(1) - Backend Developer Manual
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              NAME
            </div>
            <div style={{ marginLeft: '16px' }}>
              Guilherme Albuquerque - Senior Backend Developer
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              SYNOPSIS
            </div>
            <div style={{ marginLeft: '16px' }}>
              guilherme [--backend] [--cloud] [--optimization] [--low-level]
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              DESCRIPTION
            </div>
            <div style={{ marginLeft: '16px' }}>
              Senior backend developer with 8+ years of experience specializing
              in Node.js, Golang, Rust, and Elixir. Passionate about low-level
              concepts, performance optimization, and building scalable cloud
              architectures. Self-taught practitioner who believes in learning
              by doing. Vim lifestyle enthusiast.
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              TECH STACK
            </div>
            <div style={{ marginLeft: '16px' }}>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Languages:</span>{' '}
                Go, Rust, Node.js, Elixir, TypeScript, Java
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Backend:</span> REST
                APIs, GraphQL, Microservices, SSE, Kafka
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Frameworks:</span>{' '}
                Express, Nest.js, Phoenix, Spring Boot, Adonis.js
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Databases:</span>{' '}
                PostgreSQL, MySQL, MongoDB, Redis, DynamoDB
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Cloud:</span> AWS
                (Lambda, SQS, EKS, RDS), GCP, Azure
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>DevOps:</span>{' '}
                Docker, Kubernetes, CI/CD (Jenkins, GitLab)
              </div>
              <div>
                <span style={{ color: CONFIG.colors.user }}>Testing:</span>{' '}
                Jest, TDD, Supertest, ExUnit
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              ACHIEVEMENTS
            </div>
            <div style={{ marginLeft: '16px' }}>
              • Built PwC corporate Balanced Scorecard eliminating spreadsheets
              for LATAM team
              <br />
              • Re-engineered accessible catalog system, +35% impact on PwD
              community
              <br />
              • Created campaign recommendation system, +40% participation rates
              <br />
              • Developed notification system with 1000% increased delivery
              capacity
              <br />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              EXPERIENCE
            </div>
            <div style={{ marginLeft: '16px', fontSize: '0.95em' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: CONFIG.colors.user }}>
                  GFT Technologies
                </span>{' '}
                - Backend Developer (Nov 2024 - Present)
                <br />
                Node.js, TypeScript, Elixir, MongoDB, Nest.js
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: CONFIG.colors.user }}>BrandLovrs</span> -
                Backend Developer (Feb 2023 - Nov 2024)
                <br />
                Microservices, AWS Lambda, Vector DB (Pinecone), Golang
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: CONFIG.colors.user }}>FanHero</span> -
                Backend Developer (Dec 2021 - Jan 2023)
                <br />
                Nest.js, Elixir/Phoenix migration, GraphQL Federation
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: CONFIG.colors.user }}>Compass UOL</span> -
                Backend Developer (Jul 2021 - Dec 2021)
                <br />
                Hexagonal Architecture, Apache Kafka, Express.js, MongoDB
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              PHILOSOPHY
            </div>
            <div style={{ marginLeft: '16px' }}>
              "Fear not hardship!" - Embraces challenges and complexity. Vim
              lifestyle enthusiast. Believes in understanding fundamentals and
              building from first principles.
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              PROJECTS
            </div>
            <div style={{ marginLeft: '16px' }}>
              • torrentstream - BitTorrent client in Rust
              <br />
              • discuss - Phoenix/LiveView forum application
              <br />
              • wallydator - Pipeline-based validator in TypeScript
              <br />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: CONFIG.colors.primary, fontWeight: 'bold' }}>
              EDUCATION
            </div>
            <div style={{ marginLeft: '16px' }}>
              Bachelor of Computer Science - Universidade Federal do Pará
              (2016-2020)
            </div>
          </div>

          {downloadPdf && (
            <div
              style={{
                marginTop: '24px',
                padding: '12px',
                backgroundColor: CONFIG.colors.selection,
                borderRadius: '4px',
              }}
            >
              <span style={{ color: CONFIG.colors.user }}>✓</span> Resume PDF
              download initiated
            </div>
          )}
        </div>
      </div>

      {/* Status bar like less */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: CONFIG.colors.selection,
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `2px solid ${CONFIG.colors.primary}`,
          fontSize: '0.9em',
          zIndex: 1001,
        }}
      >
        <div>
          <span style={{ color: CONFIG.colors.caret, fontWeight: 'bold' }}>
            GUILHERME ALBUQUERQUE(1)
          </span>{' '}
          <span style={{ opacity: 0.7 }}>
            [q/ESC/^C: exit | j/k/↓/↑: scroll | f/b: page | g/G: top/bottom]
          </span>
        </div>
        <div style={{ color: CONFIG.colors.user, fontWeight: 'bold' }}>
          {percentage}%
        </div>
      </div>
    </div>
  );
};
