// App Configuration
export const APP_NAME = 'RentMyRide';
export const APP_DESCRIPTION = 'Find your perfect car rental from trusted local owners';

// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// User Roles
export const USER_ROLES = {
  RENTER: 'renter',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Car Status
export const CAR_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  DELETED: 'deleted',
};

// Car Categories
export const CAR_CATEGORIES = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'sports', label: 'Sports' },
  { value: 'van', label: 'Van' },
  { value: 'truck', label: 'Truck' },
];

// Transmission Types
export const TRANSMISSION_TYPES = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

// Fuel Types
export const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
];

// Seating Capacity Options
export const SEATING_CAPACITY = [
  { value: 2, label: '2 Seats' },
  { value: 4, label: '4 Seats' },
  { value: 5, label: '5 Seats' },
  { value: 7, label: '7 Seats' },
  { value: 8, label: '8+ Seats' },
];

// Car Features
export const CAR_FEATURES = [
  { value: 'ac', label: 'Air Conditioning', icon: 'Snowflake' },
  { value: 'gps', label: 'GPS Navigation', icon: 'Navigation' },
  { value: 'bluetooth', label: 'Bluetooth', icon: 'Bluetooth' },
  { value: 'backup-camera', label: 'Backup Camera', icon: 'Camera' },
  { value: 'sunroof', label: 'Sunroof', icon: 'Sun' },
  { value: 'usb-charger', label: 'USB Charger', icon: 'Usb' },
  { value: 'heated-seats', label: 'Heated Seats', icon: 'Flame' },
  { value: 'cruise-control', label: 'Cruise Control', icon: 'Gauge' },
  { value: 'child-seat', label: 'Child Seat', icon: 'Baby' },
  { value: 'pet-friendly', label: 'Pet Friendly', icon: 'Dog' },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

// Pagination
export const ITEMS_PER_PAGE = 12;

// Image Configuration
export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MIN_CAR_PHOTOS: 3,
  MAX_CAR_PHOTOS: 10,
};

// Rental Configuration
export const RENTAL_CONFIG = {
  MIN_DAYS: 1,
  MAX_DAYS: 30,
  PLATFORM_FEE_PERCENT: 10,
  CANCELLATION_HOURS: 24,
};

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Browse Cars', href: '/search' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
];

// Dashboard Links for Vendor
export const VENDOR_DASHBOARD_LINKS = [
  { label: 'Dashboard', href: '/vendor/dashboard', icon: 'LayoutDashboard' },
  { label: 'My Cars', href: '/vendor/cars', icon: 'Car' },
  { label: 'Bookings', href: '/vendor/bookings', icon: 'Calendar' },
  { label: 'Earnings', href: '/vendor/earnings', icon: 'DollarSign' },
  { label: 'Reviews', href: '/vendor/reviews', icon: 'Star' },
];

// Dashboard Links for Renter
export const RENTER_DASHBOARD_LINKS = [
  { label: 'Dashboard', href: '/renter/dashboard', icon: 'LayoutDashboard' },
  { label: 'My Trips', href: '/renter/bookings', icon: 'Calendar' },
  { label: 'Favorites', href: '/renter/favorites', icon: 'Heart' },
];

// Status Colors
export const STATUS_COLORS = {
  [BOOKING_STATUS.PENDING]: 'badge-warning',
  [BOOKING_STATUS.CONFIRMED]: 'badge-primary',
  [BOOKING_STATUS.IN_PROGRESS]: 'badge-primary',
  [BOOKING_STATUS.COMPLETED]: 'badge-success',
  [BOOKING_STATUS.CANCELLED]: 'badge-error',
};
