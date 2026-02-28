import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export const DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "default";
export const USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "users";
export const REQUESTS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_REQUESTS_COLLECTION_ID || "requests";
export const COLLECTIONS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_COLLECTION_ID || "collections";

// Debug logging
console.log("Appwrite Config:", {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: DATABASE_ID,
  usersCollectionId: USERS_COLLECTION_ID,
});

export { client, account, databases, ID, Query };
