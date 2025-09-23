import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  BookOpen, 
  Calendar, 
  Users, 
  ClipboardList,
  Shield
} from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Heart },
    { name: "AI Support", href: "/chat", icon: MessageCircle },
    { name: "Assessment", href: "/assessment", icon: ClipboardList },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Book Counselor", href: "/booking", icon: Calendar },
    { name: "Peer Support", href: "/forum", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-gentle hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">OpenWELL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2 transition-gentle"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle & Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Anonymous Login
          </Button>
          <Button size="sm" className="gradient-hero text-primary-foreground">
            Get Help Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Anonymous Login
              </Button>
              <Button size="sm" className="w-full gradient-hero text-primary-foreground">
                Get Help Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};