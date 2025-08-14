import { ArrowLeft, Trophy, Target, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export const MyTreeView = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const points = 1250;
  const maxPoints = 2000;
  const progressPercentage = (points / maxPoints) * 100;
  const level = Math.floor(points / 500) + 1;
  const nextLevelPoints = level * 500;
  const currentLevelProgress = ((points % 500) / 500) * 100;

  // Trigger growth animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGrowthAnimation(true);
    }, 500);
    
    const hideTimer = setTimeout(() => {
      setShowGrowthAnimation(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const achievements = [
    { icon: "🎯", title: "First Truth", description: "Correctly identified your first fact", earned: true },
    { icon: "🔥", title: "Hot Streak", description: "5 correct answers in a row", earned: true },
    { icon: "🌱", title: "Seed Planted", description: "Completed 10 fact checks", earned: true },
    { icon: "🎓", title: "Scholar", description: "Reach 1000 points", earned: true },
    { icon: "🌟", title: "Expert", description: "Reach 2000 points", earned: false },
    { icon: "🏆", title: "Master", description: "Reach 5000 points", earned: false }
  ];

  const getTreeStage = (percentage: number) => {
    if (percentage >= 90) return { emoji: "🌳", stage: "Mighty Oak", description: "Your wisdom tree has reached full maturity!" };
    if (percentage >= 75) return { emoji: "🌲", stage: "Growing Strong", description: "Your knowledge continues to flourish!" };
    if (percentage >= 50) return { emoji: "🌿", stage: "Healthy Growth", description: "Your understanding is taking root!" };
    if (percentage >= 25) return { emoji: "🌱", stage: "Fresh Sprout", description: "Knowledge is beginning to bloom!" };
    return { emoji: "🌰", stage: "Planted Seed", description: "Your learning journey begins here!" };
  };

  const treeStage = getTreeStage(progressPercentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3A8C] to-[#004E98]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <Button 
          onClick={() => setLocation('/dashboard')}
          variant="ghost" 
          className="text-white p-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-inter font-bold text-xl text-white">
          My Knowledge Tree
        </h1>
        <div className="w-10" />
      </div>

      {/* Tree Display */}
      <div className="text-center px-4 py-8">
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Tree */}
          <div className={`relative text-9xl transition-all duration-2000 ease-out ${
            showGrowthAnimation 
              ? 'scale-110 rotate-2 translate-y-[-12px] brightness-125 saturate-150 filter drop-shadow-2xl' 
              : 'scale-100 rotate-0 translate-y-0 brightness-100 saturate-100 animate-pulse'
          }`}>
            {treeStage.emoji}
            
            {/* Enhanced growth animation effects */}
            {showGrowthAnimation && (
              <>
                {/* Main sparkle effects */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-ping absolute text-6xl opacity-90 text-yellow-300">✨</div>
                  <div className="animate-pulse absolute text-4xl opacity-80 transform translate-x-16 translate-y-8 text-green-300">🍃</div>
                  <div className="animate-bounce absolute text-3xl opacity-90 transform -translate-x-12 translate-y-6 text-green-400">🌱</div>
                  <div className="animate-pulse absolute text-2xl opacity-70 transform translate-x-12 -translate-y-8 text-yellow-200">⭐</div>
                  <div className="animate-ping absolute text-3xl opacity-60 transform -translate-x-10 -translate-y-4 text-green-200" style={{animationDelay: '400ms'}}>✨</div>
                </div>
                
                {/* Growth rings effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 border-4 border-green-300 rounded-full opacity-40 animate-ping" style={{animationDelay: '200ms'}}></div>
                  <div className="absolute w-40 h-40 border-3 border-yellow-300 rounded-full opacity-30 animate-ping" style={{animationDelay: '600ms'}}></div>
                  <div className="absolute w-48 h-48 border-2 border-green-200 rounded-full opacity-20 animate-ping" style={{animationDelay: '1000ms'}}></div>
                  <div className="absolute w-56 h-56 border border-blue-200 rounded-full opacity-10 animate-ping" style={{animationDelay: '1400ms'}}></div>
                </div>
                
                {/* Floating nature particles */}
                <div className="absolute inset-0 overflow-visible">
                  <div className="absolute animate-bounce text-2xl opacity-70 transform translate-x-8 translate-y-16" style={{animationDelay: '300ms'}}>🌿</div>
                  <div className="absolute animate-pulse text-xl opacity-50 transform -translate-x-10 translate-y-18" style={{animationDelay: '700ms'}}>🌾</div>
                  <div className="absolute animate-ping text-xl opacity-60 transform translate-x-12 translate-y-20" style={{animationDelay: '1100ms'}}>🌸</div>
                  <div className="absolute animate-bounce text-lg opacity-40 transform -translate-x-8 translate-y-22" style={{animationDelay: '1500ms'}}>🦋</div>
                  <div className="absolute animate-pulse text-base opacity-30 transform translate-x-6 translate-y-24" style={{animationDelay: '1900ms'}}>✨</div>
                </div>
              </>
            )}
          </div>
          
          {/* Progress Ring */}
          <div className="absolute inset-0 -z-10">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#2ECC71"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${progressPercentage * 2.83} 283`}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#2ECC71] rounded-full opacity-70 animate-ping"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>

        <h2 className="font-inter font-bold text-2xl text-white mb-2">
          {treeStage.stage}
        </h2>
        <p className="text-white/80 font-inter text-sm mb-6 max-w-sm mx-auto">
          {treeStage.description}
        </p>

        {/* Level and Points */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-[16px] px-6 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-[#2ECC71]" />
              <span className="font-inter font-bold text-white text-xl">
                Level {level}
              </span>
            </div>
            <p className="text-white/70 text-xs font-inter">Current Level</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-[16px] px-6 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-[#2ECC71]" />
              <span className="font-inter font-bold text-white text-xl">
                {points.toLocaleString()}
              </span>
            </div>
            <p className="text-white/70 text-xs font-inter">Total Points</p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-[20px] mx-4 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-inter font-medium text-white">Progress to Level {level + 1}</span>
              <span className="font-inter text-sm text-white/80">
                {points % 500}/500
              </span>
            </div>
            <Progress 
              value={currentLevelProgress} 
              className="bg-white/20 h-3 rounded-full"
            />
            <p className="text-white/70 font-inter text-xs mt-2">
              {500 - (points % 500)} points to next level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div className="px-4 pb-8">
        <h3 className="font-inter font-bold text-lg text-white mb-4 text-center">
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className={`rounded-[16px] border ${
                achievement.earned 
                  ? 'bg-white/10 border-[#2ECC71]/50 backdrop-blur-sm' 
                  : 'bg-white/5 border-white/10 backdrop-blur-sm'
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className={`text-2xl mb-2 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-inter font-semibold text-sm mb-1 ${
                  achievement.earned ? 'text-white' : 'text-white/50'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`font-inter text-xs leading-tight ${
                  achievement.earned ? 'text-white/80' : 'text-white/40'
                }`}>
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="px-4 pb-8">
        <Card className="bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border-[#2ECC71]/30 rounded-[20px] backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-[#2ECC71] mx-auto mb-3" />
            <h4 className="font-inter font-bold text-white mb-2">
              Keep Growing!
            </h4>
            <p className="font-inter text-white/80 text-sm leading-relaxed">
              Every fact you verify and every truth you uncover helps your knowledge tree grow stronger. 
              Continue your journey toward media literacy mastery!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};