// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await authAPI.register({ username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Failed to register.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>Create an Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    style={{ padding: '10px' }}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '10px' }}
                />
                <input 
                    type="password" 
                    placeholder="Password (min 6 chars)" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    minLength="6"
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#333', color: 'white', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;