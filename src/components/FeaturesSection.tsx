import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ClipboardList, 
  BookOpen, 
  Calendar, 
  Users, 
  BarChart3,
  Shield,
  Globe,
  Heart,
  Phone,
  Brain,
  Star
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Guided Support",
      description: "24/7 conversational AI trained on DASS-21, PHQ-9, and GAD-7 assessments with cultural context",
      badge: "AI Powered",
      color: "text-blue-600"
    },
    {
      icon: ClipboardList,
      title: "Mental Health Assessment",
      description: "Standardized screening tools (DASS-21, PHQ-9) for early detection and personalized care paths",
      badge: "Clinical Grade",
      color: "text-green-600"
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Curated articles, videos, audio sessions, and PDFs categorized by mental health topics",
      badge: "Expert Content",
      color: "text-purple-600"
    },
    {
      icon: Calendar,
      title: "Counselor Booking",
      description: "Anonymous scheduling system for professional counseling sessions with verified therapists",
      badge: "Professional",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Peer Support Forum",
      description: "Moderated community spaces for students to connect, share experiences, and support each other",
      badge: "Community",
      color: "text-pink-600"
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      description: "Comprehensive analytics for institutions to track mental health trends and resource allocation",
      badge: "Analytics",
      color: "text-indigo-600"
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "Complete anonymity with end-to-end encryption and unique ID system"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for English, Hindi, Kashmiri, and Dogri languages"
    },
    {
      icon: Phone,
      title: "Crisis Support",
      description: "Immediate escalation to counselors for high-risk situations"
    },
    {
      icon: Brain,
      title: "Evidence-Based",
      description: "Built on proven psychological assessment tools and therapeutic practices"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Star className="mr-2 h-4 w-4" />
            Comprehensive Platform
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need for
            <span className="block gradient-hero bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete digital ecosystem designed to support student mental health 
            with AI-powered tools, professional guidance, and peer community.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-warm transition-gentle border-0 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-background ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Highlights Section */}
        <div className="bg-card/50 rounded-2xl p-8 shadow-soft backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Why Choose OpenWELL?</h3>
            <p className="text-muted-foreground">
              Built specifically for the unique needs of Indian students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};