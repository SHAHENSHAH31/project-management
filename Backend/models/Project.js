const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
});

module.exports = mongoose.model('Project', ProjectSchema);