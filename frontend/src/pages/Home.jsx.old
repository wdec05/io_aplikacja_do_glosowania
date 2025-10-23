import { useState, useEffect } from "react";

export default function Home() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    setContests([
      {
        id: 1,
        name: "Budżet obywatelski Kraków 2025",
        description: "Głosowanie na miejskie inicjatywy zgłoszone przez mieszkańców.",
      },
      {
        id: 2,
        name: "Zielone Inicjatywy 2025",
        description: "Projekty ekologiczne wspierające zrównoważony rozwój miasta.",
      },
      {
        id: 3,
        name: "Nowe Technologie dla Miast",
        description: "Innowacyjne pomysły poprawiające jakość życia mieszkańców.",
      },
      {
        id: 4,
        name: "Konkurs Młodych Talentów",
        description: "Wybierz najlepszy projekt artystyczny wśród młodych twórców.",
      },
      {
        id: 5,
        name: "Sport i Aktywność",
        description: "Projekty promujące zdrowy styl życia i aktywność fizyczną.",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center">
      {/* Nagłówek */}
      <div className="border-2 border-black rounded-xl px-8 py-4 mb-10">
        <h1 className="text-3xl font-bold text-center">Konkursy</h1>
      </div>

      {/* Lista konkursów */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{contest.name}</h2>
            <p className="text-gray-700 mb-4">{contest.description}</p>
            <a
              href={`/contest/${contest.id}`}
              className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Zobacz projekty
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
