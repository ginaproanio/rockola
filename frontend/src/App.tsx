import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import Search from './pages/Search'
import Login from './components/Auth/Login'
import './App.css'

function App() {
  console.log('Renderizando App'); // Debug
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
