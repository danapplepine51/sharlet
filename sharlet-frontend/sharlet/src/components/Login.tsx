import { useState } from 'react';
import API from '../services/API';

interface LoginProps {
  onLogin: (user: any) => void;
  onSwitchToSignup: () => void;
  showError: (message: string) => void;
}

export default function Login({ onLogin, onSwitchToSignup, showError }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/api/v1/auth', {
        username,
        password,
      }, { withCredentials: true });
      onLogin(res.data);
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      showError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
