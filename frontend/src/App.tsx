import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';
import SummarizePage from './pages/SummarizePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/summarize" element={<SummarizePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
