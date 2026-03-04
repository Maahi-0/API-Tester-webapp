"use client";
import { useState, useEffect } from "react";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import Sidebar from "../components/Sidebar";
import RequestBuilder from "../components/RequestBuilder";
import ResponseViewer from "../components/ResponseViewer";

export default function Home() {
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const [activeRequest, setActiveRequest] = useState(null);
  const [response, setResponse] = useState(null);
  const [sending, setSending] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("Auth State:", {
      isConvexLoading,
      isAuthenticated,
      isUserLoaded,
      isSignedIn,
      userId: user?.id,
    });
  }, [isConvexLoading, isAuthenticated, isUserLoaded, isSignedIn, user?.id]);

  // Convex data — skip queries until user is authenticated
  const history = useQuery(
    api.functions.getRequestHistory,
    isAuthenticated && user?.id ? { userId: user.id } : "skip",
  );
  const collections = useQuery(
    api.functions.getCollections,
    isAuthenticated && user?.id ? { userId: user.id } : "skip",
  );

  // Convex mutations
  const saveRequest = useMutation(api.functions.saveRequest);
  const createCollectionMutation = useMutation(api.functions.createCollection);
  const syncUserMutation = useMutation(api.functions.syncUser);

  // Sync user with Convex on login
  useEffect(() => {
    if (isAuthenticated && user?.id && syncUserMutation) {
      syncUserMutation({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.username || "User",
      }).catch((err) => {
        console.error("Error syncing user:", err);
      });
    }
  }, [isAuthenticated, user, syncUserMutation]);

  const handleSendRequest = async (requestData) => {
    setSending(true);
    setResponse(null);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const data = await res.json();
      setResponse(data);

      // Save to Convex history
      if (user) {
        await saveRequest({
          userId: user.id,
          method: requestData.method,
          url: requestData.url,
          headers: JSON.stringify(requestData.headers),
          body: requestData.body ? JSON.stringify(requestData.body) : "",
          responseStatus: data.status,
          responseTime: data.responseTime,
          collectionId: requestData.collectionId || undefined,
        });
      }
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setSending(false);
    }
  };

  const handleSelectHistory = (item) => {
    setActiveRequest({
      method: item.method,
      url: item.url,
      headers: item.headers ? JSON.parse(item.headers) : {},
      body: item.body ? JSON.parse(item.body) : "",
      collectionId: item.collectionId || "",
    });
  };

  const handleCreateCollection = async (name) => {
    try {
      if (user) {
        await createCollectionMutation({ userId: user.id, name });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Loading state
  const isLoading = isConvexLoading || !isUserLoaded;
  const isSyncing = isUserLoaded && isSignedIn && !isAuthenticated;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFCF8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#D97757]"></div>
          <p className="animate-pulse text-sm text-[#6b6b6b]">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — show sign in / sign up
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FDFCF8]">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-[#D97757]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-medium text-[#1a1a1a]">API Tester</span>
          </div>
          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-[#6b6b6b] transition hover:text-[#1a1a1a]">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-[#D97757] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#C46745]">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8E6E1] bg-white px-4 py-2 text-sm text-[#6b6b6b]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D97757]"></span>
              Powered by Convex + Clerk
            </div>
            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-[#1a1a1a]">
              Test APIs with ease,
              <br />
              <span className="text-[#D97757]">save everything</span>
            </h1>
            <p className="mb-10 text-lg text-[#6b6b6b]">
              A beautiful API testing workspace. Make requests, save
              collections, track history — all synced in real-time.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <SignUpButton mode="modal">
                <button className="rounded-xl bg-[#D97757] px-8 py-3.5 font-medium text-white shadow-sm transition hover:bg-[#C46745]">
                  Create free account
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="rounded-xl border border-[#E8E6E1] bg-white px-8 py-3.5 font-medium text-[#1a1a1a] transition hover:bg-[#FDFCF8]">
                  Sign in
                </button>
              </SignInButton>
            </div>

            {/* Feature pills */}
            <div className="mt-16 flex flex-wrap justify-center gap-3">
              {[
                "🔐 Clerk Auth",
                "⚡ Real-time Convex DB",
                "📦 Collections",
                "🕐 Request History",
                "🌐 All HTTP Methods",
              ].map((f) => (
                <span
                  key={f}
                  className="rounded-lg border border-[#E8E6E1] bg-white px-4 py-2 text-sm text-[#6b6b6b]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </main>

        <footer className="px-8 py-6 text-center text-sm text-[#9a9a9a]">
          <p>© 2025 API Tester. Built with Convex + Clerk.</p>
        </footer>
      </div>
    );
  }

  // Authenticated — main app
  return (
    <div className="flex h-screen bg-[#FDFCF8]">
      <Sidebar
        history={history || []}
        collections={collections || []}
        onSelectHistory={handleSelectHistory}
        userName={user?.emailAddresses?.[0]?.emailAddress || user?.fullName}
        onLogout={() => {}} // Clerk handles sign out via UserButton
        onCreateCollection={handleCreateCollection}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#E8E6E1] bg-white px-8">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-[#D97757]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-medium text-[#1a1a1a]">Workspace</span>
            <span className="text-[#9a9a9a]">/</span>
            <span className="text-sm text-[#6b6b6b]">My Requests</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-[#F5F3F0] px-4 py-1.5 text-xs font-medium text-[#6b6b6b]">
              {user?.emailAddresses?.[0]?.emailAddress}
            </span>
            {/* Clerk's UserButton handles sign out */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 overflow-auto bg-[#FDFCF8] p-8">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-6">
            <RequestBuilder
              onSend={handleSendRequest}
              loading={sending}
              initialData={activeRequest}
              collections={collections || []}
            />
            <ResponseViewer response={response} loading={sending} />
          </div>
        </main>
      </div>
    </div>
  );
}
