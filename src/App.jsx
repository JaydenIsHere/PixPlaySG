import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Steps from './components/Steps';
import Service_overview from './components/Service-overview';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import PrivacyPolicy from './pages/privacypolicy';
import ScriptSystemAccess from './pages/script-system/ScriptSystemAccess';

// "/" is PixPlay Learning (static pages in public/en and public/zh). Netlify redirects "/" before React loads;
// this is the fallback for local dev and old cached links.
function LearningRedirect() {
  let lang = 'en';
  try {
    lang = JSON.parse(localStorage.getItem('pl_lang')) || '';
  } catch (e) { lang = ''; }
  if (lang !== 'en' && lang !== 'zh') lang = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  window.location.replace(`/${lang}/`);
  return null;
}

function AppShell() {
  const location = useLocation();
  // The gated product page stands alone — no public nav/footer linking back to the marketing site.
  const isStandalonePage = location.pathname.startsWith('/access') || location.pathname === '/';

  return (
    <>
      {!isStandalonePage && <Navbar />}

      <Routes>
        <Route path="/" element={<LearningRedirect />} />

        {/* Agency services - the old one-page home */}
        <Route
          path="/services"
          element={
            <>
              <HomePage />
              <Service_overview />
              <CallToAction />
              <Steps />
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
