import { createRoot } from 'react-dom/client';
import * as maplibregl from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import App from './App.tsx';
import './index.css';

maplibregl.setWorkerUrl(maplibreWorkerUrl);

createRoot(document.getElementById('root')!).render(<App />);