import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

const getProjects = async (filter = {}) => {
    if (!db) return [];
    if (filter.clientId) filter.clientId = new ObjectId(filter.clientId);
    return await db.collection('Projects').find(filter).toArray();
};

const getProjectById = async (id) => {
    return await db.collection('Projects').findOne({ _id: new ObjectId(id) });
};

const createProject = (data) => db.collection('Projects').insertOne(data);
const updateProject = (id, data) => db.collection('Projects').updateOne({ _id: new ObjectId(id) }, { $set: data });
const deleteProject = (id) => db.collection('Projects').deleteOne({ _id: new ObjectId(id) });
const getClients = () => db.collection('Clients').find().toArray();
const createClient = (data) => db.collection('Clients').insertOne(data);
const deleteClient = (id) => db.collection('Clients').deleteOne({ _id: new ObjectId(id) });

export default { getProjects, getProjectById, createProject, updateProject, deleteProject, getClients, createClient, deleteClient };