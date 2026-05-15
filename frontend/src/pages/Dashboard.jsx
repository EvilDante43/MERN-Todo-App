import { useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { todos, fetchTodos, loading } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const progress = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  const stats = [
    { label: 'Total Tasks', value: totalTodos, icon: <ListTodo size={24} className="text-blue-400" />, bg: 'bg-blue-500/10' },
    { label: 'Completed', value: completedTodos, icon: <CheckCircle2 size={24} className="text-emerald-400" />, bg: 'bg-emerald-500/10' },
    { label: 'Pending', value: pendingTodos, icon: <Clock size={24} className="text-amber-400" />, bg: 'bg-amber-500/10' },
    { label: 'Progress', value: `${progress}%`, icon: <TrendingUp size={24} className="text-purple-400" />, bg: 'bg-purple-500/10' },
  ];

  const recentTodos = todos.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-slate-400">Here's an overview of your tasks today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
          <span className="text-indigo-400 font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-slate-400 text-sm">
          {progress === 100
            ? "Amazing! You've completed all your tasks."
            : "Keep going! You're making good progress."}
        </p>
      </div>

      {/* Recent Todos */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
          <Link to="/todos" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
            View All
          </Link>
        </div>

        {recentTodos.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No tasks found. <Link to="/todos" className="text-indigo-400 hover:underline">Create one now</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {recentTodos.map(todo => (
              <div key={todo._id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${todo.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span className={`font-medium ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {todo.title}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${todo.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                    todo.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                  }`}>
                  {todo.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
