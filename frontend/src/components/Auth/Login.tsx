import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { LoginCredentials } from '../../context/types'

type FormField = keyof LoginCredentials

interface FormError {
  field: FormField
  message: string
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormError[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormError[] = []

    const validators: Record<FormField, () => string | null> = {
      username: () =>
        !formData.username.trim() ? 'Username is required' : null,
      email: () => {
        if (!formData.email.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Invalid email format'
        return null
      },
      password: () => {
        if (!formData.password) return 'Password is required'
        if (formData.password.length < 6)
          return 'Password must be at least 6 characters'
        return null
      },
    }

    Object.entries(validators).forEach(([field, validate]) => {
      const error = validate()
      if (error) {
        newErrors.push({ field: field as FormField, message: error })
      }
    })

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
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed'
      setErrors([{ field: 'username', message: errorMessage }])
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (field: FormField): string | undefined => {
    return errors.find(error => error.field === field)?.message
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl text-white mb-6 text-center">
          Login to Rockola
        </h2>

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded">
            {errors.map((error, index) => (
              <p key={`${error.field}-${index}`}>{error.message}</p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {[
            { name: 'username', type: 'text', placeholder: 'Username' },
            { name: 'email', type: 'email', placeholder: 'Email' },
            { name: 'password', type: 'password', placeholder: 'Password' },
          ].map(field => (
            <div key={field.name}>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as FormField]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className={`w-full p-2 rounded bg-gray-700 text-white 
                  ${getFieldError(field.name as FormField) ? 'border-red-500' : 'border-transparent'}`}
                aria-invalid={!!getFieldError(field.name as FormField)}
              />
              {getFieldError(field.name as FormField) && (
                <p className="text-red-500 text-sm mt-1">
                  {getFieldError(field.name as FormField)}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
