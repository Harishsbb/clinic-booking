import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook to real auth later
    alert('Login is not wired yet. This is a UI placeholder.');
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Login</h1>
        <p>Access your clinic account.</p>
      </header>

      <section className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          <div className="actions-row">
            <button type="submit" className="btn primary">
              Sign in
            </button>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            No account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
    </div>
  );
}








