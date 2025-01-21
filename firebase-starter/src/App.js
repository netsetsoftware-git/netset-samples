import React, { useEffect, useState } from 'react';
import Login from './Login';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/') // Backend endpoint
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>React + Node.js App</h1>
      <p>Message from Backend: {message}</p>

      <Login />
    </div>
    
  );
}

export default App;
