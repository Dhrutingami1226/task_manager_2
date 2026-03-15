import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:3001/api/v1/tasks', 
        {
          title,
          description,
          status: 'pending'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle('');
      setDescription('');
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setError('');
    setShowEditModal(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);

    try {
      await axios.put(`http://localhost:3001/api/v1/tasks/${editingTask._id}`, 
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle('');
      setDescription('');
      setEditingTask(null);
      setShowEditModal(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:3001/api/v1/tasks/${taskId}`, 
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-left">
          <h1 className="nav-title">Task Manager</h1>
        </div>
        <div className="nav-right">
          <span className="user-info">Welcome, {user?.name || user?.email} 
            {user?.role && <span className="role-badge" style={{marginLeft: '8px', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', backgroundColor: user.role === 'admin' ? '#ff6b6b' : '#4ecdc4', color: 'white'}}>
              {user.role.toUpperCase()}
            </span>}
          </span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <div className="welcome-section">
            <p>Hello {user?.name || user?.email}! 👋</p>
            <p>Welcome to your Task Manager. Start organizing your tasks by clicking the button below.</p>
            
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-number">{totalTasks}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{completedTasks}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{pendingTasks}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowModal(true);
                setTitle('');
                setDescription('');
                setError('');
              }}
              className="btn-primary btn-large"
            >
              Create New Task
            </button>
          </div>
        </div>

        <section className="tasks-section">
          <h3>Your Tasks</h3>
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Create one to get started! 📋</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task._id} className={`task-item task-${task.status}`}>
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <span className={`task-status status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-actions">
                    {task.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="btn-edit"
                        >
                          Edit ✎
                        </button>
                        <button 
                          onClick={() => handleCompleteTask(task._id)}
                          className="btn-complete"
                        >
                          Mark Complete ✓
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn-delete"
                    >
                      Delete ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleCreateTask} className="task-form">
              <div className="form-group">
                <label htmlFor="task-title">Task Title *</label>
                <input
                  id="task-title"
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                  id="task-description"
                  name="description"
                  placeholder="Enter task description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Task</h2>
              <button 
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleUpdateTask} className="task-form">
              <div className="form-group">
                <label htmlFor="edit-task-title">Task Title *</label>
                <input
                  id="edit-task-title"
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-task-description">Description</label>
                <textarea
                  id="edit-task-description"
                  name="description"
                  placeholder="Enter task description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

