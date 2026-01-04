// src/Chat.jsx

import { useState, useEffect, useRef } from 'react';

const client_id = Math.floor(Math.random() * 1000); // Simple unique ID for testing

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef<null | WebSocket>(null); // Use useRef to store the WebSocket object

  const scrollToBottom = () => {
  // .current points to the actual DOM node
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ 
      behavior: "smooth" // Gives it a nice, smooth animation
    });
  }
};
  // --- Connection Setup ---
  useEffect(() => {
    // 1. Establish the connection (use wss:// for production with HTTPS)
    const socket = new WebSocket(`ws://192.168.0.160:8000/ws/chat/${client_id}`);
    
    // Store the socket object
    ws.current = socket;

    // 2. Event Handlers
    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      // 3. Receive new message and update state
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    

    // 4. Cleanup function to close the connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this runs once on mount

 useEffect(() => {
    scrollToBottom();
}, [messages]);

  // --- Sending Message ---
  const sendMessage = () => {
    if (inputMessage.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Send the message over the WebSocket
      ws.current.send(inputMessage);
      setInputMessage(''); // Clear input
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1>FastAPI Chat - User #{client_id}</h1>
      <div 
        className='h-96 border border-gray-300 dark:border-gray-600 mb-4 overflow-y-scroll p-3 rounded-lg bg-white dark:bg-gray-900'
      >
        {messages.map((msg, index) => (
          <p key={index} className="my-1 text-sm break-words text-gray-800 dark:text-gray-200">
            {msg}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder="Type your message..."
        // Tailwind classes for input styling
        className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <button 
        onClick={sendMessage}
        // Tailwind classes for button styling
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Send
      </button>
    </div>
    </div>
  );
}

export default Chat;