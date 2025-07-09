// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { API } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './CreateProject';
import TaskForm from '../components/TaskForm';
import TaskListModal from '../components/TaskList';

type Project = {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
};

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showTaskListModal, setShowTaskListModal] = useState(false);
  const [taskProjectId, setTaskProjectId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleCreateTaskClick = (projectId: string) => {
    setTaskProjectId(projectId);
    setShowCreateTaskModal(true);
  };

  const handleCloseCreateTaskModal = () => {
    setTaskProjectId(null);
    setShowCreateTaskModal(false);
  };

  const handleViewTasks = (projectId: string) => {
    setTaskProjectId(projectId);
    setShowTaskListModal(true);
  };

  const handleCloseTaskListModal = () => {
    setTaskProjectId(null);
    setShowTaskListModal(false);
  };

  const handleDeleteProject = async (projectId: string) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    await API.delete(`/projects/${projectId}`);
    fetchProjects(); // refresh the list after deletion
  } catch (err) {
    console.error("Failed to delete project:", err);
    alert("Could not delete project.");
  }
};

  // Styles
  const containerStyle: React.CSSProperties = { padding: '20px' };
  const titleStyle: React.CSSProperties = { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' };
  const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };
  const projectTitleStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 600 };
  const descriptionStyle: React.CSSProperties = { fontSize: '14px', color: '#555', margin: '8px 0' };
  const statusStyle: React.CSSProperties = { fontSize: '13px', color: '#2563eb', textTransform: 'capitalize' };
  const actionButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    marginTop: '8px',
    marginRight: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '14px',
  };
  const modalOverlay: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  };
  const modalContent: React.CSSProperties = {
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

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Your Projects</h1>

      <div style={gridStyle}>
        {projects.map((project) => (
          <div
            key={project._id}
            style={cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <h2 style={projectTitleStyle}>{project.title}</h2>
            <p style={descriptionStyle}>{project.description}</p>
            <span style={statusStyle}>{project.status}</span>

            <button
  style={{ ...actionButtonStyle, backgroundColor: '#2563eb', marginLeft: '5rem' }}
  onClick={() => handleEditClick(project)}
>
  Update Project
</button>

<button
  style={{ ...actionButtonStyle, backgroundColor: '#22c55e' }}
  onClick={() => handleViewTasks(project._id)}
>
  View Tasks
</button>

<button
  style={{ ...actionButtonStyle, backgroundColor: '#f59e0b' }}
  onClick={() => handleCreateTaskClick(project._id)}
>
  Create Task
</button>

<button
  style={{ ...actionButtonStyle, backgroundColor: '#ef4444' }}
  onClick={() => handleDeleteProject(project._id)}
>
  Delete
</button>
          </div>
        ))}
      </div>

      <p
        onClick={() => navigate('/dashboard')}
        style={{ marginTop: '20px', color: '#2563eb', cursor: 'pointer' }}
      >
        Go back To Dashboard
      </p>

      {/* Update Project Modal */}
      {showModal && selectedProject && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <span style={closeBtnStyle} onClick={handleCloseModal}>&times;</span>
            <h2 style={{ marginBottom: '10px' }}>Update Project</h2>
            <ProjectForm
              initialData={selectedProject}
              onSuccess={() => {
                fetchProjects();
                handleCloseModal();
              }}
            />
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTaskModal && taskProjectId && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <span style={closeBtnStyle} onClick={handleCloseCreateTaskModal}>&times;</span>
            <h2 style={{ marginBottom: '10px' }}>Create Task</h2>
            <TaskForm
              project={taskProjectId}
              onSuccess={handleCloseCreateTaskModal}
            />
          </div>
        </div>
      )}

      {/* View Task Modal */}
      {showTaskListModal && taskProjectId && (
        <TaskListModal
          projectId={taskProjectId}
          onClose={handleCloseTaskListModal}
        />
      )}
    </div>
  );
};

export default ProjectList;
