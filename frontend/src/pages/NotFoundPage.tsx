import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="heading-display text-display-lg mb-4">404</h1>
      <p className="text-cb-text-secondary text-lg mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="dark" size="lg">Go home</Button>
      </Link>
    </div>
  )
}
