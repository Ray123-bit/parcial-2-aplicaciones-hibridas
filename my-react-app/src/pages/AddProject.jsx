// src/pages/AddProject.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';

const AddProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [section, setSection] = useState('');
    const [img, setImg] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await projectsAPI.create({ name, description, section, img });
            navigate('/'); 
        } catch (err) {
            setError('Failed to create project. Make sure you are logged in!');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Add New Project</h2>
                <Link to="/">Cancel</Link>
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Project Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    style={{ padding: '10px' }}
                />
                <textarea 
                    placeholder="Project Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    rows="4"
                    style={{ padding: '10px' }}
                />
                <input 
                    type="text" 
                    placeholder="Section (e.g., Web, Mobile, Design)" 
                    value={section} 
                    onChange={(e) => setSection(e.target.value)} 
                    required 
                    style={{ padding: '10px' }}
                />
                <input 
                    type="text" 
                    placeholder="Image URL (optional)" 
                    value={img} 
                    onChange={(e) => setImg(e.target.value)} 
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Save Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;