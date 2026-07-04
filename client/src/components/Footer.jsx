import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2, Video } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              VANTAGE
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Experience the future of fashion. AI-powered customization, interactive 3D product previews, and premium apparel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><Share2 size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors"><Video size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop/men" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Men's Collection</Link></li>
              <li><Link to="/shop/women" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Women's Collection</Link></li>
              <li><Link to="/shop/shoes" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Footwear</Link></li>
              <li><Link to="/shop?tags=new" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Track Order</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Shipping Info</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-500 transition-colors text-sm">Returns & Exchanges</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button 
                type="submit" 
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-r-lg font-medium text-sm hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VANTAGE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
