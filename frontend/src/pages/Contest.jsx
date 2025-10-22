import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Contest() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [projects, setProjects] = useState([]);

  // przykładowe dane – później podmienisz na API
  useEffect(() => {
    const contests = {
      1: {
        name: "Budżet obywatelski Kraków 2025",
        projects: [
          { id: 101, name: "Więcej zieleni w Nowej Hucie", votes: 123 },
          { id: 102, name: "Remont chodników na Kazimierzu", votes: 87 },
          { id: 103, name: "Nowy skatepark na Prądniku", votes: 56 },
        ],
      },
      2: {
        name: "Zielone Inicjatywy 2025",
        projects: [
          { id: 201, name: "Park kieszonkowy w centrum", votes: 42 },
          { id: 202, name: "Pszczoły miejskie – ule na dachach", votes: 65 },
        ],
      },
    };
    const c = contests[id];
    setContest(c);
    setProjects(c?.projects || []);
  }, [id]);

  const handleVote = (projectId) => {
    // tu później będzie wywołanie API (np. vote(projectId, email))
    alert(`Oddano głos na projekt ID: ${projectId}`);
  };

  if (!contest) return <p className="p-6 text-center text-black">Ładowanie...</p>; // Dodaj text-black również tutaj

  return (
    // Główny kontener - dodaj text-black
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      {/* Nagłówek - dodaj text-black dla pewności */}
      <h1 className="text-3xl font-bold mb-6 text-center text-black">{contest.name}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            {/* Tekst liczby głosów - zmień z text-gray-600 na text-black */}
            <p className="text-black mb-4">Oddane głosy: {p.votes}</p>
            <button
              onClick={() => handleVote(p.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Głosuj
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
