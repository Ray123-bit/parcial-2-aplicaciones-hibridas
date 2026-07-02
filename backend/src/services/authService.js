import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUserDocument } from '../models/userModel.js';

const findUserByEmail = (email) =>
    db.collection('Users').findOne({ email });

const registerUser = async ({ username, email, password }) => {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('Email already registered');

    const hashed = await bcrypt.hash(password, 10);
    const user = createUserDocument({ username, email, password: hashed });
    const result = await db.collection('Users').insertOne(user);
    return result;
};

const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return { token, user: { id: user._id, username: user.username, email: user.email } };
};

export default { registerUser, loginUser };