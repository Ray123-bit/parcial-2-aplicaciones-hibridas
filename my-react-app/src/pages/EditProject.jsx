// src/pages/EditProject.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [section, setSection] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectsAPI.getById(id);
                setName(data.name);
                setDescription(data.description);
                setSection(data.section);
            } catch (err) {
                setError('Failed to load project details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await projectsAPI.update(id, { name, description, section });
            navigate('/'); 
        } catch (err) {
            setError('Failed to update project. Make sure you are logged in!');
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading project...</p>;

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Edit Project</h2>
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
                <button type="submit" style={{ padding: '10px', background: '#ffc107', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default EditProject;