import { Link } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Package, Clock, Tag, ArrowRight, Check, Camera, MessageCircle, Receipt, Smartphone, Brain, ShieldCheck } from 'lucide-react';
import PublicHeader from '@/components/Layout/PublicHeader';
import Footer from '@/components/Layout/Footer';
// import pantryAppDemo from '@/assets/pantry-app-demo.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Eat Well. Pay Less. <span className="text-green-600">Waste Less.</span>
              </h1>
             
              <p className="text-xl text-gray-600 mb-8">
                Save thousands on groceries while saving good food from going to waste. 
                Your AI-powered pantry assistant tracks expiry dates, suggests recipes, and finds you the best deals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/overview">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  100% Free to use
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Save up to 40% on groceries
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Reduce food waste
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 rounded-2xl shadow-2xl">
                <div className="w-full h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  {/* <img 
                  src={pantryAppDemo} 
                  alt="PantryPal mobile app demo showing smart pantry tracking interface"
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                /> */}
                  <div className="text-center text-gray-600">
                    <Smartphone className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <p className="text-lg font-medium">PantryPal App Demo</p>
                    <p className="text-sm">Smart Pantry Tracking Interface</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-100 p-3 rounded-full animate-bounce">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-100 p-3 rounded-full animate-bounce [animation-delay:200ms]">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Turn Groceries into Savings, Not Waste
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of families saving money on groceries while keeping good food from going to waste.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Receipt Scanning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Instantly add groceries with OCR — <span className="font-medium">save time</span> and never forget what you bought.
                  </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI Recipe Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get pantry-aware recipes that use food before it spoils — <span className="font-medium">cut waste</span> and cook smarter.
                  </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Smart Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI predicts expiry dates based on product categories and supermarket-specific data for maximum accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Smart Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Organize by categories, track quantities, and get intelligent notifications about your pantry status.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Zero Waste Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get timely notifications about expiring items with recipe suggestions to use them before they spoil.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Flash Deals from Partners</CardTitle>
              </CardHeader>
              <CardContent>
                 <CardDescription className="text-base">
                  Time-sensitive promos from partnered supermarkets — with a focus on 
                  <span className="font-medium"> short-dated/expiring groceries at lower prices</span>, plus other relevant discounts.
                  </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge AI and cloud infrastructure for reliability, security, and performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LLaMA AI Integration</h3>
              <p className="text-gray-600">
                Advanced language model via Groq API for intelligent recipe recommendations and chat interactions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AWS Textract OCR</h3>
              <p className="text-gray-600">
                Industry-leading optical character recognition for accurate receipt scanning and item extraction.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-600">
                JWT authentication, encrypted data storage, and enterprise-grade security measures protect your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Making a real impact together</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-gray-600">Pounds of food saved from waste</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">$2M+</div>
                <div className="text-gray-600">Saved by families like yours</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy families reducing waste</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-gray-600">Average reduction in food waste</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start saving today. For free.
          </h2>
          <p className="text-green-100 mb-8 text-xl">
            Discover discounts, prevent waste, and turn what's in your pantry into delicious meals — get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto">
                Start Saving Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/overview">
              <Button size="lg" variant="outline" className="border-white text-green-600 hover:bg-gray-100 hover:text-green-600 w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="text-green-200 mt-6 text-sm">
            100% Free • Setup in under 2 minutes • Save hundreds every year
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
