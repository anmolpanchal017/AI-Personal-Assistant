import { useState, type FormEvent } from 'react';
import Loader from './Loader';
import styles from './AskAnything.module.scss';

function AskAnything() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer('');
    setIsError(false);

    try {
      const formData = new FormData();
      formData.append('question', question);

      const res = await fetch('/ask', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setAnswer(data.error || 'Something went wrong. Please try again.');
      } else {
        setAnswer(data.response);
      }
    } catch {
      setIsError(true);
      setAnswer('Network error: could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.icon}>💬</div>
        <h2 className={styles.cardTitle}>Ask Anything</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} id="askForm">
        <input
          type="text"
          className={styles.input}
          placeholder="What would you like to know?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          id="askInput"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading}
          id="askButton"
        >
          {loading ? 'Thinking…' : 'Ask AI'}
        </button>
      </form>

      {loading && <Loader text="Generating response…" />}

      {answer && (
        <div
          className={`${styles.response} ${isError ? styles.error : ''}`}
          id="askAnswer"
        >
          {answer}
        </div>
      )}
    </section>
  );
}

export default AskAnything;
