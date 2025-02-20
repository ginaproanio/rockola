import { FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <header className="bg-[#282828] px-8 py-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-[#1db954] transition-colors"
        >
          Rockola
        </Link>
        <div className="flex gap-8">
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
            Buscar
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
