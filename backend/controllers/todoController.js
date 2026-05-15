const Todo = require('../models/Todo');

// @desc    Get todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Set todo
// @route   POST /api/todos
// @access  Private
const setTodo = async (req, res, next) => {
  try {
    if (!req.body.title?.trim()) {
      res.status(400);
      throw new Error('Please add a title field');
    }

    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority || 'Medium',
      dueDate: req.body.dueDate,
      user: req.user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after',
      }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await todo.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo status
// @route   PATCH /api/todos/:id/toggle
// @access  Private
const toggleTodoStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus
};
