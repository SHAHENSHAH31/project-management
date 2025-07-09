// components/TaskListModal.tsx
import React, { useEffect, useState } from 'react';
import { API } from '../api/axios';

type Task = {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
};

type Props = {
  projectId: string;
  onClose: () => void;
};

const TaskListModal: React.FC<Props> = ({ projectId, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const openEditForm = (task: Task) => {
  setEditingTask(task);

};


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        
       const res = await API.get('/tasks', {
  params: {
    projectId,
    page: 1,        
    limit: 10      
  }
})

console.log('============>',res);
        setTasks(res.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleDelete = async (taskId: string) => {
  try {
    await API.delete(`/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  } catch (err) {
    console.error('Error deleting task:', err);
  }
};

// const handleUpdate = (task: Task) => {
//   // You can open an update modal or redirect to an edit page
//   console.log('Edit task:', task);
// };

  const modalOverlay: React.CSSProperties = {
  
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  };

   const modalOverlay1: React.CSSProperties = {
  
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  };


  const modalContent: React.CSSProperties = {
    maxHeight:'80%',
      overflowY:'scroll',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
  };


   const modalContent1: React.CSSProperties = {
   
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
  };


  const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '14px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#999',
    cursor: 'pointer',
  };

  const taskStyle: React.CSSProperties = {
   
    
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '12px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
  };

  const descStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
  };

  const statusStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#2563eb',
    textTransform: 'capitalize',
  };

  return (
    <>
    <div style={modalOverlay}>
      <div style={modalContent}>
        <span style={closeBtnStyle} onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: '10px' }}>Tasks</h2>
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found for this project.</p>
        ) : (
         tasks.map((task) => (
  <div key={task._id} style={taskStyle}>
    <h3 style={titleStyle}>{task.title}</h3>
    <p style={descStyle}>{task.description}</p>
    <p style={statusStyle}>Status: {task.status}</p>
    <p style={descStyle}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>

    {/* Buttons */}
    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
      <button
  style={{ background: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none' }}
  onClick={() => openEditForm(task)}
>
  Update
</button>

      <button
        style={{ background: '#dc2626', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none' }}
        onClick={() => handleDelete(task._id)}
      >
        Delete
      </button>
    </div>
  </div>
))

        )}
      </div>

   

    </div>
      {editingTask && (
  <div style={modalOverlay1}>
    <div style={modalContent1}>
      <h2>Edit Task</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;

          const updatedTask = {
            title: (form.elements.namedItem('title') as HTMLInputElement).value,
            description: (form.elements.namedItem('description') as HTMLInputElement).value,
            status: (form.elements.namedItem('status') as HTMLSelectElement).value,
            dueDate: (form.elements.namedItem('dueDate') as HTMLInputElement).value,
          };

          try {
            // API call to update task
            console.log('editing========>',editingTask._id,updatedTask);
            const res = await API.patch(`/tasks/${editingTask._id}`, updatedTask);

            // Update local task state
            setTasks((prevTasks) =>
              prevTasks.map((t) => (t._id === editingTask._id ? res.data : t))
            );

            // Close the edit form
            setEditingTask(null);
          } catch (err) {
            console.error('Error updating task:', err);
            alert('Failed to update task.');
          }
        }}
      >
        <input
          name="title"
          defaultValue={editingTask.title}
          placeholder="Title"
          required
          style={{ marginBottom: 10, width: '100%' }}
        />

        <textarea
          name="description"
          defaultValue={editingTask.description}
          placeholder="Description"
          style={{ marginBottom: 10, width: '100%' }}
        />

        <select
          name="status"
          defaultValue={editingTask.status}
          style={{ marginBottom: 10, width: '100%' }}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          type="date"
          name="dueDate"
          defaultValue={editingTask.dueDate?.slice(0, 10)}
          required
          style={{ marginBottom: 10, width: '100%' }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingTask(null)}
            style={{ backgroundColor: '#aaa', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

</>
  );
};

export default TaskListModal;
