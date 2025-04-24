// import React, { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// function ChatbotComponent() {
//   const [searchParams] = useSearchParams();
//   const scriptRef = useRef(null);
//   const email = searchParams.get('email');
//   const password = searchParams.get('password');
//   const [showAtaTime, setShowAtaTime] = useState(false);

//   useEffect(() => {
//     const scriptId = 'fixall-chatbot-script';

//     // Prevent multiple injections
//     if (document.getElementById(scriptId)) {
//       console.log('Chatbot script already exists');
//       return;
//     }

//     const script = document.createElement('script');
//     script.id = scriptId;
//     script.src = 'https://victor.fixall.ai/fixlabs.js';
//     script.async = true;
//     scriptRef.current = script;

//     console.log("Injecting chatbot script...");
//     script.onload = () => {
//       if (typeof window.InitChatbot === 'function') {
//         try {
//           window.InitChatbot({
//             user: { email, password }
//           });
//           setShowAtaTime(true);
//         } catch (error) {
//           console.error('Error initializing InitChatbot:', error);
//         }
//       } else {
//         console.error('InitChatbot function not found after script load.');
//       }
//     };

//     script.onerror = () => {
//       console.error('Failed to load the Fixall.ai chatbot script.');
//     };

//     document.body.appendChild(script);

//     return () => {
//       if (scriptRef.current && scriptRef.current.parentNode === document.body) {
//         document.body.removeChild(scriptRef.current);
//         console.log('Chatbot script removed.');
//       }
//       scriptRef.current = null;
//     };
//   }, [email, password]);

//   return <div id="fixall-chatbot-container"></div>;
// }

// export default ChatbotComponent;
