import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, Music, Zap, BarChart2, DollarSign, 
  LayoutDashboard, Smartphone, MessageSquare, 
  Video, BookOpen, Clock
} from 'lucide-react';

const systemCards = [
  {
    name: 'Minecraft Status',
    description: 'Check the status of your Minecraft servers',
    path: '/minecraft',
    icon: <Server className="h-6 w-6 text-indigo-500" />,
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    name: 'Music Player',
    description: 'Play and manage your music collection',
    path: '/music',
    icon: <Music className="h-6 w-6 text-green-500" />,
    color: 'bg-green-50 border-green-200',
  },
  {
    name: 'Laser Game',
    description: 'Play an interactive laser game',
    path: '/laser-game',
    icon: <Zap className="h-6 w-6 text-amber-500" />,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    name: 'Poll System',
    description: 'Create and manage polls',
    path: '/polls',
    icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    name: 'Payment System',
    description: 'Process and manage payments',
    path: '/payments',
    icon: <DollarSign className="h-6 w-6 text-emerald-500" />,
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    name: 'Management System',
    description: 'Control and manage your resources',
    path: '/management',
    icon: <LayoutDashboard className="h-6 w-6 text-purple-500" />,
    color: 'bg-purple-50 border-purple-200',
  },
  {
    name: 'Phone Status',
    description: 'Monitor your phone status',
    path: '/phone-status',
    icon: <Smartphone className="h-6 w-6 text-rose-500" />,
    color: 'bg-rose-50 border-rose-200',
  },
  {
    name: 'Chat System',
    description: 'Chat with friends and colleagues',
    path: '/chat',
    icon: <MessageSquare className="h-6 w-6 text-sky-500" />,
    color: 'bg-sky-50 border-sky-200',
  },
  {
    name: 'Live System',
    description: 'Stream and watch live content',
    path: '/live',
    icon: <Video className="h-6 w-6 text-red-500" />,
    color: 'bg-red-50 border-red-200',
  },
  {
    name: 'Story System',
    description: 'Share and view stories',
    path: '/stories',
    icon: <BookOpen className="h-6 w-6 text-orange-500" />,
    color: 'bg-orange-50 border-orange-200',
  },
  {
    name: 'Time System',
    description: 'Track and manage your time',
    path: '/time',
    icon: <Clock className="h-6 w-6 text-teal-500" />,
    color: 'bg-teal-50 border-teal-200',
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-Functional App Suite</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access all your systems in one place. Choose a system below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {systemCards.map((card) => (
          <Link 
            key={card.name}
            to={card.path}
            className={`flex flex-col p-6 rounded-lg shadow-sm border ${card.color} transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
          >
            <div className="flex items-center mb-4">
              {card.icon}
              <h2 className="ml-3 text-lg font-medium text-gray-900">{card.name}</h2>
            </div>
            <p className="text-gray-600 text-sm flex-grow">{card.description}</p>
            <div className="mt-4 text-sm font-medium text-indigo-600 flex items-center">
              Open system
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;