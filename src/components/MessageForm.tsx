import React, { useCallback, useEffect, useState } from 'react'
import { Loader2, Send } from 'lucide-react'

import { CONFIG } from '@/constants'
import type { MessageStatus } from '@/model/message-status'

interface MessageFormProps {
  onExit: () => void
  onSendMessage: (status: MessageStatus) => void
}

export const MessageForm: React.FC<MessageFormProps> = ({
  onExit,
  onSendMessage,
}) => {
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const subjectRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback((): void => {
    // Sanitize inputs (basic XSS prevention)
    const cleanSubject = subject.replace(/[<>]/g, '').trim()
    const cleanMessage = message.replace(/[<>]/g, '').trim()

    if (!cleanSubject || !cleanMessage) {
      onSendMessage({
        type: 'error',
        msg: 'Subject and message are required!',
      })
      return
    }

    setLoading(true)

    // Simulate email sending
    // In production, integrate with EmailJS, Formspree, or your backend API
    setTimeout(() => {
      setLoading(false)
      setSubject('')
      setMessage('')
      onSendMessage({ type: 'success', msg: 'Message sent successfully!' })
    }, 1500)
  }, [message, subject, onSendMessage])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && e.ctrlKey) {
        handleSubmit()
      }

      if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
        e.preventDefault()
        onExit()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [onExit, handleSubmit])

  useEffect(() => {
    subjectRef.current?.focus()
    console.log('focused')
  }, [subjectRef])

  return (
    <div
      style={{
        fontFamily: 'monospace',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: CONFIG.colors.background,
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '16px', width: '100vh', margin: 'auto' }}>
        <div
          style={{
            color: CONFIG.colors.primary,
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          SEND MESSAGE
        </div>

        <div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: CONFIG.colors.user, marginBottom: '4px' }}>
              Subject:
            </div>
            <input
              type="text"
              value={subject}
              ref={subjectRef}
              onChange={e => setSubject(e.target.value)}
              tabIndex={0}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: CONFIG.colors.selection,
                border: `1px solid ${CONFIG.colors.primary}`,
                color: CONFIG.colors.text,
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="Enter subject..."
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: CONFIG.colors.user, marginBottom: '4px' }}>
              Message:
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={8}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: CONFIG.colors.selection,
                border: `1px solid ${CONFIG.colors.primary}`,
                color: CONFIG.colors.text,
                fontFamily: 'monospace',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
              placeholder="Enter your message... (plain text only)"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: CONFIG.colors.primary,
              color: CONFIG.colors.background,
              border: 'none',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <Loader2
                size={16}
                style={{ animation: 'spin 1s linear infinite' }}
              />
            ) : (
              <Send size={16} />
            )}
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          <div style={{ marginTop: '8px', fontSize: '0.85em', opacity: 0.7 }}>
            Tip: Press Ctrl+Enter to send
          </div>
        </div>
      </div>
    </div>
  )
}
