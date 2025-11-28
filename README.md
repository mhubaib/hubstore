# 🛒 HubStore - E-Commerce Mobile Application

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.76.6-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.0.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/Version-1.0.0-2D5F2E?style=for-the-badge" />
</div>

## 📱 About

**HubStore** is a modern, elegant e-commerce mobile application built with React Native. It features a beautiful UI/UX design, smooth animations, and comprehensive shopping functionalities including product browsing, cart management, wishlist, and user authentication with biometric support.

### ✨ Key Features

- 🎨 **Elegant UI/UX** - Modern, professional design with smooth animations
- 🔐 **Secure Authentication** - Login/Register with biometric authentication support
- 🛍️ **Product Catalog** - Browse products with category filtering and search
- 🛒 **Shopping Cart** - Add, remove, and manage cart items with real-time calculations
- ❤️ **Wishlist** - Save favorite products for later
- 👤 **User Profile** - Manage account settings and preferences
- 🔔 **Notifications** - Stay updated with order and promotional notifications
- 📸 **Image Picker** - Upload profile pictures from camera or gallery
- 🌐 **Deep Linking** - Support for `hubstore://` URL scheme
- 💾 **Persistent Storage** - Data persistence with AsyncStorage
- 🎭 **Splash Screen** - Beautiful animated splash screen on app launch

## 🎯 Screenshots

> Add your app screenshots here

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- React Native development environment setup
- Android Studio (for Android development)
- JDK 17 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhubaib/hubstore.git
   cd hubstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

6. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## 📦 Tech Stack

### Core
- **React Native** 0.76.6 - Mobile framework
- **TypeScript** 5.0.4 - Type safety
- **React** 18.3.1 - UI library

### Navigation
- **@react-navigation/native** 7.0.13 - Navigation container
- **@react-navigation/native-stack** 7.1.10 - Stack navigator
- **@react-navigation/drawer** 7.0.6 - Drawer navigator
- **@react-navigation/bottom-tabs** 7.2.1 - Tab navigator

### State Management & Storage
- **React Context API** - Global state management
- **@react-native-async-storage/async-storage** 2.1.0 - Persistent storage

### UI Components & Styling
- **react-native-safe-area-context** 5.0.0 - Safe area handling
- **react-native-screens** 4.4.0 - Native screen optimization
- **@react-native-vector-icons** 10.2.0 - Icon library
- **react-native-reanimated** 3.16.5 - Smooth animations

### Authentication & Security
- **react-native-keychain** 9.0.0 - Secure credential storage
- **@sbaiahmed1/react-native-biometrics** 3.0.1 - Biometric authentication

### Additional Features
- **axios** 1.7.9 - HTTP client
- **react-native-image-picker** 7.1.2 - Image selection

## 🏗️ Project Structure

```
hubstore/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   ├── api/                # API services
│   │   └── product.ts      # Product API calls
│   ├── components/         # Reusable components
│   │   ├── Button.tsx      # Custom button component
│   │   ├── Chip.tsx        # Category chip component
│   │   ├── Input.tsx       # Custom input component
│   │   └── ProductItem.tsx # Product card component
│   ├── contexts/           # React Context providers
│   │   ├── authContext.tsx     # Authentication state
│   │   ├── cartContext.tsx     # Shopping cart state
│   │   └── wishlistContext.tsx # Wishlist state
│   ├── navigations/        # Navigation configuration
│   │   ├── AppNavigator.tsx        # Root navigator
│   │   ├── AuthStackNavigator.tsx  # Auth flow
│   │   ├── MainStackNavigator.tsx  # Main app flow
│   │   └── MainTabNavigator.tsx    # Bottom tabs
│   ├── screens/            # App screens
│   │   ├── Cart.tsx        # Shopping cart
│   │   ├── Catalog.tsx     # Product catalog
│   │   ├── Detail.tsx      # Product details
│   │   ├── Login.tsx       # Login screen
│   │   ├── Notification.tsx # Notifications
│   │   ├── OnBoarding.tsx  # Onboarding flow
│   │   ├── Profile.tsx     # User profile
│   │   ├── Register.tsx    # Registration
│   │   ├── Splash.tsx      # Splash screen
│   │   └── Wishlist.tsx    # Wishlist
│   └── types/              # TypeScript types
│       ├── auth.ts         # Auth types
│       └── product.ts      # Product types
├── App.tsx                 # App entry point
└── package.json           # Dependencies
```

## 🎨 Design Features

### Color Palette
- **Primary Green**: `#2D5F2E` - Brand color
- **Background**: `#F5F7FA` - Light gray
- **Card**: `#FFFFFF` - White
- **Text Primary**: `#1A1A1A` - Dark gray
- **Text Secondary**: `#666666` - Medium gray

### UI Components
- ✅ Custom Button with variants (primary, secondary, outline)
- ✅ Custom Input with icons and password toggle
- ✅ Product cards with rating and stock indicators
- ✅ Category filter chips
- ✅ Bottom sheet modals
- ✅ Animated splash screen
- ✅ Empty states for cart, wishlist, and notifications

## 🔐 Authentication Flow

1. **Splash Screen** - App initialization with data loading
2. **Onboarding** - First-time user experience (optional)
3. **Login/Register** - Secure authentication with keychain storage
4. **Biometric Login** - Fingerprint/Face ID support
5. **Main App** - Access to all features

## 🛍️ Shopping Features

### Product Catalog
- Browse all products
- Filter by category
- Search products
- View product details with image carousel
- Star ratings and stock indicators

### Shopping Cart
- Add/remove products
- Real-time price calculations
- Tax and shipping calculations
- Order summary
- Proceed to checkout

### Wishlist
- Save favorite products
- Quick add to cart from wishlist
- Remove items with confirmation
- Grid layout for easy browsing

## 📱 Deep Linking

The app supports deep linking with the `hubstore://` URL scheme:

```
hubstore://login          # Navigate to login
hubstore://register       # Navigate to register
hubstore://catalog        # Navigate to catalog
hubstore://cart           # Navigate to cart
hubstore://profile        # Navigate to profile
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
API_BASE_URL=https://dummyjson.com
```

### Android Configuration
- **Package Name**: `com.mini_ecommerce`
- **Min SDK**: 23
- **Target SDK**: 34
- **Deep Link Scheme**: `hubstore://`

## 📝 Scripts

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Build Android APK
cd android && ./gradlew assembleRelease

# Build Android AAB
cd android && ./gradlew bundleRelease
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Hubaib**
- GitHub: [@mhubaib](https://github.com/mhubaib)

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [DummyJSON API](https://dummyjson.com/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

---

<div align="center">
  Made with ❤️ using React Native
  
  **HubStore** - Shop Smart, Live Better
</div>
