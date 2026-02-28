import {
  databases,
  ID,
  Query,
  DATABASE_ID,
  REQUESTS_COLLECTION_ID,
  COLLECTIONS_COLLECTION_ID,
  USERS_COLLECTION_ID,
} from "./appwrite";
import { Permission, Role } from "appwrite";

export const apiService = {
  // Users
  async createUser(userId, email, name) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        userId, // Use the same ID as the Auth user
        {
          userId,
          email,
          name,
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
      );
    } catch (error) {
      console.error("Error creating user document:", error);
      throw error;
    }
  },

  // Requests
  async saveRequest(requestData) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        REQUESTS_COLLECTION_ID,
        ID.unique(),
        {
          ...requestData,
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(requestData.userId)),
          Permission.create(Role.user(requestData.userId)),
          Permission.update(Role.user(requestData.userId)),
          Permission.delete(Role.user(requestData.userId)),
        ],
      );
    } catch (error) {
      console.error("Error saving request:", error);
      throw error;
    }
  },

  async getRequestHistory(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        REQUESTS_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.orderDesc("createdAt"),
          Query.limit(50),
        ],
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching history:", error);
      return [];
    }
  },

  // Collections
  async getCollections(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS_COLLECTION_ID,
        [Query.equal("userId", userId), Query.orderDesc("createdAt")],
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  },

  async createCollection(userId, name) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          name,
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(userId)),
          Permission.create(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
      );
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  },
};
