import { useState } from "react";

const Sidebar = ({
  history,
  collections,
  onSelectHistory,
  userName,
  onLogout,
  onCreateCollection,
}) => {
  const [activeTab, setActiveTab] = useState("history");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName);
      setNewCollectionName("");
      setIsCreatingCollection(false);
    }
  };

  return (
    <div className="flex h-full w-72 flex-shrink-0 flex-col border-r border-[#E8E6E1] bg-white">
      <div className="flex items-center gap-3 border-b border-[#E8E6E1] p-6">
        <svg
          className="h-6 w-6 text-[#D97757]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="font-medium text-[#1a1a1a]">API Tester</span>
      </div>

      <div className="mt-4 mb-4 flex gap-2 px-4">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "history" ? "bg-[#F5F3F0] text-[#1a1a1a]" : "text-[#6b6b6b] hover:bg-[#FDFCF8]"}`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("collections")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === "collections" ? "bg-[#F5F3F0] text-[#1a1a1a]" : "text-[#6b6b6b] hover:bg-[#FDFCF8]"}`}
        >
          Collections
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {activeTab === "history" ? (
          <div className="space-y-1">
            {history.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#9a9a9a] italic">
                No requests yet
              </div>
            ) : (
              history.map((item) => (
                <button
                  key={item.$id}
                  onClick={() => onSelectHistory(item)}
                  className="group flex w-full flex-col gap-2 rounded-lg border border-transparent p-3 text-left transition-all hover:border-[#E8E6E1] hover:bg-[#FDFCF8]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-semibold ${
                        item.method === "GET"
                          ? "bg-[#E8F5E9] text-[#2E7D32]"
                          : item.method === "POST"
                            ? "bg-[#E3F2FD] text-[#1976D2]"
                            : item.method === "PUT"
                              ? "bg-[#FFF3E0] text-[#F57C00]"
                              : item.method === "DELETE"
                                ? "bg-[#FFEBEE] text-[#C62828]"
                                : "bg-[#F5F5F5] text-[#616161]"
                      }`}
                    >
                      {item.method}
                    </span>
                    <span className="text-[10px] text-[#9a9a9a]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="truncate text-sm text-[#1a1a1a]">
                    {item.url}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {collections.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#9a9a9a] italic">
                No collections yet
              </div>
            ) : (
              collections.map((col) => (
                <div
                  key={col.$id}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-[#E8E6E1] hover:bg-[#FDFCF8]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F3F0] transition-colors group-hover:bg-[#D97757] group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="truncate text-sm font-medium text-[#1a1a1a]">
                    {col.name}
                  </span>
                </div>
              ))
            )}

            {isCreatingCollection ? (
              <form
                onSubmit={handleCreateCollection}
                className="mt-4 rounded-lg border border-[#E8E6E1] bg-[#FDFCF8] p-3"
              >
                <input
                  autoFocus
                  className="mb-2 w-full rounded-md border border-[#E8E6E1] bg-white px-3 py-2 text-sm outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757]"
                  placeholder="Collection name..."
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#D97757] px-2 py-1.5 text-sm font-medium text-white shadow-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCollection(false)}
                    className="flex-1 rounded-md border border-[#E8E6E1] bg-white px-2 py-1.5 text-sm font-medium text-[#6b6b6b]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreatingCollection(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#E8E6E1] bg-[#FDFCF8] p-3 text-sm font-medium text-[#6b6b6b] transition-all hover:border-[#D97757] hover:text-[#D97757]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Collection
              </button>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-[#E8E6E1] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#E8E6E1] bg-[#FDFCF8] p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D97757] text-sm font-semibold text-white">
            {userName?.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-[#1a1a1a]">
              {userName}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg p-2 text-sm text-[#6b6b6b] transition-colors hover:text-[#D97757]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
