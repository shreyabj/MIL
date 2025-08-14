import { Play, Save, Share, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { type MediaAnalysisResponse } from "@/lib/api";

interface OverlayQuickResultProps {
  type: 'incident' | 'case';
  isVisible: boolean;
  onClose: () => void;
  onViewMore?: () => void;
  analysisResult?: MediaAnalysisResponse;
}

export const OverlayQuickResult = ({ type, isVisible, onClose, onViewMore, analysisResult }: OverlayQuickResultProps): JSX.Element => {
  if (!isVisible || !analysisResult) return <></>;

  const getBiasColor = (score: number) => score > 60 ? "#FF6B6B" : "#2ECC71";
  const getBiasLabel = (score: number) => score > 60 ? "High Bias" : "Low Bias";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Semi-transparent backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup content */}
      <div className="relative w-full max-w-md mx-4 mb-8 animate-in slide-in-from-bottom duration-300">
        <Card className="bg-white shadow-2xl rounded-[20px] overflow-hidden">
          <CardContent className="p-0">
            {type === 'incident' ? (
              // Incident content
              <div className="p-6">
                {/* News Preview */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-500 rounded-[16px] mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl">🌍</span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-black/50 rounded-[8px] p-2 backdrop-blur-sm">
                      <p className="text-white font-inter text-xs font-medium">
                        {analysisResult.title} • {analysisResult.mediaType}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">
                      Fact Check Result
                    </h3>
                    <p className="font-inter text-gray-700 text-sm leading-relaxed">
                      {analysisResult.biasAnalysis}
                    </p>
                  </div>
                  <Badge 
                    className="ml-3 rounded-full text-white font-medium"
                    style={{ backgroundColor: getBiasColor(analysisResult.biasScore) }}
                  >
                    {getBiasLabel(analysisResult.biasScore)}
                  </Badge>
                </div>
                
                <div className="bg-gray-50 rounded-[16px] p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-[#2D3A8C]" />
                    <span className="font-inter font-medium text-sm text-[#2D3A8C]">
                      Overall Score: {Math.round(analysisResult.overallScore)}/100
                    </span>
                  </div>
                  <p className="font-inter text-xs text-gray-600">
                    Credibility: {Math.round(analysisResult.credibilityScore)}% • Factuality: {Math.round(analysisResult.factualityScore)}%
                  </p>
                </div>
              </div>
            ) : (
              // Case content (video)
              <div>
                <div className="relative aspect-video bg-gradient-to-br from-[#2D3A8C] to-[#004E98] rounded-t-[20px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#2ECC71] text-white font-medium rounded-full">
                      AI Analysis
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-[12px] p-3 backdrop-blur-sm">
                      <p className="text-white font-inter text-sm font-medium">
                        Media Authenticity Check • 2:34
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">
                    Video Analysis Complete
                  </h3>
                  <p className="font-inter text-gray-700 text-sm leading-relaxed">
                    Advanced AI analysis detected no signs of manipulation. Metadata and visual consistency checks passed verification.
                  </p>
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="px-6 pb-6">
              <div className="flex gap-3 mb-4">
                <Button 
                  className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60] text-white font-inter font-semibold rounded-[16px] h-12"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  className="flex-1 bg-[#004E98] hover:bg-[#003875] text-white font-inter font-semibold rounded-[16px] h-12"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button 
                onClick={() => {
                  // Store analysis result for ExtendedView
                  if (analysisResult) {
                    localStorage.setItem('currentAnalysis', JSON.stringify(analysisResult));
                  }
                  onViewMore?.();
                }}
                className="w-full bg-[#2D3A8C] hover:bg-[#252F75] text-white font-inter font-semibold rounded-[16px] h-12"
              >
                <Eye className="w-4 h-4 mr-2" />
                View More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};