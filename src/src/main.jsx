import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // optional - we add a tiny default style or you can skip

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
