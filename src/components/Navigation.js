import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Page.css';

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo">
        <span>🧠</span>
        <span>Mood Muse</span>
      </Link>
      <div className="nav-links">
        <Link to="/horoscope" className="nav-link">🔮ดูดวงประจำวัน</Link>
        <Link to="/book" className="nav-link">📚หนังสือ</Link>
        <Link to="/music" className="nav-link">🎵เพลง</Link>
        <Link to="/food" className="nav-link">🍜อาหาร</Link>
      </div>
    </nav>
  );
};

export default Navigation; 