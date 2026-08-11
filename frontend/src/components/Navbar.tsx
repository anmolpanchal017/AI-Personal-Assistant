import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
  const location = useLocation();

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>AI Assistant</span>
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            id="nav-chat"
          >
            Chat
          </Link>
          <Link
            to="/summarize"
            className={`${styles.navLink} ${location.pathname === '/summarize' ? styles.active : ''}`}
            id="nav-summarize"
          >
            Summarize
          </Link>
        </div>

        <button className={styles.userAvatar} aria-label="User Profile" title="User Profile">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
