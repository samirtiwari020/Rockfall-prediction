import { Card, CardContent } from '@/components/ui2/card';
import { 
  Brain, 
  Satellite, 
  Thermometer, 
  Camera, 
  AlertTriangle, 
  TrendingUp 
} from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze multiple data sources to predict rockfall events with high accuracy."
    },
    {
      icon: Satellite,
      title: "DEM & Drone Integration", 
      description: "Digital Elevation Models and drone imagery provide comprehensive 3D mapping and real-time visual data."
    },
    {
      icon: Thermometer,
      title: "IoT Sensor Network",
      description: "Distributed sensors monitor ground stability, vibrations, and environmental conditions 24/7."
    },
    {
      icon: Camera,
      title: "Weather Data Integration",
      description: "Real-time weather monitoring helps predict conditions that increase rockfall risk."
    },
    {
      icon: AlertTriangle,
      title: "Intelligent Alerts",
      description: "Automated risk assessment with actionable recommendations for immediate response."
    },
    {
      icon: TrendingUp,
      title: "Predictive Modeling",
      description: "Synthetic data analysis and trend prediction to prevent incidents before they occur."
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Rockguard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our revolutionary AI-based rockfall prediction system combines multiple data sources 
            and advanced analytics to provide unparalleled safety monitoring for open pit mining operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-mining transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground ml-3">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Why Choose RockGuard ?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Multi-Source Data Integration</h4>
                    <p className="text-muted-foreground">Combines DEM, drone imagery, IoT sensors, and weather data for comprehensive analysis.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Real-Time Risk Assessment</h4>
                    <p className="text-muted-foreground">Continuous monitoring with instant alerts for high-risk zones and recommended actions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-safety-safe mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Predictive Capabilities</h4>
                    <p className="text-muted-foreground">Advanced AI models predict potential rockfall events before they occur.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
              <div className="text-center p-4 bg-safety-safe/10 rounded-lg">
                <div className="text-3xl font-bold text-safety-safe">&lt; 2min</div>
                <div className="text-sm text-muted-foreground">Alert Response</div>
              </div>
              <div className="text-center p-4 bg-safety-info/10 rounded-lg">
                <div className="text-3xl font-bold text-safety-info">15+</div>
                <div className="text-sm text-muted-foreground">Data Sources</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;