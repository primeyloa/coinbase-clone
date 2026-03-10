import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PricesPage from './pages/PricesPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import TradePage from './pages/TradePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"          element={<HomePage />} />
            <Route path="/prices"    element={<PricesPage />} />
            <Route path="/trade"     element={<TradePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*"          element={<NotFoundPage />} />
          </Route>
          {/* Auth pages without nav/footer */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
