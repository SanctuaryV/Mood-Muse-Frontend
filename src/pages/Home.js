import React from 'react';
import Navigation from '../components/Navigation';
import './Page.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <Navigation />
      <section className="hero-section">
        <div className="hero-content">
          <h1>ยินดีต้อนรับสู่ Mood Muse</h1>
          <p className="hero-subtitle">แพลตฟอร์มที่ช่วยดูแลสุขภาพจิตของคุณ</p>
          <p className="hero-description">
            ค้นพบวิธีดูแลสุขภาพจิตผ่านการดูดวงประจำวัน รับคำแนะนำเพลง หนังสือ และอาหารที่เหมาะกับอารมณ์ของคุณ
          </p>
          <button className="cta-button" onClick={scrollToFeatures}>
            เริ่มต้นใช้งาน
          </button>
        </div>
        <div className="hero-image">
          <span className="floating-emoji">🧠</span>
          <span className="floating-emoji">🎵</span>
          <span className="floating-emoji">📚</span>
          <span className="floating-emoji">🍜</span>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>ฟีเจอร์ทั้งหมด</h2>
        <div className="features-grid">
          <Link to="/horoscope" className="feature-card">
            <div className="feature-icon">🔮</div>
            <h3>ดูดวง</h3>
            <p>ดูดวงรายวันตามราศีของคุณ</p>
          </Link>
          <Link to="/book" className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>หนังสือ</h3>
            <p>ค้นหาหนังสือที่เหมาะกับอารมณ์ของคุณ</p>
          </Link>
          <a href="/music" className="feature-card">
            <span className="feature-icon">🎵</span>
            <h3>แนะนำเพลง</h3>
            <p>ค้นหาเพลงที่เหมาะกับอารมณ์ของคุณ</p>
          </a>
          <a href="/food" className="feature-card">
            <span className="feature-icon">🍜</span>
            <h3>แนะนำอาหาร</h3>
            <p>ค้นหาอาหารที่เหมาะกับอารมณ์ของคุณ</p>
          </a>
          <Link className="feature-card">
            <div className="feature-icon">💆‍♀️</div>
            <h3>ที่พักใจ</h3>
            <p>Coming Soon...</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;