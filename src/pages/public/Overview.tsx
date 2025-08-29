import { Link } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Package, Clock, Tag, ArrowRight, Check, Smartphone, Shield, Camera, MessageCircle, Receipt, Brain, Zap, Globe } from 'lucide-react';
import FeaturesHero from '@/assets/feature-hero.png';
import PublicHeader from '@/components/Layout/PublicHeader';
import Footer from '@/components/Layout/Footer';


const Overview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                 One-Stop Features for the <span className="text-green-600">Modern Kitchen</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From shopping to plating, PantryPal connects every step: track items, predict expiry, 
                cook from what you have, and catch deals — helping you <span className="font-medium">reduce waste</span> and 
                <span className="font-medium"> save hundreds annually</span>.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                    Try All Features Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={FeaturesHero}
                alt="AI-powered recipe suggestions with fresh ingredients"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Receipt Scanning Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Camera className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Instant Receipt Scanning</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Snap a photo and let OCR add items to your pantry automatically — 
                <span className="font-medium">save time, avoid duplicate purchases</span>, and keep an accurate inventory.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span>99% accuracy rate with AWS Textract</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Instant item classification & categorization</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Automatic expiry date prediction</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Works with any retail receipt</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl mb-4">📷 Receipt Scanner</div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Tap to scan receipt</p>
                </div>
                <div className="text-sm text-gray-500">Recently scanned:</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Whole Foods • 12 items</span>
                    <span className="text-green-600 text-xs">✓ Added</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">Target • 8 items</span>
                    <span className="text-blue-600 text-xs">Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Pantry Tracking */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Intelligent Pantry Management</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Keep track of everything with quantity monitoring and smart expiry predictions — 
                <span className="font-medium">use food on time</span> and <span className="font-medium">spend less</span>.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>AI-powered expiry date predictions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Smart category organization</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Quantity monitoring & alerts</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Supermarket-specific expiry logic</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl mb-4">📦 My Smart Pantry</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span>Bananas</span>
                  <span className="text-orange-600 text-sm">Expires in 2 days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Organic Bread</span>
                  <span className="text-green-600 text-sm">Fresh (3 days)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span>Whole Milk</span>
                  <span className="text-red-600 text-sm">Use today!</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>Greek Yogurt</span>
                  <span className="text-blue-600 text-sm">Fresh (1 week)</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center text-yellow-700">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">3 items expiring soon - get recipe suggestions</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recipe Chat */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
             <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">LLaMA-Powered Recipe Chat</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Pantry-aware recipes that prioritize soon-to-expire items — 
                <span className="font-medium">cut waste</span>, simplify meal planning, and cook confidently.
               </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-600 mr-3" />
                  <span>LLaMA-powered conversational AI</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-600 mr-3" />
                  <span>Pantry-aware recipe suggestions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-600 mr-3" />
                  <span>Multi-turn conversation support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-600 mr-3" />
                  <span>Dietary restriction customization</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl mb-4">🤖 AI Recipe Assistant</div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">You:</div>
                  <div className="text-sm">"I have bananas, milk, and eggs that expire soon. What can I make?"</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 mb-2">AI Assistant:</div>
                  <div className="text-sm">Perfect! I can suggest 3 delicious recipes using those ingredients. How about fluffy banana pancakes? They'll use your expiring items and I can walk you through the recipe step-by-step. Would you like me to check if you have flour and baking powder too?</div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Powered by advanced LLaMA AI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Tag className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Flash Deals from Partner Supermarkets</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Get timely, personalized offers directly from partnered supermarkets — prioritizing
                <span className="font-medium"> short-dated/expiring groceries at lower costs</span>, plus other relevant discounts.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Partnered supermarket integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Flash discounts on short-dated/expiring items</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span>Personalized alerts based on your pantry & preferences</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl mb-4">💰 Best Deals</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">Organic Apples</div>
                    <div className="text-sm text-gray-600">Partner: Whole Foods Market</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">30% off</div>
                    <div className="text-sm line-through text-gray-500">$4.99</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">Fresh Salmon</div>
                    <div className="text-sm text-gray-600">Partner: Local Market</div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-medium">25% off</div>
                    <div className="text-sm line-through text-gray-500">$12.99</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise-Grade Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge AI, cloud infrastructure, and modern development practices for maximum reliability and performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  LLaMA language model via Groq API with FastAPI backend, SQLAlchemy ORM, and JWT authentication for secure, intelligent interactions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Receipt className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>AWS Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AWS S3 storage, Textract OCR, and Lambda functions provide reliable receipt processing with 99% accuracy and instant results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Modern Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Hexagonal architecture, comprehensive testing with pytest, Alembic migrations, and automated code quality tools ensure maintainability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Security First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Industry-standard JWT authentication, bcrypt password hashing, and secure session management protect your data at every level.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Mobile Native</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Progressive web app with camera integration, responsive design, and offline capabilities for seamless mobile experiences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Scalable Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cloud-native architecture with auto-scaling, load balancing, and 99.9% uptime SLA ensures reliable service as you grow.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Join PantryPal today and start making the most of your kitchen inventory.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Overview;
