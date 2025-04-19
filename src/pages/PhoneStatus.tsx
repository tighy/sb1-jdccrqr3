import React, { useState, useEffect } from 'react';
import { Smartphone, Battery, Wifi, Bluetooth, Thermometer, Cpu, Zap, RefreshCw, Settings } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockPhoneData = {
  model: "iPhone 13 Pro",
  os: "iOS 16.3.1",
  memory: {
    total: 128,
    used: 74.3,
  },
  battery: {
    level: 78,
    charging: true,
    health: 92,
    temperature: 30.2,
  },
  network: {
    type: "5G",
    strength: 84,
    wifi: {
      connected: true,
      ssid: "HomeNetwork",
      strength: 92,
    },
    bluetooth: {
      enabled: true,
      connected: true,
      devices: [
        { name: "AirPods Pro", type: "audio" },
        { name: "Apple Watch", type: "wearable" },
      ],
    },
  },
  processors: {
    usage: 34,
    temperature: 48.3,
  },
  storage: {
    total: 128,
    used: 94.5,
    apps: 56.2,
    media: 32.7,
    system: 5.6,
  },
};

function PhoneStatus() {
  const [phoneData, setPhoneData] = useState(mockPhoneData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate some data changes
      const updatedData = {
        ...phoneData,
        battery: {
          ...phoneData.battery,
          level: phoneData.battery.charging ? 
            Math.min(100, phoneData.battery.level + 2) : 
            Math.max(1, phoneData.battery.level - 1),
          temperature: Math.round((phoneData.battery.temperature + (Math.random() * 0.4 - 0.2)) * 10) / 10
        },
        processors: {
          ...phoneData.processors,
          usage: Math.floor(Math.random() * 30) + 20,
          temperature: Math.round((phoneData.processors.temperature + (Math.random() * 0.6 - 0.3)) * 10) / 10
        },
        network: {
          ...phoneData.network,
          strength: Math.floor(Math.random() * 20) + 75,
          wifi: {
            ...phoneData.network.wifi,
            strength: Math.floor(Math.random() * 15) + 80,
          }
        }
      };
      
      setPhoneData(updatedData);
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    // Initial refresh
    refreshData();
    
    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(refreshData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength < 30) return 'text-red-500';
    if (strength < 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStorageUsagePercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  const formatStorage = (gb: number) => {
    return `${gb} GB`;
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Phone Status" 
        icon={<Smartphone className="h-8 w-8 text-rose-500" />}
        description="Monitor your phone's status and performance."
        action={
          <button 
            onClick={refreshData}
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </button>
        }
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('battery')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'battery'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Battery
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'network'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Network
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'storage'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Storage
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'system'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              System
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-4 rounded-lg mr-4">
                    <Smartphone className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{phoneData.model}</h2>
                    <p className="text-sm text-gray-500">{phoneData.os}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    <Settings className="h-4 w-4 mr-2" />
                    Phone Settings
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Battery Status */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-rose-100 rounded-md">
                      <Battery className={`h-6 w-6 ${getBatteryColor(phoneData.battery.level)}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Battery</h3>
                      <div className="flex items-center">
                        <span className={`text-xl font-semibold ${getBatteryColor(phoneData.battery.level)}`}>
                          {phoneData.battery.level}%
                        </span>
                        {phoneData.battery.charging && (
                          <Zap className="ml-1 h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          phoneData.battery.level < 20 ? 'bg-red-500' :
                          phoneData.battery.level < 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${phoneData.battery.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Network Status */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-md">
                      <Wifi className={`h-6 w-6 ${getSignalStrengthColor(phoneData.network.wifi.strength)}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Network</h3>
                      <div className="text-xl font-semibold text-gray-900">
                        {phoneData.network.type}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>WiFi: {phoneData.network.wifi.ssid}</span>
                    <span className={`font-medium ${getSignalStrengthColor(phoneData.network.wifi.strength)}`}>
                      {phoneData.network.wifi.strength}%
                    </span>
                  </div>
                </div>

                {/* Storage */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-amber-100 rounded-md">
                      <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11h10" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Storage</h3>
                      <div className="text-xl font-semibold text-gray-900">
                        {formatStorage(phoneData.storage.used)} / {formatStorage(phoneData.storage.total)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-amber-500"
                        style={{ width: `${getStorageUsagePercentage(phoneData.storage.used, phoneData.storage.total)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Processor */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-blue-100 rounded-md">
                      <Cpu className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">CPU</h3>
                      <div className="text-xl font-semibold text-gray-900">
                        {phoneData.processors.usage}% usage
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>Temperature</span>
                    <span className={`font-medium ${
                      phoneData.processors.temperature > 60 ? 'text-red-500' :
                      phoneData.processors.temperature > 50 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {phoneData.processors.temperature}°C
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Devices Section */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Devices</h3>
                
                {phoneData.network.bluetooth.devices.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {phoneData.network.bluetooth.devices.map((device, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center">
                        <div className="p-2 bg-blue-100 rounded-md">
                          <Bluetooth className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
                          <p className="text-xs text-gray-500 capitalize">{device.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No devices connected</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'battery' && (
            <div>
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <div className="relative inline-flex">
                      <svg className="w-36 h-36" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${
                            phoneData.battery.level < 20 ? 'text-red-500' :
                            phoneData.battery.level < 50 ? 'text-yellow-500' : 'text-green-500'
                          }`}
                          strokeWidth="10"
                          strokeDasharray={`${phoneData.battery.level * 2.51} 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-gray-900">{phoneData.battery.level}%</span>
                          {phoneData.battery.charging && (
                            <div className="flex justify-center">
                              <Zap className="text-yellow-500 h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {phoneData.battery.charging ? 'Charging' : 'Not charging'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Battery Health</h3>
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="text-3xl font-bold text-gray-900">{phoneData.battery.health}%</div>
                        <div className="text-sm text-gray-500">Maximum Capacity</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              phoneData.battery.health < 70 ? 'bg-red-500' :
                              phoneData.battery.health < 85 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${phoneData.battery.health}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your battery can support normal peak performance. When a battery chemically ages, its ability to hold charge decreases.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Battery Temperature</h3>
                    <div className="flex items-center mb-4">
                      <Thermometer className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{phoneData.battery.temperature}°C</div>
                        <div className="text-sm text-gray-500">Current Temperature</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className={`${
                        phoneData.battery.temperature > 40 ? 'text-red-600 font-medium' :
                        phoneData.battery.temperature > 35 ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {phoneData.battery.temperature > 40 ? 'Warning: Battery temperature is too high!' :
                         phoneData.battery.temperature > 35 ? 'Battery temperature is elevated' :
                         'Battery temperature is normal'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Battery Usage Tips</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reduce screen brightness to conserve battery
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Close unused apps running in the background
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Turn on battery saving mode when below 20%
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Keep your phone out of extreme temperatures
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="text-center py-12">
              <Wifi className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Network Status</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detailed network information coming soon.
              </p>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11h10" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Storage Analysis</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detailed storage information coming soon.
              </p>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="text-center py-12">
              <Cpu className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">System Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detailed system information coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneStatus;