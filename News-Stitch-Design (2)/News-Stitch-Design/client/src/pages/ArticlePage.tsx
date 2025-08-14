import { ArrowLeft, Share, Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ArticlePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#111614] text-white">
      {/* Header */}
      <header className="bg-[#111614] border-b border-[#283833] px-4 py-3">
        <div className="flex items-center justify-between">
          <ArrowLeft className="h-6 w-6 text-white" />
          <div className="flex items-center gap-3">
            <Share className="h-6 w-6 text-white" />
            <Bookmark className="h-6 w-6 text-white" />
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="px-4 py-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-[#0cf29e] text-[#111614] px-3 py-1 rounded-full text-sm [font-family:'Lexend',Helvetica] font-bold">
            Technology
          </span>
        </div>

        {/* Article Title */}
        <h1 className="[font-family:'Lexend',Helvetica] font-bold text-2xl leading-tight mb-4">
          Technology Innovation Breakthrough Announced by Leading Companies
        </h1>

        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-6 text-[#9bbaaf] text-sm">
          <span className="[font-family:'Lexend',Helvetica]">By Sarah Johnson</span>
          <span>•</span>
          <span>3 min read</span>
          <span>•</span>
          <span>2 hours ago</span>
        </div>

        {/* Featured Image Placeholder */}
        <Card className="bg-[#283833] border-[#3a5449] mb-6">
          <CardContent className="p-6">
            <div className="w-full h-48 bg-[#3a5449] rounded-lg flex items-center justify-center">
              <span className="text-6xl">💻</span>
            </div>
            <p className="text-xs text-[#9bbaaf] mt-2 [font-family:'Lexend',Helvetica]">
              Technology leaders gather to discuss breakthrough innovations
            </p>
          </CardContent>
        </Card>

        {/* Article Text */}
        <div className="space-y-6 text-[#9bbaaf] [font-family:'Lexend',Helvetica] leading-relaxed">
          <p>
            In a significant development for the technology industry, several leading companies have announced breakthrough innovations that promise to transform how we interact with digital platforms and services.
          </p>
          
          <p>
            The announcement comes after months of collaborative research and development efforts focused on creating more intuitive and accessible technology solutions for users worldwide.
          </p>

          <div className="bg-[#283833] border-l-4 border-[#0cf29e] p-4 rounded-r">
            <p className="text-white font-medium">
              "This represents a fundamental shift in how technology can better serve human needs while maintaining privacy and security as core principles."
            </p>
            <p className="text-sm text-[#9bbaaf] mt-2">- Dr. Emily Chen, Technology Research Director</p>
          </div>

          <p>
            Industry experts believe these innovations will have far-reaching implications for various sectors, including healthcare, education, and financial services. The focus on user-centric design and ethical implementation sets a new standard for technology development.
          </p>

          <p>
            As these technologies begin to roll out over the coming months, users can expect to see gradual improvements in their digital experiences, with enhanced functionality and better integration across platforms.
          </p>
        </div>

        {/* Engagement Actions */}
        <div className="flex items-center justify-between py-6 border-t border-[#283833] mt-8">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-[#9bbaaf] hover:text-[#0cf29e] p-0">
              <Heart className="h-5 w-5 mr-2" />
              <span className="[font-family:'Lexend',Helvetica]">124</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-[#9bbaaf] hover:text-[#0cf29e] p-0">
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="[font-family:'Lexend',Helvetica]">23</span>
            </Button>
          </div>
          <Button size="sm" className="bg-[#0cf29e] text-[#111614] hover:bg-[#0cf29e]/90 [font-family:'Lexend',Helvetica] font-bold">
            Follow Topic
          </Button>
        </div>

        {/* Related Articles */}
        <div className="mt-8">
          <h3 className="[font-family:'Lexend',Helvetica] font-bold text-lg mb-4">Related Articles</h3>
          <div className="space-y-3">
            {[
              "AI Development Trends for 2024",
              "Privacy-First Technology Solutions",
              "The Future of Digital Collaboration"
            ].map((title, index) => (
              <Card key={index} className="bg-[#283833] border-[#3a5449] hover:border-[#0cf29e] transition-colors">
                <CardContent className="p-4">
                  <h4 className="[font-family:'Lexend',Helvetica] font-medium text-white text-sm leading-tight">
                    {title}
                  </h4>
                  <p className="text-xs text-[#9bbaaf] mt-1">2 min read</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing for content */}
      <div className="h-20"></div>
    </div>
  );
};