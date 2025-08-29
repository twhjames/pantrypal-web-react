import { Link } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent } from '@/components/UI/card';
import { ArrowRight, Linkedin, Globe, Github } from 'lucide-react';
import PublicHeader from '@/components/Layout/PublicHeader';
import Footer from '@/components/Layout/Footer';


const Team = () => {
  const teamMembers = [
    {
      name: "James Teo",
      role: "Principal Engineer & Co-Founder",
      bio: "Leads system architecture and end-to-end engineering at PantryPal, developing and integrating the MLOps pipeline to cut food waste and personalize meals.",
      image: "/team/james.jpeg",
      linkedin: "https://www.linkedin.com/in/twhjames/",
      website: "https://twhjames.dev/",
      github: "https://github.com/twhjames",
    },
    {
      name: "Le Rui",
      role: "Data Scientist & Co-Founder",
      bio: "Drive R&D on PantryPal's ML and MLOps pipeline to power recipe intelligence that minimizes food waste and personalizes meals for every household.",
      image: "/team/lerui.jpeg",
      linkedin: "https://www.linkedin.com/in/le-rui-tay-7b6507272/",
      github: "https://github.com/miyadainim",
    },
    {
      name: "Ysabel Segram",
      role: "Business Analyst & Co-Founder",
      bio: "Turns customer insights into clear priorities, success metrics, and actionable roadmaps that guide PantryPal's product strategy and long-term vision.",
      image: "/team/ysabel.jpeg",
      linkedin: "https://www.linkedin.com/in/ysabel-segram-891809355/",
      github: "https://github.com/whysabell",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PublicHeader />

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
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                <CardContent className="p-8">
                  <img
                    src={member.image}
                    alt={`${member.name} headshot`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                    }}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-gray-200 shadow-sm bg-white"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} website`}
                        className="text-gray-400 hover:text-gray-900"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on GitHub`}
                        className="text-gray-400 hover:text-gray-900"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
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
      <Footer />
    </div>
  );
};

export default Team;
