
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    fontFamily: 'sans-serif',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '24px',
  };

  const navButtonStyle: React.CSSProperties = {
    padding: '12px 20px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    marginBottom: '12px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  };

  const logoutButtonStyle: React.CSSProperties = {
    ...navButtonStyle,
    backgroundColor: '#ef4444', 
  };

  const navButtonHoverStyle = {
    backgroundColor: '#1d4ed8',
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#dc2626',
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Dashboard</h1>

        <button
          style={navButtonStyle}
          onClick={() => navigate('/project')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, navButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: '#2563eb' })}
        >
          Create Project
        </button>

        <button
          style={navButtonStyle}
          onClick={() => navigate('/allproject')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, navButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: '#2563eb' })}
        >
          User Project List
        </button>

        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, logoutButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: '#ef4444' })}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
