import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Admin from './Admin.tsx';
import { readGuestNameFromPath } from './config';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '');
const isAdmin = path.toLowerCase() === '/admin';

createRoot(document.getElementById('root')!).render(
  isAdmin ? <Admin /> : <App guestName={readGuestNameFromPath(window.location.pathname)} />,
);
