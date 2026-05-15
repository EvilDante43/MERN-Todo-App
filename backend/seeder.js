const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Todo = require('./models/Todo');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Todo.deleteMany();
    await User.deleteMany();

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
    });

    // Sample todos
    const sampleTodos = [
      {
        user: demoUser._id,
        title: 'Complete project documentation',
        description:
          'Write README and API documentation for the new release.',
        priority: 'High',
        completed: false,
        dueDate: new Date(Date.now() + 86400000 * 2), // 2 days later
      },
      {
        user: demoUser._id,
        title: 'Review pull requests',
        description:
          'Review and merge pending pull requests from the team.',
        priority: 'Medium',
        completed: true,
        dueDate: new Date(Date.now() - 86400000), // yesterday
      },
      {
        user: demoUser._id,
        title: 'Plan next sprint',
        description:
          'Create Jira tickets and assign tasks for the upcoming sprint.',
        priority: 'Low',
        completed: false,
        dueDate: new Date(Date.now() + 86400000 * 5), // 5 days later
      },
    ];

    // Insert todos
    await Todo.insertMany(sampleTodos);

    console.log('Data Imported Successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed Successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run command
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}