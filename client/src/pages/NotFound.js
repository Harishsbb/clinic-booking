import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      </header>

      <section className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
        <p className="muted">
          You may have followed an outdated link or typed the address incorrectly.
        </p>
        <div className="actions-row" style={{ justifyContent: 'flex-start', marginTop: 16 }}>
          <Link className="btn primary" to="/">
            Go back home
          </Link>
        </div>
      </section>
    </div>
  );
}








