import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  real,
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  totalPoints: integer("total_points").default(0),
  currentLevel: integer("current_level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Media analysis results
export const mediaAnalyses = pgTable("media_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sourceUrl: text("source_url"),
  mediaType: varchar("media_type").notNull(), // 'article', 'image', 'video', 'social'
  
  // AI Analysis Results
  biasScore: real("bias_score").notNull(), // 0-100 scale
  credibilityScore: real("credibility_score").notNull(), // 0-100 scale
  factualityScore: real("factuality_score").notNull(), // 0-100 scale
  overallScore: real("overall_score").notNull(), // Combined score 0-100
  
  // Detailed Analysis
  biasAnalysis: text("bias_analysis").notNull(),
  factCheckResults: jsonb("fact_check_results"), // Array of fact-check findings
  sourcesVerification: jsonb("sources_verification"), // Cross-source verification
  generationalRewrite: jsonb("generational_rewrite"), // Different reading levels
  
  // Metadata
  analysisDate: timestamp("analysis_date").defaultNow(),
  isSaved: boolean("is_saved").default(false),
  tags: text("tags").array(),
});

// User achievements and progress
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementType: varchar("achievement_type").notNull(), // 'level_up', 'accuracy_streak', 'daily_goal', etc.
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  pointsEarned: integer("points_earned").default(0),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Game session results (for the Tinder-style game)
export const gameResults = pgTable("game_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  mediaAnalysisId: varchar("media_analysis_id").references(() => mediaAnalyses.id),
  userChoice: varchar("user_choice").notNull(), // 'credible', 'not_credible'
  correctAnswer: varchar("correct_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  pointsEarned: integer("points_earned").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  mediaAnalyses: many(mediaAnalyses),
  achievements: many(userAchievements),
  gameResults: many(gameResults),
}));

export const mediaAnalysesRelations = relations(mediaAnalyses, ({ one, many }) => ({
  user: one(users, {
    fields: [mediaAnalyses.userId],
    references: [users.id],
  }),
  gameResults: many(gameResults),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
}));

export const gameResultsRelations = relations(gameResults, ({ one }) => ({
  user: one(users, {
    fields: [gameResults.userId],
    references: [users.id],
  }),
  mediaAnalysis: one(mediaAnalyses, {
    fields: [gameResults.mediaAnalysisId],
    references: [mediaAnalyses.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type MediaAnalysis = typeof mediaAnalyses.$inferSelect;
export type InsertMediaAnalysis = typeof mediaAnalyses.$inferInsert;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;
export type GameResult = typeof gameResults.$inferSelect;
export type InsertGameResult = typeof gameResults.$inferInsert;

// Zod schemas for validation
export const insertMediaAnalysisSchema = createInsertSchema(mediaAnalyses).omit({
  id: true,
  analysisDate: true,
});

export const insertGameResultSchema = createInsertSchema(gameResults).omit({
  id: true,
  completedAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export type InsertMediaAnalysisInput = z.infer<typeof insertMediaAnalysisSchema>;
export type InsertGameResultInput = z.infer<typeof insertGameResultSchema>;
export type InsertUserAchievementInput = z.infer<typeof insertUserAchievementSchema>;
