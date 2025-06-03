// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ goToRegister, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ima-pack-report-backend.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert('Login failed: Invalid credentials.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account? <span className="text-green-600 cursor-pointer" onClick={goToRegister}><Link to="/register">Register</Link></span>
        </p>
      </form>
    </div>
  );
};

export default Login;
