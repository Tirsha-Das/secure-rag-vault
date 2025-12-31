import { useState } from 'react'
import './Login.css'
import { loginApi } from '../api/auth.api'
import { saveAuth } from '../utils/token'
import type { LoginFormData } from '../auth/auth.types'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from './GoogleLogin'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await loginApi(formData)

      saveAuth(data.token, data.user)

      // ✅ Redirect to FRONTEND protected page
      navigate('/profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <GoogleLogin />
      </form>
    </div>
  )
}

export default Login
