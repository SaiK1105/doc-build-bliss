import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  MessageCircle, 
  Bot, 
  User, 
  Shield, 
  AlertTriangle,
  Heart,
  Mic,
  PaperclipIcon
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'assessment' | 'crisis' | 'normal';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI mental health companion. I'm here to provide confidential support and guidance. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
        type: detectMessageType(input)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Show crisis alert if needed
      if (aiResponse.type === 'crisis') {
        toast({
          title: "Crisis Support Available",
          description: "A counselor has been alerted. You can also call our 24/7 crisis line: 1860-2662-345",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('crisis') || input.includes('harm') || input.includes('suicide')) {
      return "I'm very concerned about what you're sharing. Your safety is the most important thing right now. I've alerted a counselor who will reach out to you shortly. Please consider calling our 24/7 crisis line at 1860-2662-345 or your local emergency services. You're not alone in this.";
    }
    
    if (input.includes('anxious') || input.includes('anxiety')) {
      return "I understand you're feeling anxious. That's a very common experience, especially for students. Try taking slow, deep breaths - in for 4 counts, hold for 4, out for 4. Would you like me to guide you through some grounding techniques, or would you prefer to talk about what's making you feel anxious?";
    }
    
    if (input.includes('stressed') || input.includes('stress') || input.includes('overwhelmed')) {
      return "It sounds like you're dealing with a lot of stress. That's completely understandable - student life can be overwhelming. Let's break this down together. What's the main source of stress for you right now? Sometimes just talking through it can help lighten the load.";
    }
    
    if (input.includes('depressed') || input.includes('sad') || input.includes('down')) {
      return "I hear that you're feeling down, and I want you to know that your feelings are valid. Depression is more common than you might think, especially among students. You've taken a brave step by reaching out. Would you like to talk about what's been bothering you, or would you prefer some coping strategies?";
    }
    
    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you've been feeling lately? Remember, this is a safe space and everything we discuss is completely confidential.";
  };

  const detectMessageType = (input: string): 'assessment' | 'crisis' | 'normal' => {
    const keywords = input.toLowerCase();
    if (keywords.includes('crisis') || keywords.includes('harm') || keywords.includes('suicide')) {
      return 'crisis';
    }
    if (keywords.includes('assess') || keywords.includes('test') || keywords.includes('questionnaire')) {
      return 'assessment';
    }
    return 'normal';
  };

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I've been feeling down lately",
    "I'm stressed about my future",
    "I need someone to talk to"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Shield className="mr-2 h-4 w-4" />
            Anonymous & Confidential
          </Badge>
          <h1 className="text-3xl font-bold mb-2">AI Mental Health Support</h1>
          <p className="text-muted-foreground">
            Your safe space for mental health support, available 24/7
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elevated">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Confidential Chat Session</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted text-muted-foreground mr-12'
                      } ${message.type === 'crisis' ? 'border-2 border-destructive' : ''}`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'ai' && (
                          <div className="flex-shrink-0 mt-1">
                            {message.type === 'crisis' ? (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-muted text-muted-foreground mr-12">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Responses */}
              <div className="px-6 py-4 border-t bg-muted/20">
                <p className="text-sm text-muted-foreground mb-3">Quick responses:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(response)}
                      className="text-xs transition-gentle"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t">
                <div className="flex space-x-2">
                  <div className="flex-1 flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message here... Everything is confidential."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  Your privacy is protected. This conversation is anonymous and encrypted.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}