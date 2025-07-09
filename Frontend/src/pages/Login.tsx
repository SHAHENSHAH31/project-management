import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {loginApi} from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function Login() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const res = await loginApi(data.email,data.password)
      login(res.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '28rem',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '1rem'
      }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <input 
          {...register('email')} 
          placeholder="Email" 
          style={{
            width: '100%',
            border: '1px solid #ccc',
            padding: '0.5rem'
          }} 
        />
        <input 
          {...register('password')} 
          placeholder="Password" 
          type="password" 
          style={{
            width: '100%',
            border: '1px solid #ccc',
            padding: '0.5rem'
          }} 
        />
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Login
        </button>
        <p style={{
          backgroundColor: '#3b82f6',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer'
        }} onClick={()=>navigate('/register')}>Go To Register</p>
      </form>
    </div>
  );
}