import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {registerApi} from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerApi(data.email,data.password);
      login(res.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed');
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
      }}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
      

        <div>
          <input
            {...register('email')}
            placeholder="Email"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              padding: '0.5rem'
            }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
        </div>

        <div>
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
          {errors.password && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password.message}</p>}
        </div>

        <div>
          <input
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            type="password"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              padding: '0.5rem'
            }}
          />
          {errors.confirmPassword && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.confirmPassword.message}</p>}
        </div>

        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
          marginTop: '0.5rem'
        }}>
          Sign Up
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
        }} onClick={()=>navigate('/')}>Go To Login</p>
      </form>
    </div>
  );
}