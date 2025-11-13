
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
        AI Photo Restorer
      </h1>
      <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
        Breathe new life into your old memories. Upload a photo to see the magic.
      </p>
    </header>
  );
};

export default Header;
