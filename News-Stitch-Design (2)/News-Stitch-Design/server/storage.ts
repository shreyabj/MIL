import {
  users,
  mediaAnalyses,
  userAchievements,
  gameResults,
  type User,
  type UpsertUser,
  type MediaAnalysis,
  type InsertMediaAnalysis,
  type UserAchievement,
  type InsertUserAchievement,
  type GameResult,
  type InsertGameResult,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProgress(userId: string, pointsEarned: number): Promise<User>;
  
  // Media analysis operations
  saveMediaAnalysis(analysis: InsertMediaAnalysis): Promise<MediaAnalysis>;
  getMediaAnalysis(id: string): Promise<MediaAnalysis | undefined>;
  getUserMediaAnalyses(userId: string): Promise<MediaAnalysis[]>;
  getSavedMediaAnalyses(userId: string): Promise<MediaAnalysis[]>;
  updateMediaAnalysisSaveStatus(id: string, isSaved: boolean): Promise<void>;
  
  // Game operations
  saveGameResult(result: InsertGameResult): Promise<GameResult>;
  getUserGameResults(userId: string, limit?: number): Promise<GameResult[]>;
  getUserGameStats(userId: string): Promise<{
    totalGames: number;
    correctAnswers: number;
    accuracy: number;
    totalPoints: number;
  }>;
  
  // Achievement operations
  saveUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserProgress(userId: string, pointsEarned: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const newTotalPoints = (user.totalPoints || 0) + pointsEarned;
    const newLevel = Math.floor(newTotalPoints / 500) + 1;

    const [updatedUser] = await db
      .update(users)
      .set({
        totalPoints: newTotalPoints,
        currentLevel: newLevel,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }

  // Media analysis operations
  async saveMediaAnalysis(analysis: InsertMediaAnalysis): Promise<MediaAnalysis> {
    const [savedAnalysis] = await db
      .insert(mediaAnalyses)
      .values(analysis)
      .returning();
    return savedAnalysis;
  }

  async getMediaAnalysis(id: string): Promise<MediaAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(mediaAnalyses)
      .where(eq(mediaAnalyses.id, id));
    return analysis;
  }

  async getUserMediaAnalyses(userId: string): Promise<MediaAnalysis[]> {
    return db
      .select()
      .from(mediaAnalyses)
      .where(eq(mediaAnalyses.userId, userId))
      .orderBy(desc(mediaAnalyses.analysisDate));
  }

  async getSavedMediaAnalyses(userId: string): Promise<MediaAnalysis[]> {
    return db
      .select()
      .from(mediaAnalyses)
      .where(
        and(
          eq(mediaAnalyses.userId, userId),
          eq(mediaAnalyses.isSaved, true)
        )
      )
      .orderBy(desc(mediaAnalyses.analysisDate));
  }

  async updateMediaAnalysisSaveStatus(id: string, isSaved: boolean): Promise<void> {
    await db
      .update(mediaAnalyses)
      .set({ isSaved })
      .where(eq(mediaAnalyses.id, id));
  }

  // Game operations
  async saveGameResult(result: InsertGameResult): Promise<GameResult> {
    const [savedResult] = await db
      .insert(gameResults)
      .values(result)
      .returning();
    return savedResult;
  }

  async getUserGameResults(userId: string, limit = 50): Promise<GameResult[]> {
    return db
      .select()
      .from(gameResults)
      .where(eq(gameResults.userId, userId))
      .orderBy(desc(gameResults.completedAt))
      .limit(limit);
  }

  async getUserGameStats(userId: string): Promise<{
    totalGames: number;
    correctAnswers: number;
    accuracy: number;
    totalPoints: number;
  }> {
    const results = await this.getUserGameResults(userId);
    
    const totalGames = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const accuracy = totalGames > 0 ? (correctAnswers / totalGames) * 100 : 0;
    const totalPoints = results.reduce((sum, r) => sum + (r.pointsEarned || 0), 0);

    return {
      totalGames,
      correctAnswers,
      accuracy,
      totalPoints,
    };
  }

  // Achievement operations
  async saveUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const [savedAchievement] = await db
      .insert(userAchievements)
      .values(achievement)
      .returning();
    return savedAchievement;
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.unlockedAt));
  }
}

export const storage = new DatabaseStorage();
