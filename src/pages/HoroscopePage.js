import React, { useState } from 'react';
import './Page.css';

const moods = [
  { emoji: '😊', label: 'มีความสุข', value: 'happy' },
  { emoji: '😢', label: 'เศร้า', value: 'sad' },
  { emoji: '😡', label: 'โกรธ', value: 'angry' },
  { emoji: '😰', label: 'กังวล', value: 'anxious' },
  { emoji: '😴', label: 'เหนื่อย', value: 'tired' },
  { emoji: '😌', label: 'ผ่อนคลาย', value: 'relaxed' }
];

const zodiacs = [
  { name: 'ราศีเมษ', date: '21 มี.ค. - 19 เม.ย.', emoji: '♈' },
  { name: 'ราศีพฤษภ', date: '20 เม.ย. - 20 พ.ค.', emoji: '♉' },
  { name: 'ราศีเมถุน', date: '21 พ.ค. - 21 มิ.ย.', emoji: '♊' },
  { name: 'ราศีกรกฎ', date: '22 มิ.ย. - 22 ก.ค.', emoji: '♋' },
  { name: 'ราศีสิงห์', date: '23 ก.ค. - 22 ส.ค.', emoji: '♌' },
  { name: 'ราศีกันย์', date: '23 ส.ค. - 22 ก.ย.', emoji: '♍' },
  { name: 'ราศีตุลย์', date: '23 ก.ย. - 22 ต.ค.', emoji: '♎' },
  { name: 'ราศีพิจิก', date: '23 ต.ค. - 21 พ.ย.', emoji: '♏' },
  { name: 'ราศีธนู', date: '22 พ.ย. - 21 ธ.ค.', emoji: '♐' },
  { name: 'ราศีมังกร', date: '22 ธ.ค. - 19 ม.ค.', emoji: '♑' },
  { name: 'ราศีกุมภ์', date: '20 ม.ค. - 18 ก.พ.', emoji: '♒' },
  { name: 'ราศีมีน', date: '19 ก.พ. - 20 มี.ค.', emoji: '♓' }
];

const HoroscopePage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    
    if (!selectedZodiac) {
      setPrediction({
        love: '❤️ กรุณาเลือกราศีของคุณด้วยนะคะ',
        career: '💼 กรุณาเลือกราศีของคุณด้วยนะคะ',
        health: '🧘 กรุณาเลือกราศีของคุณด้วยนะคะ',
        message: '🌟 กรุณาเลือกราศีของคุณด้วยนะคะ'
      });
      return;
    }

    // ถ้ามีทั้ง mood และ zodiac ที่เลือกแล้ว ให้ทำนายดวง
    if (selectedZodiac) {
      handleZodiacSelect(selectedZodiac);
    }
  };

  const handleZodiacSelect = async (zodiac) => {
    setSelectedZodiac(zodiac);
    
    if (!selectedMood) {
      setPrediction({
        love: '❤️ กรุณาเลือกอารมณ์ของคุณด้วยนะคะ',
        career: '💼 กรุณาเลือกอารมณ์ของคุณด้วยนะคะ',
        health: '🧘 กรุณาเลือกอารมณ์ของคุณด้วยนะคะ',
        message: '🌟 กรุณาเลือกอารมณ์ของคุณด้วยนะคะ'
      });
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('https://mood-muse-backend.onrender.com/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mood: selectedMood,
          zodiac: zodiac
        })
      });

      const data = await response.json();
      console.log('📥 Response from backend:', data);

      if (!data.success) {
        console.error('❌ Error from backend:', data.error);
        throw new Error(data.error);
      }

      console.log('✅ Prediction data:', data.data);
      setPrediction(data.data);
    } catch (error) {
      console.error('❌ Error in frontend:', error);
      setPrediction({
        love: 'ไม่สามารถโหลดคำทำนายความรักได้',
        career: 'ไม่สามารถโหลดคำทำนายการงานได้',
        health: 'ไม่สามารถโหลดคำทำนายสุขภาพได้',
        message: 'ขอโทษค่ะ ดวงยังไม่มา ลองใหม่อีกครั้งนะคะ 😊'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="horoscope-container">
      <section className="horoscope-section">
        <h1>ดูดวงประจำวัน</h1>
        <p className="description">เลือกอารมณ์และราศีของคุณเพื่อรับคำทำนาย</p>

        <div className="mood-selection">
          <h2>วันนี้คุณรู้สึกอย่างไร?</h2>
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
              >
                <span className="emoji">{mood.emoji}</span>
                <span className="label">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="zodiac-selection">
          <h2>ราศีของคุณคือ?</h2>
          <div className="zodiac-grid">
            {zodiacs.map((zodiac) => (
              <button
                key={zodiac.name}
                className={`zodiac-button ${selectedZodiac === zodiac ? 'selected' : ''}`}
                onClick={() => handleZodiacSelect(zodiac)}
              >
                <span className="emoji">{zodiac.emoji}</span>
                <span className="name">{zodiac.name}</span>
                <span className="date">{zodiac.date}</span>
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="loading">กำลังโหลดคำทำนาย... 🔮</p>}

        {prediction && (
          <div className="prediction">
            <h2>คำทำนายประจำวัน</h2>
            <div className="prediction-card">
              <div className="prediction-stats">
                <div className="stat">
                  <span className="label">ความรัก</span>
                  <span className="stars">{prediction.love}</span>
                </div>
                <div className="stat">
                  <span className="label">การงาน</span>
                  <span className="stars">{prediction.career}</span>
                </div>
                <div className="stat">
                  <span className="label">สุขภาพ</span>
                  <span className="stars">{prediction.health}</span>
                </div>
              </div>
              <div className="prediction-message">{prediction.message}</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HoroscopePage;