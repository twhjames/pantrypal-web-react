import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/overview' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Team', path: '/team' },
];

const PublicHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path: string) =>
    location.pathname === path
      ? 'text-green-600 font-medium'
      : 'text-gray-600 hover:text-green-600';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg">🥬</span>
            </div>
            <span className="ml-2 text-xl font-bold text-green-600">PantryPal</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ name, path }) => (
              <Link key={path} to={path} className={linkClasses(path)}>
                {name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex space-x-4">
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

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`block ${linkClasses(path)}`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                <Button
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 w-full justify-start"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                <Button className="bg-green-600 hover:bg-green-700 w-full justify-start">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
