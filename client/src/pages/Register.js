import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook to real registration later
    alert('Register is not wired yet. This is a UI placeholder.');
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Register</h1>
        <p>Create a new clinic account.</p>
      </header>

      <section className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">Name</label>
            <input
              id="reg-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create a password"
            />
          </div>
          <div className="actions-row">
            <button type="submit" className="btn primary">
              Create account
            </button>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
}








