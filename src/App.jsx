import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Steps from './components/Steps';
import Service_overview from './components/Service-overview';
import CallToAction from './components/CallToAction';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import PrivacyPolicy from './pages/privacypolicy';
import ScriptSystemAccess from './pages/script-system/ScriptSystemAccess';

function AppShell() {
  const location = useLocation();
  // The gated product page stands alone — no public nav/footer linking back to the marketing site.
  const isStandalonePage = location.pathname.startsWith('/access');

  return (
    <>
      {!isStandalonePage && <Navbar />}

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

        {/* Strategic Script System - unlisted, buyer-only access page. Not linked from the navbar or sitemap. */}
        <Route path="/access" element={<ScriptSystemAccess />} />
      </Routes>

      {!isStandalonePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
