import { Link, Camera, Mic, Image, Upload, Menu, User, Gamepad2, TreePine, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLocation } from "wouter";
import { OverlayQuickResult } from "./OverlayQuickResult";
import { mediaApi, type MediaAnalysisResponse } from "@/lib/api";
import { useDemo } from "@/hooks/useDemo";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const MainDashboard = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MediaAnalysisResponse | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { userId } = useDemo();

  const analysisMutation = useMutation({
    mutationFn: async (data: { title: string; content: string; mediaType: string; sourceUrl?: string }) => {
      return await mediaApi.analyze({
        ...data,
        userId,
      });
    },
    onSuccess: (result) => {
      setAnalysisResult(result);
      setShowResults(true);
      setTimeout(() => setShowOverlay(true), 1500);
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze media content",
        variant: "destructive",
      });
    },
  });

  const handleProcess = () => {
    if (inputValue.trim()) {
      // Analyze the input as text content
      analysisMutation.mutate({
        title: "User Input Analysis",
        content: inputValue.trim(),
        mediaType: "article",
      });
    }
  };

  const getBiasColor = (score: number) => score > 60 ? "#FF6B6B" : "#2ECC71";
  const getBiasLabel = (score: number) => score > 60 ? "High Bias" : "Low Bias";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center">
              <span className="text-white font-inter font-bold text-sm">ML</span>
            </div>
          </div>
          
          <h1 className="font-inter font-bold text-lg text-[#2D3A8C]">
            Media Literacy Hub
          </h1>
          
          <div className="w-8 h-8 bg-[#2D3A8C] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="flex flex-col items-center py-8 space-y-8">
            <Button 
              onClick={() => setLocation('/game')}
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-[12px] bg-[#2ECC71]/10 hover:bg-[#2ECC71]/20 flex flex-col items-center gap-1"
            >
              <Gamepad2 className="w-5 h-5 text-[#2ECC71]" />
              <span className="text-xs font-inter text-[#2ECC71]">Game</span>
            </Button>
            
            <Button 
              onClick={() => setLocation('/tree')}
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-[12px] hover:bg-gray-100 flex flex-col items-center gap-1"
            >
              <TreePine className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-inter text-gray-600">Tree</span>
            </Button>
            
            <Button 
              onClick={() => setLocation('/saved')}
              variant="ghost" 
              size="sm" 
              className="w-12 h-12 rounded-[12px] hover:bg-gray-100 flex flex-col items-center gap-1"
            >
              <Bookmark className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-inter text-gray-600">Saved</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Input Section */}
          <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 bg-gray-50 rounded-[16px] p-4">
                <Input
                  placeholder="Paste a link, upload media, or describe what you'd like to verify..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border-0 bg-transparent font-inter placeholder:text-gray-500 focus-visible:ring-0"
                />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-200 rounded-[8px]">
                    <Link className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-200 rounded-[8px]">
                    <Upload className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-200 rounded-[8px]">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-200 rounded-[8px]">
                    <Mic className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleProcess}
                disabled={analysisMutation.isPending}
                className="w-full mt-4 h-12 bg-gradient-to-r from-[#2D3A8C] to-[#004E98] hover:from-[#252F75] hover:to-[#003875] text-white font-inter font-semibold rounded-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analysisMutation.isPending ? "Analyzing..." : "Analyze Content"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {showResults && (
            <div className="space-y-4">
              <h2 className="font-inter font-bold text-xl text-gray-900 mb-4">
                Analysis Results
              </h2>
              
              {analysisResult && (
                <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            className="rounded-full text-white font-medium text-xs"
                            style={{ backgroundColor: getBiasColor(analysisResult.biasScore) }}
                          >
                            {getBiasLabel(analysisResult.biasScore)}
                          </Badge>
                          <span className="text-xs text-gray-500 font-inter">
                            {Math.round(analysisResult.credibilityScore)}% credible
                          </span>
                        </div>
                        <h3 className="font-inter font-semibold text-gray-900 leading-tight">
                          {analysisResult.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-inter mt-1">
                          Analysis Type: {analysisResult.mediaType}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700 font-inter leading-relaxed mb-3">
                      {analysisResult.biasAnalysis}
                    </p>
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="text-gray-600">
                        Overall Score: <strong className="text-[#2D3A8C]">{Math.round(analysisResult.overallScore)}/100</strong>
                      </span>
                      <span className="text-gray-600">
                        Factuality: <strong className="text-[#2ECC71]">{Math.round(analysisResult.factualityScore)}/100</strong>
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        // Store analysis result for ExtendedView
                        localStorage.setItem('currentAnalysis', JSON.stringify(analysisResult));
                        setShowOverlay(false);
                        setLocation('/extended');
                      }}
                      className="bg-[#004E98] hover:bg-[#003875] text-white font-inter font-medium rounded-[12px]"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Overlay Quick Result */}
      {analysisResult && (
        <OverlayQuickResult 
          type="incident"
          isVisible={showOverlay}
          analysisResult={analysisResult}
          onClose={() => setShowOverlay(false)}
          onViewMore={() => {
            setShowOverlay(false);
            setLocation('/extended');
          }}
        />
      )}
    </div>
  );
};