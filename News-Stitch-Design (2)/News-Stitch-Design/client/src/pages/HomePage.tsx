import { Search, Bell, User, Menu, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const HomePage = (): JSX.Element => {
  const newsCategories = [
    "Breaking News", "Politics", "Technology", "Sports", "Business", "Health"
  ];

  const topStories = [
    {
      title: "Major Economic Developments Shape Global Markets",
      summary: "Financial experts analyze the latest trends affecting international trade and investment opportunities.",
      category: "Business",
      readTime: "5 min read",
      image: "📈"
    },
    {
      title: "Technology Innovation Breakthrough Announced",
      summary: "Leading tech companies unveil new solutions that could transform digital communication.",
      category: "Technology", 
      readTime: "3 min read",
      image: "💻"
    },
    {
      title: "Environmental Policy Changes Take Effect",
      summary: "New regulations aim to address climate concerns while supporting sustainable development.",
      category: "Politics",
      readTime: "4 min read", 
      image: "🌍"
    }
  ];

  return (
    <div className="min-h-screen bg-[#111614] text-white">
      {/* Header */}
      <header className="bg-[#111614] border-b border-[#283833] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="h-6 w-6 text-white" />
            <h1 className="[font-family:'Lexend',Helvetica] font-bold text-xl">NewsApp</h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-white" />
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-[#111614]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9bbaaf]" />
          <Input 
            placeholder="Search news..." 
            className="pl-10 bg-[#283833] border-[#3a5449] text-white placeholder:text-[#9bbaaf] focus:border-[#0cf29e]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {newsCategories.map((category, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              className="bg-[#283833] text-white hover:bg-[#0cf29e] hover:text-[#111614] whitespace-nowrap border-0 [font-family:'Lexend',Helvetica]"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-[#0cf29e]" />
          <h2 className="[font-family:'Lexend',Helvetica] font-bold text-lg">Trending Now</h2>
        </div>
      </div>

      {/* News Feed */}
      <div className="px-4 pb-6 space-y-4">
        {topStories.map((story, index) => (
          <Card key={index} className="bg-[#283833] border-[#3a5449] hover:border-[#0cf29e] transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{story.image}</span>
                    <span className="text-xs text-[#0cf29e] [font-family:'Lexend',Helvetica] font-medium">
                      {story.category}
                    </span>
                  </div>
                  <h3 className="[font-family:'Lexend',Helvetica] font-bold text-white text-base leading-tight">
                    {story.title}
                  </h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-[#9bbaaf] text-sm leading-relaxed mb-3 [font-family:'Lexend',Helvetica]">
                {story.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9bbaaf] [font-family:'Lexend',Helvetica]">
                  {story.readTime}
                </span>
                <Button 
                  size="sm" 
                  className="bg-[#0cf29e] text-[#111614] hover:bg-[#0cf29e]/90 [font-family:'Lexend',Helvetica] font-bold"
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111614] border-t border-[#283833] px-4 py-3">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="sm" className="text-[#0cf29e] flex-col gap-1">
            <div className="w-6 h-6 rounded bg-[#0cf29e]" />
            <span className="text-xs [font-family:'Lexend',Helvetica]">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9bbaaf] flex-col gap-1">
            <Search className="w-6 h-6" />
            <span className="text-xs [font-family:'Lexend',Helvetica]">Search</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9bbaaf] flex-col gap-1">
            <Bell className="w-6 h-6" />
            <span className="text-xs [font-family:'Lexend',Helvetica]">Alerts</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-[#9bbaaf] flex-col gap-1">
            <User className="w-6 h-6" />
            <span className="text-xs [font-family:'Lexend',Helvetica]">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};