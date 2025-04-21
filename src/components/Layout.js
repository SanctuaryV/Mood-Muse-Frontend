import React from 'react';
import Navigation from './Navigation';
import ChatBot from './ChatBot';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <ChatBot />
    </div>
  );
};

export default Layout; 