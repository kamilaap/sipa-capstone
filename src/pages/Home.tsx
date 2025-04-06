import React, { useState, useEffect } from 'react';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import Hero from '../components/Home/HeroSection';
import Features from '../components/Home/FeaturesSection';
import ArticlesPage from '../components/Home/ArticlesSection';
import Loading from '../components/Ui/Loading';
import BackToTop from '../components/Ui/BackToTop';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <ArticlesPage />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
