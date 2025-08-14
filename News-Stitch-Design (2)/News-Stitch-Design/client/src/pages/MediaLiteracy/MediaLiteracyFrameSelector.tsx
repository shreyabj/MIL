import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Shield } from "lucide-react";

export const MediaLiteracyFrameSelector = (): JSX.Element => {
  const frames = [
    {
      title: "Overlay Quick Result",
      description: "Minimal overlay popup with bias analysis and quick actions for fact-checking results",
      route: "/media-literacy/overlay",
      preview: "📱",
      category: "Part 1"
    },
    {
      title: "Login & Permissions",
      description: "Full-screen authentication with permission requests for camera, mic, and gallery access",
      route: "/media-literacy/login",
      preview: "🔐",
      category: "Part 2"
    },
    {
      title: "Main Dashboard",
      description: "Central hub with input field, media upload options, and analysis results display",
      route: "/media-literacy/dashboard",
      preview: "🏠",
      category: "Part 2"
    },
    {
      title: "Game Section",
      description: "Tinder-style swipeable news cards with tree growth animation and points system",
      route: "/media-literacy/game",
      preview: "🎮",
      category: "Part 2"
    },
    {
      title: "My Tree View",
      description: "Progress visualization with tree growth stages, achievements, and motivational content",
      route: "/media-literacy/tree",
      preview: "🌳",
      category: "Part 2"
    },
    {
      title: "Saved Collection", 
      description: "Grid view of saved articles and videos with bias scores and search functionality",
      route: "/media-literacy/saved",
      preview: "💾",
      category: "Part 2"
    },
    {
      title: "Extended View",
      description: "Detailed content display with generational rewrite toggle and cross-source verification",
      route: "/media-literacy/extended",
      preview: "📄",
      category: "Part 3"
    }
  ];

  const groupedFrames = frames.reduce((acc, frame) => {
    if (!acc[frame.category]) acc[frame.category] = [];
    acc[frame.category].push(frame);
    return acc;
  }, {} as Record<string, typeof frames>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3A8C] to-[#004E98] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-inter font-bold text-4xl text-white mb-4">
            UNESCO Media Literacy Tool
          </h1>
          <p className="text-white/80 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of interfaces designed to promote critical thinking, 
            fact-checking, and media literacy in the digital age
          </p>
        </div>

        {/* Design System Info */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-[20px] mb-12">
          <CardContent className="p-8">
            <h2 className="font-inter font-bold text-xl text-white mb-6 text-center">
              Design System Features
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-[#2ECC71] rounded-[12px] flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">Aa</span>
                </div>
                <p className="text-white font-inter font-medium mb-1">Typography</p>
                <p className="text-white/70 text-sm">Inter & Poppins fonts</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#2D3A8C] to-[#004E98] rounded-[12px] mx-auto mb-3"></div>
                <p className="text-white font-inter font-medium mb-1">Colors</p>
                <p className="text-white/70 text-sm">Indigo & Royal Blue</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-[12px] flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">!</span>
                </div>
                <p className="text-white font-inter font-medium mb-1">Accessibility</p>
                <p className="text-white/70 text-sm">High contrast design</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-[12px] border-2 border-white/30 mx-auto mb-3"></div>
                <p className="text-white font-inter font-medium mb-1">Interactions</p>
                <p className="text-white/70 text-sm">Smooth animations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frames by Category */}
        {Object.entries(groupedFrames).map(([category, categoryFrames]) => (
          <div key={category} className="mb-12">
            <h2 className="font-inter font-bold text-2xl text-white mb-6 text-center">
              {category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryFrames.map((frame, index) => (
                <Card 
                  key={index} 
                  className="bg-white/95 backdrop-blur-sm border-white/20 rounded-[20px] hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-4">{frame.preview}</div>
                    <CardTitle className="font-inter font-bold text-[#2D3A8C] text-lg">
                      {frame.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm font-inter leading-relaxed mb-6">
                      {frame.description}
                    </p>
                    <Link href={frame.route}>
                      <Button className="w-full bg-gradient-to-r from-[#2D3A8C] to-[#004E98] hover:from-[#252F75] hover:to-[#003875] text-white font-inter font-bold rounded-[16px] h-12">
                        <Eye className="w-4 h-4 mr-2" />
                        View Frame
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Key Principles */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-[20px] mt-12">
          <CardContent className="p-8">
            <h2 className="font-inter font-bold text-xl text-white mb-6 text-center">
              UNESCO Media Literacy Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="font-inter font-semibold text-white mb-2">Critical Thinking</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Empowering users to analyze and evaluate media content critically
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                <h3 className="font-inter font-semibold text-white mb-2">Fact Verification</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Advanced AI tools for real-time fact-checking and bias detection
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="font-inter font-semibold text-white mb-2">Digital Literacy</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Building skills for responsible digital citizenship and engagement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};