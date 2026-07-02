import express from 'express';

const app = express();

app.get('/test', (req, res) => res.json({ message: 'works!' }));

app.listen(4000, '127.0.0.1', () => console.log('running on 4000'));