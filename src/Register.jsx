// src/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ goToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ima-pack-report-backend.onrender.com/api/auth/register', { username, password });
      alert('Registration successful. You can now login.');
      goToLogin();
    } catch (err) {
      console.error(err);
      alert('Registration failed: Username may already exist.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
        <p className="text-sm text-center">
          Already have an account? <span className="text-blue-600 cursor-pointer" onClick={goToLogin}><Link to="/login">Login</Link></span>
        </p>
      </form>
    </div>
  );
};

export default Register;
