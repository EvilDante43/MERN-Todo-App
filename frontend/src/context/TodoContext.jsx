import { createContext, useState, useCallback } from 'react';
import api from '../utils/axios';
import { toast } from 'react-hot-toast';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get('/todos');

      setTodos(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to fetch todos'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Add todo
  const addTodo = async (todoData) => {
    try {
      const res = await api.post('/todos', todoData);

      setTodos((prev) => [res.data, ...prev]);

      toast.success('Todo added successfully');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to add todo'
      );

      return false;
    }
  };

  // Update todo
  const updateTodo = async (id, todoData) => {
    try {
      const res = await api.put(
        `/todos/${id}`,
        todoData
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? res.data : todo
        )
      );

      toast.success('Todo updated successfully');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to update todo'
      );

      return false;
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );

      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to delete todo'
      );
    }
  };

  // Toggle todo status
  const toggleTodo = async (id) => {
    try {
      const res = await api.patch(
        `/todos/${id}/toggle`
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? res.data : todo
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to toggle status'
      );
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};