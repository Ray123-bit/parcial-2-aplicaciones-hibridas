const API_URL = 'http://127.0.0.1:3333/api';
// Matches PORT=3333 in your .env file

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const authAPI = {
    login: async (credentials) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    register: async (userData) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};

export const projectsAPI = {
    getAll: async () => {
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${API_URL}/projects/${id}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        return res.json();
    },
    create: async (projectData) => {
        const res = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData)
        });
        if (!res.ok) throw new Error('Failed to create project');
        return res.json();
    },
    update: async (id, projectData) => {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData)
        });
        if (!res.ok) throw new Error('Failed to update project');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete project');
        return res.json();
    }
};

export const clientsAPI = {
    getAll: async () => {
        const res = await fetch(`${API_URL}/clients`);
        if (!res.ok) throw new Error('Failed to fetch clients');
        return res.json();
    },
    create: async (clientData) => {
        const res = await fetch(`${API_URL}/clients`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(clientData)
        });
        if (!res.ok) throw new Error('Failed to create client');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${API_URL}/clients/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete client');
        return res.json();
    }
};