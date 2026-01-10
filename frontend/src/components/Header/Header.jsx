import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import AuthModal from "../Auth/AuthModal.jsx";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]
  
  const navLinkClass = ({ isActive }) =>
    `text-white font-mono font-medium rounded-lg text-sm px-4 py-2.5 duration-200 focus:outline-none block text-center
    ${isActive ? "bg-[#6F4A8E]" : "bg-gray-600 hover:bg-[#6F4A8E]"}
    focus:ring-4 focus:ring-purple-400`;

  const sidebarNavLinkClass = ({ isActive }) =>
    `text-white font-mono font-medium rounded-lg text-base px-4 py-3 duration-200 focus:outline-none block w-full text-left
    ${isActive ? "bg-[#6F4A8E]" : "bg-gray-700 hover:bg-[#6F4A8E]"}
    focus:ring-4 focus:ring-purple-400`;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#221F3B] shadow-purple-200 border-gray-700 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
          <Link to="/" className="flex items-center">
            <img
              src="/IOTHeaderLogo_1.png"
              className="mr-3 h-12 sm:h-14 md:h-15"
              alt="Logo"
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-[#EBEBEB] rounded-lg lg:hidden hover:bg-[#6F4A8E] focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-controls="mobile-sidebar"
            aria-expanded={isSidebarOpen}
          >
            <span className="sr-only">Open sidebar menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:order-1">
            <ul className="flex flex-row font-mono font-medium space-x-4">
              {navItems.map(({ name, path }) => (
                <li key={path}>
                  <NavLink to={path} className={navLinkClass}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-3 ml-6">
              {!loading && (
                <>
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="hidden sm:inline">{user.email?.split('@')[0] || 'User'}</span>
                        <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showUserMenu && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setShowUserMenu(false)}
                          ></div>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                            <div className="p-3 border-b border-gray-200">
                              <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                            </div>
                            <button
                              onClick={async () => {
                                await signOut();
                                setShowUserMenu(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign Out
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all shadow-lg"
                    >
                      Get Started
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Auth Modal */}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode={authMode}
          />
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 lg:hidden transition-all duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#1a1730] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/" onClick={closeSidebar} className="flex items-center">
            <img
              src="/IOTHeaderLogo_1.png"
              className="h-10"
              alt="Logo"
            />
          </Link>
          <button
            onClick={closeSidebar}
            className="p-2 text-gray-400 hover:bg-[#6F4A8E] hover:text-white rounded-lg transition-all"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex flex-col h-auto overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map(({ name, path }) => (
              <li key={path}>
                <NavLink to={path} className={sidebarNavLinkClass} onClick={closeSidebar}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Sidebar Auth Section */}
          <div className="border-t border-gray-700 pt-4 mt-auto">
            {!loading && (
              <>
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm font-semibold text-white truncate">{user.email?.split('@')[0] || 'User'}</p>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={async () => {
                        await signOut();
                        closeSidebar();
                      }}
                      className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                      closeSidebar();
                    }}
                    className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all shadow-lg"
                  >
                    Get Started
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      </aside>
    </header>
  );
}