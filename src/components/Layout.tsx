import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Menu, X, Home, Server, Music, Zap, BarChart2, 
  DollarSign, LayoutDashboard, Smartphone, 
  MessageSquare, Video, BookOpen, Clock, ChevronDown
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
  { path: '/minecraft', name: 'Minecraft Status', icon: <Server size={20} /> },
  { path: '/music', name: 'Music Player', icon: <Music size={20} /> },
  { path: '/laser-game', name: 'Laser Game', icon: <Zap size={20} /> },
  { path: '/polls', name: 'Poll System', icon: <BarChart2 size={20} /> },
  { path: '/payments', name: 'Payment System', icon: <DollarSign size={20} /> },
  { path: '/management', name: 'Management', icon: <LayoutDashboard size={20} /> },
  { path: '/phone-status', name: 'Phone Status', icon: <Smartphone size={20} /> },
  { path: '/chat', name: 'Chat System', icon: <MessageSquare size={20} /> },
  { path: '/live', name: 'Live System', icon: <Video size={20} /> },
  { path: '/stories', name: 'Story System', icon: <BookOpen size={20} /> },
  { path: '/time', name: 'Time System', icon: <Clock size={20} /> },
];

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === name ? null : name);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md lg:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="font-semibold text-lg text-gray-800">Multi-App Suite</div>
          <div className="w-8"></div> {/* Spacer for balanced header */}
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden transition-transform duration-300 ease-in-out bg-white shadow-xl w-72`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="font-bold text-xl text-gray-800">Multi-App Suite</div>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) => 
                      `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-xl font-bold text-gray-800">Multi-App Suite</h1>
            </div>
            <nav className="flex-1 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;