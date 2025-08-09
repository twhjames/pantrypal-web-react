
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent } from '@/components/UI/card';
import { ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former chef turned tech entrepreneur, leading PantryPal’s mission to help households save money and reduce food waste.",
      image: "👩‍🍳",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Full-stack CTO building a reliable, secure platform that powers real-time pantry tracking and AI recipes.",
      image: "👨‍💻",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Design",
      bio: "Design lead crafting an intuitive, mobile-first experience so anyone can cook from what they have.",
      image: "👩‍🎨",
    },
    {
      name: "David Kim",
      role: "AI Engineer",
      bio: "AI engineer ensuring recipes are pantry-aware and prioritize soon-to-expire items to cut waste.",
      image: "🤖",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🥬</span>
              </div>
              <span className="ml-2 text-xl font-bold text-green-600">PantryPal</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/overview" className="text-gray-600 hover:text-green-600">Features</Link>
              <Link to="/team" className="text-green-600 font-medium">Team</Link>
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Meet the Team Behind PantryPal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're technologists, designers, and food enthusiasts on a mission to 
            <span className="font-medium"> eliminate household food waste</span> and 
            <span className="font-medium"> lower grocery costs</span> by connecting the whole journey — from shopping to plating.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <button className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-400">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-900">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            We believe that technology can help solve one of the world's biggest challenges: food waste. 
            Every year, billions of pounds of food are wasted while millions go hungry. Our mission is to 
            empower individuals to make better decisions about their food consumption, reduce waste, and 
            discover the joy of cooking with what they have.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-bold text-gray-900 mb-2">Environmental Impact</h3>
              <p className="text-gray-600">Reducing food waste to help protect our planet for future generations.</p>
            </div>
            <div>
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Help families reduce grocery bills by making the most of what they buy.</p>
            </div>
            <div>
              <div className="text-3xl mb-4">👨‍🍳</div>
              <h3 className="font-bold text-gray-900 mb-2">Better Cooking</h3>
              <p className="text-gray-600">Inspire creativity in the kitchen with personalized recipe suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Be part of the solution. Start your journey with PantryPal today.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;
