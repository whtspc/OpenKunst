import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Login.css';

export function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No invitation token provided');
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from('invitations')
        .select('*')
        .eq('token', token)
        .is('accepted_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (queryError || !data) {
        setError('Invalid or expired invitation');
        setLoading(false);
        return;
      }

      setEmail(data.email);
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);

    // Sign up the user
    const { error: signUpError } = await supabase.auth.signUp({
      email: email!,
      password,
      options: {
        data: {
          display_name: displayName || undefined,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setSubmitting(false);
      return;
    }

    // Mark invitation as accepted
    await supabase
      .from('invitations')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token!);

    // Redirect to home
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div className="login">
        <div className="login__container">
          <p style={{ textAlign: 'center' }}>Verifying invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !email) {
    return (
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <h1 className="login__title">Invalid Invitation</h1>
          </div>
          <div className="login__error">{error}</div>
          <Link to="/login" className="login__back" style={{ marginTop: '1.5rem' }}>
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">Welcome to OpenKunst</h1>
          <p className="login__subtitle">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          {error && (
            <div className="login__error">
              {error}
            </div>
          )}

          <div className="login__field">
            <label className="login__label">Email</label>
            <input
              type="email"
              value={email || ''}
              className="login__input"
              disabled
            />
          </div>

          <div className="login__field">
            <label htmlFor="displayName" className="login__label">Display Name (optional)</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="login__input"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__input"
              placeholder="At least 6 characters"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="login__field">
            <label htmlFor="confirmPassword" className="login__label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login__input"
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="login__button"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
