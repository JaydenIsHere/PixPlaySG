
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (import.meta.hot) {
  import.meta.hot.accept();
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
