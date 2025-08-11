import { Link } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Check, ArrowRight, Zap, Users, ShieldCheck } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🥬</span>
              </div>
              <span className="ml-2 text-xl font-bold text-green-600">PantryPal</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/overview" className="text-gray-600 hover:text-green-600">Features</Link>
              <Link to="/pricing" className="text-green-600 font-medium">Pricing</Link>
              <Link to="/team" className="text-gray-600 hover:text-green-600">Team</Link>
              <Link to="/contact" className="text-gray-600 hover:text-green-600">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-green-600 hover:text-green-700">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Always <span className="text-green-600">free</span> for families
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            We believe everyone deserves access to affordable, fresh food. That's why PantryPal is completely free for consumers. 
            We partner with grocery stores to reduce their waste and pass the savings to you.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <Card className="relative bg-white shadow-xl border-2 border-green-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Always Free
                </span>
              </div>
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Personal</CardTitle>
                <CardDescription className="text-lg">Perfect for individuals and families</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-green-600">$0</span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Unlimited pantry items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Receipt scanning with OCR</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>AI recipe suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Expiry date predictions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Smart notifications</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span>Mobile & web access</span>
                  </li>
                </ul>
                <Link to="/register" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Community</CardTitle>
                <CardDescription className="text-lg">Join thousands reducing food waste</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Everything in Personal</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Community recipe sharing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Local deal alerts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Waste reduction analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <p className="text-center text-gray-600 text-sm mb-4">
                  Available through community participation
                </p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold">For Retailers</CardTitle>
                <CardDescription className="text-lg">Partner with us to reduce waste</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Revenue-share model</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Reduce inventory shrinkage</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Increase customer visits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Link to="/contact" className="block">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How We Keep It Free for You
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We partner with grocery retailers to reduce waste while keeping the app completely free for consumers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Retailers Partner</h3>
              <p className="text-gray-600">
                Grocery stores partner with us to reduce shrinkage and increase customer engagement through smart deals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">You Save Money</h3>
              <p className="text-gray-600">
                Access personalized deals, reduce food waste, and save hundreds annually - all through our free app.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Everyone Wins</h3>
              <p className="text-gray-600">
                We earn through revenue-sharing with retailers, so we only profit when you and our partners succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Impact of Free Access
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              By keeping PantryPal free, we maximize adoption and create real impact in reducing food waste globally.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">27%</div>
              <div className="text-gray-600">Average Shrinkage Reduction</div>
              <div className="text-sm text-gray-500 mt-1">For partner retailers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">$500+</div>
              <div className="text-gray-600">Annual Consumer Savings</div>
              <div className="text-sm text-gray-500 mt-1">Through smart shopping</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-gray-600">Household Waste Reduction</div>
              <div className="text-sm text-gray-500 mt-1">Average user impact</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">Free</div>
              <div className="text-gray-600">Forever for Consumers</div>
              <div className="text-sm text-gray-500 mt-1">No hidden costs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Saving Today - Completely Free
          </h2>
          <p className="text-green-100 mb-8 text-xl">
            No trials, no limits, no credit cards. Just smart pantry management that saves money and reduces waste.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto">
                Get Started Free Forever
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-green-600 hover:bg-gray-100 hover:text-green-600 w-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🥬</span>
                </div>
                <span className="ml-2 text-xl font-bold text-green-400">PantryPal</span>
              </div>
              <p className="text-gray-400">
                Your smart pantry assistant for a waste-free kitchen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/overview" className="hover:text-green-400">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-green-400">Pricing</Link></li>
                <li><Link to="/login" className="hover:text-green-400">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/team" className="hover:text-green-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <p className="text-gray-400 text-sm">
                Interested in partnering with us to reduce food waste? Contact our team.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PantryPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
