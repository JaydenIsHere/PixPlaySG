import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

import Service_overiew from './components/Service-overview';

function App() {
  return (
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <Navbar />
      <HomePage />
      <Service_overiew/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;