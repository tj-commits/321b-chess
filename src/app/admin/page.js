"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Import the preview component but tell Next.js NOT to pre-render it on the server
const PgnPreview = dynamic(() => import('@/components/PgnPreview'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-3xl" />
});

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
    setContent(""); // Clear previous content to force component remount
    const res = await fetch(file.download_url);
    const text = await res.text();
    setContent(text);
  };

  if (loading) return <div className="p-10 text-center font-black">LOADING LAB...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            321B <span className="text-red-600">Review Station</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: SUBMISSION LIST */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm h-[85vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50 border-b font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              Inbox ({files.length})
            </div>
            <div className="overflow-y-auto flex-1">
              {files.map((file) => (
                <button
                  key={file.sha}
                  onClick={() => viewFile(file)}
                  className={`w-full text-left p-5 border-b border-gray-50 transition-all ${
                    selectedFile === file.name ? "bg-red-50 border-r-4 border-r-red-600" : "hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-bold text-gray-900 truncate">{file.name.replace('.txt', '')}</p>
                </button>
              ))}
            </div>
          </div>

          {/* CENTER: THE PRO VIEWER */}
          <div className="lg:col-span-6 space-y-4">
            {content ? (
              <PgnPreview pgn={content} id="board-container" key={selectedFile} />
            ) : (
              <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 text-gray-400 font-bold uppercase tracking-widest italic">
                Select a game to scrub moves
              </div>
            )}
          </div>

          {/* RIGHT: EDITOR NOTES & CREDIT */}
          <div className="lg:col-span-3 space-y-4">
             <div className="bg-black text-white p-6 rounded-3xl shadow-xl h-[85vh] flex flex-col border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Credit Info</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(content)}
                    className="bg-white text-black text-[10px] px-3 py-1 rounded-full font-black hover:bg-red-600 hover:text-white transition-all"
                  >
                    COPY RAW
                  </button>
                </div>
                
                {/* The "Credit:" line we added in the submit page */}
                <div className="text-red-500 font-bold text-sm mb-4 border-b border-white/10 pb-4">
                   {content.split('\n\n')[0] || "No credit found"}
                </div>

                <div className="flex-1 overflow-y-auto text-[10px] font-mono text-gray-400 leading-relaxed">
                  <p className="uppercase mb-2 text-gray-600 font-bold italic">Full Headers:</p>
                  {content.split('\n\n').slice(1).join('\n\n')}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}