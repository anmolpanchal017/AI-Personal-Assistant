import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import styles from './ChatPage.module.scss';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('question', question);

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${apiBase}/ask`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: res.ok
          ? data.response
          : `Error: ${data.error || 'Something went wrong.'}`,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Network error: could not reach the server. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
      // Re-focus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className={styles.page}>
      {/* Chat area */}
      <div className={styles.chatArea}>
        {isEmpty ? (
          <div className={styles.welcome}>
            <div className={styles.welcomeGlow} />
            <h1 className={styles.welcomeTitle}>How can I help you today?</h1>
            <p className={styles.welcomeSubtitle}>
              Ask me anything — I'm your AI personal assistant
            </p>
            <div className={styles.suggestions}>
              {[
                'Explain quantum computing simply',
                'Write a professional email',
                'Help me debug my code',
                'Plan a weekend trip',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className={styles.suggestionChip}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageBubble} ${
                  msg.role === 'user' ? styles.userMessage : styles.aiMessage
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.aiAvatar}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                )}
                <div className={styles.messageContent}>
                  <span className={styles.messageText}>{msg.content}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.messageBubble} ${styles.aiMessage}`}>
                <div className={styles.aiAvatar}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className={styles.inputArea}>
        <form className={styles.inputForm} onSubmit={handleSubmit} id="chatForm">
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              className={styles.textInput}
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
              id="chatInput"
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!input.trim() || loading}
              id="chatSend"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
          <p className={styles.disclaimer}>
            AI can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
