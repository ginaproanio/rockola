import { FC } from 'react'

const Search: FC = () => {
  return (
    <div className="search-page">
      <h1>Buscar Canciones</h1>
      <input 
        type="search" 
        placeholder="Buscar canciones..."
        className="search-input"
      />
      {/* Aquí irán los resultados de búsqueda */}
    </div>
  )
}

export default Search
