// src/pages/CreateContest.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateContest() {
  const [contestName, setContestName] = useState('');
  const [loading, setLoading] = useState(false); // Stan do obsługi ładowania
  const [error, setError] = useState(null); // Stan do obsługi błędów
  const navigate = useNavigate();

  const API_COMPETITION_URL = 'https://io-aplikacja-do-glosowania-1.onrender.com/api/competition';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetuj błędy
    if (!contestName) {
      alert('Wypełnij nazwę konkursu!');
      return;
    }

    setLoading(true); // Ustaw stan ładowania na true

    try {
      const response = await fetch(API_COMPETITION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "name" : contestName }), // Wysyłamy tylko 'name'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const newContest = await response.json();
      const newContestId = newContest.id; // Zakładamy, że API zwraca obiekt z ID nowo utworzonego konkursu

      alert(`Konkurs "${contestName}" został utworzony (ID: ${newContestId}). Przejdź do dodawania projektów.`);
      navigate(`/admin/add-projects/${newContestId}`);
    } catch (e) {
      console.error('Błąd podczas tworzenia konkursu:', e);
      setError(e.message);
      alert(`Wystąpił błąd: ${e.message}`);
    } finally {
      setLoading(false); // Zawsze ustawiaj stan ładowania na false po zakończeniu
    }
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
              disabled={loading} /* Wyłącz pole, gdy trwa ładowanie */
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Wyświetl błąd, jeśli wystąpi */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading} // Wyłącz przycisk, gdy trwa ładowanie
          >
            {loading ? 'Tworzenie konkursu...' : 'Utwórz Konkurs i Dodaj Projekty'}
          </button>
        </form>
      </div>
    </div>
  );
}
