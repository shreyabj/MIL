import { ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useLocation } from "wouter";

export const GameSection = (): JSX.Element => {
  const [currentCard, setCurrentCard] = useState(0);
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(8);
  const [showAnimation, setShowAnimation] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<'correct' | 'incorrect' | null>(null);
  const [, setLocation] = useLocation();

  const newsCards = [
    {
      headline: "Local Mayor Announces New Environmental Initiative",
      source: "City News Network",
      isTrue: true,
      image: "🌱",
      details: "Mayor Johnson unveiled a comprehensive plan to reduce city carbon emissions by 30% over the next five years."
    },
    {
      headline: "Scientists Discover Cure for All Cancers",
      source: "Health Today",
      isTrue: false,
      image: "🔬",
      details: "This sensational claim lacks peer review and contradicts established medical research protocols."
    },
    {
      headline: "New Study Shows Benefits of Regular Exercise",
      source: "Medical Journal",
      isTrue: true,
      image: "🏃",
      details: "Peer-reviewed research from multiple institutions confirms exercise improves cardiovascular health."
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    const card = newsCards[currentCard];
    const isCorrect = (direction === 'right' && card.isTrue) || (direction === 'left' && !card.isTrue);
    
    if (isCorrect) {
      setPoints(points + 100);
      setStreak(streak + 1);
      setLastSwipe('correct');
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    } else {
      setStreak(0);
      setLastSwipe('incorrect');
    }
    
    setTimeout(() => {
      setCurrentCard((currentCard + 1) % newsCards.length);
      setLastSwipe(null);
    }, 500);
  };

  const currentCardData = newsCards[currentCard];
  const progressPercentage = (points / 2000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3A8C] to-[#004E98] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button 
          onClick={() => setLocation('/dashboard')}
          variant="ghost" 
          className="text-white p-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-inter font-bold text-xl text-white">
          Truth or False
        </h1>
        <Button variant="ghost" className="text-white p-2">
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Points and Streak */}
      <div className="flex items-center justify-between mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-[16px] px-4 py-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#2ECC71]" />
            <span className="font-inter font-bold text-white text-lg">
              {points.toLocaleString()}
            </span>
          </div>
          <p className="text-white/70 text-xs font-inter">Points</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-[16px] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse" />
            <span className="font-inter font-bold text-white text-lg">
              {streak}
            </span>
          </div>
          <p className="text-white/70 text-xs font-inter">Streak</p>
        </div>
      </div>

      {/* Tree Progress */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Tree illustration */}
          <div className={`relative text-7xl transition-all duration-1500 ease-out ${
            showAnimation 
              ? 'scale-125 rotate-3 translate-y-[-8px] brightness-125 saturate-150' 
              : 'scale-100 rotate-0 translate-y-0 brightness-100 saturate-100'
          }`}>
            {progressPercentage > 75 ? '🌳' : progressPercentage > 50 ? '🌿' : progressPercentage > 25 ? '🌱' : '🌰'}
            
            {/* Enhanced animation effects */}
            {showAnimation && (
              <>
                {/* Main sparkle effects */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-ping absolute text-4xl opacity-90 text-yellow-300">✨</div>
                  <div className="animate-pulse absolute text-2xl opacity-70 transform translate-x-8 translate-y-4 text-green-300">🍃</div>
                  <div className="animate-bounce absolute text-xl opacity-80 transform -translate-x-6 translate-y-2 text-green-400">🌱</div>
                  <div className="animate-pulse absolute text-lg opacity-60 transform translate-x-4 -translate-y-3 text-yellow-200">⭐</div>
                  <div className="animate-ping absolute text-xl opacity-50 transform -translate-x-5 -translate-y-1 text-green-200" style={{animationDelay: '300ms'}}>✨</div>
                </div>
                
                {/* Growth rings effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-20 h-20 border-4 border-green-300 rounded-full opacity-30 animate-ping" style={{animationDelay: '100ms'}}></div>
                  <div className="absolute w-28 h-28 border-2 border-yellow-300 rounded-full opacity-20 animate-ping" style={{animationDelay: '500ms'}}></div>
                  <div className="absolute w-36 h-36 border border-green-200 rounded-full opacity-10 animate-ping" style={{animationDelay: '700ms'}}></div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-visible">
                  <div className="absolute animate-bounce text-base opacity-60 transform translate-x-3 translate-y-6" style={{animationDelay: '200ms'}}>🌿</div>
                  <div className="absolute animate-pulse text-sm opacity-40 transform -translate-x-4 translate-y-8" style={{animationDelay: '500ms'}}>🌾</div>
                  <div className="absolute animate-ping text-sm opacity-50 transform translate-x-6 translate-y-10" style={{animationDelay: '800ms'}}>🌸</div>
                  <div className="absolute animate-bounce text-xs opacity-30 transform -translate-x-3 translate-y-12" style={{animationDelay: '1100ms'}}>✨</div>
                </div>
              </>
            )}
          </div>
          
          {/* Progress ring */}
          <div className="absolute inset-0 -z-10">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#2ECC71"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${progressPercentage * 2.51} 251`}
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>
        
        <p className="text-white font-inter text-sm mb-2">
          {progressPercentage > 75 ? 'Wisdom Tree Flourishing!' : 
           progressPercentage > 50 ? 'Knowledge Growing Strong' :
           progressPercentage > 25 ? 'Learning Takes Root' : 'Plant Seeds of Truth'}
        </p>
        <Progress value={progressPercentage} className="w-48 mx-auto bg-white/20" />
      </div>

      {/* Swipe Instructions */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-2 text-white/70">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-inter text-sm">Swipe Left = False</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <span className="font-inter text-sm">Swipe Right = True</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* News Card */}
      <div className="relative max-w-sm mx-auto">
        <Card className={`bg-white shadow-2xl rounded-[20px] overflow-hidden transition-all duration-500 ${
          lastSwipe === 'correct' ? 'ring-4 ring-[#2ECC71]' : 
          lastSwipe === 'incorrect' ? 'ring-4 ring-[#FF6B6B]' : ''
        }`}>
          <CardContent className="p-0">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-8xl">
              {currentCardData.image}
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <span className="inline-block bg-[#2D3A8C]/10 text-[#2D3A8C] px-3 py-1 rounded-full text-xs font-inter font-medium">
                  {currentCardData.source}
                </span>
              </div>
              
              <h2 className="font-inter font-bold text-xl text-gray-900 leading-tight mb-4">
                {currentCardData.headline}
              </h2>
              
              <p className="font-inter text-gray-600 text-sm leading-relaxed">
                {currentCardData.details}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Swipe Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => handleSwipe('left')}
            className="flex-1 h-14 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-inter font-bold rounded-[16px]"
          >
            False
          </Button>
          <Button
            onClick={() => handleSwipe('right')}
            className="flex-1 h-14 bg-[#2ECC71] hover:bg-[#27AE60] text-white font-inter font-bold rounded-[16px]"
          >
            True
          </Button>
        </div>
      </div>

      {/* Full-screen Animation overlay */}
      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="relative">
            {/* Central celebration */}
            <div className="text-8xl animate-bounce">✨</div>
            
            {/* Surrounding effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute animate-ping text-6xl opacity-70 transform translate-x-16 translate-y-8 text-yellow-300">🎉</div>
              <div className="absolute animate-pulse text-5xl opacity-60 transform -translate-x-12 translate-y-6 text-green-300">🌟</div>
              <div className="absolute animate-bounce text-4xl opacity-80 transform translate-x-8 -translate-y-10 text-blue-300">💫</div>
              <div className="absolute animate-ping text-3xl opacity-50 transform -translate-x-8 -translate-y-6 text-purple-300" style={{animationDelay: '400ms'}}>⭐</div>
            </div>
            
            {/* Text celebration */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
              <div className="text-white font-inter font-bold text-2xl animate-bounce text-center whitespace-nowrap">
                Tree Growing! 🌳
              </div>
            </div>
            
            {/* Points gained indicator */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="text-[#2ECC71] font-inter font-bold text-xl animate-pulse text-center">
                +100 Points!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};