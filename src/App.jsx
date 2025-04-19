import React from 'react';
import './App.css';
import Hero from './components/custom/Hero';

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/Background-image.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Hero />
    </div>
  );
}

export default App;
