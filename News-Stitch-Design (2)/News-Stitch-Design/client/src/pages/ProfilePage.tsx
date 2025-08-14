import { Settings, Bell, Bookmark, TrendingUp, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export const ProfilePage = (): JSX.Element => {
  const readingStats = [
    { label: "Articles Read", value: "127", icon: "📰" },
    { label: "Reading Streak", value: "15 days", icon: "🔥" },
    { label: "Saved Articles", value: "23", icon: "🔖" },
    { label: "Topics Followed", value: "8", icon: "📊" }
  ];

  const preferences = [
    { label: "Breaking News Alerts", enabled: true },
    { label: "Daily Newsletter", enabled: true },
    { label: "Personalized Recommendations", enabled: false },
    { label: "Weekend Digest", enabled: true }
  ];

  return (
    <div className="min-h-screen bg-[#111614] text-white">
      {/* Header */}
      <header className="bg-[#111614] border-b border-[#283833] px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="[font-family:'Lexend',Helvetica] font-bold text-xl">Profile</h1>
          <Settings className="h-6 w-6 text-white" />
        </div>
      </header>

      {/* Profile Section */}
      <div className="px-4 py-6">
        <Card className="bg-[#283833] border-[#3a5449] mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#0cf29e] rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-[#111614]" />
              </div>
              <div className="flex-1">
                <h2 className="[font-family:'Lexend',Helvetica] font-bold text-xl text-white">
                  Alex Morgan
                </h2>
                <p className="text-[#9bbaaf] [font-family:'Lexend',Helvetica]">
                  News enthusiast since 2023
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-[#0cf29e] text-[#0cf29e] hover:bg-[#0cf29e] hover:text-[#111614]">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            
            <p className="text-[#9bbaaf] text-sm [font-family:'Lexend',Helvetica] leading-relaxed">
              Stay informed about technology trends, business developments, and global news. 
              Passionate reader with interests in innovation and sustainable development.
            </p>
          </CardContent>
        </Card>

        {/* Reading Statistics */}
        <div className="mb-6">
          <h3 className="[font-family:'Lexend',Helvetica] font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0cf29e]" />
            Reading Statistics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {readingStats.map((stat, index) => (
              <Card key={index} className="bg-[#283833] border-[#3a5449]">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <p className="[font-family:'Lexend',Helvetica] font-bold text-lg text-white">
                    {stat.value}
                  </p>
                  <p className="text-[#9bbaaf] text-xs [font-family:'Lexend',Helvetica]">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-6">
          <h3 className="[font-family:'Lexend',Helvetica] font-bold text-lg mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0cf29e]" />
            Notification Preferences
          </h3>
          <Card className="bg-[#283833] border-[#3a5449]">
            <CardContent className="p-4">
              <div className="space-y-4">
                {preferences.map((pref, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="[font-family:'Lexend',Helvetica] text-sm text-white">
                      {pref.label}
                    </span>
                    <Switch 
                      checked={pref.enabled}
                      className="data-[state=checked]:bg-[#0cf29e]"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Articles */}
        <div className="mb-6">
          <h3 className="[font-family:'Lexend',Helvetica] font-bold text-lg mb-4 flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-[#0cf29e]" />
            Recently Saved
          </h3>
          <div className="space-y-3">
            {[
              { title: "Economic Outlook for Next Quarter", category: "Business", time: "2 hours ago" },
              { title: "Climate Technology Innovations", category: "Environment", time: "1 day ago" },
              { title: "Healthcare Digital Transformation", category: "Health", time: "3 days ago" }
            ].map((article, index) => (
              <Card key={index} className="bg-[#283833] border-[#3a5449] hover:border-[#0cf29e] transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="[font-family:'Lexend',Helvetica] font-medium text-white text-sm leading-tight mb-1">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#9bbaaf]">
                        <span className="text-[#0cf29e]">{article.category}</span>
                        <span>•</span>
                        <span>{article.time}</span>
                      </div>
                    </div>
                    <Bookmark className="h-4 w-4 text-[#0cf29e] fill-current" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full border-[#3a5449] text-white hover:bg-[#283833] [font-family:'Lexend',Helvetica]"
          >
            Privacy Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-[#3a5449] text-white hover:bg-[#283833] [font-family:'Lexend',Helvetica]"
          >
            Help & Support
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-red-500 text-red-400 hover:bg-red-500/10 [font-family:'Lexend',Helvetica]"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};