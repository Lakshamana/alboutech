import { ALL_COMMAND_STRINGS, CONFIG } from '@/constants'
import type { HistoryEntry } from '@/model/history-entry'
import React, { useState, useRef, useEffect } from 'react'
import { AboutPage } from './AboutPage'
import { HelpMessage } from './HelpMessage'
import { MessageForm } from './MessageForm'
import { NeofetchInfo } from './NeofetchInfo'
import { Prompt } from './Prompt'
import type { MessageStatus } from '@/model/message-status'

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: <NeofetchInfo /> },
  ])
  const [messageHistory, setMessageHistory] = useState<MessageStatus[]>([])
  const [input, setInput] = useState<string>('')
  const [user, setUser] = useState<string>('anon')
  const [suggestion, setSuggestion] = useState<string>('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    let timeoutId = null
    if (messageHistory.length) {
      timeoutId = setTimeout(() => {
        setMessageHistory(prev => prev.slice(1))
      }, 1000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [messageHistory])

  useEffect(() => {
    // Find command suggestions
    if (input) {
      const match = ALL_COMMAND_STRINGS.find(
        cmd => cmd.startsWith(input) && cmd !== input
      )
      setSuggestion(match || '')
    } else {
      setSuggestion('')
    }
  }, [input])

  const executeCommand = (cmd: string): void => {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Add to command history
    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd.trim()])
      setHistoryIndex(-1)
    }

    let output: React.ReactNode

    switch (command) {
      case 'home':
      case 'clear':
        setHistory([{ type: 'output', content: <NeofetchInfo /> }])
        return

      case 'about': {
        const shouldDownload = args.includes('-o') || args.includes('--output')
        output = (
          <AboutPage
            downloadPdf={shouldDownload}
            onExit={() => {
              setHistory([{ type: 'output', content: <NeofetchInfo /> }])
              setTimeout(() => {
                setInput('')
                setSuggestion('')
              }, 0)
              inputRef.current?.focus()
            }}
          />
        )
        break
      }

      case 'help':
      case '?':
        output = <HelpMessage />
        break

      case 'open':
        if (args.includes('-l') || args.includes('--linkedin')) {
          window.open(CONFIG.linkedin, '_blank')
          output = (
            <div style={{ color: CONFIG.colors.user }}>
              ✓ Opening LinkedIn...
            </div>
          )
        } else if (args.includes('-g') || args.includes('--github')) {
          window.open(CONFIG.github, '_blank')
          output = (
            <div style={{ color: CONFIG.colors.user }}>✓ Opening GitHub...</div>
          )
        } else {
          output = (
            <div style={{ color: CONFIG.colors.root }}>
              Error: Specify --linkedin/-l or --github/-g
            </div>
          )
        }
        break

      case 'msgme':
      case 'contact':
        output = (
          <MessageForm
            onExit={() => {
              setHistory([{ type: 'output', content: <NeofetchInfo /> }])
              setInput('')
              setSuggestion('')
              inputRef.current?.focus()
            }}
            onSendMessage={status => {
              setMessageHistory(prev => prev.concat(status))
            }}
          />
        )
        break

      case 'su':
        if (args[0] === 'root') {
          output = (
            <div style={{ color: CONFIG.colors.root, fontWeight: 'bold' }}>
              su: {user} is not in the sudoers file. This incident will be
              reported.
            </div>
          )
        } else if (args[0]) {
          const newUser = args[0]
          setUser(newUser)
          output = (
            <div style={{ color: CONFIG.colors.user }}>
              ✓ Switched to user: {newUser}
            </div>
          )
        } else {
          output = (
            <div style={{ color: CONFIG.colors.root }}>
              Usage: su &lt;user&gt;
            </div>
          )
        }
        break

      default:
        if (command) {
          output = (
            <div style={{ color: CONFIG.colors.root }}>
              bash: {command}: command not found
              <br />
              <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
                Type 'help' for available commands
              </span>
            </div>
          )
        }
    }

    if (output) {
      setHistory(prev => [
        ...prev,
        { type: 'command', content: cmd, user },
        { type: 'output', content: output },
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) {
        executeCommand(input)
        setInput('')
        setSuggestion('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) {
        setInput(suggestion)
        setSuggestion('')
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
        if (
          newIndex === commandHistory.length - 1 &&
          historyIndex === commandHistory.length - 1
        ) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([{ type: 'output', content: <NeofetchInfo /> }])
      setInput('')
    }
  }

  return (
    <div
      style={{
        backgroundColor: CONFIG.colors.background,
        color: CONFIG.colors.text,
        width: '100vw',
        height: '100vh',
        padding: '0',
        margin: '0',
        boxSizing: 'border-box',
        fontFamily: 'monospace',
        cursor: 'text',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        ref={terminalRef}
        style={{
          overflowY: 'auto',
          padding: '20px',
          paddingBottom: '0',
        }}
      >
        {history.map((entry, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            {entry.type === 'command' ? (
              <div>
                <Prompt user={entry.user || 'anon'} />
                <span>{entry.content}</span>
              </div>
            ) : (
              <div style={{ marginLeft: '0px', marginBottom: '12px' }}>
                {entry.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px 20px 20px',
          flexShrink: 0,
        }}
      >
        <Prompt user={user} />
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: CONFIG.colors.text,
              fontFamily: 'monospace',
              fontSize: '1em',
              outline: 'none',
              width: '100%',
              position: 'relative',
              zIndex: 2,
            }}
          />
          {suggestion && input && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: CONFIG.colors.text,
                opacity: 0.3,
                fontFamily: 'monospace',
                fontSize: '1em',
                pointerEvents: 'none',
                zIndex: 1,
                whiteSpace: 'pre',
              }}
            >
              {suggestion}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '',
          zIndex: 9999,
          fontSize: '0.75em',
        }}
      >
        {messageHistory.map((status, idx) => (
          <div key={idx} style={{ marginBottom: '2px' }}>
            <div
              style={{
                bottom: '2px',
                padding: '8px',
                color:
                  status.type === 'success'
                    ? CONFIG.colors.user
                    : CONFIG.colors.root,
                borderLeft: `3px solid ${status.type === 'success' ? CONFIG.colors.user : CONFIG.colors.root}`,
              }}
            >
              {status.type === 'success' ? '✓' : '✗'} {status.msg}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Terminal
