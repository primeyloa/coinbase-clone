import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function SignInPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    await login(email, password)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src="/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="w-10 h-10 mx-auto" />
          </Link>
          <h1 className="heading-display text-3xl mb-2">Sign in to Coinbase</h1>
          <p className="text-cb-text-secondary text-sm">
            Not a Coinbase user?{' '}
            <Link to="/signup" className="text-cb-blue hover:underline font-medium">Sign up</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={error && !password ? 'Password is required' : ''}
          />
          {error && email && password && <p className="text-cb-red text-xs">{error}</p>}
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign in
          </Button>
        </form>

        <p className="text-center text-xs text-cb-text-muted mt-6">
          This is a demo project. Any email/password will work.
        </p>
      </div>
    </div>
  )
}
