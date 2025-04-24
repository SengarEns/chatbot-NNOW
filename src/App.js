import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ChatbotComponent from './ChatbotComponent'; // Adjust the import path
import Chatbot from "./chatbot";
import NnnowChatBot from "./nnnowChatBot";
import Bot from "./bot";
import {useSearchParams} from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ChatbotComponent />} /> */}
        <Route path="/nnnow" element={<NnnowChatBot />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/bot" element={<Bot />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;




// <NnnowChatBot />

//  <Chatbot />
// <Bot />