import { Share, Bookmark, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VideoPlayerPage = (): JSX.Element => {
  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-white justify-between"
      style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex absolute top-0 left-0 h-full w-full flex-col justify-end items-stretch bg-[#141414]/40">
          <div className="flex flex-col items-stretch bg-white">
            <button className="flex h-5 w-full items-center justify-center">
              <div className="h-1 w-9 rounded-full bg-[#dbe0e6]"></div>
            </button>
            <div className="flex-1">
              <div className="p-4">
                <div className="flex flex-col items-stretch justify-start rounded-xl">
                  <div className="relative w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl bg-gradient-to-br from-blue-600 to-purple-700">
                    {/* Video placeholder with play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                    {/* Video overlay content */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 rounded-lg p-3 backdrop-blur-sm">
                        <span className="text-white text-sm font-medium">AI-Generated Video • 2:34</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-stretch justify-center gap-1 py-4">
                    <p className="text-[#60758a] text-sm font-normal leading-normal">AI-Generated Video</p>
                    <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
                      Breaking News: Local Election Results
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <p className="text-[#60758a] text-base font-normal leading-normal">
                        Watch the latest updates on the local election results, including candidate speeches and voter reactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d80f2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0d80f2]/90">
              <Bookmark className="w-4 h-4 mr-2" />
              <span className="truncate">Save</span>
            </Button>
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#f0f2f5]/90">
              <Share className="w-4 h-4 mr-2" />
              <span className="truncate">Share</span>
            </Button>
          </div>
        </div>
        <div className="flex px-4 py-3">
          <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#f0f2f5]/90">
            <span className="truncate">View More</span>
          </Button>
        </div>
        <div className="h-5 bg-white"></div>
      </div>
    </div>
  );
};