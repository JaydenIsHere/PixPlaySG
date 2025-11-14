import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Steps from './components/Steps';
import Service_overview from './components/Service-overview';
import CallToAction from './components/CallToAction';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home - your one-page sections */}
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <Service_overview />
              <CallToAction />
              <Steps />
              <Testimonial />
              <Contact />
            </>
          }
        />

        {/* Privacy Policy Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
