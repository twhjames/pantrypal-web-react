import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
// import loginIllustration from '@/assets/login-illustration.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to PantryPal.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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
            <CardTitle className="text-2xl font-bold text-green-600">Welcome Back</CardTitle>
            <CardDescription>Sign in to your smart pantry assistant — <span className="font-medium">save money, cut waste, cook smarter</span>.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In to PantryPal
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Sign up free
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
            src={loginIllustration} 
            alt="Smart pantry management with receipt scanning"
            className="w-full h-auto rounded-2xl shadow-lg mb-8"
          /> */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back to <span className="text-green-600">PantryPal</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Pick up where you left off - track your pantry, get AI recipe suggestions, 
            and use up food before it expires to <span className="font-medium">spend less and waste less</span>.
            </p>

          <div className="space-y-4">
            <div className="flex items-center text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Secure & Private</div>
                <div className="text-sm text-gray-600">Enterprise-grade security protects your data</div>
              </div>
            </div>
            
            <div className="flex items-center text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Mobile Optimized</div>
                <div className="text-sm text-gray-600">Access your pantry anywhere, anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
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
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
            <p className="text-gray-600">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Sign In to PantryPal
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;