import { useState } from 'react';

export default function EmailPopup({ onSubmit, isSubmitting }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony po wysłaniu formularza
    if (email) {
      onSubmit(email);
    } else {
      alert("Proszę wpisać adres e-mail.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      {/* Okno pop-upu */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Witaj w systemie do głosowania!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Aby kontynuować, podaj swój adres e-mail. Jest on niezbędny do wzięcia udziału w głosowaniu.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email-popup" className="block text-sm font-medium text-gray-700">
              Adres e-mail
            </label>
            <input
              type="email"
              id="email-popup"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan.kowalski@example.com"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Blokuje przycisk podczas wysyłania
            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-500"
          >
            {isSubmitting ? 'Zapisywanie...' : 'Zatwierdź'}
          </button>
        </form>
      </div>
    </div>
  );
}