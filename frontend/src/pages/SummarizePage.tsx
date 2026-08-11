import { useState, type FormEvent } from 'react';
import styles from './SummarizePage.module.scss';

function SummarizePage() {
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setSummary('');
    setIsError(false);

    try {
      const formData = new FormData();
      formData.append('email', email);

      const res = await fetch('/summarize', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setSummary(data.error || 'Something went wrong. Please try again.');
      } else {
        setSummary(data.response);
      }
    } catch {
      setIsError(true);
      setSummary('Network error: could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmail('');
    setSummary('');
    setIsError(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {/* <div className={styles.iconBadge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div> */}
          <h1 className={styles.title}>Summarize Email</h1>
          <p className={styles.subtitle}>
            Paste your email below and get a concise AI-generated summary in seconds
          </p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} id="emailForm">
          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.textarea}
              placeholder="Paste your email content here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              id="emailInput"
            />
            {email && !loading && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Clear"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!email.trim() || loading}
            id="summarizeButton"
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                Summarizing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
                Summarize
              </>
            )}
          </button>
        </form>

        {/* Result */}
        {summary && (
          <div className={`${styles.result} ${isError ? styles.error : ''}`} id="emailSummary">
            <div className={styles.resultHeader}>
              <span className={styles.resultLabel}>
                {isError ? '⚠ Error' : '✨ Summary'}
              </span>
            </div>
            <p className={styles.resultText}>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummarizePage;
