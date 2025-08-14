import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Media Literacy Components
import { LoginPermissions } from "@/pages/MediaLiteracy/LoginPermissions";
import { MainDashboard } from "@/pages/MediaLiteracy/MainDashboard";
import { OverlayWithDashboard } from "@/pages/MediaLiteracy/OverlayWithDashboard";
import { GameSection } from "@/pages/MediaLiteracy/GameSection";
import { MyTreeView } from "@/pages/MediaLiteracy/MyTreeView";
import { SavedCollection } from "@/pages/MediaLiteracy/SavedCollection";
import { ExtendedView } from "@/pages/MediaLiteracy/ExtendedView";

function Router() {
  return (
    <Switch>
      {/* UNESCO Media Literacy App Flow */}
      <Route path="/" component={LoginPermissions} />
      <Route path="/overlay" component={OverlayWithDashboard} />
      <Route path="/dashboard" component={MainDashboard} />
      <Route path="/game" component={GameSection} />
      <Route path="/tree" component={MyTreeView} />
      <Route path="/saved" component={SavedCollection} />
      <Route path="/extended" component={ExtendedView} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
