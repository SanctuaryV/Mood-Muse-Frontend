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

const cuisines = [
  {
    name: 'ไทย',
    emoji: '🍜',
    description: 'อาหารไทยที่อร่อยและมีรสชาติเข้มข้น'
  },
  {
    emoji: '🍣',
    name: 'ญี่ปุ่น',
    description: 'อาหารญี่ปุ่นที่เน้นความสดและรสชาติธรรมชาติ'
  },
  {
    emoji: '🍕',
    name: 'อิตาเลียน',
    description: 'อาหารอิตาเลียนที่ให้ความรู้สึกอบอุ่น'
  },
  {
    emoji: '🌮',
    name: 'เม็กซิกัน',
    description: 'อาหารเม็กซิกันที่เต็มไปด้วยรสชาติ'
  },
  {
    emoji: '🍔',
    name: 'อเมริกัน',
    description: 'อาหารอเมริกันที่ให้พลังงานสูง'
  },
  {
    emoji: '🥗',
    name: 'สุขภาพ',
    description: 'อาหารเพื่อสุขภาพที่อุดมด้วยสารอาหาร'
  }
]

// เพิ่มข้อมูลจำลองไว้ใช้เมื่อ API ไม่ทำงาน
const fallbackFoods = [
  {
    name: 'ผัดไทยกุ้งสด',
    restaurant: 'ร้านอาหารไทยรสเด็ด',
    description: 'ผัดไทยเส้นนุ่มหอม ผัดกับซอสสูตรเฉพาะ กุ้งสดเนื้อแน่น',
    rating: '⭐️⭐️⭐️⭐️⭐️'
  },
  {
    name: 'ต้มยำกุ้งน้ำข้น',
    restaurant: 'ครัวไทยแท้',
    description: 'ต้มยำรสจัดจ้าน เปรี้ยวเผ็ดกลมกล่อม น้ำซุปเข้มข้น',
    rating: '⭐️⭐️⭐️⭐️'
  }
]

const FoodPage = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedCuisine, setSelectedCuisine] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleMoodSelect = mood => {
    setSelectedMood(mood)
    // เคลียร์คำแนะนำเมื่อเปลี่ยนอารมณ์
    setRecommendations(null)
  }

  const handleCuisineSelect = async cuisine => {
    setSelectedCuisine(cuisine)

    // ตรวจสอบว่าได้เลือกทั้งอารมณ์และประเภทอาหารแล้ว
    if (selectedMood) {
      try {
        setLoading(true)
        setError(null)

        // กำหนด URL สำหรับการเรียก API จาก backend
        const moodValue = encodeURIComponent(selectedMood.value)
        const cuisineName = encodeURIComponent(cuisine.name)

        const apiUrl = `https://mood-muse-backend.onrender.com/api/food/${moodValue}/${cuisineName}`

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
            setRecommendations(fallbackFoods)
            return
          }

          throw new Error(
            `ไม่สามารถรับคำแนะนำอาหารได้: ${response.status} ${response.statusText}`
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
          setRecommendations(fallbackFoods)
          return
        }

        // ถ้าผ่านการตรวจสอบ content-type แล้ว ค่อยแปลงเป็น JSON
        const responseClone = response.clone() // สร้างสำเนาของ response
        try {
          const foods = await response.json()
          setRecommendations(Array.isArray(foods) ? foods : [foods])
        } catch (jsonError) {
          console.error('ไม่สามารถแปลง response เป็น JSON:', jsonError)

          // ถ้าแปลงเป็น JSON ไม่ได้ ลองดึงข้อมูลเป็นข้อความเพื่อดูว่าเป็นอะไร
          const textData = await responseClone.text()
          console.error('เนื้อหาที่ได้รับ:', textData)

          // ใช้ข้อมูลจำลองแทน
          console.warn('ไม่สามารถแปลงข้อมูลเป็น JSON ใช้ข้อมูลจำลองแทน')
          setRecommendations(fallbackFoods)
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับคำแนะนำอาหาร:', error)
        setError('ไม่สามารถรับคำแนะนำอาหารได้ กรุณาลองใหม่อีกครั้ง')
        // ใช้ข้อมูลจำลองเมื่อเกิดข้อผิดพลาด
        setRecommendations(fallbackFoods)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='book-container'>
      <section className='book-section'>
        <h1>แนะนำอาหาร</h1>
        <p className='description'>เลือกอารมณ์และประเภทอาหารที่คุณสนใจ</p>

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
          <h2>ประเภทอาหารที่คุณสนใจ</h2>
          <div className='genre-grid'>
            {cuisines.map(cuisine => (
              <button
                key={cuisine.name}
                className={`genre-button ${
                  selectedCuisine === cuisine ? 'selected' : ''
                }`}
                onClick={() => handleCuisineSelect(cuisine)}
              >
                <span className='emoji' role='img' aria-label={cuisine.name}>
                  {cuisine.emoji}
                </span>
                <span className='name'>{cuisine.name}</span>
                <span className='description'>{cuisine.description}</span>
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className='loading'>
            <p>กำลังค้นหาอาหารที่เหมาะกับคุณ...</p>
          </div>
        )}

        {error && (
          <div className='error'>
            <p>{error}</p>
          </div>
        )}

        {recommendations && (
          <div className='recommendations'>
            <h2>อาหารแนะนำสำหรับคุณ</h2>
            <div className='books-grid'>
              {recommendations.map((food, index) => (
                <div key={index} className='book-card'>
                  <div className='book-header'>
                    <h3>{food.name}</h3>
                    <span className='rating'>{food.rating}</span>
                  </div>
                  <p className='author'>ร้าน {food.restaurant}</p>
                  <p className='book-description'>{food.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default FoodPage
