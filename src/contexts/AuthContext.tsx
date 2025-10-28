import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MockUser = {
  id: string;
  email: string;
  full_name: string;
  role: 'patient' | 'doctor' | 'admin';
};

interface AuthContextType {
  user: MockUser | null;
  session: { user: MockUser } | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<{ user: MockUser } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('mock_session');
    if (raw) {
      const parsed = JSON.parse(raw) as { user: MockUser };
      setSession(parsed);
      setUser(parsed.user);
    } else {
      // Auto-create a guest patient session so the app works without manual sign-in
      const mockUser: MockUser = {
        id: generateId(),
        email: 'guest@local',
        full_name: 'Guest',
        role: 'patient',
      };
      const mockSession = { user: mockUser };
      localStorage.setItem('mock_session', JSON.stringify(mockSession));
      setUser(mockUser);
      setSession(mockSession);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const mockUser: MockUser = {
      id: generateId(),
      email,
      full_name: fullName,
      role: 'patient',
    };
    const mockSession = { user: mockUser };
    localStorage.setItem('mock_session', JSON.stringify(mockSession));
    setUser(mockUser);
    setSession(mockSession);
    navigate('/');
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const raw = localStorage.getItem('mock_session');
    if (raw) {
      const parsed = JSON.parse(raw) as { user: MockUser };
      if (parsed.user.email === email) {
        setUser(parsed.user);
        setSession(parsed);
        navigate('/');
        return { error: null };
      }
    }
    const mockUser: MockUser = {
      id: generateId(),
      email,
      full_name: email.split('@')[0],
      role: 'patient',
    };
    const mockSession = { user: mockUser };
    localStorage.setItem('mock_session', JSON.stringify(mockSession));
    setUser(mockUser);
    setSession(mockSession);
    navigate('/');
    return { error: null };
  };

  function generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    // Fallback UUID v4-ish
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const signOut = async () => {
    localStorage.removeItem('mock_session');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
