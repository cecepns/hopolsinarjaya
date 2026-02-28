import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import defaultLogo from '../../assets/logo.png';
import { settingsAPI, getImageUrl } from '../../utils/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState({
    company_phone: '',
    company_email: '',
    company_address: '',
    logo_url: '',
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        const data = response.data.data || {};
        setSettings({
          company_phone: data.company_phone || '',
          company_email: data.company_email || '',
          company_address: data.company_address || '',
          logo_url: data.logo_url || '',
        });
      } catch (error) {
        console.error('Error fetching header settings:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchSettings();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const topPhone = settings.company_phone || '081234567890';
  const topEmail = settings.company_email || 'info@hopolsinarjaya.co.id';
  const topAddress = settings.company_address
    ? settings.company_address.split('\n')[0]
    : 'Jl. Contoh No. 123, Kota Semarang, 50212';

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-1 sm:mb-0">
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>{topPhone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span>{topEmail}</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span>{topAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 border-b-2 border-slate-200 transition-all duration-300 ${
        isScrolled ? 'bg-white' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo: from settings or default */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={settings.logo_url ? getImageUrl(settings.logo_url) : defaultLogo}
                alt="Logo"
                className="w-24 h-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 ${
                    isActive(item.href) ? 'text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-gray-50 font-medium transition-all duration-200 ${
                    isActive(item.href) ? 'text-red-600 bg-red-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;