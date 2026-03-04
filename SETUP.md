# API Tester - Setup Guide

## Problem Fixed

The app was stuck on "Connecting to workspace..." because Convex wasn't configured to accept JWT tokens from Clerk.

## Solution: Configure JWT Authentication

Follow these steps to fix the authentication:

### Step 1: Configure JWT Provider in Convex Dashboard

1. Go to your **Convex Dashboard**: https://dashboard.convex.dev

2. Select your deployment: **lovable-gazelle-908**

3. Go to **Settings** > **Authentication**

4. Click **"Add JWT Provider"** or **"Configure JWT"**

5. Use these settings:
   - **Name**: `Clerk`
   - **JWKS URL**: `https://stirred-bat-63.clerk.accounts.dev/.well-known/jwks.json`
   - **Audience**: `convex`
   - **Issuer**: `https://stirred-bat-63.clerk.accounts.dev`

6. **Save** the configuration

### Step 2: Verify Environment Variables

Make sure your `.env` file has these values (it should already):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJlZC1iYXQtNjMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_qSXj1vYKEIRmZGnI1GZrqiXTj81oQqo6wWkUOHMCjU

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://lovable-gazelle-908.convex.cloud
```

### Step 3: Deploy Convex Functions

Run this command to deploy your Convex backend:

```bash
npx convex dev
```

### Step 4: Restart the Development Server

```bash
npm run dev
```

## What Was Wrong

1. **Missing JWT Configuration**: Convex needs to know how to verify Clerk's JWT tokens
2. **Loading State Bug**: The app was stuck in a loading loop because `isSignedIn && !isAuthenticated` was always true
3. **No Error Feedback**: The app showed "Connecting to workspace..." indefinitely

## What Was Fixed

1. ✅ Updated `ConvexClientProvider` to handle mounting properly
2. ✅ Fixed loading state logic in `page.js`
3. ✅ Added debug logging to track authentication state
4. ✅ Created this setup guide

## Testing

After completing the setup:

1. Open http://localhost:3000
2. Click "Create free account" or "Sign in"
3. Complete the Clerk authentication flow
4. You should now see the main API Tester interface
5. The loading screen should disappear

## Troubleshooting

### Still stuck on loading screen?

1. Open browser console (F12)
2. Look for "Auth State" logs
3. Check if `isAuthenticated` becomes `true` after login
4. If not, verify the JWT configuration in Convex dashboard

### Getting JWT token errors?

Make sure:
- The JWKS URL is correct: `https://stirred-bat-63.clerk.accounts.dev/.well-known/jwks.json`
- The audience is set to `convex`
- The issuer matches your Clerk domain

### Need help?

Check the Convex docs: https://docs.convex.dev/auth/clerk
