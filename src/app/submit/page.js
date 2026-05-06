"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmitGame() {
  const [formData, setFormData] = useState({ username: "", platform: "Chess.com", pgn: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // We combine the username and PGN so you have the credit info inside the file
    const submissionContent = `Credit: ${formData.username} (${formData.platform})\n\n${formData.pgn}`;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pgn: submissionContent }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Submission received! Keep an eye on the channel. 🎬" });
        setFormData({ ...formData, pgn: "" });
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus({ type: "error", message: "Upload failed. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Submit Your Best Games ♟️
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I’m looking for games to feature in my next chess edits. 
            If your game is chosen by me, you'll be featured and credited on 
            <Link href="https://youtube.com/@321bproductions" target="_blank" className="text-red-600 font-semibold hover:underline ml-1">
              321B Productions
            </Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Instructions Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                Find your PGN
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Go to your game archive on Chess.com or Lichess. Look for the <strong>Download</strong> or <strong>Share</strong> icon and copy the "PGN" text.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                Get Featured
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                I mainly look for brilliant sacrifices, but this is not a requirement! Send me whatever games you want!
              </p>
            </div>

            <Link 
              href="https://youtube.com/@321bproductions" 
              target="_blank"
              className="block bg-gray-900 text-white p-6 rounded-2xl hover:bg-black transition-colors"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Visit the channel</p>
              <h4 className="text-xl font-bold">321B Productions →</h4>
            </Link>
          </div>

          {/* Submission Form */}
          {/* Submission Form */}
<div className="lg:col-span-3">
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-5">
    <div className="grid grid-cols-2 gap-4">
      <div>
        {/* Changed text-gray-500 to text-gray-900 (Much Darker) */}
        <label className="block text-xs font-bold text-gray-700 uppercase mb-2 text-left tracking-wide">Username</label>
        <input
          required
          type="text"
          placeholder="e.g. MagnusCarlsen"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          /* Added text-gray-900 to ensure typed text is black */
          className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder:text-gray-400"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-900 uppercase mb-2 text-left tracking-wide">Platform</label>
        <select 
          value={formData.platform}
          onChange={(e) => setFormData({...formData, platform: e.target.value})}
          /* Added text-gray-900 */
          className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
        >
          <option>Chess.com</option>
          <option>Lichess</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-900 uppercase mb-2 text-left tracking-wide">Paste PGN</label>
      <textarea
        required
        rows={10}
        value={formData.pgn}
        onChange={(e) => setFormData({...formData, pgn: e.target.value})}
        placeholder="[Event 'Live Chess']..."
        /* Added text-gray-900 and a subtle border for visibility */
        className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-mono text-xs placeholder:text-gray-400"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-4 rounded-2xl font-black text-lg transition-all transform active:scale-95 ${
        loading ? "bg-gray-300 text-gray-500" : "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg"
      }`}
    >
      {loading ? "SENDING TO EDITING..." : "SUBMIT FOR EDIT"}
    </button>

    {status.message && (
      <div className={`p-4 rounded-xl text-center font-bold ${
        status.type === "success" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
      }`}>
        {status.message}
      </div>
    )}
  </form>
</div>

        </div>
      </div>
    </div>
  );
}