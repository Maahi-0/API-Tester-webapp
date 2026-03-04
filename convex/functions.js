import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Users
export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
      });
      return existing._id;
    }

    // Create new
    const now = Date.now();
    return await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      createdAt: now,
    });
  },
});

export const getUserByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Requests
export const saveRequest = mutation({
  args: {
    userId: v.string(),
    method: v.string(),
    url: v.string(),
    headers: v.optional(v.string()),
    body: v.optional(v.string()),
    responseStatus: v.optional(v.number()),
    responseTime: v.optional(v.number()),
    collectionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("requests", {
      userId: args.userId,
      method: args.method,
      url: args.url,
      headers: args.headers,
      body: args.body,
      responseStatus: args.responseStatus,
      responseTime: args.responseTime,
      collectionId: args.collectionId,
      createdAt: now,
    });
  },
});

export const getRequestHistory = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("requests")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

// Collections
export const getCollections = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("collections")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const createCollection = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("collections", {
      userId: args.userId,
      name: args.name,
      createdAt: now,
    });
  },
});
