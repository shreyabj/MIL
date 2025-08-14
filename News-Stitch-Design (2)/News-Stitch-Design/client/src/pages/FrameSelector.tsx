import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Shield } from "lucide-react";

export const FrameSelector = (): JSX.Element => {
  const projectSections = [
    {
      title: "News App",
      description: "Dark-themed news application with modern interface design",
      route: "/welcome",
      preview: "📱",
      type: "app",
      frames: [
        "Welcome/Login Screen",
        "Home Feed",
        "Article Reader", 
        "Video Player",
        "User Profile"
      ]
    },
    {
      title: "UNESCO Media Literacy Tool",
      description: "Comprehensive media literacy education platform with gamification",
      route: "/media-literacy",
      preview: "🎓",
      type: "tool",
      frames: [
        "Overlay Quick Result",
        "Login & Permissions",
        "Main Dashboard",
        "Game Section",
        "My Tree View",
        "Saved Collection",
        "Extended View"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#111614] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="[font-family:'Lexend',Helvetica] font-bold text-4xl mb-4">
            All Design Frames
          </h1>
          <p className="text-[#9bbaaf] [font-family:'Lexend',Helvetica] text-lg">
            Explore comprehensive UI implementations across multiple projects
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projectSections.map((section, index) => (
            <Card key={index} className="bg-[#283833] border-[#3a5449] hover:border-[#0cf29e] transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{section.preview}</div>
                <CardTitle className="[font-family:'Lexend',Helvetica] font-bold text-white text-2xl mb-2">
                  {section.title}
                </CardTitle>
                <p className="text-[#9bbaaf] text-sm [font-family:'Lexend',Helvetica] leading-relaxed">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-6">
                  <h3 className="text-[#0cf29e] font-medium mb-3">Included Frames:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {section.frames.map((frame, frameIndex) => (
                      <div key={frameIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#0cf29e] rounded-full"></div>
                        <span className="text-[#9bbaaf] text-sm">{frame}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href={section.route}>
                  <Button className="w-full bg-[#0cf29e] text-[#111614] hover:bg-[#0cf29e]/90 [font-family:'Lexend',Helvetica] font-bold h-12">
                    {section.type === "tool" ? <Shield className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    Explore {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-[#283833] border-[#3a5449] max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="[font-family:'Lexend',Helvetica] font-bold text-2xl text-white mb-6">
                Design System Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0cf29e] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#111614] font-bold">Aa</span>
                  </div>
                  <p className="text-[#0cf29e] font-medium mb-1">Typography</p>
                  <p className="text-[#9bbaaf]">Lexend & Inter fonts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2D3A8C] to-[#004E98] rounded-full mx-auto mb-3"></div>
                  <p className="text-[#0cf29e] font-medium mb-1">Colors</p>
                  <p className="text-[#9bbaaf]">Dark & Indigo themes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#283833] border-2 border-[#0cf29e] rounded-full mx-auto mb-3"></div>
                  <p className="text-[#0cf29e] font-medium mb-1">Components</p>
                  <p className="text-[#9bbaaf]">shadcn/ui library</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">✨</span>
                  </div>
                  <p className="text-[#0cf29e] font-medium mb-1">Interactions</p>
                  <p className="text-[#9bbaaf]">Smooth animations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};