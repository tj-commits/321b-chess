"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => {
        setFiles(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const viewFile = async (file) => {
    setSelectedFile(file.name);
    setContent("Loading content...");
    try {
      const res = await fetch(file.download_url);
      const text = await res.text();
      setContent(text);
    } catch (err) {
      setContent("Error loading file.");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Submissions...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
          Editor Dashboard <span className="text-red-600">/ Submissions</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* File List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[70vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 bg-gray-50 sticky top-0">
              <p className="text-xs font-bold text-gray-400 uppercase">Recent Uploads ({files.length})</p>
            </div>
            {files.map((file) => (
              <button
                key={file.sha}
                onClick={() => viewFile(file)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-red-50 transition-colors ${
                  selectedFile === file.name ? "bg-red-100 border-red-200" : ""
                }`}
              >
                <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                <p className="text-[10px] text-gray-400 uppercase">Click to preview</p>
              </button>
            ))}
          </div>

          {/* Content Viewer */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-[70vh]">
            {selectedFile ? (
              <>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-900 text-white rounded-t-2xl">
                  <h3 className="font-mono text-sm">{selectedFile}</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText(content)}
                    className="text-xs bg-red-600 px-3 py-1 rounded-full font-bold hover:bg-red-700"
                  >
                    Copy PGN
                  </button>
                </div>
                <textarea
                  readOnly
                  value={content}
                  className="flex-1 p-6 font-mono text-sm text-gray-800 bg-white outline-none resize-none"
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                Select a game from the list to view the PGN
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}