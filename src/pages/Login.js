import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLoggingIn] = useState(false);
  const { addToast } = useToasts();

  const auth = useAuth();
  console.log('auth', auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return addToast('Please fill all the fields!', { appearance: 'error' });
    }

    const response = await auth.login(email, password);
    console.log('response', response);

    if (response.success) {
      addToast('Login Successful!', { appearance: 'success' });
    } else {
      addToast(response.message, { appearance: 'error' });
    }
    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <button disabled={logging}>
          {logging ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};
