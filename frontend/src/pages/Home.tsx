import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#282828] to-[#121212] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
          Bienvenido a Rockola
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Tu música, tu ambiente, tu control.
        </p>

        <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-[#1db954]">★</span> Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder para contenido destacado */}
            {[1, 2, 3].map(item => (
              <div
                key={item}
                className="bg-[#282828] rounded-lg p-4 hover:bg-[#333333] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square bg-[#1db954]/10 rounded-md mb-4"></div>
                <h3 className="text-white font-medium mb-2">
                  Título de Ejemplo
                </h3>
                <p className="text-gray-400 text-sm">Descripción breve</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
