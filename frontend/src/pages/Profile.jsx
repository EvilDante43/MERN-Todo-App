import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TodoContext } from '../context/TodoContext';
import { User, Mail, Calendar, CheckCircle2, ListTodo } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { todos } = useContext(TodoContext);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-slate-400">View your personal information and statistics</p>
      </div>

      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-800 flex items-center justify-center text-3xl font-bold text-indigo-400 shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 pb-8 px-8 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
          <p className="text-slate-400 mb-6 flex items-center gap-2">
            <Mail size={16} />
            {user?.email}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <ListTodo size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Tasks Created</p>
                <p className="text-2xl font-bold text-white">{totalCount}</p>
              </div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Tasks Completed</p>
                <p className="text-2xl font-bold text-white">{completedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3 text-slate-300">
                <User size={18} className="text-slate-500" />
                <span>Full Name</span>
              </div>
              <span className="font-medium text-white">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-slate-500" />
                <span>Email Address</span>
              </div>
              <span className="font-medium text-white">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar size={18} className="text-slate-500" />
                <span>Member Since</span>
              </div>
              <span className="font-medium text-white">
                {user?._id ? new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
