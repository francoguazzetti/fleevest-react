import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProfitabilityCalculator } from './components/ProfitabilityCalculator';
import { FeaturedCars } from './components/FeaturedCars';
import { HowItWorks } from './components/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthService from './services/auth.service';


const Home = () => (
  <>
    <Hero />
    <ProfitabilityCalculator />
    <FeaturedCars />
    <HowItWorks />
  </>
);

export default function App() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
