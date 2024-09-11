import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';

import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  // Import from auth context api
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    // GUARD CLAUSE - check inputs
    if (email && password) {
      // Fake Login
      login(email, password);
      // // Reset form inputs after submission
      // setEmail('');
      // setPassword('');
    }
  }

  useEffect(
    function () {
      // Redirect to dashboard if user is authenticated
      if (isAuthenticated) {
        // Redirect to app layout page -  { replace: true } ensures that via browser's back button we can't go backwards - used particularly in authentication and redirect scenarios.
        navigate('/app', { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form
        className={styles.form}
        onSubmit={submitHandler}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
