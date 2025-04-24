import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ChatbotComponent() {
  const [showAtaTime, setShowAtaTime] = useState(false)
  // const [Token, setToken] = useState(false)
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const scriptRef = useRef(null); // Create a ref to store the script element

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://victor.fixall.ai/fixlabs.js';
//     script.async = true;
//     scriptRef.current = script; // Store the script in the ref
// console.log("Running ..")
//     script.onload = () => {
//       if (typeof InitChatbot === 'function') {
//         const chatbotConfig = {
//           user: {
//             email: email,
//             password: password,
//           },
//         };
//         try {
//           InitChatbot(chatbotConfig);
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
//     setShowAtaTime(true)
//     return () => {
//       // Use the stored ref to remove the specific script element
//       if (scriptRef.current && scriptRef.current.parentNode === document.body) {
//         document.body.removeChild(scriptRef.current);
//       }
//       scriptRef.current = null; // Clear the ref
//     };
//   }, [email, password]);

  
useEffect(() => {
  const scriptId = 'fixall-chatbot-script';

  if (document.getElementById(scriptId)) {
    console.log('Chatbot script already exists');
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = 'https://victor.fixall.ai/fixlabs.js';
  script.async = true;
  scriptRef.current = script;

  console.log("Running ..");
  script.onload = () => {
    if (typeof InitChatbot === 'function') {
      const chatbotConfig = {
        user: {
          email,
          password,
        },
      };
      try {
        InitChatbot(chatbotConfig);
      } catch (error) {
        console.error('Error initializing InitChatbot:', error);
      }
    } else {
      console.error('InitChatbot function not found after script load.');
    }
  };

  script.onerror = () => {
    console.error('Failed to load the Fixall.ai chatbot script.');
  };

  document.body.appendChild(script);
  setShowAtaTime(true);

  return () => {
    if (scriptRef.current && scriptRef.current.parentNode === document.body) {
      document.body.removeChild(scriptRef.current);
    }
    scriptRef.current = null;
  };
}, [email, password]);

  console.log("showAtaTime",showAtaTime)
  // console.log(email, password)
  return (
 


      
      <div id="fixall-chatbot-container"></div>

      // {/* <iframe src="https://chatbot-nnow.vercel.app" 
      //   title="Chatbot"
      //   width="100%"
      //   height="600px"
      //   frameBorder="0"
      // >
      // </iframe> */}
   
  );
}

export default ChatbotComponent;