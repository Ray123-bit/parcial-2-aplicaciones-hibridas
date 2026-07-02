import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);
let db = null;

async function connect() {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to Atlas!');
        db = client.db('AH20232CP1');
    } catch (err) {
        console.error('❌ DB ERROR:', err.message);
    }
}

await connect();
export { db };