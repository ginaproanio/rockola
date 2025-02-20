import { FC } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Home: FC = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section con imagen */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Imagen de fondo diferente según el rol */}
        <div className="absolute inset-0">
          <img 
            src={isAdmin 
              ? "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920" // Imagen para admin (consola DJ/estudio)
              : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1920" // Imagen para usuarios (personas disfrutando música)
            }
            alt="Rockola Music" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/70 to-[#121212]"></div>
        </div>

        {/* Contenido del Hero personalizado según el rol */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            {isAdmin ? (
              <>
                <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                  Panel de
                  <br />
                  Administración
                </h1>
                <p className="text-2xl text-gray-200 mb-8">
                  Gestiona el contenido musical y mantén la plataforma actualizada.
                  <span className="block mt-2 text-[#1db954]">
                    Bienvenido, {user?.username}
                  </span>
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/admin/songs"
                    className="px-8 py-4 bg-[#1db954] text-white rounded-full hover:bg-[#1ed760] transition-colors font-bold text-lg"
                  >
                    Gestionar Canciones
                  </Link>
                  <Link
                    to="/search"
                    className="px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors font-bold text-lg"
                  >
                    Explorar Catálogo
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                  Tu música,
                  <br />
                  tu momento
                </h1>
                <p className="text-2xl text-gray-200 mb-8">
                  Disfruta de tus canciones favoritas en cualquier momento y lugar.
                  <span className="block mt-2 text-[#1db954]">
                    Bienvenido, {user?.username}
                  </span>
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/search"
                    className="px-8 py-4 bg-[#1db954] text-white rounded-full hover:bg-[#1ed760] transition-colors font-bold text-lg"
                  >
                    Explorar Música
                  </Link>
                  <Link
                    to="/playlist"
                    className="px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors font-bold text-lg"
                  >
                    Mi Playlist
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sección de Características personalizada según el rol */}
      <div className="bg-[#121212] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {isAdmin 
              ? "Herramientas de Administración"
              : "Todo lo que necesitas para disfrutar tu música"
            }
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isAdmin ? (
              <>
                <FeatureCard
                  icon="🎵"
                  title="Gestión de Canciones"
                  description="Añade, edita y administra el catálogo musical."
                />
                <FeatureCard
                  icon="📊"
                  title="Panel de Control"
                  description="Monitorea y gestiona la actividad de la plataforma."
                />
                <FeatureCard
                  icon="⚙️"
                  title="Configuración"
                  description="Personaliza y optimiza la experiencia del usuario."
                />
              </>
            ) : (
              <>
                <FeatureCard
                  icon="🎵"
                  title="Biblioteca Ilimitada"
                  description="Accede a todas tus canciones favoritas en un solo lugar."
                />
                <FeatureCard
                  icon="🎯"
                  title="Búsqueda Precisa"
                  description="Encuentra exactamente lo que buscas en segundos."
                />
                <FeatureCard
                  icon="🎪"
                  title="Experiencia Premium"
                  description="Interfaz moderna y fácil de usar, diseñada para ti."
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA personalizado */}
      <div className="bg-gradient-to-t from-[#1db954]/20 to-[#121212] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {isAdmin 
              ? "¿Listo para gestionar el contenido?"
              : "¿Listo para empezar?"
            }
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {isAdmin 
              ? "Accede a todas las herramientas de administración desde un solo lugar."
              : "Únete a nuestra comunidad y descubre una nueva forma de disfrutar tu música."
            }
          </p>
          <Link
            to={isAdmin ? "/admin/songs" : "/search"}
            className="px-8 py-4 bg-[#1db954] text-white rounded-full hover:bg-[#1ed760] transition-colors font-bold text-lg inline-block"
          >
            {isAdmin ? "Ir al Panel de Gestión" : "Comenzar a Explorar"}
          </Link>
        </div>
      </div>
    </div>
  )
}

const FeatureCard: FC<{
  icon: string
  title: string
  description: string
}> = ({ icon, title, description }) => (
  <div className="bg-[#282828] p-8 rounded-lg hover:bg-[#383838] transition-colors text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
)

export default Home
