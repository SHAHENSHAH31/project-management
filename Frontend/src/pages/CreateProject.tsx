import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/axios';

type Project = {
  _id?: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
};

type Props = {
  initialData?: Project;
  onSuccess?: () => void;
};

const ProjectForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    status: 'active',
    ...(initialData || {}),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project._id) {
        await API.patch(`/projects/${project._id}`, project);
      } else {
        await API.post('/projects', project);
      }
      alert('Project saved successfully!');
      if (onSuccess) {
        onSuccess(); // Notify parent to refresh list or close modal
      }
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const formStyle: React.CSSProperties = {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Status</label>
        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8';
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
        }}
      >
        {project._id ? 'Update' : 'Create'} Project
      </button>

      <p onClick={() => navigate('/dashboard')} style={{ marginTop: '10px', cursor: 'pointer', color: '#2563eb' }}>
        Back To Dashboard
      </p>
    </form>
  );
};

export default ProjectForm;

