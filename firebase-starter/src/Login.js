import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            const response = await fetch('http://localhost:5000/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(result),
            });
            
            const data = await response.json();
            console.log('Backend Response:', data);
            setLoggedIn(true)
            
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

  return (
    <div>
        { !loggedIn ?
            <div>
                <h1>Login</h1>
                <button onClick={handleGoogleLogin}>Login with Google</button>
            </div>  
            :
            <div>
                <p>Logged In successfully!!</p>
            </div>
        }
        
    </div>
  );
};

export default Login;
