// src/pages/Home.jsx
import { useState, useEffect } from "react";
import EmailPopup from "./EmailPopup";

export default function Home() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Upewnij się, że ten URL jest poprawny dla Twojego uruchomionego backendu!
  // Np. 'http://localhost:8080/api/competicion' jeśli backend jest lokalnie
  // lub 'http://3.69.167.48:8080/api/competicion' jeśli jest na serwerze
  const API_CONTESTS_URL ='https://io-aplikacja-do-glosowania-1.onrender.com/api/competition'; 
  const API_EMAIL_URL ='https://io-aplikacja-do-glosowania-1.onrender.com/api/user'; 

  useEffect(() => {

    const savedEmail = sessionStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      fetchContests();
    } else {
      setShowPopup(true);
    }
  }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_CONTESTS_URL);
      if (!response.ok) {
        // Jeśli odpowiedź HTTP nie jest OK (np. 404, 500)
        throw new Error(`Błąd HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setContests(data); // Ustawiamy pobrane dane jako listę konkursów
    } catch (e) {
      console.error("Wystąpił błąd podczas pobierania konkursów:", e);
      setError(e); // Zapisujemy błąd w stanie
    } finally {
      setLoading(false); // Niezależnie od sukcesu/porażki, kończymy ładowanie
    }
  };

  // Funkcja wywoływana po zatwierdzeniu e-maila w pop-upie
  const handleEmailSubmit = async (email) => {
    setIsSubmitting(true);
    try {
      // Wysyłamy e-mail na backend, aby "zapisać" użytkownika na potrzeby głosowania
      const response = await fetch(`${API_EMAIL_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Błąd HTTP! Status: ${response.status}`);
      }

      // Jeśli backend pomyślnie zapisał e-mail:
      sessionStorage.setItem('userEmail', email); // Zapisujemy go w sesji przeglądarki
      setUserEmail(email); 
      setShowPopup(false); 
      fetchContests();
      
    } catch (e) {
      console.error("Błąd podczas zapisywania użytkownika:", e);
      alert(`Wystąpił błąd: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (showPopup) {
    return <EmailPopup onSubmit={handleEmailSubmit} isSubmitting={isSubmitting} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold">Ładowanie konkursów...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">
          Błąd podczas ładowania konkursów: {error.message}
          <p className="text-lg text-gray-700 mt-2">Sprawdź, czy Twój backend jest uruchomiony na adresie: {API_CONTESTS_URL}</p>
        </div>
      </div>
    );
  }
  
  // Jeśli nie ma konkursów, ale nie ma też błędu i już załadowano
  if (contests.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center">
        <div className="border-2 border-black rounded-xl px-8 py-4 mb-10">
          <h1 className="text-3xl font-bold text-center">Konkursy</h1>
        </div>
        <p className="text-xl text-gray-700">Brak dostępnych konkursów.</p>
      </div>
    );
  }

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
            <h2 className="text-xl font-semibold mb-2">{contest.id}: {contest.name}</h2>
            {/* Upewnij się, że obiekt contest ma pole 'description' */}
            <p className="text-gray-700 mb-4">{contest.email}</p> 
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
