import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Layout Components
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Loading from './components/UI/Loading';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from './pages/Search';
import VendorDashboard from './pages/VendorDashboard';
import AddCar from './pages/AddCar';
import CarDetail from './pages/CarDetail';
import RenterDashboard from './pages/RenterDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userProfile, loading, hasRole } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout with Navbar and Footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

// Auth Layout (no navbar/footer)
const AuthLayout = ({ children }) => (
  <div className="min-h-screen">{children}</div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      {/* Search & Browse */}
      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />

      {/* Car Detail */}
      <Route
        path="/cars/:id"
        element={
          <MainLayout>
            <CarDetail />
          </MainLayout>
        }
      />

      {/* Protected Renter Routes */}
      <Route
        path="/renter/dashboard"
        element={
          <ProtectedRoute requiredRole="renter">
            <MainLayout>
              <RenterDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/renter/bookings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="container-custom py-8">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/renter/favorites"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="container-custom py-8">
                <h1 className="text-2xl font-bold">My Favorites</h1>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected Vendor Routes */}
      <Route
        path="/vendor/dashboard"
        element={
          <ProtectedRoute requiredRole="vendor">
            <MainLayout>
              <VendorDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/add-car"
        element={
          <ProtectedRoute requiredRole="vendor">
            <MainLayout>
              <AddCar />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="container-custom py-8">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Static Pages */}
      <Route
        path="/how-it-works"
        element={
          <MainLayout>
            <div className="container-custom py-8">
              <h1 className="text-2xl font-bold">How It Works</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <div className="container-custom py-8">
              <h1 className="text-2xl font-bold">About Us</h1>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </MainLayout>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <MainLayout>
            <div className="container-custom py-20 text-center">
              <h1 className="text-6xl font-bold text-gray-300">404</h1>
              <p className="text-xl text-gray-600 mt-4">Page not found</p>
            </div>
          </MainLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
