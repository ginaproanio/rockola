import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a Rockola</h1>
      <p>Tu música, tu ambiente, tu control.</p>
      <div className="featured-content">
        <h2>Destacados</h2>
        <div className="featured-grid">
          {/* Aquí se puede agregar el contenido destacado más adelante */}
        </div>
      </div>
    </div>
  )
}

export default Home
