import { Button } from '@/components/ui2/button';
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-mining.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              AI-Powered Mining Safety
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Advanced Rockfall
            <span className="block text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
              Prediction & Alert
            </span>
            System
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Protect your mining operations with cutting-edge AI technology. Real-time risk assessment, 
            predictive analytics, and intelligent alerts for open pit mines.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Real-time Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">AI Predictions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-safety-safe" />
              <span className="text-muted-foreground">Safety First</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/system">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow">
                Explore Our System
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 hover:bg-primary/10"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </section>
  );
};

export default HeroSection;