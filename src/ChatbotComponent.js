import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

function ChatbotComponent() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const scriptRef = useRef(null); // Create a ref to store the script element

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://victor.fixall.ai/fixlabs.js';
    script.async = true;
    scriptRef.current = script; // Store the script in the ref

    script.onload = () => {
      if (typeof InitChatbot === 'function') {
        const chatbotConfig = {
          user: {
            email: email,
            password: password,
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

    return () => {
      // Use the stored ref to remove the specific script element
      if (scriptRef.current && scriptRef.current.parentNode === document.body) {
        document.body.removeChild(scriptRef.current);
      }
      scriptRef.current = null; // Clear the ref
    };
  }, [email, password]);

  console.log(email, password)
  return (
    <div>
      <div id="fixall-chatbot-container"></div>
    </div>
  );
}

export default ChatbotComponent;