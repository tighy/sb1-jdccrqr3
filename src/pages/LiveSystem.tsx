import React, { useState, useRef } from 'react';
import { Video, Users, MessageSquare, ThumbsUp, Share2, Gift, Flag, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockLiveStreams = [
  {
    id: 1,
    title: "Gaming Marathon: New Release",
    creator: "GameMaster123",
    creatorAvatar: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailUrl: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: 1245,
    likes: 387,
    category: "Gaming",
    tags: ["FPS", "Multiplayer", "New Release"],
    isLive: true,
  },
  {
    id: 2,
    title: "Morning Yoga & Meditation",
    creator: "ZenWithJen",
    creatorAvatar: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailUrl: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: 563,
    likes: 215,
    category: "Fitness",
    tags: ["Yoga", "Wellness", "Morning Routine"],
    isLive: true,
  },
  {
    id: 3,
    title: "Cooking Show: Italian Cuisine",
    creator: "ChefMario",
    creatorAvatar: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailUrl: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: 892,
    likes: 312,
    category: "Cooking",
    tags: ["Italian", "Pasta", "Homemade"],
    isLive: true,
  },
  {
    id: 4,
    title: "Live Coding: Building a Web App",
    creator: "TechNinja",
    creatorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thumbnailUrl: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewers: 745,
    likes: 203,
    category: "Technology",
    tags: ["Coding", "React", "Frontend"],
    isLive: false,
  },
];

const mockComments = [
  {
    id: 1,
    user: "JohnDoe",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "This is so cool! Love the new features",
    timestamp: "Just now",
  },
  {
    id: 2,
    user: "GamerGirl99",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Can you show that move again?",
    timestamp: "2 min ago",
  },
  {
    id: 3,
    user: "TechEnthusiast",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "The graphics are amazing on this game!",
    timestamp: "5 min ago",
  },
];

function LiveSystem() {
  const [currentStream, setCurrentStream] = useState(mockLiveStreams[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [activeTab, setActiveTab] = useState('live');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleStreamSelect = (stream: typeof mockLiveStreams[0]) => {
    setCurrentStream(stream);
    setIsPlaying(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: comments.length + 1,
      user: "You",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      text: newComment,
      timestamp: "Just now",
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Live System" 
        icon={<Video className="h-8 w-8 text-red-500" />}
        description="Watch and interact with live streams."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Video Player + Chat */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden relative">
            <video
              ref={videoRef}
              src="" // No real video source in this demo
              poster={currentStream.thumbnailUrl}
              className="w-full aspect-video object-cover"
              autoPlay
              muted={isMuted}
            />

            {/* Live Indicator */}
            {currentStream.isLive && (
              <div className="absolute top-4 left-4 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-md flex items-center">
                <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></span>
                LIVE
              </div>
            )}

            {/* View Count */}
            <div className="absolute top-4 right-4 px-2 py-1 bg-black bg-opacity-50 text-white text-xs font-semibold rounded-md flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {formatViewerCount(currentStream.viewers)} viewers
            </div>

            {/* Video Controls Overlay (appears on hover in a real implementation) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handlePlayPause}
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <button 
                      onClick={handleMute}
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stream Info */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex">
                <img 
                  src={currentStream.creatorAvatar} 
                  alt={currentStream.creator} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900 leading-tight">{currentStream.title}</h2>
                  <p className="text-sm text-gray-500">{currentStream.creator}</p>
                  <div className="flex mt-1 space-x-2">
                    {currentStream.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                  <ThumbsUp className="h-4 w-4 mr-1.5" />
                  {currentStream.likes}
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'live'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Stream Details
                </button>
              </nav>
            </div>

            {activeTab === 'live' && (
              <div className="p-4">
                <div className="max-h-60 overflow-y-auto mb-4">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex">
                        <img 
                          src={comment.avatar} 
                          alt={comment.user} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="ml-3 bg-gray-50 p-3 rounded-lg flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900">{comment.user}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddComment} className="mt-4 flex">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Send
                  </button>
                </form>

                <div className="mt-4 flex justify-end space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700">
                    <Gift className="h-4 w-4 mr-1.5 text-red-500" />
                    Send Gift
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700">
                    <Flag className="h-4 w-4 mr-1.5 text-gray-500" />
                    Report
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About this stream</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join {currentStream.creator} for an exciting {currentStream.category} stream! 
                  {currentStream.isLive 
                    ? ' This stream is currently live.' 
                    : ' This stream has ended.'}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Category:</span>
                    <span className="text-gray-900">{currentStream.category}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Viewers:</span>
                    <span className="text-gray-900">{currentStream.viewers}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Likes:</span>
                    <span className="text-gray-900">{currentStream.likes}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {currentStream.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Recommended Streams */}
        <div className="space-y-4">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Recommended Streams</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockLiveStreams.map((stream) => (
                <div 
                  key={stream.id}
                  onClick={() => handleStreamSelect(stream)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    currentStream.id === stream.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={stream.thumbnailUrl} 
                      alt={stream.title}
                      className="rounded-md w-full aspect-video object-cover mb-2"
                    />
                    {stream.isLive && (
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 text-white text-xs font-semibold rounded flex items-center">
                        <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                        LIVE
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black bg-opacity-70 text-white text-xs font-semibold rounded">
                      {formatViewerCount(stream.viewers)} viewers
                    </div>
                  </div>
                  
                  <div className="flex">
                    <img 
                      src={stream.creatorAvatar} 
                      alt={stream.creator}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="ml-2 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{stream.title}</h3>
                      <p className="text-xs text-gray-500">{stream.creator}</p>
                      <p className="text-xs text-gray-500 mt-1">{stream.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Gaming
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Fitness
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Cooking
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Music
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Technology
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Art
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full">
                Just Chatting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveSystem;