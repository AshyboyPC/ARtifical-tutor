import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Mail, BookOpen, Users as UsersIcon, Trophy, Sparkles } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'

interface MenuItem {
  id: number
  title: string
  url: string
  icon: React.ReactNode
  disabled?: boolean
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[]
  className?: string
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/#home",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 2,
    title: "About",
    url: "/#about",
    icon: <User className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Courses",
    url: "/#courses",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Highlights",
    url: "/#highlights",
    icon: <Trophy className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Testimonials",
    url: "/#testimonials",
    icon: <UsersIcon className="w-5 h-5" />
  },
  {
    id: 6,
    title: "Contact",
    url: "/#contact",
    icon: <Mail className="w-5 h-5" />
  },
  {
    id: 7,
    title: "AI Tutor App (Coming Soon)",
    url: "#",
    icon: <Sparkles className="w-5 h-5" />,
    disabled: true
  }
]

export const ScrollNavigationMenu: React.FC<ScrollNavbarProps> = ({ 
  menuItems = defaultMenuItems,
  className = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const location = useLocation()
  const navRef = React.useRef<HTMLElement>(null)
  
  // Scroll to section when location hash changes
  useEffect(() => {
    const scrollToSection = () => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          // Small delay to ensure the element is in the DOM
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    };

    // Initial scroll on page load
    scrollToSection();

    // Also handle when the hash changes without a page reload
    const handleHashChange = () => {
      scrollToSection();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location]);

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 100;
      
      // Only show navbar when at the top of the page
      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setVisible(false);
      }
      
      // Update scrolled state for styling
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const handleNavClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    
    // Update the URL
    window.history.pushState({}, '', url);
    
    // Force a reflow to ensure the DOM is updated
    window.dispatchEvent(new Event('popstate'));
    
    // Close the mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }

  // Animation variants for menu items
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      y: 20, 
      transition: { duration: 0.2 } 
    }
  };

  const hamburgerVariants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 }
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        ref={navRef}
        initial={false}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          padding: isScrolled ? '0.5rem 0' : '1.5rem 0',
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.9)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
          pointerEvents: visible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-all duration-300 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (isMenuOpen) {
                    setTimeout(() => setIsMenuOpen(false), 300);
                  }
                }}
                className="text-2xl font-bold text-white"
              >
                ARtificialTutor
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.disabled ? (
                      <span 
                        className="px-3 py-2 text-sm font-medium rounded-md flex items-center text-gray-500 cursor-not-allowed opacity-60"
                      >
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                    ) : (
                      <Link
                        to={item.url}
                        onClick={(e) => handleNavClick(e, item.url)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900/50 transition-colors"
                      >
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </Link>
                    )}
                    {hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-gray-800/50 rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Hamburger - visible when scrolled */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black/90 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 shadow-2xl w-full max-w-md">
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Menu Items */}
                <div className="grid gap-3 mt-8">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.disabled ? (
                        <span 
                          className="px-3 py-2 text-sm font-medium rounded-md flex items-center text-gray-500 cursor-not-allowed opacity-60"
                        >
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </span>
                      ) : (
                        <Link
                          to={item.url}
                          onClick={(e) => handleNavClick(e, item.url)}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-900 transition-colors group"
                        >
                          <motion.div
                            className="text-blue-400"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="text-lg font-medium text-gray-200 group-hover:text-white">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
