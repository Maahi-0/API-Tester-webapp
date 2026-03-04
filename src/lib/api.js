// Convex API service wrapper
// Note: In Convex, you typically use useQuery and useMutation hooks directly in components
// This file is kept for non-React usage or can be refactored later

export const apiService = {
  // This file is deprecated - use Convex hooks directly in components
  // See convex/functions.js for available mutations and queries

  // Users
  async createUser(ctx, userId, email, name) {
    console.warn(
      "apiService is deprecated. Use useMutation from convex/react instead."
    );
  },

  // Requests
  async saveRequest(ctx, requestData) {
    console.warn(
      "apiService is deprecated. Use useMutation from convex/react instead."
    );
  },

  async getRequestHistory(ctx, userId) {
    console.warn(
      "apiService is deprecated. Use useQuery from convex/react instead."
    );
  },

  // Collections
  async getCollections(ctx, userId) {
    console.warn(
      "apiService is deprecated. Use useQuery from convex/react instead."
    );
  },

  async createCollection(ctx, userId, name) {
    console.warn(
      "apiService is deprecated. Use useMutation from convex/react instead."
    );
  },
};
