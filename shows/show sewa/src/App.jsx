import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentConfirmation = lazy(() => import("./pages/PaymentConfirmation"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
import MovieLoader from "./components/MovieLoader";

function Home() {
  return (
    <div>
      <HeroSection />
      {/* Other home content can go here */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen bg-brand-bg dark:bg-gray-900 text-brand-text dark:text-gray-100">
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={<MovieLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                <Route path="/account" element={<MyAccount />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App; 