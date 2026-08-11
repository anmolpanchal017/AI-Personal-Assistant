import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>
        <span className={styles.dot} />
        AI Powered
      </div>
      <h1 className={styles.title}>AI Personal Assistant</h1>
      <p className={styles.subtitle}>
        Ask anything or summarize emails instantly — powered by advanced AI
      </p>
    </header>
  );
}

export default Header;
