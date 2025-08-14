import { ArrowLeft, ToggleLeft, ExternalLink, Bell, Save, Share, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { type MediaAnalysisResponse } from "@/lib/api";

export const ExtendedView = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [analysisResult, setAnalysisResult] = useState<MediaAnalysisResponse | null>(null);

  useEffect(() => {
    // Load analysis result from localStorage
    const stored = localStorage.getItem('currentAnalysis');
    if (stored) {
      try {
        setAnalysisResult(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored analysis:', error);
      }
    }
  }, []);
  const sources = [
    {
      type: "website",
      name: "BBC News",
      url: "bbc.com/news/climate-report",
      icon: Globe,
      reliability: "High"
    },
    {
      type: "website", 
      name: "Reuters",
      url: "reuters.com/environment/climate",
      icon: Globe,
      reliability: "High"
    },
    {
      type: "video",
      name: "Climate Science Explained",
      url: "youtube.com/watch?v=example",
      icon: Youtube,
      reliability: "Medium",
      thumbnail: "🌍"
    },
    {
      type: "video",
      name: "IPCC Report Analysis",
      url: "youtube.com/watch?v=example2", 
      icon: Youtube,
      reliability: "High",
      thumbnail: "📊"
    }
  ];

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case "High": return "#2ECC71";
      case "Medium": return "#FFA726";
      case "Low": return "#FF6B6B";
      default: return "#gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => setLocation('/dashboard')}
            variant="ghost" 
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <h1 className="font-inter font-bold text-lg text-[#2D3A8C] flex-1 text-center">
            {analysisResult?.title || 'Analysis Result'}
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Content Display */}
        {analysisResult ? (
          <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200">
          <CardContent className="p-6">
            {/* Bias Score */}
            <div className="flex items-center justify-between mb-4">
              <Badge 
                className="text-white font-medium rounded-full"
                style={{ backgroundColor: analysisResult.biasScore > 60 ? "#FF6B6B" : "#2ECC71" }}
              >
                {analysisResult.biasScore > 60 ? "High Bias" : "Low Bias"}
              </Badge>
              <span className="text-sm text-gray-600 font-inter">
                {Math.round(analysisResult.credibilityScore)}% credible
              </span>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-500 rounded-[16px] mb-6 flex items-center justify-center">
              <span className="text-6xl">📰</span>
            </div>

            {/* Title */}
            <h2 className="font-inter font-bold text-xl text-gray-900 leading-tight mb-4">
              {analysisResult.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="font-inter">{analysisResult.mediaType}</span>
              <span>•</span>
              <span>Analysis</span>
              <span>•</span>
              <span>{new Date(analysisResult.analysisDate).toLocaleDateString()}</span>
            </div>

            {/* Content */}
            <div className="space-y-4 text-gray-700 font-inter leading-relaxed">
              <p>{analysisResult.content}</p>
              
              <div className="bg-[#2D3A8C]/5 border-l-4 border-[#2D3A8C] p-4 rounded-r-[12px] my-6">
                <p className="font-semibold text-[#2D3A8C] mb-2">AI Analysis</p>
                <p className="text-gray-700">{analysisResult.biasAnalysis}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-[16px]">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2D3A8C]">
                    {Math.round(analysisResult.overallScore)}
                  </div>
                  <div className="text-xs text-gray-600">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2ECC71]">
                    {Math.round(analysisResult.credibilityScore)}
                  </div>
                  <div className="text-xs text-gray-600">Credibility</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#004E98]">
                    {Math.round(analysisResult.factualityScore)}
                  </div>
                  <div className="text-xs text-gray-600">Factuality</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        ) : (
          <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200">
            <CardContent className="p-6 text-center">
              <p className="font-inter text-gray-500">No analysis data available. Please analyze some content first.</p>
            </CardContent>
          </Card>
        )}

        {/* Generational Rewrite */}
        <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-inter font-semibold text-gray-900">Generational Rewrite</h3>
              <Switch className="data-[state=checked]:bg-[#2ECC71]" />
            </div>
            <p className="text-sm text-gray-600 font-inter">
              Adapt content complexity for different age groups
            </p>
          </CardHeader>
        </Card>

        {/* Different Sources */}
        <Card className="bg-white shadow-sm rounded-[20px] border border-gray-200">
          <CardHeader className="pb-4">
            <h3 className="font-inter font-semibold text-gray-900">Different Sources</h3>
            <p className="text-sm text-gray-600 font-inter">
              Cross-reference this story across multiple reliable sources
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    {source.type === "video" ? (
                      <div className="w-12 h-12 bg-gray-100 rounded-[8px] flex items-center justify-center">
                        <span className="text-xl">{source.thumbnail}</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#2D3A8C]/10 rounded-[8px] flex items-center justify-center">
                        <source.icon className="w-6 h-6 text-[#2D3A8C]" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-inter font-medium text-gray-900 text-sm">
                          {source.name}
                        </h4>
                        <Badge 
                          className="rounded-full text-white font-medium text-xs"
                          style={{ backgroundColor: getReliabilityColor(source.reliability) }}
                        >
                          {source.reliability}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 font-inter">{source.url}</p>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="p-2">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>
                  {index < sources.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60] text-white font-inter font-semibold rounded-[16px] h-12"
          >
            <Bell className="w-4 h-4 mr-2" />
            Get Updates
          </Button>
          <Button 
            className="flex-1 bg-[#004E98] hover:bg-[#003875] text-white font-inter font-semibold rounded-[16px] h-12"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button 
            className="flex-1 bg-[#2D3A8C] hover:bg-[#252F75] text-white font-inter font-semibold rounded-[16px] h-12"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Bottom spacing for sticky bar */}
      <div className="h-20"></div>
    </div>
  );
};