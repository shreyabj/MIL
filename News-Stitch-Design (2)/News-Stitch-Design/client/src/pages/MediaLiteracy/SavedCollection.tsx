import { ArrowLeft, Search, Filter, Eye, Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export const SavedCollection = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const savedItems = [
    {
      type: "article",
      title: "Climate Change Impact on Global Agriculture",
      source: "Environmental Science Journal",
      biasScore: 0.1,
      confidence: 94,
      thumbnail: "🌾",
      savedDate: "2 days ago",
      category: "Environment"
    },
    {
      type: "video",
      title: "Election Security Measures Explained",
      source: "Democracy Watch",
      biasScore: 0.3,
      confidence: 87,
      thumbnail: "🗳️",
      savedDate: "1 week ago",
      category: "Politics"
    },
    {
      type: "article",
      title: "Breakthrough in Renewable Energy Technology",
      source: "Tech Innovation Daily",
      biasScore: 0.2,
      confidence: 91,
      thumbnail: "⚡",
      savedDate: "3 days ago",
      category: "Technology"
    },
    {
      type: "video",
      title: "Healthcare System Reform Analysis",
      source: "Medical News Network",
      biasScore: 0.6,
      confidence: 78,
      thumbnail: "🏥",
      savedDate: "5 days ago",
      category: "Health"
    },
    {
      type: "article",
      title: "Economic Indicators Point to Growth",
      source: "Financial Times",
      biasScore: 0.4,
      confidence: 82,
      thumbnail: "📈",
      savedDate: "1 week ago",
      category: "Business"
    },
    {
      type: "article",
      title: "Space Exploration Mission Updates",
      source: "Space Agency Reports",
      biasScore: 0.1,
      confidence: 96,
      thumbnail: "🚀",
      savedDate: "4 days ago",
      category: "Science"
    }
  ];

  const getBiasColor = (score: number) => score > 0.6 ? "#FF6B6B" : score > 0.3 ? "#FFA726" : "#2ECC71";
  const getBiasLabel = (score: number) => score > 0.6 ? "High Bias" : score > 0.3 ? "Medium Bias" : "Low Bias";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={() => setLocation('/dashboard')}
            variant="ghost" 
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <h1 className="font-inter font-bold text-xl text-[#2D3A8C]">
            Saved Collection
          </h1>
          <Button variant="ghost" className="p-2">
            <Filter className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search saved items..." 
            className="pl-10 bg-gray-50 border-gray-200 rounded-[12px] font-inter"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="font-inter font-bold text-lg text-[#2D3A8C]">23</p>
            <p className="font-inter text-xs text-gray-600">Total Saved</p>
          </div>
          <div className="text-center">
            <p className="font-inter font-bold text-lg text-[#2ECC71]">18</p>
            <p className="font-inter text-xs text-gray-600">Low Bias</p>
          </div>
          <div className="text-center">
            <p className="font-inter font-bold text-lg text-[#FFA726]">3</p>
            <p className="font-inter text-xs text-gray-600">Medium Bias</p>
          </div>
          <div className="text-center">
            <p className="font-inter font-bold text-lg text-[#FF6B6B]">2</p>
            <p className="font-inter text-xs text-gray-600">High Bias</p>
          </div>
        </div>
      </div>

      {/* Saved Items Grid */}
      <div className="p-4">
        <div className="grid gap-4">
          {savedItems.map((item, index) => (
            <Card key={index} className="bg-white shadow-sm rounded-[20px] border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-100 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.thumbnail}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            className="rounded-full text-white font-medium text-xs"
                            style={{ backgroundColor: getBiasColor(item.biasScore) }}
                          >
                            {getBiasLabel(item.biasScore)}
                          </Badge>
                          <span className="text-xs text-gray-500 font-inter">
                            {item.confidence}% confidence
                          </span>
                        </div>
                        <h3 className="font-inter font-semibold text-gray-900 text-sm leading-tight mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-inter">{item.source}</span>
                          <span>•</span>
                          <span className="text-[#2D3A8C] font-medium">{item.category}</span>
                          <span>•</span>
                          <span>{item.savedDate}</span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-3">
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Share className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Bookmark className="w-4 h-4 text-[#2ECC71] fill-current" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-[#004E98] hover:bg-[#003875] text-white font-inter font-medium rounded-[8px] h-7 px-3 text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            className="border-[#2D3A8C] text-[#2D3A8C] hover:bg-[#2D3A8C] hover:text-white font-inter font-medium rounded-[12px]"
          >
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  );
};