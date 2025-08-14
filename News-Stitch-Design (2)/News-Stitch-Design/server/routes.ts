import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMediaAnalysisSchema,
  insertGameResultSchema,
  insertUserAchievementSchema,
  type MediaAnalysis 
} from "@shared/schema";
import { mediaAnalysisService } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Media Analysis Endpoints
  app.post("/api/media/analyze", async (req, res) => {
    try {
      const { title, content, mediaType, sourceUrl, userId } = req.body;

      if (!title || !content || !mediaType) {
        return res.status(400).json({ message: "Title, content, and mediaType are required" });
      }

      // Get AI analysis from OpenAI
      const analysisResult = await mediaAnalysisService.analyzeMediaContent(
        title,
        content,
        mediaType,
        sourceUrl
      );

      // Save to database
      const mediaAnalysis = await storage.saveMediaAnalysis({
        userId: userId || null,
        title,
        content,
        sourceUrl: sourceUrl || null,
        mediaType,
        biasScore: analysisResult.biasScore,
        credibilityScore: analysisResult.credibilityScore,
        factualityScore: analysisResult.factualityScore,
        overallScore: analysisResult.overallScore,
        biasAnalysis: analysisResult.biasAnalysis,
        factCheckResults: analysisResult.factCheckResults,
        sourcesVerification: analysisResult.sourcesVerification,
        generationalRewrite: analysisResult.generationalRewrite,
        isSaved: false,
        tags: null,
      });

      res.json(mediaAnalysis);
    } catch (error) {
      console.error("Media analysis error:", error);
      res.status(500).json({ message: "Failed to analyze media content" });
    }
  });

  app.get("/api/media/:id", async (req, res) => {
    try {
      const analysis = await storage.getMediaAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  app.post("/api/media/:id/save", async (req, res) => {
    try {
      const { isSaved } = req.body;
      await storage.updateMediaAnalysisSaveStatus(req.params.id, isSaved);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to update save status" });
    }
  });

  app.get("/api/users/:userId/media", async (req, res) => {
    try {
      const analyses = await storage.getUserMediaAnalyses(req.params.userId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user analyses" });
    }
  });

  app.get("/api/users/:userId/media/saved", async (req, res) => {
    try {
      const analyses = await storage.getSavedMediaAnalyses(req.params.userId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved analyses" });
    }
  });

  // Game Endpoints
  app.get("/api/game/content", async (req, res) => {
    try {
      const gameContent = await mediaAnalysisService.generateGameContent();
      res.json(gameContent);
    } catch (error) {
      console.error("Game content generation error:", error);
      res.status(500).json({ message: "Failed to generate game content" });
    }
  });

  app.post("/api/game/result", async (req, res) => {
    try {
      const result = insertGameResultSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const gameResult = await storage.saveGameResult(result.data);
      
      // Update user progress if points earned
      if (result.data.pointsEarned && result.data.pointsEarned > 0) {
        await storage.updateUserProgress(result.data.userId, result.data.pointsEarned);
      }

      res.json(gameResult);
    } catch (error) {
      console.error("Game result save error:", error);
      res.status(500).json({ message: "Failed to save game result" });
    }
  });

  app.get("/api/users/:userId/game-stats", async (req, res) => {
    try {
      const stats = await storage.getUserGameStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game stats" });
    }
  });

  app.get("/api/users/:userId/game-results", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const results = await storage.getUserGameResults(req.params.userId, limit);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game results" });
    }
  });

  // User Progress Endpoints
  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const { pointsEarned } = req.body;
      if (!pointsEarned || pointsEarned < 0) {
        return res.status(400).json({ message: "Valid pointsEarned required" });
      }

      const updatedUser = await storage.updateUserProgress(req.params.userId, pointsEarned);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Achievement Endpoints
  app.post("/api/users/:userId/achievements", async (req, res) => {
    try {
      const achievementData = { ...req.body, userId: req.params.userId };
      const result = insertUserAchievementSchema.safeParse(achievementData);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid achievement data" });
      }

      const achievement = await storage.saveUserAchievement(result.data);
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ message: "Failed to save achievement" });
    }
  });

  app.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const achievements = await storage.getUserAchievements(req.params.userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Test/Demo user endpoint for development
  app.post("/api/demo-user", async (req, res) => {
    try {
      const demoUser = await storage.upsertUser({
        id: "demo-user-123",
        email: "demo@example.com",
        firstName: "Demo",
        lastName: "User",
        profileImageUrl: null,
        totalPoints: 750,
        currentLevel: 2,
      });
      res.json(demoUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create demo user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
