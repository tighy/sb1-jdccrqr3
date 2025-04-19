import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, Trophy, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';

function LaserGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState<{ x: number; y: number; radius: number; points: number; speed: number }[]>([]);
  const [gameWidth, setGameWidth] = useState(800);
  const [gameHeight, setGameHeight] = useState(600);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Initialize game dimensions based on container size
  useEffect(() => {
    if (gameAreaRef.current) {
      const resizeCanvas = () => {
        const width = gameAreaRef.current?.clientWidth || 800;
        const height = Math.min(600, window.innerHeight - 200);
        
        setGameWidth(width);
        setGameHeight(height);
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    // Set canvas dimensions
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    
    // Game timer
    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameTimer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Target generation
    const targetTimer = setInterval(() => {
      const radius = Math.random() * 20 + 10;
      const points = Math.round(30 / radius * 10); // Smaller targets = more points
      
      setTargets(prev => [
        ...prev,
        {
          x: Math.random() * (gameWidth - radius * 2) + radius,
          y: -radius,
          radius,
          points,
          speed: Math.random() * 2 + 1
        }
      ]);
    }, 1000);
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, gameWidth, gameHeight);
      
      // Draw laser beam from bottom to mouse position if mouse is over canvas
      if (mousePos.x > 0 && mousePos.y > 0 && 
          mousePos.x < gameWidth && mousePos.y < gameHeight) {
        ctx.beginPath();
        ctx.moveTo(gameWidth / 2, gameHeight);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw laser point
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
      
      // Update and draw targets
      setTargets(prev => 
        prev
          .map(target => ({
            ...target,
            y: target.y + target.speed
          }))
          .filter(target => {
            // Check if target is hit by laser
            const hit = 
              mousePos.x > target.x - target.radius &&
              mousePos.x < target.x + target.radius &&
              mousePos.y > target.y - target.radius &&
              mousePos.y < target.y + target.radius;
            
            if (hit) {
              setScore(s => s + target.points);
              return false;
            }
            
            // Remove if beyond bottom of screen
            return target.y - target.radius < gameHeight;
          })
      );
      
      // Draw targets
      targets.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${target.points / 30})`;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw points value
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(target.points.toString(), target.x, target.y + 5);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      clearInterval(gameTimer);
      clearInterval(targetTimer);
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted, gameOver, mousePos, gameWidth, gameHeight]);
  
  // Update high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
    }
  }, [gameOver, score, highScore]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Laser Game" 
        icon={<Zap className="h-8 w-8 text-amber-500" />}
        description="Aim the laser and hit the targets to score points."
      />
      
      <div 
        ref={gameAreaRef}
        className="bg-gray-900 rounded-lg shadow-md overflow-hidden mx-auto"
      >
        {!gameStarted && !gameOver ? (
          <div className="flex flex-col items-center justify-center p-10 text-center h-[500px]">
            <h2 className="text-2xl font-bold text-white mb-4">Laser Target Challenge</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              Move your mouse to aim the laser beam and hit the targets before they escape. 
              Smaller targets are worth more points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              Start Game
            </button>
            {highScore > 0 && (
              <div className="mt-6 flex items-center text-amber-400">
                <Trophy className="h-5 w-5 mr-2" />
                <span>High Score: {highScore}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
              <div className="flex items-center text-white">
                <Trophy className="h-5 w-5 mr-2 text-amber-400" />
                <span className="text-lg font-medium">Score: {score}</span>
              </div>
              <div className="flex items-center text-white">
                <span className="text-lg font-medium mr-4">Time: {timeLeft}s</span>
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameOver(false);
                  }}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  {gameOver ? (
                    <RotateCcw className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div style={{ position: 'relative', height: `${gameHeight}px` }}>
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                style={{ display: 'block', background: '#111' }}
              />
              
              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-4">
                  <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                  <p className="text-xl mb-4">Final Score: {score}</p>
                  {score >= highScore && score > 0 && (
                    <div className="text-amber-400 mb-6 flex items-center">
                      <Trophy className="h-6 w-6 mr-2" />
                      <span className="text-lg">New High Score!</span>
                    </div>
                  )}
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LaserGame;