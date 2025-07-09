import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CreateProject from '../pages/CreateProject';
import ProjectList from '../pages/ProjectList';
import ProtectedRoute from './ProctedRoutes'; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/allproject"
        element={
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
