import React, { useState, useEffect } from 'react';
import { Server, Users, Wifi, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockServers = [
  {
    id: 1,
    name: 'Survival Server',
    address: 'mc.survival.example.com',
    port: 25565,
    status: 'online',
    players: { online: 42, max: 100 },
    version: '1.20.4',
    ping: 23,
    motd: 'Welcome to our Survival server! Explore and build!',
    lastChecked: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Creative Server',
    address: 'creative.example.com',
    port: 25565,
    status: 'online',
    players: { online: 15, max: 50 },
    version: '1.20.4',
    ping: 45,
    motd: 'Creative mode server - Let your imagination run wild!',
    lastChecked: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Minigames Server',
    address: 'minigames.example.com',
    port: 25565,
    status: 'offline',
    players: { online: 0, max: 100 },
    version: '1.20.4',
    ping: 0,
    motd: 'Server is currently under maintenance.',
    lastChecked: new Date().toISOString(),
  },
];

function MinecraftStatus() {
  const [servers, setServers] = useState(mockServers);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshServers = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update last checked timestamp for all servers
      const updatedServers = servers.map(server => ({
        ...server,
        lastChecked: new Date().toISOString(),
        // Randomly change some player counts to simulate activity
        players: server.status === 'online' 
          ? { ...server.players, online: Math.floor(Math.random() * server.players.max) }
          : server.players
      }));
      
      setServers(updatedServers);
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    // Initial refresh
    refreshServers();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(refreshServers, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatLastChecked = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Minecraft Server Status" 
        icon={<Server className="h-8 w-8 text-indigo-500" />}
        description="Monitor the status of your Minecraft servers in real-time."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Servers</h2>
          <button 
            onClick={refreshServers}
            disabled={isRefreshing}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              <>Refresh</>
            )}
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {servers.map(server => (
            <div key={server.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center ${
                    server.status === 'online' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {server.status === 'online' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{server.name}</h3>
                    <p className="text-sm text-gray-500">{server.address}:{server.port}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last checked: {formatLastChecked(server.lastChecked)}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-medium text-gray-500">Players</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {server.players.online} / {server.players.max}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium text-gray-500">Version</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{server.version}</p>
                </div>

                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm font-medium text-gray-500">Ping</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {server.status === 'online' ? `${server.ping} ms` : '-'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium text-gray-500">Status</span>
                  </div>
                  <p className={`mt-1 text-lg font-semibold ${
                    server.status === 'online' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {server.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 rounded-md p-3">
                <div className="flex items-center mb-1">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-500">Message of the Day</span>
                </div>
                <p className="text-sm text-gray-700">{server.motd}</p>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Edit Server
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MinecraftStatus;