import { apiRequest } from "@/lib/queryClient";

export interface MediaAnalysisRequest {
  title: string;
  content: string;
  mediaType: string;
  sourceUrl?: string;
  userId?: string;
}

export interface MediaAnalysisResponse {
  id: string;
  userId: string | null;
  title: string;
  content: string;
  sourceUrl: string | null;
  mediaType: string;
  biasScore: number;
  credibilityScore: number;
  factualityScore: number;
  overallScore: number;
  biasAnalysis: string;
  factCheckResults: any[];
  sourcesVerification: any[];
  generationalRewrite: any;
  analysisDate: string;
  isSaved: boolean;
  tags: string[] | null;
}

export interface GameContent {
  title: string;
  content: string;
  mediaType: string;
  correctAnswer: 'credible' | 'not_credible';
  explanation: string;
}

export interface GameResultRequest {
  userId: string;
  mediaAnalysisId?: string;
  userChoice: 'credible' | 'not_credible';
  correctAnswer: 'credible' | 'not_credible';
  isCorrect: boolean;
  pointsEarned: number;
}

export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  totalPoints: number | null;
  currentLevel: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GameStats {
  totalGames: number;
  correctAnswers: number;
  accuracy: number;
  totalPoints: number;
}

// API functions
export const mediaApi = {
  // Analyze media content
  analyze: async (data: MediaAnalysisRequest): Promise<MediaAnalysisResponse> => {
    const response = await fetch("/api/media/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Analysis failed");
    }
    return await response.json();
  },

  // Get specific analysis
  get: async (id: string): Promise<MediaAnalysisResponse> => {
    const response = await fetch(`/api/media/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch analysis");
    }
    return await response.json();
  },

  // Save/unsave analysis
  updateSaveStatus: async (id: string, isSaved: boolean) => {
    const response = await fetch(`/api/media/${id}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isSaved }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update save status");
    }
    return await response.json();
  },

  // Get user's analyses
  getUserAnalyses: async (userId: string): Promise<MediaAnalysisResponse[]> => {
    const response = await fetch(`/api/users/${userId}/media`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch analyses");
    }
    return await response.json();
  },

  // Get user's saved analyses
  getUserSavedAnalyses: async (userId: string): Promise<MediaAnalysisResponse[]> => {
    const response = await fetch(`/api/users/${userId}/media/saved`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch saved analyses");
    }
    return await response.json();
  },
};

export const gameApi = {
  // Get new game content
  getContent: async (): Promise<GameContent> => {
    const response = await fetch("/api/game/content");
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate game content");
    }
    return await response.json();
  },

  // Submit game result
  submitResult: async (data: GameResultRequest) => {
    const response = await fetch("/api/game/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit result");
    }
    return await response.json();
  },

  // Get user game stats
  getStats: async (userId: string): Promise<GameStats> => {
    const response = await fetch(`/api/users/${userId}/game-stats`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch stats");
    }
    return await response.json();
  },

  // Get user game results
  getResults: async (userId: string, limit?: number) => {
    const response = await fetch(`/api/users/${userId}/game-results${limit ? `?limit=${limit}` : ''}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch results");
    }
    return await response.json();
  },
};

export const userApi = {
  // Get user details
  get: async (userId: string): Promise<User> => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user");
    }
    return await response.json();
  },

  // Update user progress
  updateProgress: async (userId: string, pointsEarned: number): Promise<User> => {
    const response = await fetch(`/api/users/${userId}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pointsEarned }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update progress");
    }
    return await response.json();
  },

  // Get user achievements
  getAchievements: async (userId: string) => {
    const response = await fetch(`/api/users/${userId}/achievements`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch achievements");
    }
    return await response.json();
  },

  // Create achievement
  createAchievement: async (userId: string, achievement: {
    achievementType: string;
    title: string;
    description: string;
    pointsEarned: number;
  }) => {
    const response = await fetch(`/api/users/${userId}/achievements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(achievement),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create achievement");
    }
    return await response.json();
  },

  // Create demo user for testing
  createDemo: async (): Promise<User> => {
    const response = await fetch("/api/demo-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create demo user");
    }
    return await response.json();
  },
};