import styles from './Loader.module.scss';

interface LoaderProps {
  /** "overlay" renders a full-screen centered spinner; "inline" is smaller & sits in-flow */
  variant?: 'overlay' | 'inline';
  text?: string;
}

function Loader({ variant = 'inline', text = 'Processing…' }: LoaderProps) {
  if (variant === 'overlay') {
    return (
      <div className={styles.overlay}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.inline}>
      <div className={styles.spinnerSmall} />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
