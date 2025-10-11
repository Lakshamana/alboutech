import { CONFIG } from '@/constants'

interface PromptProps {
  user: string
}

export const Prompt: React.FC<PromptProps> = ({ user }) => {
  const isRoot = user === 'root'
  const symbol = isRoot ? '#' : '$'
  const path = isRoot ? '/' : '~'

  return (
    <span style={{ fontFamily: 'monospace' }}>
      <span
        style={{
          color: isRoot ? CONFIG.colors.root : CONFIG.colors.user,
          fontWeight: 'bold',
        }}
      >
        {user}
      </span>
      <span style={{ color: CONFIG.colors.text }}>@</span>
      <span style={{ color: CONFIG.colors.host, fontWeight: 'bold' }}>
        {CONFIG.hostname}
      </span>
      <span style={{ color: CONFIG.colors.text }}>: {path}</span>
      <span style={{ color: CONFIG.colors.caret, fontWeight: 'bold' }}>
        {symbol}&nbsp;
      </span>
    </span>
  )
}
