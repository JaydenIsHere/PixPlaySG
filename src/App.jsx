import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Steps from './components/Steps';
import Service_overiew from './components/Service-overview';
import CallToAction from './components/CallToAction';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <Navbar />
      <HomePage />
      <Service_overiew/>
      <CallToAction/>
      <Steps/>
      <Testimonial/>
      <Contact/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;