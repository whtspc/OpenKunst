import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AcceptInvite } from './pages/AcceptInvite';
import { AdminInvitations } from './pages/AdminInvitations';
import { AdminSubmissions } from './pages/AdminSubmissions';
import { NewSubmission } from './pages/NewSubmission';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accept-invite" element={<AcceptInvite />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminInvitations /></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute requireAdmin><AdminSubmissions /></ProtectedRoute>} />
          <Route path="/admin/submissions/new" element={<ProtectedRoute requireAdmin><NewSubmission /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
