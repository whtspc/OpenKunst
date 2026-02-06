import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './QuickSubmitFAB.css';

export function QuickSubmitFAB() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Link to="/admin/submissions/new" className="quick-submit-fab" aria-label="Submit new sculpture">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    </Link>
  );
}
