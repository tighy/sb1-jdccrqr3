import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, User, X, Plus, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockStories = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    images: [
      "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    caption: "Exploring the beautiful coastline 🌊",
    timestamp: "3h ago",
    seen: false,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Michael Davis",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    images: [
      "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    caption: "Team meeting brainstorming session 💡",
    timestamp: "8h ago",
    seen: true,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Sophia Kim",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    caption: "Coffee shop vibes this morning ☕",
    timestamp: "12h ago",
    seen: false,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "David Johnson",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    images: [
      "https://images.pexels.com/photos/358189/pexels-photo-358189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    caption: "Weekend hiking adventures 🏔️",
    timestamp: "1d ago",
    seen: true,
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Olivia Martinez",
      avatar: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    images: [
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    caption: "Homemade dinner tonight! 🍝",
    timestamp: "1d ago",
    seen: true,
  },
];

const mockFeed = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    image: "https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Exploring the beautiful coastline 🌊 #travel #beach #vacation",
    likes: 243,
    comments: 42,
    timestamp: "3 hours ago",
    liked: false,
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "Sophia Kim",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Coffee shop vibes this morning ☕ #coffee #morning #productive",
    likes: 187,
    comments: 23,
    timestamp: "12 hours ago",
    liked: true,
  },
  {
    id: 3,
    user: {
      id: 2,
      name: "Michael Davis",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    image: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Team meeting brainstorming session 💡 #work #teamwork #ideas",
    likes: 134,
    comments: 18,
    timestamp: "1 day ago",
    liked: false,
  },
];

function StorySystem() {
  const [stories, setStories] = useState(mockStories);
  const [feed, setFeed] = useState(mockFeed);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('stories');
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<number | null>(null);
  const storyTimeoutRef = useRef<number | null>(null);

  // Reset story viewing when closing the story viewer
  useEffect(() => {
    if (activeStoryIndex === null) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
      setCurrentImageIndex(0);
      setProgress(0);
    }
  }, [activeStoryIndex]);

  // Start progress timer when viewing a story
  useEffect(() => {
    if (activeStoryIndex !== null) {
      const currentStory = stories[activeStoryIndex];
      const totalImages = currentStory.images.length;
      
      // Mark the story as seen
      if (!currentStory.seen) {
        const updatedStories = [...stories];
        updatedStories[activeStoryIndex].seen = true;
        setStories(updatedStories);
      }

      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
      
      setProgress(0);
      
      // Start progress timer
      progressTimerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next image or next story
            if (currentImageIndex < totalImages - 1) {
              setCurrentImageIndex(prev => prev + 1);
              return 0;
            } else {
              // Move to next story or close if it's the last one
              if (activeStoryIndex < stories.length - 1) {
                setActiveStoryIndex(prev => prev !== null ? prev + 1 : 0);
                setCurrentImageIndex(0);
              } else {
                setActiveStoryIndex(null);
              }
              return 0;
            }
          }
          return prev + 2; // Increment by 2% every interval (50 intervals for 100%)
        });
      }, 100); // Update every 100ms for smooth progress
      
      // Auto advance to next story after 5 seconds
      storyTimeoutRef.current = window.setTimeout(() => {
        if (currentImageIndex < totalImages - 1) {
          setCurrentImageIndex(prev => prev + 1);
          setProgress(0);
        } else {
          // Move to next story or close if it's the last one
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(prev => prev !== null ? prev + 1 : 0);
            setCurrentImageIndex(0);
          } else {
            setActiveStoryIndex(null);
          }
        }
      }, 5000);
      
      return () => {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        if (storyTimeoutRef.current) clearTimeout(storyTimeoutRef.current);
      };
    }
  }, [activeStoryIndex, currentImageIndex, stories]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setCurrentImageIndex(0);
    setProgress(0);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
      setProgress(0);
    } else if (activeStoryIndex !== null && activeStoryIndex > 0) {
      // Go to previous story's last image
      setActiveStoryIndex(prev => prev !== null ? prev - 1 : 0);
      const prevStory = stories[activeStoryIndex - 1];
      setCurrentImageIndex(prevStory.images.length - 1);
      setProgress(0);
    }
  };

  const goToNextImage = () => {
    if (activeStoryIndex === null) return;
    
    const currentStory = stories[activeStoryIndex];
    if (currentImageIndex < currentStory.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setProgress(0);
    } else if (activeStoryIndex < stories.length - 1) {
      // Go to next story
      setActiveStoryIndex(prev => prev !== null ? prev + 1 : 0);
      setCurrentImageIndex(0);
      setProgress(0);
    } else {
      // Close story viewer if it's the last image of the last story
      closeStory();
    }
  };

  const toggleLike = (postId: number) => {
    setFeed(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Story System" 
        icon={<BookOpen className="h-8 w-8 text-orange-500" />}
        description="Share and view stories from your network."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'stories'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'feed'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Feed
            </button>
          </nav>
        </div>

        {activeTab === 'stories' && (
          <div className="p-6">
            {/* Stories Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Stories</h2>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                <Plus className="h-4 w-4 mr-1.5" />
                Add Story
              </button>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {stories.map((story, index) => (
                <div 
                  key={story.id} 
                  className="cursor-pointer"
                  onClick={() => openStory(index)}
                >
                  <div className={`relative rounded-lg overflow-hidden ${story.seen ? 'ring-2 ring-gray-200' : 'ring-2 ring-orange-500'}`}>
                    <img 
                      src={story.images[0]} 
                      alt={`${story.user.name}'s story`}
                      className="aspect-square object-cover w-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <div className="flex items-center">
                        <img 
                          src={story.user.avatar} 
                          alt={story.user.name} 
                          className="h-8 w-8 rounded-full border-2 border-white object-cover"
                        />
                        <div className="ml-2">
                          <p className="text-sm font-medium text-white truncate">{story.user.name}</p>
                          <p className="text-xs text-gray-200">{story.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="divide-y divide-gray-200">
            {feed.map((post) => (
              <div key={post.id} className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.caption}
                    className="w-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex space-x-4 mb-3">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center text-sm font-medium ${
                      post.liked ? 'text-red-500' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Heart className={`h-5 w-5 mr-1.5 ${post.liked ? 'fill-red-500' : ''}`} />
                    {post.likes}
                  </button>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <MessageCircle className="h-5 w-5 mr-1.5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <Share2 className="h-5 w-5 mr-1.5" />
                    Share
                  </button>
                </div>
                <p className="text-sm text-gray-700">{post.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Close Button */}
          <button 
            onClick={closeStory}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Story Content */}
          <div className="h-full flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 z-10 p-4">
                <div className="flex space-x-1">
                  {stories[activeStoryIndex].images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className="h-1 bg-gray-500 bg-opacity-50 rounded-full flex-1 overflow-hidden"
                    >
                      {currentImageIndex === idx && (
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      )}
                      {currentImageIndex > idx && (
                        <div className="h-full bg-white rounded-full w-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* User Info */}
              <div className="absolute top-8 left-0 right-0 z-10 p-4">
                <div className="flex items-center">
                  <img 
                    src={stories[activeStoryIndex].user.avatar} 
                    alt={stories[activeStoryIndex].user.name} 
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{stories[activeStoryIndex].user.name}</p>
                    <p className="text-xs text-gray-300 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {stories[activeStoryIndex].timestamp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Image */}
              <img 
                src={stories[activeStoryIndex].images[currentImageIndex]} 
                alt="Story"
                className="h-full w-full object-contain"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white">{stories[activeStoryIndex].caption}</p>
              </div>

              {/* Navigation Controls */}
              <button 
                onClick={goToPreviousImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white hover:text-gray-300"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button 
                onClick={goToNextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white hover:text-gray-300"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Click areas for navigation */}
              <div 
                className="absolute inset-0 z-0 flex"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="w-1/2 h-full cursor-pointer" 
                  onClick={goToPreviousImage}
                ></div>
                <div 
                  className="w-1/2 h-full cursor-pointer"
                  onClick={goToNextImage}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StorySystem;