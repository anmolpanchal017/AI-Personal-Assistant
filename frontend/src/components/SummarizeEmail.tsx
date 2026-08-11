import { useState, type FormEvent } from 'react';
import Loader from './Loader';
import styles from './SummarizeEmail.module.scss';

function SummarizeEmail() {
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

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.icon}>📧</div>
        <h2 className={styles.cardTitle}>Summarize Email</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} id="emailForm">
        <textarea
          className={styles.textarea}
          placeholder="Paste your email here…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          id="emailInput"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading}
          id="summarizeButton"
        >
          {loading ? 'Summarizing…' : 'Summarize'}
        </button>
      </form>

      {loading && <Loader text="Summarizing email…" />}

      {summary && (
        <div
          className={`${styles.response} ${isError ? styles.error : ''}`}
          id="emailSummary"
        >
          {summary}
        </div>
      )}
    </section>
  );
}

export default SummarizeEmail;
