import React, { useState } from 'react'
import './Page.css'

const moods = [
  { emoji: '😊', label: 'มีความสุข', value: 'happy' },
  { emoji: '😢', label: 'เศร้า', value: 'sad' },
  { emoji: '😡', label: 'โกรธ', value: 'angry' },
  { emoji: '😰', label: 'กังวล', value: 'anxious' },
  { emoji: '😴', label: 'เหนื่อย', value: 'tired' },
  { emoji: '😌', label: 'ผ่อนคลาย', value: 'relaxed' }
]

const genres = [
  {
    name: 'นิยายรัก',
    emoji: '💕',
    description: 'เรื่องราวความรักที่อบอุ่นและน่าประทับใจ'
  },
  {
    emoji: '📚',
    name: 'พัฒนาตัวเอง',
    description: 'หนังสือที่ช่วยพัฒนาทักษะและความคิด'
  },
  {
    emoji: '🎭',
    name: 'นิยายแฟนตาซี',
    description: 'โลกแห่งจินตนาการและความมหัศจรรย์'
  },
  {
    emoji: '🔍',
    name: 'สืบสวนสอบสวน',
    description: 'ปริศนาและความลึกลับที่ต้องไข'
  },
  {
    emoji: '🌍',
    name: 'ท่องเที่ยว',
    description: 'เรื่องราวการเดินทางและการผจญภัย'
  },
  {
    emoji: '🎨',
    name: 'ศิลปะและความคิดสร้างสรรค์',
    description: 'หนังสือที่ช่วยปลุกความคิดสร้างสรรค์'
  }
]

// เพิ่มข้อมูลจำลองไว้ใช้เมื่อ API ไม่ทำงาน
const fallbackBooks = [
  {
    title: 'คิดจะพักคิดถึงใคร...',
    author: 'ไม่บอก',
    description: 'คือเรื่องมันเป็นอย่างงี้คับพรี่เเจ๊ค',
    rating: '⭐️⭐️⭐️⭐️'
  },
  {
    title: 'พวกเรา เรามาทำอะไร งง?',
    author: 'Huhi',
    description: 'สวัสดีคั้บท่านผู้ชม',
    rating: '⭐️⭐️⭐️'
  }
]

const BookPage = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleMoodSelect = mood => {
    setSelectedMood(mood)
    // เคลียร์คำแนะนำเมื่อเปลี่ยนอารมณ์
    setRecommendations(null)
  }

  const handleGenreSelect = async genre => {
    setSelectedGenre(genre)

    // ตรวจสอบว่าได้เลือกทั้งอารมณ์และประเภทหนังสือแล้ว
    if (selectedMood) {
      try {
        setLoading(true)
        setError(null)

        // กำหนด URL สำหรับการเรียก API จาก backend
        const moodValue = encodeURIComponent(selectedMood.value)
        const genreName = encodeURIComponent(genre.name)

        const apiUrl = `https://mood-muse-backend.onrender.com/api/books/${moodValue}/${genreName}`

        console.log('เรียก API URL:', apiUrl)

        const response = await fetch(apiUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          // เพิ่ม mode: 'cors' เพื่อช่วยแก้ปัญหา CORS
          mode: 'cors'
        })

        console.log('สถานะการตอบกลับ:', response.status, response.statusText)

        if (!response.ok) {
          // เมื่อพบ error 404 ให้ใช้ข้อมูลจำลองแทน
          if (response.status === 404) {
            console.warn('ไม่พบ API endpoint ที่ระบุ ใช้ข้อมูลจำลองแทน')
            setRecommendations(fallbackBooks)
            return
          }

          throw new Error(
            `ไม่สามารถรับคำแนะนำหนังสือได้: ${response.status} ${response.statusText}`
          )
        }

        // ตรวจสอบ content-type
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          console.warn('ไม่ได้รับข้อมูล JSON:', contentType)

          // ดึงข้อมูลเป็นข้อความก่อนเพื่อแสดงในคอนโซล
          const textData = await response.text()
          console.error('ข้อมูลที่ได้รับ:', textData)

          // ใช้ข้อมูลจำลองแทนเมื่อไม่ได้รับ JSON
          console.warn('ไม่ได้รับข้อมูล JSON ใช้ข้อมูลจำลองแทน')
          setRecommendations(fallbackBooks)
          return
        }

        // ถ้าผ่านการตรวจสอบ content-type แล้ว ค่อยแปลงเป็น JSON
        const responseClone = response.clone() // สร้างสำเนาของ response
        try {
          const books = await response.json()
          setRecommendations(Array.isArray(books) ? books : [books])
        } catch (jsonError) {
          console.error('ไม่สามารถแปลง response เป็น JSON:', jsonError)

          // ถ้าแปลงเป็น JSON ไม่ได้ ลองดึงข้อมูลเป็นข้อความเพื่อดูว่าเป็นอะไร
          const textData = await responseClone.text()
          console.error('เนื้อหาที่ได้รับ:', textData)

          // ใช้ข้อมูลจำลองแทน
          console.warn('ไม่สามารถแปลงข้อมูลเป็น JSON ใช้ข้อมูลจำลองแทน')
          setRecommendations(fallbackBooks)
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับคำแนะนำหนังสือ:', error)
        setError('ไม่สามารถรับคำแนะนำหนังสือได้ กรุณาลองใหม่อีกครั้ง')
        // ใช้ข้อมูลจำลองเมื่อเกิดข้อผิดพลาด
        setRecommendations(fallbackBooks)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='book-container'>
      <section className='book-section'>
        <h1>แนะนำหนังสือ</h1>
        <p className='description'>เลือกอารมณ์และประเภทหนังสือที่คุณสนใจ</p>

        <div className='mood-selection'>
          <h2>วันนี้คุณรู้สึกอย่างไร?</h2>
          <div className='mood-grid'>
            {moods.map(mood => (
              <button
                key={mood.value}
                className={`mood-button ${
                  selectedMood === mood ? 'selected' : ''
                }`}
                onClick={() => handleMoodSelect(mood)}
              >
                <span className='emoji' role='img' aria-label={mood.label}>
                  {mood.emoji}
                </span>
                <span className='label'>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='genre-selection'>
          <h2>ประเภทหนังสือที่คุณสนใจ</h2>
          <div className='genre-grid'>
            {genres.map(genre => (
              <button
                key={genre.name}
                className={`genre-button ${
                  selectedGenre === genre ? 'selected' : ''
                }`}
                onClick={() => handleGenreSelect(genre)}
              >
                <span className='emoji' role='img' aria-label={genre.name}>
                  {genre.emoji}
                </span>
                <span className='name'>{genre.name}</span>
                <span className='description'>{genre.description}</span>
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className='loading'>
            <p>กำลังค้นหาหนังสือที่เหมาะกับคุณ...</p>
          </div>
        )}

        {error && (
          <div className='error'>
            <p>{error}</p>
          </div>
        )}

        {recommendations && (
          <div className='recommendations'>
            <h2>หนังสือแนะนำสำหรับคุณ</h2>
            <div className='books-grid'>
              {recommendations.map((book, index) => (
                <div key={index} className='book-card'>
                  <div className='book-header'>
                    <h3>{book.title}</h3>
                    <span className='rating'>{book.rating}</span>
                  </div>
                  <p className='author'>โดย {book.author}</p>
                  <p className='book-description'>{book.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default BookPage
