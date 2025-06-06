import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { registerServiceWorker } from './utils/serviceWorker';

// Registrar el Service Worker
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
);
