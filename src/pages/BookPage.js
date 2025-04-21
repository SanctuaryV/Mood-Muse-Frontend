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

const genres = [
  { name: 'นิยายรัก', emoji: '💕', description: 'เรื่องราวความรักที่อบอุ่นและน่าประทับใจ' },
  { emoji: '📚', name: 'พัฒนาตัวเอง', description: 'หนังสือที่ช่วยพัฒนาทักษะและความคิด' },
  { emoji: '🎭', name: 'นิยายแฟนตาซี', description: 'โลกแห่งจินตนาการและความมหัศจรรย์' },
  { emoji: '🔍', name: 'สืบสวนสอบสวน', description: 'ปริศนาและความลึกลับที่ต้องไข' },
  { emoji: '🌍', name: 'ท่องเที่ยว', description: 'เรื่องราวการเดินทางและการผจญภัย' },
  { emoji: '🎨', name: 'ศิลปะและความคิดสร้างสรรค์', description: 'หนังสือที่ช่วยปลุกความคิดสร้างสรรค์' }
];

const BookPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    // สมมติว่ามีการเรียก API เพื่อดึงคำแนะนำหนังสือ
    setRecommendations([
      {
        title: 'ชื่อหนังสือที่ 1',
        author: 'ผู้เขียน 1',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับหนังสือเล่มนี้',
        rating: '⭐️⭐️⭐️⭐️⭐️'
      },
      {
        title: 'ชื่อหนังสือที่ 2',
        author: 'ผู้เขียน 2',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับหนังสือเล่มนี้',
        rating: '⭐️⭐️⭐️⭐️'
      },
      {
        title: 'ชื่อหนังสือที่ 3',
        author: 'ผู้เขียน 3',
        description: 'คำอธิบายสั้นๆ เกี่ยวกับหนังสือเล่มนี้',
        rating: '⭐️⭐️⭐️⭐️⭐️'
      }
    ]);
  };

  return (
    <div className="book-container">
      <section className="book-section">
        <h1>แนะนำหนังสือ</h1>
        <p className="description">เลือกอารมณ์และประเภทหนังสือที่คุณสนใจ</p>
        
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
          <h2>ประเภทหนังสือที่คุณสนใจ</h2>
          <div className="genre-grid">
            {genres.map((genre) => (
              <button
                key={genre.name}
                className={`genre-button ${selectedGenre === genre ? 'selected' : ''}`}
                onClick={() => handleGenreSelect(genre)}
              >
                <span className="emoji">{genre.emoji}</span>
                <span className="name">{genre.name}</span>
                <span className="description">{genre.description}</span>
              </button>
            ))}
          </div>
        </div>

        {recommendations && (
          <div className="recommendations">
            <h2>หนังสือแนะนำสำหรับคุณ</h2>
            <div className="books-grid">
              {recommendations.map((book, index) => (
                <div key={index} className="book-card">
                  <div className="book-header">
                    <h3>{book.title}</h3>
                    <span className="rating">{book.rating}</span>
                  </div>
                  <p className="author">โดย {book.author}</p>
                  <p className="book-description">{book.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BookPage;