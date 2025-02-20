import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'  // Añadimos el campo role
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

interface LoginCredentials {
  username: string
  email: string
  password: string
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthState(prev => ({ ...prev, isAuthenticated: true }))
    }
  }, [])

  const login = async ({ username, email, password }: LoginCredentials) => {
    const userData = await authService.login(username, email, password)
    setAuthState({
      isAuthenticated: true,
      user: userData
    })
  }

  const logout = () => {
    authService.logout()
    setAuthState({
      isAuthenticated: false,
      user: null
    })
  }

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState,
        login,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
