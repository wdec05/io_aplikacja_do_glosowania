// src/pages/CreateContest.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateContest() {
  const [contestName, setContestName] = useState('');
  const [contestDescription, setContestDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contestName || !contestDescription) {
      alert('Wypełnij wszystkie pola!');
      return;
    }
    // Tutaj normalnie wysłałbyś dane do API
    console.log('Nowy konkurs:', { contestName, contestDescription });

    // Po utworzeniu konkursu (lub otrzymaniu jego ID z API),
    // przekierowujemy na stronę dodawania projektów
    // Na razie użyjemy tymczasowego ID, np. 999
    const newContestId = 999;
    alert(`Konkurs "${contestName}" został utworzony. Przejdź do dodawania projektów.`);
    navigate(`/admin/add-projects/${newContestId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Utwórz Nowy Konkurs</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contestName" className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa Konkursu
            </label>
            <input
              type="text"
              id="contestName"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Np. Budżet obywatelski Kraków 2025"
              required
            />
          </div>
          <div>
            <label htmlFor="contestDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Opis Konkursu
            </label>
            <textarea
              id="contestDescription"
              value={contestDescription}
              onChange={(e) => setContestDescription(e.target.value)}
              rows="4"
              className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Szczegółowy opis konkursu..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Utwórz Konkurs i Dodaj Projekty
          </button>
        </form>
      </div>
    </div>
  );
}
