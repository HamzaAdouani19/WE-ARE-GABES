
import { useState, type FormEvent } from 'react';
import { useAdminAuth } from '../AdminAuthContext';

export default function AdminLogin() {
  const { signIn, authError, clearAuthError } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) return;

    setIsSubmitting(true);
    clearAuthError();

    try {
      await signIn(email, password);
    } catch {
      // The authentication context exposes the error.
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-login-mark">WG</span>
          <div>
            <h1>WE ARE GABÈS</h1>
            <p>CONTENT MANAGEMENT SYSTEM</p>
          </div>
        </div>

        <div className="admin-login-heading">
          <span className="admin-eyebrow">ADMINISTRATION</span>
          <h2>Welcome back.</h2>
          <p>Sign in to manage your digital experience.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-field">
            <label htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="admin-password">Password</label>

            <div className="admin-password-field">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {authError && (
            <div className="admin-login-error" role="alert">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={isSubmitting || !email.trim() || !password}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in to dashboard'}
          </button>
        </form>

        <footer className="admin-login-footer">
          <span>WE ARE GABÈS</span>
          <span>Secure administrator access</span>
        </footer>
      </section>
    </main>
  );
}
