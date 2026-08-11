import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
  const location = useLocation();
  const isChat = location.pathname === '/';

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className={styles.logoText}>AI Assistant</span>
      </Link>

      <div className={styles.navActions}>
        {isChat ? (
          <Link to="/summarize" className={styles.navButton} id="nav-summarize">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Summarize Email</span>
          </Link>
        ) : (
          <Link to="/" className={styles.navButton} id="nav-chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Ask Anything</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
