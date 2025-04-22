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
        <Link to="/horoscope" className="nav-link">
          <span className="nav-emoji">🔮</span>
          <span className="nav-text">ดูดวงประจำวัน</span>
        </Link>
        <Link to="/book" className="nav-link">
          <span className="nav-emoji">📚</span>
          <span className="nav-text">หนังสือ</span>
        </Link>
        <Link to="/music" className="nav-link">
          <span className="nav-emoji">🎵</span>
          <span className="nav-text">เพลง</span>
        </Link>
        <Link to="/food" className="nav-link">
          <span className="nav-emoji">🍜</span>
          <span className="nav-text">อาหาร</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 