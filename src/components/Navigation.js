import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Page.css';

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo">
        <span>🧠</span> Mood Muse
      </Link>
      <div className="nav-links">
        <Link to="/horoscope" className="nav-link">
          <span className="nav-text">ดูดวง</span>
          <span className="nav-emoji">🔮</span>
        </Link>
        {/* <Link to="/relax" className="nav-link">
          <span className="nav-text">ที่พักใจ</span>
          <span className="nav-emoji">💆‍♀️</span>
        </Link> */}
        <Link to="/book" className="nav-link">
          <span className="nav-text">หนังสือ</span>
          <span className="nav-emoji">📚</span>
        </Link>
        <Link to="/music" className="nav-link">
          <span className="nav-text">เพลง</span>
          <span className="nav-emoji">🎵</span>
        </Link>
        <Link to="/food" className="nav-link">
          <span className="nav-text">อาหาร</span>
          <span className="nav-emoji">🍜</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 