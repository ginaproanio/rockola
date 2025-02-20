import { FC, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Header: FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-[#282828] px-8 py-4 relative">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-[#1db954] transition-colors"
        >
          Rockola
        </Link>
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-white hover:text-[#1db954] transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/playlist"
            className="text-white hover:text-[#1db954] transition-colors"
          >
            Lista
          </Link>
          <Link
            to="/search"
            className="text-white hover:text-[#1db954] transition-colors"
          >
            Búsqueda
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin/songs"
              className="text-white hover:text-[#1db954] transition-colors"
            >
              Gestionar Canciones
            </Link>
          )}
          
          {/* User Menu */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-white hover:text-[#1db954] transition-colors focus:outline-none"
              >
                <span className="text-sm font-medium">{user.username}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282828] ring-1 ring-black ring-opacity-5 z-50">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#1db954] transition-colors"
                      role="menuitem"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
