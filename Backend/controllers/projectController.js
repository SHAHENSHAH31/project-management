const Project = require("../models/Project");
const Task= require('../models/Task');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {

    
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    console.log(project);

    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    
    await Task.deleteMany({ project: project._id });

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};