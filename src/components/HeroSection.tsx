import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Shield, 
  Heart, 
  Users, 
  Clock, 
  Globe,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const features = [
    { icon: Shield, text: "Anonymous & Confidential" },
    { icon: Clock, text: "24/7 AI Support" },
    { icon: Users, text: "Peer Community" },
    { icon: Globe, text: "Multi-language" }
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-calm opacity-60" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-primary/10 blur-xl" />
      <div className="absolute bottom-20 right-20 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Heart className="mr-2 h-4 w-4" />
            Smart India Hackathon 2025 Winner
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            Your Mental Health
            <span className="block gradient-hero bg-clip-text text-transparent">
              Matters Most
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg text-muted-foreground lg:text-xl max-w-2xl mx-auto">
            Anonymous, AI-guided mental health support platform designed specifically 
            for students in higher education. Get help without stigma, in your own language.
          </p>

          {/* Feature Pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 shadow-soft transition-gentle hover:shadow-warm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/chat">
              <Button 
                size="lg" 
                className="gradient-hero text-primary-foreground shadow-elevated hover:shadow-warm transition-bounce group"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start AI Chat Support
                <ArrowRight className="ml-2 h-5 w-5 transition-all group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/assessment">
              <Button 
                variant="outline" 
                size="lg"
                className="shadow-soft hover:shadow-warm transition-gentle"
              >
                Take Wellness Assessment
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by students across India
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-medium">🔒 End-to-End Encrypted</div>
              <div className="text-xs font-medium">🏥 Clinical Standards</div>
              <div className="text-xs font-medium">🌍 Multi-Language Support</div>
              <div className="text-xs font-medium">📱 Mobile-First Design</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};