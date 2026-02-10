# Technical Implementation Prompt
## Car Rental Platform - RentMyRide

**Use this prompt with AI coding assistants or as a development guide**

---

## Project Overview

Build a full-stack car rental marketplace web application where:
- **Vendors** can list their cars with pricing and availability
- **Renters** can search, browse, and book cars using a calendar-based reservation system
- **Admins** can manage users, listings, and platform operations

---

## Tech Stack

### Frontend
- React 18+ with React Router v6
- UI: Material-UI or Tailwind CSS
- State Management: React Context API / Redux Toolkit
- Form Handling: React Hook Form
- Date Picker: react-datepicker
- Image Upload: react-dropzone
- HTTP Client: Axios

### Backend
- Node.js 18+ with Express.js
- RESTful API architecture
- Middleware: CORS, helmet, morgan

### Database & Services
- **Firebase Authentication** for user management
- **Firebase Firestore** for database (NoSQL)
- **Firebase Storage** for image hosting
- **Stripe** for payment processing

### Deployment
- Frontend: Vercel / Netlify / Firebase Hosting
- Backend: Render / Railway / Heroku
- Database: Firebase (managed)

---

## Core Features to Implement

### 1. User Authentication & Roles
**Requirements:**
- Email/password registration with email verification
- Google OAuth (optional)
- Password reset functionality
- Three user roles: Renter, Vendor, Admin
- Users can have multiple roles (both Renter and Vendor)
- Role-based access control (RBAC)

**Implementation:**
```javascript
// User roles stored in Firestore
roles: ["renter", "vendor"] // or ["admin"]

// Check role in middleware
const hasRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.userProfile.roles.includes(requiredRole)) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};
```

**Frontend Routes:**
- `/register` - Registration page with role selection
- `/login` - Login page
- `/reset-password` - Password reset
- `/profile` - User profile management

---

### 2. Car Listing Management (Vendor Features)

**Fields for Car Listing:**
```javascript
{
  carId: "auto-generated",
  vendorId: "userId-reference",
  make: "Toyota",
  model: "Camry",
  year: 2022,
  color: "Silver",
  licensePlate: "ABC1234",
  transmission: "Automatic", // Automatic, Manual
  fuelType: "Petrol", // Petrol, Diesel, Electric, Hybrid
  seatingCapacity: 5,
  mileage: 15000,
  category: "Sedan", // Sedan, SUV, Hatchback, Luxury, Sports
  features: ["AC", "GPS", "Bluetooth"],
  photos: ["url1", "url2", ...], // 3-10 photos
  primaryPhoto: "url",
  pricing: {
    daily: 50,
    weekly: 300,
    monthly: 1000,
    securityDeposit: 200
  },
  location: {
    address: "456 Park Ave, New York, NY",
    coordinates: { latitude: 40.7589, longitude: -73.9851 }
  },
  availability: {
    from: "2026-02-10",
    to: "2026-12-31"
  },
  description: "Well-maintained car...",
  houseRules: "No smoking, no pets.",
  status: "available", // available, unavailable, deleted
  rating: 4.5,
  totalReviews: 10,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Vendor Actions:**
- Create new car listing
- Upload 3-10 photos (max 5MB each)
- Edit listing details
- Mark as available/unavailable
- Delete listing (soft delete - change status to "deleted")
- View booking history per car

**Frontend Routes:**
- `/vendor/dashboard` - Vendor dashboard showing all listings
- `/vendor/add-car` - Add new car form
- `/vendor/edit-car/:carId` - Edit car listing
- `/vendor/bookings` - Manage incoming bookings

**API Endpoints:**
- `POST /api/cars` - Create car listing
- `GET /api/cars/:carId` - Get car details
- `PUT /api/cars/:carId` - Update car
- `DELETE /api/cars/:carId` - Delete (soft delete)
- `POST /api/cars/:carId/photos` - Upload photos

---

### 3. Search, Browse & Filter (Renter Features)

**Search Functionality:**
```javascript
// Query parameters
{
  location: "New York", // Text search or coordinates
  radius: 10, // km from location
  dateRange: {
    pickupDate: "2026-02-15",
    returnDate: "2026-02-20"
  },
  priceRange: { min: 0, max: 100 },
  category: "Sedan",
  transmission: "Automatic",
  fuelType: "Petrol",
  seatingCapacity: 5,
  features: ["AC", "GPS"],
  minRating: 4.0,
  sortBy: "price-asc" // price-asc, price-desc, rating, newest
}
```

**Implementation Notes:**
- Filter cars by availability (exclude booked dates)
- Real-time search with debouncing (wait 300ms after user stops typing)
- Pagination: 20 results per page
- Show total results count
- Map view with car markers (optional for MVP)

**Firestore Query Example:**
```javascript
let q = query(collection(db, 'cars'));
q = query(q, where('status', '==', 'available'));
q = query(q, where('category', '==', filters.category));
q = query(q, where('pricing.daily', '<=', filters.maxPrice));
q = query(q, orderBy('createdAt', 'desc'));
q = query(q, limit(20));
```

**Frontend Routes:**
- `/search` - Search results page
- `/cars/:carId` - Car detail page

**API Endpoints:**
- `GET /api/cars?location=NYC&category=Sedan&...` - Search cars

---

### 4. Car Detail Page

**Display Elements:**
- Photo gallery with zoom functionality
- Car specifications (make, model, year, etc.)
- Pricing breakdown (daily/weekly/monthly)
- Vendor profile (name, rating, join date)
- Pickup location with embedded map
- Interactive availability calendar
- House rules
- Reviews and ratings section
- Similar cars recommendations

**Calendar Features:**
- Block dates that are already booked
- Highlight selected date range
- Show price for selected range
- Minimum rental: 1 day
- Maximum rental: 30 days (configurable)

**Implementation:**
```javascript
// Check availability before allowing booking
const isDateRangeAvailable = async (carId, pickupDate, returnDate) => {
  const availabilityDoc = await getDoc(doc(db, 'availability', carId));
  const blockedDates = availabilityDoc.data()?.blockedDates || [];
  
  // Check if selected range overlaps with any blocked dates
  return !blockedDates.some(blocked => 
    datesOverlap(pickupDate, returnDate, blocked.from, blocked.to)
  );
};
```

---

### 5. Booking & Reservation System

**Booking Flow:**
1. Renter selects pickup and return dates on calendar
2. System calculates total cost: `(daily rate × days) + security deposit`
3. Renter clicks "Book Now"
4. Redirected to Stripe Checkout
5. Payment processed
6. Booking confirmed and saved to Firestore
7. Car calendar updated (dates blocked)
8. Confirmation emails sent to both parties

**Booking Schema:**
```javascript
{
  bookingId: "auto-generated",
  carId: "reference",
  carDetails: { make: "Toyota", model: "Camry", primaryPhoto: "url" },
  renterId: "user-reference",
  vendorId: "user-reference",
  pickupDate: "2026-02-15",
  pickupTime: "10:00 AM",
  returnDate: "2026-02-20",
  returnTime: "10:00 AM",
  totalDays: 5,
  pricing: {
    dailyRate: 50,
    rentalCost: 250,
    securityDeposit: 200,
    platformFee: 25,
    totalAmount: 475
  },
  paymentDetails: {
    stripePaymentIntentId: "pi_xxx",
    paymentStatus: "succeeded",
    paidAt: Timestamp
  },
  bookingStatus: "confirmed", // pending, confirmed, in-progress, completed, cancelled
  reviewSubmitted: false,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Prevent Double Bookings:**
```javascript
// Use Firestore transaction to ensure atomicity
const bookCar = async (bookingData) => {
  return await db.runTransaction(async (transaction) => {
    // Check availability
    const availabilityRef = doc(db, 'availability', bookingData.carId);
    const availabilityDoc = await transaction.get(availabilityRef);
    
    if (isOverlapping(availabilityDoc.data(), bookingData.dates)) {
      throw new Error('Car is no longer available for these dates');
    }
    
    // Create booking
    const bookingRef = doc(collection(db, 'bookings'));
    transaction.set(bookingRef, bookingData);
    
    // Block dates
    transaction.update(availabilityRef, {
      blockedDates: arrayUnion({
        from: bookingData.pickupDate,
        to: bookingData.returnDate,
        bookingId: bookingRef.id,
        reason: 'booked'
      })
    });
    
    return bookingRef.id;
  });
};
```

**Frontend Routes:**
- `/checkout/:carId` - Booking checkout page
- `/bookings` - User's booking history
- `/bookings/:bookingId` - Booking details

**API Endpoints:**
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:bookingId` - Get booking details
- `PUT /api/bookings/:bookingId/status` - Update status
- `DELETE /api/bookings/:bookingId` - Cancel booking

---

### 6. Payment Integration (Stripe)

**Setup Requirements:**
1. Create Stripe account at stripe.com
2. Get API keys (Publishable and Secret)
3. Install: `npm install stripe @stripe/stripe-js @stripe/react-stripe-js`

**Payment Flow:**
```javascript
// Backend: Create Checkout Session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payments/create-checkout-session', async (req, res) => {
  const { bookingId, amount, carDetails } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${carDetails.make} ${carDetails.model}`,
            images: [carDetails.primaryPhoto],
          },
          unit_amount: amount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/booking-cancelled`,
    metadata: {
      bookingId: bookingId
    }
  });
  
  res.json({ sessionId: session.id });
});

// Frontend: Redirect to Checkout
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_XXXXXXXXXX');

const handleCheckout = async () => {
  const stripe = await stripePromise;
  const response = await axios.post('/api/payments/create-checkout-session', {
    bookingId,
    amount: totalAmount,
    carDetails
  });
  
  await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
};
```

**Webhook Handler (Confirm Payment):**
```javascript
// Backend: Stripe Webhook
app.post('/api/payments/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata.bookingId;
    
    // Update booking status to confirmed
    await db.collection('bookings').doc(bookingId).update({
      'paymentDetails.paymentStatus': 'succeeded',
      'paymentDetails.stripePaymentIntentId': session.payment_intent,
      'paymentDetails.paidAt': new Date(),
      'bookingStatus': 'confirmed'
    });
    
    // Send confirmation emails (use Firebase Cloud Functions)
  }
  
  res.json({ received: true });
});
```

**Security Deposit Handling:**
- Authorize (hold) security deposit without charging
- Release after rental completion with no issues
- Charge if car damaged (manual process initially)

---

### 7. Reviews & Ratings

**Review Schema:**
```javascript
{
  reviewId: "auto-generated",
  bookingId: "reference",
  carId: "reference",
  vendorId: "reference",
  reviewerId: "user-reference",
  reviewerName: "Jane Smith",
  reviewerPhoto: "url",
  ratings: {
    overall: 5,
    carCondition: 5,
    cleanliness: 4,
    communication: 5,
    average: 4.75 // Auto-calculated
  },
  reviewText: "Great experience!",
  vendorResponse: "Thank you!",
  vendorResponseDate: Timestamp,
  isReported: false,
  createdAt: Timestamp
}
```

**Review Rules:**
- Only completed bookings can be reviewed
- One review per booking
- Renter can submit review 24 hours after rental ends
- Vendor can respond to reviews
- Reviews visible on car listing and vendor profile

**Calculate Average Rating:**
```javascript
const updateCarRating = async (carId) => {
  const reviewsSnapshot = await db.collection('reviews')
    .where('carId', '==', carId)
    .get();
  
  let totalRating = 0;
  let count = 0;
  
  reviewsSnapshot.forEach(doc => {
    totalRating += doc.data().ratings.average;
    count++;
  });
  
  const avgRating = count > 0 ? (totalRating / count).toFixed(2) : 0;
  
  await db.collection('cars').doc(carId).update({
    rating: parseFloat(avgRating),
    totalReviews: count
  });
};
```

**Frontend Routes:**
- `/bookings/:bookingId/review` - Submit review form
- `/reviews/:reviewId` - View review details

**API Endpoints:**
- `POST /api/reviews` - Submit review
- `PUT /api/reviews/:reviewId/respond` - Vendor response
- `GET /api/cars/:carId/reviews` - Get car reviews

---

### 8. Photo Upload

**Frontend Implementation (react-dropzone):**
```javascript
import { useDropzone } from 'react-dropzone';

const CarPhotoUpload = ({ onPhotosSelected }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5242880, // 5MB
    maxFiles: 10,
    onDrop: acceptedFiles => {
      onPhotosSelected(acceptedFiles);
    }
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag & drop photos, or click to select (max 10, 5MB each)</p>
    </div>
  );
};
```

**Image Compression (before upload):**
```javascript
import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  
  return await imageCompression(file, options);
};
```

**Firebase Storage Upload:**
```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

const uploadCarPhotos = async (carId, files) => {
  const uploadPromises = files.map(async (file, index) => {
    const compressed = await compressImage(file);
    const storageRef = ref(storage, `cars/${carId}/photo${index + 1}.jpg`);
    await uploadBytes(storageRef, compressed);
    return await getDownloadURL(storageRef);
  });
  
  return await Promise.all(uploadPromises);
};
```

---

### 9. Admin Dashboard

**Admin Features:**
- View total users, listings, bookings
- Revenue analytics (charts)
- Recent activity log
- Search users by email/name
- Edit/Delete users
- Edit/Delete car listings
- View all bookings
- Resolve disputes
- Export reports (CSV)

**Dashboard Metrics:**
```javascript
// Real-time dashboard data
const getDashboardStats = async () => {
  const [usersCount, carsCount, bookingsCount] = await Promise.all([
    db.collection('users').count().get(),
    db.collection('cars').where('status', '==', 'available').count().get(),
    db.collection('bookings').where('bookingStatus', '==', 'confirmed').count().get()
  ]);
  
  return {
    totalUsers: usersCount.data().count,
    activeCars: carsCount.data().count,
    confirmedBookings: bookingsCount.data().count
  };
};
```

**Frontend Routes:**
- `/admin/dashboard` - Overview and analytics
- `/admin/users` - User management
- `/admin/cars` - Car listings management
- `/admin/bookings` - All bookings

**API Endpoints:**
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/bookings` - All bookings

---

### 10. Real-Time Availability Calendar

**Calendar Component (react-datepicker):**
```javascript
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AvailabilityCalendar = ({ carId, onDatesSelected }) => {
  const [blockedDates, setBlockedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  useEffect(() => {
    // Fetch blocked dates from Firestore
    const fetchBlockedDates = async () => {
      const availabilityDoc = await getDoc(doc(db, 'availability', carId));
      const blocked = availabilityDoc.data()?.blockedDates || [];
      
      // Convert to Date objects for react-datepicker
      const dates = blocked.flatMap(range => 
        getDatesInRange(new Date(range.from), new Date(range.to))
      );
      setBlockedDates(dates);
    };
    
    fetchBlockedDates();
  }, [carId]);
  
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      onDatesSelected({ pickupDate: start, returnDate: end });
    }
  };
  
  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={blockedDates}
      selectsRange
      inline
      minDate={new Date()}
      monthsShown={2}
    />
  );
};
```

**Price Calculation:**
```javascript
const calculateTotalPrice = (pickupDate, returnDate, dailyRate) => {
  const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
  const rentalCost = days * dailyRate;
  const securityDeposit = dailyRate * 4; // Example: 4x daily rate
  const platformFee = rentalCost * 0.10; // 10% commission
  
  return {
    days,
    rentalCost,
    securityDeposit,
    platformFee,
    totalAmount: rentalCost + securityDeposit + platformFee
  };
};
```

---

## Firebase Security Rules (CRITICAL!)

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles.hasAny(['admin']);
    }
    
    function isVendor() {
      return isSignedIn() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles.hasAny(['vendor', 'admin']);
    }
    
    match /users/{userId} {
      allow read: if true;
      allow create: if isSignedIn() && isOwner(userId);
      allow update: if isSignedIn() && (isOwner(userId) || isAdmin());
      allow delete: if isAdmin();
    }
    
    match /cars/{carId} {
      allow read: if true;
      allow create: if isVendor() && request.auth.uid == request.resource.data.vendorId;
      allow update: if isVendor() && request.auth.uid == resource.data.vendorId;
      allow delete: if (isVendor() && request.auth.uid == resource.data.vendorId) || isAdmin();
    }
    
    match /bookings/{bookingId} {
      allow read: if isSignedIn() && 
                     (request.auth.uid == resource.data.renterId || 
                      request.auth.uid == resource.data.vendorId ||
                      isAdmin());
      allow create: if isSignedIn() && request.auth.uid == request.resource.data.renterId;
      allow update: if isSignedIn() && 
                       (request.auth.uid == resource.data.renterId || 
                        request.auth.uid == resource.data.vendorId ||
                        isAdmin());
      allow delete: if isAdmin();
    }
    
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn() && request.auth.uid == request.resource.data.reviewerId;
      allow update: if isSignedIn() && 
                       (request.auth.uid == resource.data.reviewerId ||
                        request.auth.uid == resource.data.vendorId ||
                        isAdmin());
      allow delete: if isAdmin();
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    match /users/{userId}/profile-photo.jpg {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.uid == userId &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/.*');
    }
    
    match /cars/{carId}/{photoName} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## Folder Structure

```
car-rental-platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── PasswordReset.jsx
│   │   │   ├── Cars/
│   │   │   │   ├── CarCard.jsx
│   │   │   │   ├── CarDetail.jsx
│   │   │   │   ├── CarForm.jsx
│   │   │   │   └── CarList.jsx
│   │   │   ├── Booking/
│   │   │   │   ├── BookingForm.jsx
│   │   │   │   ├── BookingCard.jsx
│   │   │   │   └── AvailabilityCalendar.jsx
│   │   │   ├── Search/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── FilterPanel.jsx
│   │   │   │   └── SearchResults.jsx
│   │   │   ├── Reviews/
│   │   │   │   ├── ReviewForm.jsx
│   │   │   │   └── ReviewCard.jsx
│   │   │   ├── Upload/
│   │   │   │   └── PhotoUpload.jsx
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   └── Analytics.jsx
│   │   │   └── Shared/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Loader.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── carService.js
│   │   │   ├── bookingService.js
│   │   │   ├── reviewService.js
│   │   │   └── uploadService.js
│   │   ├── utils/
│   │   │   ├── dateHelpers.js
│   │   │   └── validators.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── CarDetailPage.jsx
│   │   │   ├── VendorDashboard.jsx
│   │   │   ├── RenterDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env
│   └── package.json
├── backend/
│   ├── firebase/
│   │   ├── admin.js
│   │   └── serviceAccountKey.json (gitignored)
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── cars.js
│   │   ├── bookings.js
│   │   ├── reviews.js
│   │   ├── payments.js
│   │   └── admin.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── carController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── paymentController.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── emailService.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## Environment Variables

### Frontend (.env)
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=car-rental-platform.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=car-rental-platform
REACT_APP_FIREBASE_STORAGE_BUCKET=car-rental-platform.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXX
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_KEY=./firebase/serviceAccountKey.json
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXX
FRONTEND_URL=http://localhost:3000
```

---

## Testing Checklist

### Authentication
- [ ] User can register with email/password
- [ ] User receives verification email
- [ ] User can login with correct credentials
- [ ] Invalid credentials show error
- [ ] Password reset email sent
- [ ] User stays logged in across sessions

### Car Listings
- [ ] Vendor can create car listing
- [ ] Photos upload successfully (3-10 images)
- [ ] Listing appears in search results
- [ ] Vendor can edit listing
- [ ] Vendor can delete listing (soft delete)

### Search & Filter
- [ ] Search returns relevant results
- [ ] Filters work correctly (category, price, etc.)
- [ ] Only available cars shown for selected dates
- [ ] Sorting works (price, rating, newest)
- [ ] Pagination works

### Booking
- [ ] Calendar blocks already booked dates
- [ ] Price calculated correctly
- [ ] Stripe checkout opens
- [ ] Payment processes successfully
- [ ] Booking confirmed in Firestore
- [ ] Confirmation emails sent
- [ ] Double booking prevented

### Reviews
- [ ] Review form appears after rental completion
- [ ] Review submits successfully
- [ ] Review appears on car listing
- [ ] Average rating updates
- [ ] Vendor can respond to reviews

### Admin
- [ ] Admin can view all users
- [ ] Admin can delete users
- [ ] Admin can view all bookings
- [ ] Dashboard analytics load correctly

---

## Deployment Steps

### 1. Frontend (Firebase Hosting)
```bash
cd frontend
npm run build
firebase login
firebase init hosting
firebase deploy --only hosting
```

### 2. Backend (Render/Railway)
1. Push code to GitHub
2. Connect repo to hosting platform
3. Add environment variables
4. Deploy

### 3. Set up Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-backend.com/api/payments/webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to `.env`

---

## Performance Optimization

### Frontend
- Lazy load images
- Code splitting with React.lazy()
- Memoize expensive calculations (useMemo, useCallback)
- Debounce search input
- Pagination for long lists

### Backend
- Use Firestore indexes for complex queries
- Cache frequently accessed data
- Compress images before upload
- Implement rate limiting

### Database
- Use composite indexes
- Limit query results
- Batch write operations
- Use transactions for critical operations

---

## Security Best Practices

✅ Never expose Firebase Admin SDK key in frontend  
✅ Use environment variables for all secrets  
✅ Validate all user inputs (frontend + backend)  
✅ Implement CSRF protection  
✅ Use HTTPS everywhere  
✅ Sanitize data before storage  
✅ Set proper CORS policies  
✅ Rate limit API endpoints  
✅ Log security events  
✅ Regular security audits  

---

## Next Steps After MVP

### Phase 2 Features
- [ ] In-app messaging (Firebase Cloud Messaging)
- [ ] Push notifications
- [ ] Advanced analytics (charts, graphs)
- [ ] Multi-language support (i18n)
- [ ] Email notifications (SendGrid/Mailgun)

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Insurance integration
- [ ] GPS tracking
- [ ] Dynamic pricing
- [ ] Loyalty program

---

## Helpful Commands

```bash
# Frontend
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install firebase axios react-router-dom react-hook-form
npm install react-dropzone browser-image-compression
npm install react-datepicker date-fns
npm install @stripe/stripe-js @stripe/react-stripe-js
npm run dev

# Backend
mkdir backend && cd backend
npm init -y
npm install express firebase-admin stripe cors dotenv helmet morgan
npm install nodemon --save-dev
npm start

# Firebase
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

**You're now ready to start building! 🚀**

Follow the implementation steps, refer to the PRD for detailed requirements, and use the Firebase setup guide for database configuration.

Good luck with your car rental platform!
