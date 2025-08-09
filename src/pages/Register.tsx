
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Users, Brain, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
// import registerIllustration from '@/assets/register-illustration.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      toast({
        title: "Welcome to PantryPal!",
        description: "Your account has been created successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again or check your information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mobile layout - centered card
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Link to="/" className="inline-flex items-center justify-center mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm text-gray-600">Back to home</span>
            </Link>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🥬</span>
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Join PantryPal</CardTitle>
            <CardDescription>Create your smart pantry assistant account — 
              <span className="font-medium">save money, cut food waste, and cook with confidence</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Free Account
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Desktop layout - split screen with illustration
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Illustration and info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 p-8 flex-col justify-center">
        <div className="max-w-md mx-auto text-center">
          {/* <img 
            src={registerIllustration} 
            alt="Welcome to smart pantry management community"
            className="w-full h-auto rounded-2xl shadow-lg mb-8"
          /> */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Future of <span className="text-green-600">Kitchen Management</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Join a community using AI to <span className="font-medium">reduce grocery costs</span> and 
            <span className="font-medium"> prevent food waste</span> — with smart tracking, 
            receipt scanning, and pantry-aware recipes that help you use what you already have.
            </p>

          <div className="space-y-4">
            <div className="flex items-center text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Camera className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Receipt Scanning</div>
                <div className="text-sm text-gray-600">Instantly add groceries with OCR technology</div>
              </div>
            </div>
            
            <div className="flex items-center text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">AI Recipe Assistant</div>
                <div className="text-sm text-gray-600">LLaMA-powered personalized cooking suggestions</div>
              </div>
            </div>
            
            <div className="flex items-center text-left">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Community Driven</div>
                <div className="text-sm text-gray-600">Be part of the movement to cut household food waste — together</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🥬</span>
              </div>
              <span className="text-2xl font-bold text-green-600">PantryPal</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">Start your journey to smarter kitchen management today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Free Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              By creating an account, you agree to our terms and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;