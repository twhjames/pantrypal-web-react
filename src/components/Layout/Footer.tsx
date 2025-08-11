import { Link } from 'react-router-dom';

const Footer = () => {
  return (
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
              <li><Link to="/login" className="hover:text-green-400">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-green-400">Get Started</Link></li>
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
            <h3 className="font-semibold mb-4">Connect</h3>
            <p className="text-gray-400">
              Follow us for tips on reducing food waste and kitchen organization.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PantryPal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
