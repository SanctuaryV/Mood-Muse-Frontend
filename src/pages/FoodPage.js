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

const cuisines = [
  { name: 'ไทย', emoji: '🍜', description: 'อาหารไทยที่อร่อยและมีรสชาติเข้มข้น' },
  { emoji: '🍣', name: 'ญี่ปุ่น', description: 'อาหารญี่ปุ่นที่เน้นความสดและรสชาติธรรมชาติ' },
  { emoji: '🍕', name: 'อิตาเลียน', description: 'อาหารอิตาเลียนที่ให้ความรู้สึกอบอุ่น' },
  { emoji: '🌮', name: 'เม็กซิกัน', description: 'อาหารเม็กซิกันที่เต็มไปด้วยรสชาติ' },
  { emoji: '🍔', name: 'อเมริกัน', description: 'อาหารอเมริกันที่ให้พลังงานสูง' },
  { emoji: '🥗', name: 'สุขภาพ', description: 'อาหารเพื่อสุขภาพที่อุดมด้วยสารอาหาร' }
];

const FoodPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    // สมมติว่ามีการเรียก API เพื่อดึงคำแนะนำอาหาร
    setRecommendations([
      {
        name: 'ชื่ออาหารที่ 1',
        restaurant: 'ร้านอาหาร 1',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับอาหารจานนี้',
        rating: '⭐️⭐️⭐️⭐️⭐️'
      },
      {
        name: 'ชื่ออาหารที่ 2',
        restaurant: 'ร้านอาหาร 2',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับอาหารจานนี้',
        rating: '⭐️⭐️⭐️⭐️'
      },
      {
        name: 'ชื่ออาหารที่ 3',
        restaurant: 'ร้านอาหาร 3',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับอาหารจานนี้',
        rating: '⭐️⭐️⭐️⭐️⭐️'
      }
    ]);
  };

  return (
    <div className="book-container">
      <section className="book-section">
        <h1>แนะนำอาหาร</h1>
        <p className="description">เลือกอารมณ์และประเภทอาหารที่คุณสนใจ</p>
        
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

        <div className="genre-selection">
          <h2>ประเภทอาหารที่คุณสนใจ</h2>
          <div className="genre-grid">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.name}
                className={`genre-button ${selectedCuisine === cuisine ? 'selected' : ''}`}
                onClick={() => handleCuisineSelect(cuisine)}
              >
                <span className="emoji">{cuisine.emoji}</span>
                <span className="name">{cuisine.name}</span>
                <span className="description">{cuisine.description}</span>
              </button>
            ))}
          </div>
        </div>

        {recommendations && (
          <div className="recommendations">
            <h2>อาหารแนะนำสำหรับคุณ</h2>
            <div className="books-grid">
              {recommendations.map((food, index) => (
                <div key={index} className="book-card">
                  <div className="book-header">
                    <h3>{food.name}</h3>
                    <span className="rating">{food.rating}</span>
                  </div>
                  <p className="author">ร้าน {food.restaurant}</p>
                  <p className="book-description">{food.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default FoodPage; 