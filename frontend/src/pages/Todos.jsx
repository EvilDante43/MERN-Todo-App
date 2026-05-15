import { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Circle,
  Calendar,
  Filter,
  CheckSquare
} from 'lucide-react';
import Spinner from '../components/Spinner';

const Todos = () => {
  const { todos, fetchTodos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } = useContext(TodoContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleOpenModal = (todo = null) => {
    if (todo) {
      setEditMode(true);
      setCurrentTodoId(todo._id);
      setFormData({
        title: todo.title,
        description: todo.description || '',
        priority: todo.priority || 'Medium',
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setEditMode(false);
      setCurrentTodoId(null);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateTodo(currentTodoId, formData);
    } else {
      await addTodo(formData);
    }
    handleCloseModal();
  };

  // Filter and Search logic
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'completed') return matchesSearch && todo.completed;
    if (filter === 'pending') return matchesSearch && !todo.completed;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Tasks</h1>
          <p className="text-slate-400 text-sm">Manage and organize your tasks</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors font-medium shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : filteredTodos.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckSquare size={32} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-slate-300 mb-2">No tasks found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            {searchTerm || filter !== 'all' 
              ? "We couldn't find any tasks matching your filters. Try adjusting them." 
              : "You don't have any tasks yet. Add a new task to get started!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTodos.map(todo => (
            <div 
              key={todo._id} 
              className={`bg-slate-800 border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg ${
                todo.completed ? 'border-slate-700/50 opacity-75' : 'border-slate-700 hover:border-indigo-500/50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <button 
                  onClick={() => toggleTodo(todo._id)}
                  className="flex-shrink-0 mt-1 mr-3 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg truncate ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                    {todo.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleOpenModal(todo)} className="text-slate-500 hover:text-indigo-400 transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteTodo(todo._id)} className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {todo.description && (
                <p className={`text-sm mb-4 line-clamp-2 ${todo.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                  {todo.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mt-auto pt-3 border-t border-slate-700/50">
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium flex items-center ${
                  todo.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  todo.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {todo.priority}
                </span>
                
                {todo.dueDate && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-700 overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">{editMode ? 'Edit Task' : 'Create New Task'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                <MoreVertical size={24} className="rotate-90" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="What needs to be done?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Add some details..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                  <select 
                    name="priority" 
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate" 
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer [color-scheme:dark]"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-lg shadow-indigo-500/20"
                >
                  {editMode ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
