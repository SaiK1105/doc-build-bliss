import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Github, Shield } from "lucide-react";

export const Footer = () => {
  const quickLinks = [
    { name: "AI Support", href: "/chat" },
    { name: "Assessment", href: "/assessment" },
    { name: "Resources", href: "/resources" },
    { name: "Book Counselor", href: "/booking" },
  ];

  const supportLinks = [
    { name: "Crisis Helpline", href: "/crisis" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">OpenWELL</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Anonymous, AI-guided mental health support platform for students in higher education. 
              Your wellness journey starts here.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure & Anonymous</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Access</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div>
            <h3 className="font-semibold mb-4">Emergency Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-destructive" />
                <span className="text-muted-foreground">Crisis: 1860-2662-345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">support@openwell.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Available across India</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border/40" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <p>© 2025 HackOps Team - OpenWELL. Built for Smart India Hackathon 2025.</p>
            <p className="mt-1">Empowering student mental health across India.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/hackops-team/openwell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="text-sm text-muted-foreground">
              Open Source Platform
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 p-4 bg-accent/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Important:</strong> OpenWELL provides mental health support and resources but is not a substitute for professional medical care. 
            In case of emergency, please contact your local emergency services or crisis helpline immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};