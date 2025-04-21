import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HoroscopePage from './pages/HoroscopePage';
import BookPage from './pages/BookPage';
import SongPage from './pages/SongPage';
import FoodPage from './pages/FoodPage';
import Layout from './components/Layout';
import './pages/Page.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/horoscope" element={
            <Layout>
              <HoroscopePage />
            </Layout>
          } />
          <Route path="/book" element={
            <Layout>
              <BookPage />
            </Layout>
          } />
          <Route path="/music" element={
            <Layout>
              <SongPage />
            </Layout>
          } />
          <Route path="/food" element={
            <Layout>
              <FoodPage />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;