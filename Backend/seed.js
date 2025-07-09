const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const hashedPassword = await bcrypt.hash('Test@123', 10);
    const user = await User.create({ email: 'test@example.com', password: hashedPassword });

    for (let i = 1; i <= 2; i++) {
      const project = await Project.create({
        user: user._id,
        title: `Project ${i}`,
        description: `Description for Project ${i}`,
        status: 'active',
      });

      for (let j = 1; j <= 3; j++) {
        await Task.create({
          project: project._id,
          title: `Task ${j} for Project ${i}`,
          description: `This is task ${j} of project ${i}`,
          status: 'todo',
          dueDate: new Date(),
        });
      }
    }

    console.log('Seed data created successfully.');
    process.exit();
  } catch (error) {
    console.error('Error while seeding data:', error);
    process.exit(1);
  }
}

seed();