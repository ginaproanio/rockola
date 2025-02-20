import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface LoginFormData {
  username: string
  email: string
  password: string
}

interface FormError {
  field: keyof LoginFormData
  message: string
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormError[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormError[] = []

    if (!formData.username.trim()) {
      newErrors.push({ field: 'username', message: 'Username is required' })
    }

    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' })
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Invalid email format' })
    }

    if (!formData.password) {
      newErrors.push({ field: 'password', message: 'Password is required' })
    } else if (formData.password.length < 6) {
      newErrors.push({ field: 'password', message: 'Password must be at least 6 characters' })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setIsLoading(true)
      await login(formData)
      navigate('/')
    } catch (error) {
      setErrors([{ 
        field: 'username', 
        message: error instanceof Error ? error.message : 'Login failed' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white mb-6 text-center">Login to Rockola</h2>
        
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded">
            {errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
