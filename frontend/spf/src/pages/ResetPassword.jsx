import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg('Passwords do not match');
      return;
    }

    const res = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
