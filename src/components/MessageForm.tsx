import React, { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import { CONFIG } from '@/constants';
import type { MessageStatus } from '@/model/message-status';

export const MessageForm: React.FC = () => {
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<MessageStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (): void => {
    // Sanitize inputs (basic XSS prevention)
    const cleanSubject = subject.replace(/[<>]/g, '').trim();
    const cleanMessage = message.replace(/[<>]/g, '').trim();

    if (!cleanSubject || !cleanMessage) {
      setStatus({ type: 'error', msg: 'Subject and message are required' });
      return;
    }

    setLoading(true);

    // Simulate email sending
    // In production, integrate with EmailJS, Formspree, or your backend API
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: 'success', msg: 'Message sent successfully!' });
      setSubject('');
      setMessage('');

      // Clear status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', maxWidth: '600px' }}>
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
            onChange={e => setSubject(e.target.value)}
            onKeyPress={handleKeyPress}
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
            onKeyPress={handleKeyPress}
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

      {status && (
        <div
          style={{
            marginTop: '16px',
            padding: '8px',
            backgroundColor: CONFIG.colors.selection,
            color:
              status.type === 'success'
                ? CONFIG.colors.user
                : CONFIG.colors.root,
            borderLeft: `3px solid ${status.type === 'success' ? CONFIG.colors.user : CONFIG.colors.root}`,
          }}
        >
          {status.type === 'success' ? '✓' : '✗'} {status.msg}
        </div>
      )}
    </div>
  );
};
