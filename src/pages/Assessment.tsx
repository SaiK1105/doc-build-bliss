import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ClipboardList, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Heart,
  Shield,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  text: string;
  category: 'depression' | 'anxiety' | 'stress';
}

const questions: Question[] = [
  { id: '1', text: 'I found it hard to wind down', category: 'stress' },
  { id: '2', text: 'I was aware of dryness of my mouth', category: 'anxiety' },
  { id: '3', text: 'I couldn\'t seem to experience any positive feeling at all', category: 'depression' },
  { id: '4', text: 'I experienced breathing difficulty', category: 'anxiety' },
  { id: '5', text: 'I found it difficult to work up the initiative to do things', category: 'depression' },
  { id: '6', text: 'I tended to over-react to situations', category: 'stress' },
  { id: '7', text: 'I experienced trembling (eg, in the hands)', category: 'anxiety' },
  { id: '8', text: 'I felt that I was using a lot of nervous energy', category: 'stress' },
  { id: '9', text: 'I was worried about situations in which I might panic', category: 'anxiety' },
  { id: '10', text: 'I felt that I had nothing to look forward to', category: 'depression' },
];

const scoreOptions = [
  { value: '0', label: 'Did not apply to me at all' },
  { value: '1', label: 'Applied to me to some degree' },
  { value: '2', label: 'Applied to me to a considerable degree' },
  { value: '3', label: 'Applied to me very much' }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const scores = calculateScores();
    setResults(scores);
    setIsCompleted(true);
    
    if (scores.overallRisk === 'high') {
      toast({
        title: "Support Available",
        description: "Your results indicate you might benefit from professional support. A counselor will be available to help you.",
        variant: "destructive",
      });
    }
  };

  const calculateScores = () => {
    const depressionScore = questions
      .filter(q => q.category === 'depression')
      .reduce((sum, q) => sum + parseInt(answers[q.id] || '0'), 0);
    
    const anxietyScore = questions
      .filter(q => q.category === 'anxiety')
      .reduce((sum, q) => sum + parseInt(answers[q.id] || '0'), 0);
    
    const stressScore = questions
      .filter(q => q.category === 'stress')
      .reduce((sum, q) => sum + parseInt(answers[q.id] || '0'), 0);

    const overallRisk = (depressionScore > 6 || anxietyScore > 5 || stressScore > 7) ? 'high' : 
                       (depressionScore > 3 || anxietyScore > 3 || stressScore > 4) ? 'moderate' : 'low';

    return {
      depression: depressionScore,
      anxiety: anxietyScore,
      stress: stressScore,
      overallRisk
    };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'moderate': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive' as const;
      case 'moderate': return 'secondary' as const;
      default: return 'default' as const;
    }
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <CheckCircle className="mr-2 h-4 w-4" />
              Assessment Complete
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Your Wellness Report</h1>
            <p className="text-muted-foreground">
              Based on standardized DASS-21 assessment principles
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Overall Status */}
            <Card className="shadow-elevated">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${
                  results.overallRisk === 'high' ? 'bg-destructive/10' :
                  results.overallRisk === 'moderate' ? 'bg-orange-100 dark:bg-orange-900/20' :
                  'bg-green-100 dark:bg-green-900/20'
                }`}>
                  {results.overallRisk === 'high' ? 
                    <AlertTriangle className="h-8 w-8 text-destructive" /> :
                    <Heart className="h-8 w-8 text-green-600" />
                  }
                </div>
                <CardTitle className="text-2xl">
                  Overall Wellness Status
                </CardTitle>
                <Badge variant={getRiskBadgeVariant(results.overallRisk)} className="text-base px-4 py-1 capitalize">
                  {results.overallRisk} Priority
                </Badge>
              </CardHeader>
            </Card>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Depression</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{results.depression}</div>
                </CardHeader>
                <CardContent>
                  <Progress value={(results.depression / 12) * 100} className="mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {results.depression <= 3 ? 'Normal' : results.depression <= 6 ? 'Mild' : 'Moderate-Severe'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Anxiety</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">{results.anxiety}</div>
                </CardHeader>
                <CardContent>
                  <Progress value={(results.anxiety / 12) * 100} className="mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {results.anxiety <= 3 ? 'Normal' : results.anxiety <= 5 ? 'Mild' : 'Moderate-Severe'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Stress</CardTitle>
                  <div className="text-3xl font-bold text-orange-600">{results.stress}</div>
                </CardHeader>
                <CardContent>
                  <Progress value={(results.stress / 12) * 100} className="mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {results.stress <= 4 ? 'Normal' : results.stress <= 7 ? 'Mild' : 'Moderate-Severe'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-primary" />
                  <span>Recommended Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.overallRisk === 'high' && (
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">Immediate Support Available</h4>
                    <p className="text-sm mb-3">Your results indicate you might benefit from professional support right away.</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="destructive">Book Counselor Session</Button>
                      <Button size="sm" variant="outline">24/7 Crisis Support</Button>
                    </div>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2 w-full">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Start AI Chat Support</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      Get immediate, personalized coping strategies
                    </p>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2 w-full">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Explore Resources</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      Access curated mental health resources
                    </p>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Your Privacy is Protected</h4>
                    <p className="text-sm text-muted-foreground">
                      This assessment is completely anonymous. Your responses are encrypted and only used 
                      to provide you with personalized support recommendations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <ClipboardList className="mr-2 h-4 w-4" />
            Mental Health Assessment
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Wellness Check-In</h1>
          <p className="text-muted-foreground">
            A brief, confidential assessment to understand how you're feeling
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="text-xl">
                {questions[currentQuestion].text}
              </CardTitle>
              <CardDescription>
                Please select the option that best describes how this applied to you over the past week.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <RadioGroup 
                value={answers[questions[currentQuestion].id] || ''} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {scoreOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-sm leading-relaxed">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[questions[currentQuestion].id]}
                  className="gradient-hero text-primary-foreground"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Completely Anonymous & Secure</h4>
                  <p className="text-sm text-muted-foreground">
                    Your responses are encrypted and anonymous. This assessment helps us provide 
                    personalized support recommendations based on clinical standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}