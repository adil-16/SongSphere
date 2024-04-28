import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PlaylistProvider } from './context/PlaylistContext';
import { MusicProvider } from './context/MusicContext'; // Ensure this is correctly imported

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlaylistProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </PlaylistProvider>
  </React.StrictMode>
);
