import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatbotComponent from './ChatbotComponent'; // Adjust the import path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatbotComponent />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;