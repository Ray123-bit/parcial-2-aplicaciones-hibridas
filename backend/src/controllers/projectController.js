import service from '../services/projectService.js';

const apiGetProjects = async (req, res) => {
    const query = {};
    if (req.query.section) query.section = req.query.section;
    if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };
    res.json(await service.getProjects(query));
};

const apiGetProjectById = async (req, res) => {
    try {
        const project = await service.getProjectById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiAdd = async (req, res) => {
    try {
        const { name, description, technologies, section, link, img } = req.body;
        if (!name || !description || !section)
            return res.status(400).json({ error: 'Name, description and section are required' });
        res.json(await service.createProject(req.body));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiEdit = async (req, res) => {
    try {
        res.json(await service.updateProject(req.params.id, req.body));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiRemove = async (req, res) => {
    try {
        res.json(await service.deleteProject(req.params.id));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiClients = async (req, res) => res.json(await service.getClients());

const apiAddClient = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) return res.status(400).json({ error: 'Client name is required' });
        res.json(await service.createClient(req.body));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiRemoveClient = async (req, res) => {
    try {
        res.json(await service.deleteClient(req.params.clientId));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const apiProjectsByClient = async (req, res) => {
    res.json(await service.getProjects({ clientId: req.params.clientId }));
};

export default {
    apiGetProjects,
    apiGetProjectById,
    apiAdd,
    apiEdit,
    apiRemove,
    apiClients,
    apiAddClient,
    apiRemoveClient,
    apiProjectsByClient
};