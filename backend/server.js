import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './src/routes/projectRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.json({ message: 'Server works!' }));

app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, '127.0.0.1', () => console.log(`🚀 Server running on http://127.0.0.1:${PORT}`));