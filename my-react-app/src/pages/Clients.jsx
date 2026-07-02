// src/pages/Clients.jsx
import { useState, useEffect, useContext } from 'react';
import { clientsAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const data = await clientsAPI.getAll();
            setClients(data);
        } catch (err) {
            setError('Failed to load clients');
        }
    };

    const handleAddClient = async (e) => {
        e.preventDefault();
        try {
            await clientsAPI.create({ nombre, descripcion });
            setNombre('');
            setDescripcion('');
            fetchClients(); // Refresh the list
        } catch (err) {
            setError('Failed to add client. Must be logged in.');
        }
    };

    const handleDeleteClient = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await clientsAPI.delete(id);
                setClients(clients.filter(client => client._id !== id));
            } catch (err) {
                alert('Failed to delete client. Make sure you are logged in.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Client Directory</h2>
                <Link to="/" style={{ padding: '8px 15px', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Back to Projects
                </Link>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* FORM TO ADD CLIENT */}
            {user && (
                <form onSubmit={handleAddClient} style={{ display: 'flex', gap: '10px', marginBottom: '30px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ padding: '8px', flexGrow: 1 }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        style={{ padding: '8px', flexGrow: 2 }}
                    />
                    <button type="submit" style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                        Add Client
                    </button>
                </form>
            )}

            {/* LIST OF CLIENTS */}
            <div style={{ display: 'grid', gap: '15px' }}>
                {clients.length === 0 && <p>No clients found.</p>}
                {clients.map(client => (
                    <div key={client._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: '0 0 10px 0' }}>{client.nombre}</h3>
                            <p style={{ margin: 0, color: '#666' }}>{client.descripcion}</p>
                        </div>
                        {user && (
                            <button
                                onClick={() => handleDeleteClient(client._id)}
                                style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;