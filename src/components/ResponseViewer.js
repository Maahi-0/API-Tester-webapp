"use client";
import { useState } from "react";

const ResponseViewer = ({ response, loading }) => {
  const [activeTab, setActiveTab] = useState("body");

  if (loading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#E8E6E1] bg-white p-8 shadow-sm">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#E8E6E1] border-t-[#D97757]"></div>
        <p className="text-sm font-medium text-[#6b6b6b]">
          Fetching response...
        </p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#E8E6E1] bg-white p-8 text-[#9a9a9a] shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-12 w-12 opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <p className="text-sm">Send a request to see the response here</p>
      </div>
    );
  }

  if (response.error) {
    return (
      <div className="rounded-xl border border-[#FEE2E2] bg-[#FEF2F2] p-6 shadow-sm">
        <h3 className="mb-2 font-semibold text-[#C62828]">Request Failed</h3>
        <pre className="overflow-auto text-xs whitespace-pre-wrap text-[#DC2626]">
          {response.error}
        </pre>
      </div>
    );
  }

  const { status, statusText, responseTime, headers, body } = response;
  const isError = status >= 400;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E8E6E1] bg-[#FDFCF8] px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-[#6b6b6b]">Response</span>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${isError ? "border border-[#FEE2E2] bg-[#FEF2F2] text-[#C62828]" : "border border-[#DCFCE7] bg-[#F0FDF4] text-[#16A34A]"}`}
            >
              {status} {statusText}
            </span>
            <span className="rounded bg-[#F5F3F0] px-2.5 py-1 text-xs font-medium text-[#6b6b6b]">
              {responseTime}ms
            </span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-[#E8E6E1] bg-[#F5F3F0] px-6">
        <button
          onClick={() => setActiveTab("body")}
          className={`border-b-2 px-4 py-3 text-xs font-medium transition-all ${activeTab === "body" ? "border-[#D97757] text-[#D97757]" : "border-transparent text-[#6b6b6b] hover:text-[#1a1a1a]"}`}
        >
          Body
        </button>
        <button
          onClick={() => setActiveTab("headers")}
          className={`border-b-2 px-4 py-3 text-xs font-medium transition-all ${activeTab === "headers" ? "border-[#D97757] text-[#D97757]" : "border-transparent text-[#6b6b6b] hover:text-[#1a1a1a]"}`}
        >
          Headers
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-[#FDFCF8]">
        {activeTab === "body" ? (
          <pre className="h-full overflow-auto p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#1a1a1a]">
            {typeof body === "string" ? body : JSON.stringify(body, null, 2)}
          </pre>
        ) : (
          <div className="h-full space-y-2 overflow-auto bg-[#FDFCF8] p-6">
            {Object.entries(headers).map(([key, value]) => (
              <div
                key={key}
                className="flex rounded border-b border-[#E8E6E1] p-2 pb-2 transition-colors last:border-0 hover:bg-[#F5F3F0]"
              >
                <span className="w-1/3 truncate text-xs font-medium text-[#1a1a1a]">
                  {key}
                </span>
                <span className="flex-1 font-mono text-xs break-all text-[#6b6b6b]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;
