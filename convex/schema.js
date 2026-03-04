import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  requests: defineTable({
    userId: v.string(),
    method: v.string(),
    url: v.string(),
    headers: v.optional(v.string()),
    body: v.optional(v.string()),
    responseStatus: v.optional(v.number()),
    responseTime: v.optional(v.number()),
    collectionId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  collections: defineTable({
    userId: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
