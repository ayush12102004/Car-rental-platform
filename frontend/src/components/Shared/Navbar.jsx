import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Car, User, LogOut, LayoutDashboard, 
  Heart, Calendar, ChevronDown 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';
import Button from '../UI/Button';
import { NAV_LINKS, APP_NAME } from '../../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, userProfile, isVendor, isAdmin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const getDashboardLink = () => {
    if (isAdmin()) return '/admin/dashboard';
    if (isVendor()) return '/vendor/dashboard';
    return '/renter/dashboard';
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <Link to="/vendor/add-car">
                  <Button variant="outline" size="sm">
                    List Your Car
                  </Button>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {userProfile?.displayName?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-900">{userProfile?.displayName}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/renter/bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                      >
                        <Calendar className="w-4 h-4" />
                        My Bookings
                      </Link>
                      
                      <Link
                        to="/renter/favorites"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                      >
                        <Heart className="w-4 h-4" />
                        Favorites
                      </Link>
                      
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      
                      <div className="border-t mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-slide-down">
          <div className="container-custom py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 hover:text-primary font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t pt-4 space-y-3">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                      {userProfile?.displayName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium">{userProfile?.displayName}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-600 hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/vendor/add-car"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      List Your Car
                    </Button>
                  </Link>
                  
                  <Button
                    variant="danger"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
