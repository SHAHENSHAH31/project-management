const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getTasks = async (req, res) => {
  
    
  const { projectId, page = 1, limit = 10 } = req.query;


  const filter = { project: projectId };

  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ dueDate: 1 }); 

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.body.project, user: req.user.id });
    if (!project) return res.status(403).json({ error: 'Unauthorized' });
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
  
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};