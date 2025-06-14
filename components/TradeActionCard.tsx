"use client";
import { useState } from "react";

interface TradeActionCardProps {
  asset: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  targetPrice: number;
  stopLoss: number;
  analysis: string;
}

export default function TradeActionCard({ 
  asset, 
  action, 
  confidence, 
  targetPrice, 
  stopLoss, 
  analysis 
}: TradeActionCardProps) {
  const [executed, setExecuted] = useState(false);

  const handleExecute = () => {
    fetch("/api/trade/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asset, action, targetPrice, stopLoss })
    })
      .then((res) => res.json())
      .then((data) => {
        setExecuted(true);
        alert(`Action ${action} sur ${asset} exécutée avec succès.`);
      });
  };

  return (
    <div className="border p-4 rounded-xl shadow-xl bg-white">
      <h2 className="text-xl font-bold">{asset}</h2>
      <p>📈 Action: {action}</p>
      <p>🎯 Confiance: {confidence}%</p>
      <p>💰 Prix cible: {targetPrice}</p>
      <p>⛔ Stop-loss: {stopLoss}</p>
      <p>🧠 Analyse: {analysis}</p>

      <button
        onClick={handleExecute}
        disabled={executed}
        className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        {executed ? "Déjà exécuté" : "Exécuter"}
      </button>
    </div>
  );
} 