// This file configures JWT authentication with Clerk for Convex
// Run this once using: npx convex run _authentication

import { internalAction } from "./_generated/server";
import { v } from "convex/values";

// This is an internal action to help set up Clerk JWT authentication
// You need to manually configure the JWT provider in Convex dashboard

export const setupClerkJWT = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log(`
    ========================================
    CLERK JWT SETUP FOR CONVEX
    ========================================

    To complete the setup, follow these steps:

    1. Go to your Convex Dashboard: https://dashboard.convex.dev

    2. Select your deployment: lovable-gazelle-908

    3. Go to Settings > Authentication

    4. Click "Add JWT Provider" or "Configure JWT"

    5. Use these settings:
       - Name: Clerk
       - JWKS URL: https://stirred-bat-63.clerk.accounts.dev/.well-known/jwks.json
       - Audience: convex
       - Issuer: https://stirred-bat-63.clerk.accounts.dev

    6. Save the configuration

    7. Your app should now work with Clerk authentication!

    ========================================
    `);
    return { success: true };
  },
});
