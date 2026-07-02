// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react';
import { projectsAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectsAPI.getAll();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsAPI.delete(id);
                setProjects(projects.filter(project => project._id !== id));
            } catch (err) {
                alert('Failed to delete project. Make sure you are logged in.');
            }
        }
    };

    return (
        <div className="dashboard-container">
            {/* HEADER */}
            <header className="dashboard-header">
                <h2>Project Dashboard</h2>
                {user ? (
                    <div className="header-actions">
                        <span style={{ color: '#94a3b8' }}>Welcome, <strong style={{ color: 'white' }}>{user.username}</strong>!</span>
                        <Link to="/add-project" className="btn btn-primary">+ New Project</Link>
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                ) : (
                    <div className="header-actions">
                        <Link to="/login" className="btn" style={{ background: '#334155', color: 'white' }}>Login</Link>
                        <Link to="/register" className="btn" style={{ background: '#e2e8f0', color: '#0f172a' }}>Register</Link>
                    </div>
                )}
            </header>

            {/* CONTENT */}
            {loading && <p style={{ color: '#94a3b8' }}>Loading projects...</p>}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}

            {!loading && projects.length === 0 && (
                <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '50px' }}>
                    No projects found. Time to add some!
                </p>
            )}

            {/* PROJECT GRID */}
            <div className="project-grid">
                {projects.map((project) => (
                    <div key={project._id} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        
                        <div className="card-footer">
                            <span className="badge">{project.section}</span>
                            
                            {user && (
                                <div className="card-actions">
                                    <Link to={`/edit-project/${project._id}`} className="btn btn-outline-warning">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(project._id)} className="btn btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;