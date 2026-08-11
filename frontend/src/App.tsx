import Header from './components/Header';
import AskAnything from './components/AskAnything';
import SummarizeEmail from './components/SummarizeEmail';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <main className={styles.container}>
        <Header />
        <AskAnything />
        <hr className={styles.divider} />
        <SummarizeEmail />
        <footer className={styles.footer}>
          Powered by <span>Groq AI</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
