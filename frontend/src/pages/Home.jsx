import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Car, DollarSign, Shield, 
  Star, ArrowRight, CheckCircle, Users
} from 'lucide-react';
import Button from '../components/UI/Button';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  // Features data
  const features = [
    {
      icon: Car,
      title: 'Wide Selection',
      description: 'Choose from hundreds of cars in every category - sedans, SUVs, luxury, and more.',
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Competitive rates with no hidden fees. Pay only for what you need.',
    },
    {
      icon: Shield,
      title: 'Trusted Vendors',
      description: 'All car owners are verified and rated by our community.',
    },
  ];

  // How it works steps
  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Enter your location and dates to find available cars.',
    },
    {
      number: '02',
      title: 'Compare',
      description: 'Review car details, prices, and vendor ratings.',
    },
    {
      number: '03',
      title: 'Book',
      description: 'Reserve your car with secure online payment.',
    },
    {
      number: '04',
      title: 'Drive',
      description: 'Pick up your car and enjoy your trip!',
    },
  ];

  // Sample featured cars (would come from API)
  const featuredCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 45,
      rating: 4.8,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      location: 'New York, NY',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2022,
      price: 55,
      rating: 4.9,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1568844293986-8c2e26875e7d?w=400&h=300&fit=crop',
      location: 'Los Angeles, CA',
    },
    {
      id: 3,
      make: 'BMW',
      model: '3 Series',
      year: 2023,
      price: 85,
      rating: 4.7,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      location: 'Miami, FL',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920')] bg-cover bg-center opacity-20" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Perfect <span className="text-primary">Ride</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Rent from trusted local car owners. Best prices, widest selection, seamless experience.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white p-4 md:p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Where do you want to rent?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-gray-800"
                  />
                </div>
                <Button type="submit" size="lg" icon={Search}>
                  Search Cars
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-300">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>10,000+ Happy Renters</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                <span>500+ Cars Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentMyRide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make car rental simple, affordable, and trustworthy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-light flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Cars</h2>
              <p className="text-gray-600">Most popular rentals this week</p>
            </div>
            <Link to="/search">
              <Button variant="outline" icon={ArrowRight} iconPosition="right">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`} className="card overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                    ${car.price}/day
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {car.make} {car.model} {car.year}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{car.rating}</span>
                    <span>({car.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting a car has never been easier. Just follow these simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy renters and car owners on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Browse Cars
              </Button>
            </Link>
            <Link to="/register?role=vendor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                List Your Car
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
