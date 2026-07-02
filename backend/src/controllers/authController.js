import authService from '../services/authService.js';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ error: 'All fields are required' });
        if (password.length < 6)
            return res.status(400).json({ error: 'Password must be at least 6 characters' });

        await authService.registerUser({ username, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email and password required' });

        const data = await authService.loginUser({ email, password });
        res.json(data);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
};

export default { register, login };