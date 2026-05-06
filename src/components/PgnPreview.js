"use client";
import { useEffect } from "react";
// Import the library and its CSS
import { pgnView } from "@mliebelt/pgn-viewer";

export default function PgnPreview({ pgn, id }) {
  useEffect(() => {
    if (!pgn) return;

    // We strip your "Credit:" header so the parser doesn't get confused
    const pgnOnly = pgn.split('\n\n').slice(1).join('\n\n');

    // Initialize the viewer
    pgnView(id, {
      pgn: pgnOnly || pgn,
      mode: "view",
      showNotation: true,
      layout: "left", // Puts moves on the right, board on the left
      pieceStyle: "merida",
      theme: "brown",
      timerTime: 500,
      width: "100%",
      boardSize: "400",
      scrollToMove: true,
    });
  }, [pgn, id]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-200">
      <div id={id} className="w-full"></div>
    </div>
  );
}