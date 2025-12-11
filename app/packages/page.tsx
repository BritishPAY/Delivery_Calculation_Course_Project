'use client';

import { useEffect, useState } from 'react';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/packages')
      .then(r => r.json())
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Delivery history</h1>
        {packages.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No parcels yet</p>
        ) : (
          <div className="space-y-6">
            {packages.map(p => (
              <div key={p.trackingNumber} className="bg-white p-6 rounded-lg shadow">
                <p className="text-2xl font-mono text-blue-600">{p.trackingNumber}</p>
                <p>{p.senderFirstName} {p.senderLastName} → {p.receiverFirstName} {p.receiverLastName}</p>
                <p>{p.originCity} → {p.destinationCity}, {p.weight} kg, {p.cost} ₸</p>
                <p>Status: {p.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}