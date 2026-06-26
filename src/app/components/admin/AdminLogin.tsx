import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export function AdminLogin({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  if (isChecking) {
    return <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center">Cargando...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Julio Puig Real Estate" className="h-16 mb-4 object-contain rounded-lg shadow-sm" />
          <h1 className="text-2xl font-bold text-[#1A365D]" style={{ fontFamily: 'var(--font-display)' }}>
            Panel de Gestión
          </h1>
          <p className="text-sm text-gray-500 mt-2">Introduce la contraseña para acceder</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-md border border-gray-200 outline-none focus:border-[#C9A84C] transition-colors"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#1A365D] text-white font-semibold tracking-wide hover:bg-[#1A365D]/90 transition-colors mt-2"
          >
            Acceder
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <a href="/" className="text-sm text-[#C9A84C] hover:underline">Volver al sitio web</a>
        </div>
      </div>
    </div>
  );
}
