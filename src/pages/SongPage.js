import React, { useState, useEffect } from 'react';
import './SongPage.css';

const moods = [
  { emoji: '😊', label: 'happy', description: 'มีความสุข' },
  { emoji: '😢', label: 'sad', description: 'เศร้า' },
  { emoji: '😠', label: 'angry', description: 'โกรธ' },
  { emoji: '😰', label: 'anxious', description: 'กังวล' },
  { emoji: '😴', label: 'tired', description: 'เหนื่อย' },
  { emoji: '😌', label: 'relaxed', description: 'ผ่อนคลาย' }
];

const genres = [
  { emoji: '🎵', label: 'pop', description: 'ป๊อป' },
  { emoji: '🎸', label: 'rock', description: 'ร็อค' },
  { emoji: '🎷', label: 'jazz', description: 'แจ๊ส' },
  { emoji: '🎻', label: 'classical', description: 'คลาสสิก' },
  { emoji: '🎤', label: 'hip-hop', description: 'ฮิปฮอป' },
  { emoji: '🎧', label: 'electronic', description: 'อิเล็กทรอนิกส์' }
];

const SongPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://mood-muse-backend.onrender.com/api/songs/${selectedMood}/${selectedGenre}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดเพลย์ลิสต์');
        console.error('Error fetching playlists:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMood && selectedGenre) {
      fetchPlaylists();
    }
  }, [selectedMood, selectedGenre]);

  return (
    <div className="song-page">
      <div className="container">

        <div className="selection-container">
          <div className="mood-selection">
            <h2>ค้นหาเพลย์ลิสต์ตามอารมณ์</h2>
            <p className="description">เลือกอารมณ์และประเภทเพลงที่คุณสนใจ</p>
            <h3>เลือกอารมณ์ของคุณ</h3>
            <div className="mood-buttons">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  className={`mood-button ${selectedMood === mood.label ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(mood.label)}
                >
                  <span className="emoji">{mood.emoji}</span>
                  <span className="label">{mood.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="genre-selection">
            <h3>เลือกประเภทเพลง</h3>
            <div className="genre-buttons">
              {genres.map((genre) => (
                <button
                  key={genre.label}
                  className={`genre-button ${selectedGenre === genre.label ? 'selected' : ''}`}
                  onClick={() => setSelectedGenre(genre.label)}
                >
                  <span className="emoji">{genre.emoji}</span>
                  <span className="label">{genre.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && <div className="loading">กำลังโหลด...</div>}
        {error && <div className="error">{error}</div>}

        {playlists.length > 0 && (
          <div className="playlists">
            <h2>เพลย์ลิสต์แนะนำ</h2>
            <div className="playlist-grid">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-card">
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    className="playlist-image"
                  />
                  <div className="playlist-info">
                    <h3>{playlist.name}</h3>
                    <p>{playlist.description}</p>
                    <p>จำนวนเพลง: {playlist.tracks}</p>
                    <a
                      href={playlist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotify-link"
                    >
                      เปิดใน Spotify
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SongPage;
