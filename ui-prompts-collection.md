# Complete UI Prompts Collection
## Car Rental Platform - Professional Frontend Development

**Use these prompts with AI assistants (Claude, ChatGPT, v0.dev) or Vercel v0**

---

## 🎨 Design System Prompt

```
Create a comprehensive design system for a car rental marketplace with:

Brand Identity:
- Primary Color: #3B82F6 (Blue) - Trust, reliability
- Secondary Color: #64748B (Slate) - Professional, modern
- Accent Color: #10B981 (Emerald) - Success, go ahead
- Error: #EF4444
- Warning: #F59E0B
- Background: #F9FAFB
- Text Dark: #1F2937
- Text Light: #6B7280

Typography:
- Font Family: 'Inter', sans-serif
- Headings: font-bold
- H1: text-4xl lg:text-5xl (36-48px)
- H2: text-3xl lg:text-4xl (30-36px)
- H3: text-2xl lg:text-3xl (24-30px)
- Body: text-base (16px)
- Small: text-sm (14px)

Spacing Scale:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

Component Styles:
- Cards: rounded-xl shadow-md hover:shadow-lg transition
- Buttons: rounded-lg font-semibold px-6 py-3
- Inputs: rounded-lg border-2 focus:border-primary
- Images: rounded-lg object-cover

Provide a Tailwind config with these values and example components.
```

---

## 🏠 Homepage Components

### Hero Section
```
Create a stunning hero section for a car rental platform homepage with:

Layout:
- Full viewport height (min-h-screen)
- Background: Gradient overlay on car image
- Centered content with max-width container

Content:
- Main Heading: "Find Your Perfect Ride" (text-5xl font-bold)
- Subheading: "Rent from trusted local car owners. Best prices, widest selection." (text-xl text-gray-600)
- Search bar component:
  * Location input with pin icon
  * Date range picker (pickup/return)
  * "Search Cars" button (primary, prominent)
  * All in a white card with shadow

Visual Elements:
- Floating trust badges: "10,000+ Happy Customers", "500+ Cars Available"
- Scroll down arrow animation at bottom
- Background image with dark overlay (opacity-40)

Responsive:
- Stack search inputs vertically on mobile
- Reduce heading sizes on mobile
- Full-width button on mobile

Use Tailwind CSS, lucide-react icons, modern glassmorphism effect for search card.
Provide complete React component code.
```

### Features Section
```
Create a features section with:

Layout:
- Container with 3 columns (grid-cols-1 md:grid-cols-3 gap-8)
- Section title: "Why Choose RentMyRide" (text-center mb-12)

Three Feature Cards:
1. Wide Selection
   - Icon: Car (lucide-react)
   - Title: "Wide Selection"
   - Description: "Choose from hundreds of cars in every category"
   
2. Best Prices
   - Icon: DollarSign
   - Title: "Unbeatable Prices"
   - Description: "Competitive rates with no hidden fees"
   
3. Verified Owners
   - Icon: ShieldCheck
   - Title: "Trusted Vendors"
   - Description: "All car owners verified and rated by community"

Card Design:
- White background with hover lift effect
- Icon in colored circle at top
- Title (text-xl font-bold)
- Description (text-gray-600)
- Subtle shadow, rounded-xl
- Hover: scale-105 transition

Use Tailwind CSS, lucide-react icons.
Provide complete React component.
```

### Featured Cars Grid
```
Create a featured cars section with:

Section Header:
- Title: "Featured Cars" with "View All" link on right
- Subtitle: "Most popular rentals this week"

Car Grid:
- 6 car cards in grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Gap between cards (gap-6)

Each Car Card:
- Image (aspect-video, rounded-t-xl, object-cover)
- Overlay heart icon (top-right, for wishlist)
- Card body with:
  * Make & Model (text-lg font-bold)
  * Rating stars with count (4.5 ★ · 23 reviews)
  * Specs row: Year | Automatic | Petrol (icons + text)
  * Location: "New York, NY" with pin icon
  * Price: "$50/day" (large, primary color)
  * "View Details" button (full width)
- Hover effect: shadow-lg, scale-102

Props: cars array with { id, image, make, model, year, transmission, fuel, location, price, rating, reviews }

Use Tailwind CSS, lucide-react icons, smooth transitions.
Provide complete React component with sample data.
```

### How It Works Section
```
Create a "How It Works" section with:

Layout:
- Alternating left-right layout for 4 steps
- Each step has illustration/icon on one side, content on other

Four Steps:
1. Search & Filter
   - Number badge: "01"
   - Title: "Find Your Perfect Car"
   - Description: "Search by location, dates, price, and more"
   - Icon: Search (large, colored)

2. Compare & Choose
   - Number badge: "02"
   - Title: "Compare Options"
   - Description: "Review car details, ratings, and vendor profiles"
   - Icon: List

3. Book & Pay
   - Number badge: "03"
   - Title: "Secure Booking"
   - Description: "Book instantly with our secure payment system"
   - Icon: CreditCard

4. Drive Away
   - Number badge: "04"
   - Title: "Pick Up & Enjoy"
   - Description: "Meet the owner, get the keys, and hit the road"
   - Icon: Key

Design:
- Number badges in colored circles (gradient)
- Large icons (w-16 h-16)
- Connecting dotted line between steps (vertical on mobile)
- Responsive: stack vertically on mobile

Use Tailwind CSS, lucide-react, animated entrance on scroll (framer-motion optional).
Provide complete React component.
```

### Testimonials Carousel
```
Create a testimonials carousel section with:

Layout:
- Section title: "What Our Customers Say"
- Carousel container (max 3 visible at once on desktop, 1 on mobile)
- Navigation arrows (prev/next)
- Dot indicators at bottom

Testimonial Card:
- User avatar (rounded-full, w-16 h-16)
- 5-star rating
- Quote text (italic, text-gray-700)
- User name (font-bold)
- User location (text-sm text-gray-500)
- Card with subtle shadow, white background

Features:
- Auto-play every 5 seconds
- Swipe support on mobile
- Smooth transitions

Sample Data: 3+ testimonials with { id, name, location, avatar, rating, text }

Use: react-slick or swiper.js or implement custom with useState
Tailwind CSS for styling
Provide complete React component with carousel functionality.
```

### CTA Section
```
Create a Call-to-Action section with:

Layout:
- Full-width section with gradient background (primary to secondary)
- Centered content, white text

Content:
- Large heading: "Ready to Start Renting?" (text-4xl font-bold)
- Subheading: "Join thousands of happy renters and car owners" (text-xl)
- Two CTA buttons side by side:
  * "Browse Cars" (white background, primary text, bold)
  * "List Your Car" (transparent border, white text)
- Trust indicator: "Join 10,000+ users" with user avatars stack

Visual:
- Background pattern or shape decoration
- Buttons with hover effects (scale, shadow)
- Responsive: stack buttons vertically on mobile

Use Tailwind CSS, modern gradient background.
Provide complete React component.
```

---

## 🔍 Search & Browse Pages

### Search Bar Component
```
Create an advanced search bar with:

Layout:
- Horizontal bar on large screens, vertical on mobile
- White background card with shadow

Inputs (in order):
1. Location Input
   - Icon: MapPin
   - Placeholder: "Where do you want to rent?"
   - Autocomplete suggestions (optional)

2. Date Picker (two inputs side by side)
   - Pickup Date with Calendar icon
   - Return Date with Calendar icon
   - Use react-datepicker

3. Search Button
   - Icon: Search
   - Text: "Search Cars"
   - Primary color, full height
   - Loading state support

Features:
- Form validation (all fields required)
- Mobile: stack vertically with full-width button
- Sticky on scroll (optional)
- Clear/reset button

Props: onSearch callback function
State: location, pickupDate, returnDate

Use Tailwind CSS, lucide-react, react-datepicker, react-hook-form.
Provide complete React component with validation.
```

### Filter Sidebar
```
Create a comprehensive filter sidebar with:

Sections (collapsible):

1. Price Range
   - Dual-handle slider (min-max)
   - Display: "$0 - $200 per day"
   - Use react-range or shadcn/ui slider

2. Car Category
   - Checkboxes: Sedan, SUV, Hatchback, Luxury, Sports, Van
   - Icons for each category

3. Transmission
   - Radio buttons: Any, Automatic, Manual

4. Fuel Type
   - Checkboxes: Petrol, Diesel, Electric, Hybrid

5. Seating Capacity
   - Dropdown: 2, 4, 5, 7+ seats

6. Features
   - Checkboxes: AC, GPS, Bluetooth, Backup Camera, Sunroof, USB Charger
   - "Show more" to expand full list

Filter Actions:
- "Apply Filters" button (primary, sticky at bottom)
- "Clear All" link (secondary)
- Active filter count badge

Mobile:
- Hidden by default, show as modal/drawer on "Filters" button click
- Full screen overlay

Props: 
- onFilterChange callback
- initialFilters object

Use Tailwind CSS, shadcn/ui components, react-hook-form.
Provide complete React component with state management.
```

### Car Card Component (Grid View)
```
Create a car card for grid display with:

Card Layout:
- Aspect ratio 4:3 for image
- Rounded corners (rounded-xl)
- Shadow with hover effect
- Overflow hidden for image zoom

Card Elements:

1. Image Section:
   - Car image (object-cover, w-full h-48)
   - Wishlist heart button (absolute top-right)
   - Category badge (absolute top-left): "Luxury"
   - Hover: image zoom (scale-110 transition)

2. Card Body (p-4):
   - Make & Model (text-lg font-bold, truncate)
   - Rating: ⭐ 4.8 (23 reviews) - small, gray
   - Specs icons row:
     * Year: 2022
     * Transmission icon
     * Fuel icon
     * Seats icon
   - Location: 📍 New York, NY
   - Divider line
   - Price section (flex justify-between):
     * "$50/day" (text-2xl font-bold primary)
     * "View Details" button (secondary)

Interaction:
- Entire card clickable to car details
- Heart button toggles (filled/outline)
- Hover: lift effect (translateY-1)

Props: car object { id, image, make, model, year, transmission, fuel, seats, location, price, rating, reviews, category }

Use Tailwind CSS, lucide-react icons.
Provide complete React component with click handlers.
```

### Car Card Component (List View)
```
Create a horizontal car card for list display with:

Layout:
- Flexbox horizontal (image left, content right)
- Full width, white background, shadow

Card Elements:

Left Side (image):
- Fixed width (w-64 on desktop, w-32 on mobile)
- Aspect ratio 4:3
- Rounded-l-xl

Right Side (content):
- Flex-1, padding
- Grid layout for info

Top Row:
- Make & Model (text-xl font-bold)
- Wishlist heart (absolute top-right)

Info Grid (2 columns on desktop, 1 on mobile):
- Rating & Reviews
- Year
- Transmission
- Fuel Type
- Seating Capacity
- Location

Bottom Row (flex justify-between):
- Left: Features badges (AC, GPS, etc.) - max 3, "+2 more"
- Right: 
  * Price "$50/day" (large, bold)
  * "View Details" button

Mobile: Stack image on top, content below

Props: car object
Use Tailwind CSS, lucide-react.
Provide complete React component.
```

### Sort Dropdown
```
Create a sort dropdown with:

Trigger Button:
- Text: "Sort by: Price (Low to High)"
- Icon: ChevronDown
- Border, rounded

Dropdown Menu (absolute positioning):
- White background, shadow-lg, rounded
- Options:
  * Price (Low to High)
  * Price (High to Low)
  * Rating (Highest First)
  * Newest First
  * Most Popular
- Checkmark next to selected option
- Hover state for each option

Features:
- Click outside to close
- Keyboard navigation (arrow keys)
- Selected option shows in button

Props: 
- sortOptions array
- currentSort string
- onSortChange callback

Use Tailwind CSS, lucide-react, headlessui/Menu or shadcn/ui dropdown.
Provide complete React component.
```

### Pagination Component
```
Create a pagination component with:

Layout:
- Centered, flexbox
- Previous/Next buttons with icons
- Page numbers (1 2 3 ... 10)
- Current page highlighted

Elements:
- Previous button (disabled if page 1)
- Page number buttons
  * Show first, last, and 2 around current
  * Use "..." for gaps
  * Current page: primary color, bold
  * Others: gray, hover effect
- Next button (disabled if last page)
- Results info: "Showing 1-20 of 156 results"

Mobile:
- Compact: Previous, current page, Next only

Props:
- currentPage (number)
- totalPages (number)
- onPageChange callback

Use Tailwind CSS, lucide-react (ChevronLeft, ChevronRight).
Provide complete React component with all logic.
```

---

## 🚗 Car Detail Page

### Image Gallery Component
```
Create a professional image gallery with:

Layout:
- Main large image (aspect-video, rounded-xl)
- Thumbnail strip below (horizontal scroll)
- 5+ images support

Main Image:
- Click to open lightbox (full screen)
- Zoom on hover (cursor changes)
- Image counter: "1 / 8" (top-right overlay)

Thumbnail Strip:
- Horizontal scroll (hide scrollbar)
- 4 visible at a time on desktop, 3 on mobile
- Active thumbnail highlighted (border-2 border-primary)
- Click thumbnail to change main image

Lightbox Modal:
- Full screen overlay (dark background)
- Large image centered
- Previous/Next arrows
- Close button (X top-right)
- Thumbnail strip at bottom
- Keyboard navigation (arrows, Esc)
- Click outside to close

Features:
- Smooth transitions between images
- Touch/swipe support on mobile
- Lazy load images

Props: images array of URLs

Use Tailwind CSS, lucide-react, framer-motion (optional for animations).
Provide complete React component with lightbox functionality.
```

### Car Info Card
```
Create a car information card with:

Card Header:
- Make & Model (text-3xl font-bold)
- Rating & Reviews (⭐ 4.8 · 23 reviews)
- Location (📍 New York, NY)

Specifications Grid (2 columns):
- Year: 2022 (with Calendar icon)
- Transmission: Automatic (with Gear icon)
- Fuel Type: Petrol (with Fuel icon)
- Seating: 5 seats (with Users icon)
- Mileage: 15,000 km (with Gauge icon)
- Color: Silver (with Palette icon)
- Category: Sedan (with Car icon)
- License Plate: ABC1234 (with FileText icon)

Features Section:
- Title: "Features & Amenities"
- Grid of feature badges:
  * AC, GPS, Bluetooth, Backup Camera, Sunroof, USB Charger
  * Each with icon and label
  * Colored background (light primary)

Description Section:
- Title: "About This Car"
- Expandable text (show more/less if > 200 chars)
- Owner's description

House Rules:
- Title: "House Rules"
- List of rules (• No smoking • No pets • etc.)

All sections in a single card with subtle dividers

Use Tailwind CSS, lucide-react icons.
Provide complete React component with props: car object.
```

### Pricing & Booking Card (Sticky Sidebar)
```
Create a sticky booking card with:

Card Design:
- White background, shadow-lg, rounded-xl
- Sticky on scroll (top-24)
- Border-2 border-primary (subtle)

Content:

1. Price Display:
   - "$50/day" (text-3xl font-bold primary)
   - "$300/week" (text-gray-600)
   - "$1000/month" (text-gray-600)

2. Availability Calendar:
   - Compact inline calendar
   - Blocked dates in red
   - Selected range in primary color
   - Use react-datepicker or shadcn/ui calendar

3. Date Inputs (after selection):
   - Pickup: Date & Time
   - Return: Date & Time

4. Price Breakdown:
   - Rental (5 days × $50): $250
   - Security Deposit: $200
   - Service Fee: $25
   - Divider
   - Total: $475 (bold, large)

5. Book Button:
   - "Book Now" (full width, primary, large)
   - Loading state support

6. Trust Indicators:
   - "Free cancellation up to 24 hours"
   - "Secure payment by Stripe"
   - Icons for each

Mobile:
- Fixed to bottom (not sticky sidebar)
- Collapsible (show/hide details)

Props:
- car object with pricing
- blockedDates array
- onBookClick callback

Use Tailwind CSS, react-datepicker, lucide-react.
Provide complete React component with calculation logic.
```

### Reviews Section
```
Create a reviews section with:

Section Header:
- Title: "Guest Reviews"
- Overall rating: ⭐ 4.8 out of 5 (23 reviews)
- Rating breakdown bars:
  * 5 stars: [█████████░] 18
  * 4 stars: [████░░░░░░] 4
  * 3 stars: [█░░░░░░░░░] 1
  * 2 stars: [░░░░░░░░░░] 0
  * 1 star: [░░░░░░░░░░] 0

Reviews List:
- Show 5 most recent, "Load More" button for rest

Each Review Card:
- Reviewer avatar (rounded-full, w-12 h-12)
- Name (font-bold)
- Rating (⭐⭐⭐⭐⭐)
- Date ("2 weeks ago")
- Review text (max 300 chars, "Read more" to expand)
- Helpful/Report buttons (text-sm, gray)
- Vendor response (if exists, indented, different background)

Sort/Filter:
- Dropdown: "Most Recent", "Highest Rated", "Lowest Rated"

Submit Review (if user has booking):
- Button: "Write a Review"
- Opens modal with:
  * Star rating selector (interactive)
  * Text area
  * Submit button

Props:
- reviews array
- canReview boolean
- onSubmitReview callback

Use Tailwind CSS, lucide-react.
Provide complete React component with state management.
```

### Vendor Profile Card
```
Create a vendor profile card with:

Card Layout:
- White background, shadow, rounded-xl
- Padding

Content:

1. Vendor Header:
   - Avatar (w-20 h-20, rounded-full)
   - Name (text-xl font-bold)
   - "Joined [date]" (text-sm gray)
   - Verified badge (if applicable)

2. Stats Row (3 columns):
   - Total Cars: X
   - Total Rentals: X
   - Response Rate: X%

3. Rating:
   - ⭐ 4.9 average (from X reviews)

4. About:
   - Short bio (expandable)

5. Response Time:
   - "Usually responds within 2 hours"

6. Action Buttons:
   - "Contact Vendor" (primary)
   - "View All Cars" (secondary)

Features:
- Hover effect on avatar (scale)
- Verified badge tooltip
- Click to view full profile

Props:
- vendor object
- onContact callback

Use Tailwind CSS, lucide-react.
Provide complete React component.
```

### Similar Cars Section
```
Create a "Similar Cars" section with:

Section:
- Title: "Similar Cars You Might Like"
- Horizontal scrollable carousel
- Show 4 cards on desktop, 2 on tablet, 1 on mobile
- Scroll arrows (left/right)

Car Cards:
- Compact version of main car card
- Image, make/model, price, rating
- "View Details" button

Features:
- Smooth scroll on arrow click
- Snap to cards on scroll
- Responsive grid/flex

Props:
- cars array (filtered by category, price range)

Use Tailwind CSS, lucide-react, smooth scroll behavior.
Provide complete React component with carousel logic.
```

---

## 📝 Forms & Input Components

### Login Form
```
Create a modern login form with:

Form Container:
- Centered card (max-w-md)
- White background, shadow-xl, rounded-2xl
- Logo at top

Form Fields:
1. Email Input
   - Label: "Email Address"
   - Type: email
   - Icon: Mail
   - Validation: required, valid email
   - Error message support

2. Password Input
   - Label: "Password"
   - Type: password with toggle visibility icon
   - Icon: Lock
   - Validation: required
   - Error message support

3. Remember Me Checkbox
   - "Keep me logged in"

Form Actions:
- "Sign In" button (full width, primary, large)
  * Loading state (spinner)
  * Disabled while loading
- "Forgot Password?" link (right-aligned, small)

Divider:
- "Or continue with"

Social Login:
- "Sign in with Google" button (white, border, Google icon)

Footer Links:
- "Don't have an account? Sign up"

Validation:
- Real-time validation on blur
- Show errors below inputs (red text, small)
- Disable submit if errors

Props:
- onLogin callback
- onGoogleLogin callback
- loading state

Use Tailwind CSS, react-hook-form, yup validation, lucide-react.
Provide complete React component with form logic.
```

### Registration Form
```
Create a multi-step registration form or single-page form with:

Form Fields:

Step 1: Account Info
1. Full Name
2. Email
3. Password
   - Strength indicator (weak/medium/strong)
   - Requirements checklist:
     * Min 8 characters
     * 1 uppercase letter
     * 1 number
4. Confirm Password
   - Show error if doesn't match

Step 2: Profile Details
1. Phone Number
   - Format validation
2. Date of Birth
   - Date picker
3. Address
   - Street, City, State, ZIP
4. Driver's License Number (optional for renters)

Step 3: Role Selection
- Radio cards:
  * Renter (icon + description)
  * Vendor (icon + description)
  * Both

Step 4: Terms
- Checkbox: "I agree to Terms & Conditions and Privacy Policy"
- Links open in modal

Actions:
- "Next" button (for multi-step)
- "Back" button (for multi-step)
- "Create Account" (final step)
- Progress indicator (1/4, 2/4, etc.)

Or single page with all fields

Social Sign-Up:
- "Sign up with Google"

Footer:
- "Already have an account? Sign in"

Use Tailwind CSS, react-hook-form, yup, react-datepicker, lucide-react.
Provide complete component with validation.
```

### Add/Edit Car Form
```
Create a comprehensive car listing form with:

Form Sections (use tabs or accordion):

Section 1: Basic Information
- Car Make (input with suggestions)
- Car Model
- Year (dropdown: 2015-2024)
- Color (select or color picker)
- License Plate Number

Section 2: Specifications
- Category (select: Sedan, SUV, etc.)
- Transmission (radio: Automatic/Manual)
- Fuel Type (select: Petrol, Diesel, Electric, Hybrid)
- Seating Capacity (number input)
- Current Mileage (number input)

Section 3: Features
- Checkboxes for features:
  * AC, GPS, Bluetooth, Backup Camera, Cruise Control,
    Sunroof, USB Charger, Child Seat, Pet Friendly, etc.
- "Add custom feature" input

Section 4: Pricing
- Daily Rate ($)
- Weekly Rate ($ or auto-calculate: daily × 6)
- Monthly Rate ($ or auto-calculate: daily × 25)
- Security Deposit ($)
- Suggested pricing tooltip (based on category)

Section 5: Location
- Address (with autocomplete)
- Google Maps integration (drop pin)
- Coordinates (auto-filled)

Section 6: Photos
- Drag & drop upload zone
- Grid preview of uploaded images
- Reorder images (drag)
- Set primary image
- Requirements: 3-10 photos, max 5MB each
- Progress bar during upload

Section 7: Description
- Rich text editor or textarea
- Character counter (max 1000)
- Suggestions: highlight condition, recent maintenance, etc.

Section 8: House Rules
- Textarea for rules
- Examples/templates

Section 9: Availability
- Date range picker: available from X to Y
- Recurring unavailability (weekdays, weekends)

Form Actions:
- "Save as Draft" (secondary)
- "Publish Listing" (primary, large)
- Cancel link

Validation:
- All fields except optional ones required
- Real-time validation
- Error summary at top if submit fails

Props:
- mode: 'create' | 'edit'
- initialData (for edit mode)
- onSubmit callback
- onSaveDraft callback

Use Tailwind CSS, react-hook-form, yup, react-dropzone, react-datepicker.
Provide complete component with all sections.
```

### Booking Checkout Form
```
Create a booking checkout form with:

Page Layout (2 columns on desktop, stacked on mobile):

Left Column: Booking Details
- Car summary card:
  * Image, make/model, rating
  * Dates, location
  * Edit dates button
- Renter info form:
  * Full Name (pre-filled from profile)
  * Email (pre-filled)
  * Phone Number (pre-filled)
  * Edit profile link
- Additional Information:
  * Checkbox: "I'll pick up after hours"
  * Checkbox: "Add insurance ($10/day)"
  * Special requests (textarea)

Right Column: Payment & Summary (sticky)
- Price breakdown card:
  * Rental cost
  * Insurance (if selected)
  * Security deposit
  * Service fee
  * Total
- Payment section:
  * "Pay with Stripe" button
  * Credit card icons
  * "Secure payment" badge
- Cancellation policy:
  * "Free cancellation until [date]"
- Terms checkbox:
  * "I agree to rental terms and conditions"

Payment Modal (Stripe):
- Opens on "Pay with Stripe" click
- Stripe Elements integration
- Card input
- Billing address
- "Pay $XXX" button

Confirmation:
- Redirect to success page after payment
- Show booking confirmation

Props:
- booking object
- onSubmit callback

Use Tailwind CSS, @stripe/react-stripe-js, react-hook-form.
Provide complete component with Stripe integration.
```

### Review Form Modal
```
Create a review submission modal with:

Modal:
- Centered overlay
- White card, rounded-xl, max-w-2xl
- Close button (X top-right)

Content:

Header:
- "How was your experience?"
- Car info (image, make/model)
- Rental dates

Rating Section:
- Overall Rating (5 interactive stars, large)
- Specific Ratings (smaller stars):
  * Car Condition
  * Cleanliness
  * Communication
  * Value for Money

Review Text:
- Label: "Share your experience"
- Textarea (min 50 chars, max 500)
- Character counter
- Placeholder with suggestions

Photo Upload (optional):
- "Add photos" button
- Max 3 images
- Preview thumbnails

Recommendations:
- "Would you rent from this vendor again?"
  * Yes/No radio buttons

Actions:
- "Cancel" button
- "Submit Review" button (primary)
  * Disabled if rating < 1 or text < 50 chars
  * Loading state

Success:
- Show thank you message
- Close modal after 2 seconds

Props:
- booking object
- onSubmit callback
- onClose callback

Use Tailwind CSS, react-hook-form, lucide-react, framer-motion (for animations).
Provide complete component with validation.
```

---

## 📊 Dashboard Components

### Stats Card Component
```
Create a stats card component with:

Card Design:
- White background, rounded-xl, shadow
- Padding, border-l-4 (colored accent)
- Hover: lift effect

Content:
- Icon (large, colored background circle, top-left)
- Label (text-sm, uppercase, gray)
- Value (text-3xl, font-bold, dark)
- Change indicator:
  * "+12% from last month" (green if positive, red if negative)
  * Icon: TrendingUp or TrendingDown

Variants (border-l color):
- earnings: green
- bookings: blue
- cars: purple
- rating: yellow

Props:
- label (string)
- value (number or string)
- icon (component)
- change (number, e.g., 12)
- variant (string)

Use Tailwind CSS, lucide-react.
Provide complete reusable component.
```

### Data Table Component
```
Create a professional data table with:

Table Features:
- Responsive (horizontal scroll on mobile)
- Sticky header
- Alternating row colors
- Hover effect on rows

Columns (customizable):
- Sortable headers (click to sort, icon shows direction)
- Resizable columns (optional)
- Checkbox column (for bulk actions)
- Actions column (dropdown menu: Edit, Delete, View)

Features:
- Search bar (filters all columns)
- Column visibility toggle
- Items per page selector (10, 25, 50, 100)
- Pagination (at bottom)
- Empty state ("No data found")
- Loading skeleton

Row Actions:
- Inline edit (optional)
- Bulk actions toolbar (appears when rows selected)
  * Delete selected
  * Export selected
  * Custom actions

Mobile:
- Stack as cards instead of table
- Show key info only

Props:
- columns array { key, label, sortable, render }
- data array
- onEdit, onDelete callbacks
- isLoading boolean
- emptyMessage string

Use Tailwind CSS, shadcn/ui table, lucide-react.
Provide complete component with sorting, filtering, pagination.
```

### Earnings Chart Component
```
Create an earnings/revenue chart with:

Chart Types (tabs to switch):
1. Line Chart - Monthly earnings trend (last 6 months)
2. Bar Chart - Earnings by car
3. Pie Chart - Revenue by category

Chart Container:
- White card, rounded-xl, shadow
- Title: "Earnings Overview"
- Date range selector (top-right)
- Export button (CSV/PDF)

Chart Features:
- Responsive
- Tooltips on hover (show exact values)
- Legend
- Grid lines
- Smooth animations
- Color scheme matching brand

Data Points:
- X-axis: Months or Car Names
- Y-axis: Earnings ($)
- Tooltip: "$X,XXX in [month]"

Use Recharts library:
- LineChart for trends
- BarChart for comparisons
- PieChart for breakdown

Props:
- data array
- chartType (line/bar/pie)
- title
- dateRange

Use Tailwind CSS, Recharts, lucide-react.
Provide complete component with all chart types.
```

### Activity Feed Component
```
Create an activity timeline/feed with:

Feed Container:
- Scrollable list (max-h-96)
- Each item with timestamp

Activity Item:
- Icon (colored circle, left)
- Vertical connecting line
- Activity text (right)
- Timestamp ("2 hours ago")

Activity Types & Icons:
1. New Booking - Calendar icon (blue)
   "New booking for Toyota Camry from John Doe"
2. Payment Received - DollarSign icon (green)
   "Payment of $250 received for booking #12345"
3. Review Received - Star icon (yellow)
   "Jane Smith left a 5-star review"
4. New User - UserPlus icon (purple)
   "New user John Doe signed up as vendor"
5. Car Listed - Car icon (blue)
   "Toyota Camry listed by John Doe"

Features:
- Click to view details (opens modal or navigates)
- Filter by type (dropdown)
- "Load More" or infinite scroll
- Real-time updates (use Firestore snapshot listener)

Props:
- activities array { id, type, message, timestamp, userId, relatedId }
- onItemClick callback

Use Tailwind CSS, lucide-react, date-fns (for relative time).
Provide complete component.
```

### Vendor Dashboard Layout
```
Create a complete vendor dashboard page with:

Layout:
- Sidebar (left, sticky, collapsible on mobile)
- Main content area (right)

Sidebar:
- Logo at top
- Navigation links:
  * Dashboard (Home icon)
  * My Cars (Car icon)
  * Bookings (Calendar icon)
  * Earnings (DollarSign icon)
  * Reviews (Star icon)
  * Profile (User icon)
  * Settings (Settings icon)
- Active link highlighted
- Logout button at bottom
- Hamburger menu on mobile

Main Content:

Top Bar:
- Page title
- User avatar dropdown (top-right)
  * Profile
  * Settings
  * Logout
- Notification bell with badge

Dashboard Content:
1. Stats Row (4 cards):
   - Total Earnings
   - Active Listings
   - Total Bookings
   - Average Rating

2. Charts Row (2 columns):
   - Earnings chart (col-span-2)

3. Two Columns:
   Left: Recent Bookings table
   Right: Activity feed

4. Quick Actions:
   - "Add New Car" button (floating, bottom-right)

Responsive:
- Sidebar collapses to hamburger on mobile
- Stack content vertically
- Hide/show sections based on screen size

Use Tailwind CSS, lucide-react, recharts.
Provide complete dashboard layout.
```

### Renter Dashboard Layout
```
Create a renter dashboard page with:

Layout:
- Top navigation bar (not sidebar)
- Main content area

Navigation:
- Logo (left)
- Links: Dashboard, Browse Cars, My Bookings, Favorites
- User menu (right)

Main Content:

Welcome Section:
- "Welcome back, [Name]!"
- Quick stats: Upcoming trips, Completed trips, Favorites

Upcoming Bookings:
- Large cards (grid, 2-3 per row)
- Each card:
  * Car image, make/model
  * Dates, location
  * Days until pickup
  * "View Details" button
  * "Cancel" button (if allowed)

Past Bookings:
- Compact list
- "Write Review" button for unreviewed bookings

Favorites:
- Grid of saved cars
- Heart to remove
- "Book Now" button

Recommended Cars:
- Based on past bookings
- Carousel

Props:
- user object
- bookings array
- favorites array

Use Tailwind CSS, lucide-react.
Provide complete dashboard layout.
```

---

## 🎨 Shared UI Components

### Navbar Component
```
Create a responsive navbar with:

Desktop Layout:
- Logo (left)
- Navigation links (center):
  * Home
  * Browse Cars
  * How It Works
  * About Us
- Right side:
  * "List Your Car" button (outlined)
  * Login button
  * Sign Up button (primary)
  * OR user avatar with dropdown (if logged in)

User Dropdown Menu:
- Avatar with name
- Dropdown items:
  * Dashboard
  * My Bookings
  * Favorites
  * Profile
  * Settings
  * Divider
  * Logout

Mobile Layout:
- Logo (left)
- Hamburger menu (right)
- Full-screen overlay menu:
  * Navigation links (large)
  * Auth buttons at bottom
  * Close button (X)

Features:
- Sticky on scroll with backdrop blur
- Shadow on scroll
- Active link highlighting
- Smooth transitions

Props:
- isLoggedIn boolean
- user object (if logged in)

Use Tailwind CSS, lucide-react, framer-motion (for mobile menu).
Provide complete responsive component.
```

### Footer Component
```
Create a comprehensive footer with:

Layout (4 columns on desktop, stacked on mobile):

Column 1: Brand
- Logo
- Tagline: "Find your perfect ride"
- Social media icons:
  * Facebook, Twitter, Instagram, LinkedIn
  * Hover effect

Column 2: Company
- Links:
  * About Us
  * How It Works
  * Careers
  * Press
  * Contact

Column 3: Resources
- Links:
  * Help Center
  * Safety
  * Trust & Security
  * Blog
  * Community Guidelines

Column 4: Legal
- Links:
  * Terms of Service
  * Privacy Policy
  * Cookie Policy
  * Sitemap

Newsletter Section:
- "Stay Updated" heading
- Email input + Subscribe button
- Inline, modern design

Bottom Bar:
- Copyright: "© 2026 RentMyRide. All rights reserved."
- Language selector: English (dropdown)
- Currency selector: USD (dropdown)

Design:
- Dark background (bg-gray-900)
- Light text (text-gray-300)
- Links hover: text-white
- Divider line above bottom bar

Use Tailwind CSS, lucide-react.
Provide complete footer component.
```

### Modal Component (Reusable)
```
Create a reusable modal component with:

Overlay:
- Fixed full-screen
- Dark background (bg-black/50)
- Click outside to close (optional prop)

Modal Content:
- Centered card
- White background
- Rounded-xl
- Shadow-2xl
- Max width (customizable: sm, md, lg, xl, full)
- Padding

Header (optional):
- Title (text-xl font-bold)
- Close button (X, top-right)

Body:
- Children content (passed as prop)
- Scrollable if content overflows

Footer (optional):
- Action buttons
- Right-aligned
- Primary + Secondary

Sizes:
- sm: max-w-sm
- md: max-w-md
- lg: max-w-2xl
- xl: max-w-4xl
- full: w-full h-full

Features:
- Keyboard support (Esc to close)
- Focus trap
- Scroll lock (prevent body scroll)
- Entrance/exit animations (fade + scale)

Props:
- isOpen (boolean)
- onClose (callback)
- title (string, optional)
- size (string)
- showCloseButton (boolean)
- children (React nodes)

Use Tailwind CSS, lucide-react, framer-motion.
Provide complete reusable modal component.
```

### Loading Skeleton Component
```
Create loading skeleton components for:

1. Car Card Skeleton:
   - Rectangle for image (animate pulse)
   - Lines for title, specs, price
   - Match exact layout of real card

2. Table Row Skeleton:
   - Rectangles for each column
   - 5-10 rows

3. Dashboard Stats Skeleton:
   - Card outline with pulsing rectangles

4. Page Skeleton:
   - Full page layout with placeholders

Design:
- Background: bg-gray-200
- Animation: animate-pulse
- Rounded corners matching real components

Props (for each):
- count (number of skeletons to show)

Use Tailwind CSS.
Provide skeleton for each major component type.
```

### Toast Notification Component
```
Create a toast notification system with:

Toast Container:
- Fixed position (top-right or bottom-right)
- Stack multiple toasts
- Auto-dismiss after 5 seconds (configurable)

Toast Card:
- Slide in animation
- Icon (left): Success ✓, Error ✗, Warning ⚠, Info ℹ
- Message (center)
- Close button (right, X)
- Progress bar at bottom (shows time until auto-dismiss)

Types & Colors:
- Success: green background
- Error: red background
- Warning: yellow background
- Info: blue background

Features:
- Click to dismiss
- Swipe to dismiss (mobile)
- Queue multiple toasts
- Max 3 visible at once

Usage:
- toast.success("Car listed successfully!")
- toast.error("Failed to process payment")
- toast.warning("Please verify your email")
- toast.info("New booking request received")

Context/Hook:
- useToast() hook to trigger from anywhere

Use Tailwind CSS, lucide-react, framer-motion.
Provide complete toast system with context.
```

### Empty State Component
```
Create empty state components for different scenarios:

1. No Search Results:
   - Icon: SearchX (large, gray)
   - Heading: "No cars found"
   - Description: "Try adjusting your filters or search terms"
   - Action: "Clear Filters" button

2. No Bookings:
   - Icon: Calendar (large, gray)
   - Heading: "No bookings yet"
   - Description: "Start browsing to find your perfect car"
   - Action: "Browse Cars" button

3. No Listings (Vendor):
   - Icon: Car (large, gray)
   - Heading: "You haven't listed any cars yet"
   - Description: "List your first car and start earning"
   - Action: "Add Your First Car" button

4. No Favorites:
   - Icon: Heart (large, gray)
   - Heading: "No favorites yet"
   - Description: "Save cars you like to find them easily later"
   - Action: "Browse Cars" button

5. Generic Empty:
   - Custom icon
   - Custom heading
   - Custom description
   - Custom action button

Design:
- Centered content
- Large icon (w-24 h-24)
- Muted colors
- Clear call-to-action

Props:
- type (string)
- icon (component, optional)
- heading (string)
- description (string)
- actionText (string)
- onAction (callback)

Use Tailwind CSS, lucide-react.
Provide reusable empty state component.
```

---

## 🎯 Advanced UI Features

### Search with Autocomplete
```
Create a search input with autocomplete suggestions:

Input Field:
- Search icon (left)
- Placeholder: "Search for cars, locations..."
- Clear button (X, right, appears when typing)

Suggestions Dropdown:
- Appears below input on focus/typing
- Categorized sections:
  1. Recent Searches (if any)
  2. Popular Locations
  3. Car Makes/Models
  4. Categories

Each Suggestion:
- Icon (left): Clock, MapPin, Car, Tag
- Text (main)
- Subtext (gray, smaller)
- Hover effect
- Click to select

Features:
- Debounced search (300ms)
- Keyboard navigation (arrows, Enter)
- Highlight matching text
- "See all results for '[query]'" at bottom
- Loading state while fetching

Props:
- onSearch callback
- onSelect callback
- recentSearches array

Use Tailwind CSS, lucide-react, Fuse.js (for fuzzy search).
Provide complete component with logic.
```

### Image Upload with Crop
```
Create an image upload component with cropping:

Upload Zone:
- Drag & drop area
- "Click to upload or drag & drop"
- File type info: "JPG, PNG, WEBP (max 5MB)"
- Preview after selection

Crop Modal (opens after file selection):
- Image preview
- Crop area selector (draggable, resizable)
- Aspect ratio options: Free, 1:1, 4:3, 16:9
- Zoom slider
- Rotate buttons (90° left/right)
- Actions:
  * "Cancel" - discard image
  * "Crop & Upload" - proceed with cropped image

Upload Progress:
- Progress bar (0-100%)
- Cancel upload button

Uploaded Image Preview:
- Thumbnail with overlay
- Edit button (reopens crop modal)
- Remove button (X)

Multiple Images:
- Grid of thumbnails
- Reorder by drag & drop
- Set as primary (star icon)

Props:
- onUpload callback (receives File or base64)
- maxSize (number, in MB)
- aspectRatio (string or number)
- multiple (boolean)
- maxFiles (number)

Use Tailwind CSS, react-dropzone, react-image-crop or react-easy-crop.
Provide complete component.
```

### Calendar with Blocked Dates
```
Create an interactive booking calendar with:

Calendar View:
- Month view with full dates grid
- Previous/Next month arrows
- Month/Year selector (dropdown)

Date States:
1. Past dates: disabled (gray, not clickable)
2. Blocked dates: red background, strikethrough
3. Available dates: white background, clickable
4. Selected range: primary color background
5. Hover date: light primary background
6. Today: border

Range Selection:
- Click start date → hover shows potential range → click end date
- Clear selection button

Date Info Popover (hover on date):
- "Available" or "Booked" status
- Price for that date (if variable pricing)

Features:
- Minimum rental period (1 day default, configurable)
- Maximum rental period (30 days default)
- Weekend pricing (optional)
- Holiday pricing (optional)

Price Summary (below calendar):
- Number of days selected
- Daily rate
- Total price

Props:
- blockedDates array (ranges or single dates)
- pricing object (daily, weekend, holidays)
- minDays, maxDays (numbers)
- onDateSelect callback

Use Tailwind CSS, date-fns, react-datepicker or custom implementation.
Provide complete calendar component.
```

### Multi-Step Form with Progress
```
Create a multi-step form with progress indicator:

Progress Bar (top):
- Steps: [1] → [2] → [3] → [4]
- Completed: checkmark, primary color
- Current: number, primary border
- Pending: number, gray
- Line connecting steps

Step Content:
- Smooth transition between steps
- Current step title at top
- Step number: "Step 1 of 4"

Form Fields:
- Each step has its own fields
- Validation per step (can't proceed if invalid)

Navigation:
- "Back" button (secondary, left)
- "Next" button (primary, right)
- "Submit" button on last step
- Progress saved (localStorage or context)

Features:
- Click step numbers to jump (if visited)
- Form data persists across steps
- Validation on step change
- Loading state on submit
- Success/Error messages

Mobile:
- Vertical progress indicator (left sidebar)
- Stack form fields

Props:
- steps array { id, title, fields, validation }
- onSubmit callback
- initialData (for editing)

Use Tailwind CSS, react-hook-form, yup, framer-motion.
Provide complete multi-step form.
```

### Infinite Scroll Component
```
Create an infinite scroll list with:

Container:
- Scrollable div or window scroll
- Initial items loaded (20)
- Load more on scroll to bottom

Loading Trigger:
- Intersection Observer (when sentinel element visible)
- Or scroll position threshold (90%)

Loading Indicator:
- Spinner at bottom while loading
- "Loading more..." text

Features:
- Load next page automatically
- Smooth scroll experience
- Loading state management
- Error handling (retry button)
- "No more items" message at end

Optimization:
- Debounce scroll events
- Virtual scrolling for very long lists (optional)

Props:
- items array (current items)
- loadMore callback (returns Promise)
- hasMore boolean
- isLoading boolean

Use Tailwind CSS, Intersection Observer API or react-intersection-observer.
Provide complete component with logic.
```

---

## 🔧 Utility Components

### Breadcrumb Navigation
```
Create a breadcrumb component:

Layout:
- Horizontal list with separators
- Home icon → Category → Subcategory → Current Page

Items:
- Links (clickable, hover underline)
- Current page (bold, not clickable)
- Separator: "/" or ">" or chevron icon

Mobile:
- Show only last 2 levels
- "..." for hidden levels (click to expand)

Props:
- items array { label, href }

Example:
Home > Browse Cars > Sedans > Toyota Camry

Use Tailwind CSS, lucide-react (ChevronRight).
Provide reusable breadcrumb component.
```

### Rating Stars Component
```
Create an interactive star rating component:

Display Mode:
- 5 stars (filled/half-filled/outline)
- Color: yellow (#F59E0B)
- Size: customizable (sm, md, lg)
- Show rating number: "(4.5)"
- Read-only (just display)

Interactive Mode:
- Hover to preview rating
- Click to set rating
- Half-star support (optional)
- Clear rating button

Props:
- rating (number, 0-5)
- onChange callback (for interactive)
- size (string)
- readOnly (boolean)
- showCount (boolean)
- precision (0.5 for half stars, 1 for full only)

Use Tailwind CSS, lucide-react (Star).
Provide reusable rating component.
```

### Badge Component
```
Create a reusable badge component:

Variants:
- default: gray background
- primary: blue background
- success: green background
- warning: yellow background
- error: red background

Sizes:
- sm: text-xs px-2 py-1
- md: text-sm px-3 py-1
- lg: text-base px-4 py-2

Features:
- Icon support (left side)
- Close button (X, right side) - optional
- Dot indicator (before text) - optional

Usage Examples:
- Status badges: "Available", "Booked", "Cancelled"
- Category badges: "Luxury", "SUV", "Electric"
- Feature badges: "AC", "GPS", "Bluetooth"

Props:
- variant (string)
- size (string)
- icon (component, optional)
- onClose (callback, optional)
- dot (boolean)
- children (text)

Use Tailwind CSS, lucide-react.
Provide reusable badge component.
```

### Tooltip Component
```
Create a tooltip component:

Trigger:
- Hover over element
- Focus on element (accessibility)

Tooltip Bubble:
- Small card with arrow pointing to trigger
- Max width (200px)
- Dark background, white text (or light theme)
- Rounded corners
- Shadow

Positions:
- top, bottom, left, right
- Auto-adjust if near screen edge

Features:
- Delay on hover (300ms)
- Fade in/out animation
- Touch support (tap to show, tap outside to hide)

Props:
- content (string or React node)
- position (string)
- delay (number)
- children (trigger element)

Use Tailwind CSS, Radix UI Tooltip or custom implementation.
Provide reusable tooltip component.
```

---

## 📱 Responsive Design Prompts

### Mobile Navigation Menu
```
Create a mobile-friendly navigation menu:

Trigger:
- Hamburger icon (top-right)
- Animated: lines → X when open

Menu Overlay:
- Full-screen slide-in from right
- Dark overlay behind menu
- White/colored panel for menu

Menu Content:
- Logo at top
- Navigation links (large, stacked):
  * Home
  * Browse Cars
  * How It Works
  * About
- Search bar
- User section (if logged in):
  * Avatar and name
  * Dashboard, Bookings, Profile links
- Auth buttons (if not logged in):
  * Login
  * Sign Up
- Social media icons at bottom

Animations:
- Slide in/out (translateX)
- Stagger children (each link animates in)
- Overlay fade in/out

Features:
- Lock body scroll when open
- Close on link click
- Close on outside click
- Close on Esc key

Props:
- isOpen (boolean)
- onClose (callback)
- isLoggedIn (boolean)
- user (object)

Use Tailwind CSS, lucide-react, framer-motion.
Provide complete mobile menu component.
```

### Bottom Navigation (Mobile)
```
Create a bottom navigation bar for mobile:

Fixed Position:
- Bottom of screen
- Full width
- Above keyboard (safe area)
- White background, shadow-top

Navigation Items (4-5):
1. Home
   - Icon: Home
   - Label: "Home"
2. Search
   - Icon: Search
   - Label: "Search"
3. Bookings
   - Icon: Calendar
   - Label: "Trips"
4. Favorites
   - Icon: Heart
   - Label: "Saved"
5. Profile
   - Icon: User
   - Label: "Profile"

Active State:
- Active item: primary color
- Inactive: gray
- Active indicator: pill or underline

Badge:
- Notification count on icons (e.g., new bookings)

Features:
- Haptic feedback on tap (mobile)
- Smooth transitions
- Hide on scroll down, show on scroll up (optional)

Props:
- activeTab (string)
- onTabChange (callback)
- items array

Use Tailwind CSS, lucide-react.
Provide bottom nav component.
```

---

## 🎨 Animation Prompts

### Page Transition Animations
```
Create smooth page transitions for route changes:

Transitions:
- Fade in/out
- Slide left/right
- Scale up/down
- Combination effects

Usage with React Router:
- Wrap routes with animation component
- Different animations for different routes
- Direction based on navigation (forward/back)

Features:
- Preserve scroll position option
- Loading state during transition
- Skip animation on initial load

Use framer-motion, react-transition-group, or custom CSS.
Provide complete animation wrapper.
```

### Scroll Animations (Reveal on Scroll)
```
Create scroll-triggered animations:

Effects:
- Fade in from bottom
- Slide in from left/right
- Scale up
- Stagger children

Trigger:
- When element enters viewport
- Threshold: 20% visible

Use Cases:
- Homepage sections
- Feature cards
- Testimonials
- Stats counters (animate from 0 to value)

Options:
- Animation delay
- Animation duration
- Easing function
- Repeat or once

Use Intersection Observer API, framer-motion, or AOS library.
Provide reusable scroll animation components.
```

---

**End of UI Prompts Collection**

Use these prompts with AI coding assistants to generate production-ready React components for your car rental platform!
