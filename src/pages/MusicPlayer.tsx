import React, { useState } from 'react';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockPlaylists = [
  { id: 1, name: "Today's Hits", songs: 24 },
  { id: 2, name: "Rock Classics", songs: 42 },
  { id: 3, name: "Chill Vibes", songs: 18 },
  { id: 4, name: "Workout Mix", songs: 15 },
];

const mockSongs = [
  { 
    id: 1, 
    title: "Starlight", 
    artist: "Stella Nova", 
    album: "Cosmic Journey",
    duration: "3:45",
    coverUrl: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  { 
    id: 2, 
    title: "Ocean Waves", 
    artist: "Aqua Dreams", 
    album: "Serenity",
    duration: "4:12",
    coverUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  { 
    id: 3, 
    title: "Mountain High", 
    artist: "Peak Experience", 
    album: "Elevate",
    duration: "3:58",
    coverUrl: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  { 
    id: 4, 
    title: "Electric Dreams", 
    artist: "Neon Nights", 
    album: "Synthwave",
    duration: "5:23",
    coverUrl: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  { 
    id: 5, 
    title: "Sunset Boulevard", 
    artist: "Golden Hour", 
    album: "Twilight",
    duration: "4:05",
    coverUrl: "https://images.pexels.com/photos/1774389/pexels-photo-1774389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
];

function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 3]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFavorite = (songId: number) => {
    if (favoriteIds.includes(songId)) {
      setFavoriteIds(favoriteIds.filter(id => id !== songId));
    } else {
      setFavoriteIds([...favoriteIds, songId]);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playSong = (song: typeof mockSongs[0]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Music Player" 
        icon={<Music className="h-8 w-8 text-green-500" />}
        description="Play and manage your music collection."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlists */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Your Playlists</h2>
              <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Plus className="h-4 w-4 mr-1" />
                New Playlist
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {mockPlaylists.map(playlist => (
                <div 
                  key={playlist.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{playlist.name}</h3>
                    <p className="text-xs text-gray-500">{playlist.songs} songs</p>
                  </div>
                  <Play className="h-5 w-5 text-gray-400 hover:text-gray-900" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Recently Played</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {mockSongs.map(song => (
                <div 
                  key={song.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center ${
                    currentSong.id === song.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => playSong(song)}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                    <img 
                      src={song.coverUrl} 
                      alt={song.album}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{song.title}</h3>
                    <p className="text-xs text-gray-500">{song.artist} • {song.album}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(song.id);
                      }}
                      className="mr-4"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          favoriteIds.includes(song.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </button>
                    <span className="text-xs text-gray-500">{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Music Player Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:pl-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            {/* Song Info */}
            <div className="flex items-center flex-shrink-0 pr-4">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src={currentSong.coverUrl} 
                  alt={currentSong.album}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{currentSong.title}</p>
                <p className="text-xs text-gray-500 truncate">{currentSong.artist}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Shuffle className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <SkipForward className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Repeat className="h-5 w-5" />
                </button>
              </div>

              <div className="w-full max-w-xl flex items-center mt-2">
                <span className="text-xs text-gray-500 w-10 text-right">
                  {formatTime((progress / 100) * 210)}
                </span>
                <div className="mx-2 flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                </div>
                <span className="text-xs text-gray-500 w-10">
                  {currentSong.duration}
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3 pl-4 ml-4 border-l border-gray-200">
              <button 
                onClick={toggleMute}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <div className="w-24">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted && Number(e.target.value) > 0) {
                      setIsMuted(false);
                    }
                  }}
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;