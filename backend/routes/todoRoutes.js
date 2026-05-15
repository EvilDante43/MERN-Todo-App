const express = require('express');
const router = express.Router();
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTodos).post(protect, setTodo);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);
router.route('/:id/toggle').patch(protect, toggleTodoStatus);

module.exports = router;
