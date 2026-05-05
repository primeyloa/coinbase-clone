import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function SignUpPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src="/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="w-10 h-10 mx-auto" />
          </Link>
          <h1 className="heading-display text-3xl mb-2">Create your account</h1>
          <p className="text-cb-text-secondary text-sm">
            Already have an account?{' '}
            <Link to="/signin" className="text-cb-blue hover:underline font-medium">Sign in</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full name"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            error={error && !name ? 'Name is required' : ''}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={error && !email ? 'Email is required' : ''}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={error && !password ? 'Password is required' : error && password.length < 6 ? error : ''}
          />
          {error && name && email && password && password.length >= 6 && (
            <p className="text-cb-red text-xs">{error}</p>
          )}
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Create account
          </Button>
        </form>

        <p className="text-center text-xs text-cb-text-muted mt-6">
          This is a demo project. Any credentials will work.
        </p>
      </div>
    </div>
  )
}
