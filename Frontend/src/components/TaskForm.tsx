// components/TaskForm.tsx
import React, { useState } from 'react';
import { API } from '../api/axios';

type Task = {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
};

type Props = {
  project: string;
  onSuccess: () => void;
};

const TaskForm: React.FC<Props> = ({ project, onSuccess }) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post(`/tasks`, { ...task, project });
      alert('Task created!');
      onSuccess();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Title" required style={inputStyle} />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" required style={inputStyle} />
      <select name="status" value={task.status} onChange={handleChange} style={inputStyle}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required style={inputStyle} />
      <button type="submit" style={buttonStyle}>Create Task</button>
    </form>
  );
};

export default TaskForm;
