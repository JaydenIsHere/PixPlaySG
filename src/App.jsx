import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <Navbar />
      <HomePage />
      <Footer />
    </BrowserRouter>
  );
}

export default App;