import React, { useState } from 'react';
import './Page.css';

const RelaxPage = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('กรุณาใส่ข้อความของคุณ');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const response = await fetch('https://mood-muse-py.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          use_gemini: true,
          gemini_api_key: process.env.REACT_APP_GEMINI_API_KEY
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการส่งข้อความ');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relax-container">
      <section className="relax-section">
        <h1>ที่พักใจ</h1>
        <p className="description">
          บอกเล่าความรู้สึกของคุณที่นี่ เราจะช่วยให้คุณรู้สึกดีขึ้น
        </p>

        <form onSubmit={handleSubmit} className="relax-form">
          <div className="form-group">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="บอกเล่าความรู้สึกของคุณที่นี่..."
              className="relax-textarea"
              rows="6"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'กำลังประมวลผล...' : 'ส่งข้อความ'}
          </button>
        </form>

        {response && (
          <div className="response-card">
            <h2>คำตอบจากเรา</h2>
            <p className="response-text">{response}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default RelaxPage; 