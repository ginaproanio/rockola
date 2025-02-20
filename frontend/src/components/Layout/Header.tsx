import { FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          Rockola
        </Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/playlist">Lista</Link>
          <Link to="/search">Buscar</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
