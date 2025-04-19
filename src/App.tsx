import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Layout from './components/Layout';

// Page components
import Dashboard from './pages/Dashboard';
import MinecraftStatus from './pages/MinecraftStatus';
import MusicPlayer from './pages/MusicPlayer';
import LaserGame from './pages/LaserGame';
import PollSystem from './pages/PollSystem';
import PaymentSystem from './pages/PaymentSystem';
import ManagementSystem from './pages/ManagementSystem';
import PhoneStatus from './pages/PhoneStatus';
import ChatSystem from './pages/ChatSystem';
import LiveSystem from './pages/LiveSystem';
import StorySystem from './pages/StorySystem';
import TimeSystem from './pages/TimeSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="minecraft" element={<MinecraftStatus />} />
          <Route path="music" element={<MusicPlayer />} />
          <Route path="laser-game" element={<LaserGame />} />
          <Route path="polls" element={<PollSystem />} />
          <Route path="payments" element={<PaymentSystem />} />
          <Route path="management" element={<ManagementSystem />} />
          <Route path="phone-status" element={<PhoneStatus />} />
          <Route path="chat" element={<ChatSystem />} />
          <Route path="live" element={<LiveSystem />} />
          <Route path="stories" element={<StorySystem />} />
          <Route path="time" element={<TimeSystem />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;