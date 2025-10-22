// src/pages/AddProjects.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddProjects() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contestName, setContestName] = useState('');
  const [projects, setProjects] = useState([]); // Przechowuje dodane projekty
  const [currentProject, setCurrentProject] = useState({ name: '', description: '', imageUrl: '' });

  // Symulacja ładowania nazwy konkursu (zastąp API)
  useEffect(() => {
    // W prawdziwej aplikacji pobrałbyś nazwę konkursu po contestId z API
    const dummyContests = {
      1: "Budżet obywatelski Kraków 2025",
      2: "Zielone Inicjatywy 2025",
      3: "Nowe Technologie dla Miast",
      4: "Konkurs Młodych Talentów",
      5: "Sport i Aktywność",
      999: "Nowy Konkurs (ID 999)", // Dla testów po przekierowaniu
    };
    setContestName(dummyContests[contestId] || `Konkurs ID: ${contestId}`);
  }, [contestId]);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!currentProject.name || !currentProject.description || !currentProject.imageUrl) {
      alert('Wypełnij wszystkie pola projektu!');
      return;
    }
    setProjects(prev => [...prev, { ...currentProject, id: Date.now() }]); // Tymczasowe ID
    setCurrentProject({ name: '', description: '', imageUrl: '' }); // Reset formularza
  };

  const handlePublishAll = () => {
    if (projects.length === 0) {
      alert('Dodaj co najmniej jeden projekt przed opublikowaniem!');
      return;
    }
    // Tutaj normalnie wysłałbyś wszystkie projects do API dla danego contestId
    console.log(`Publikuję projekty dla konkursu ${contestId}:`, projects);
    alert(`Opublikowano ${projects.length} projektów dla konkursu "${contestName}".`);
    navigate('/'); // Przekieruj na stronę główną po publikacji
  };

  const handleImagePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setCurrentProject(prev => ({ ...prev, imageUrl: event.target.result }));
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    }
    // Jeśli to nie obrazek, ale np. URL, wklej jako tekst
    const pastedText = e.clipboardData.getData('text/plain');
    if (pastedText.startsWith('http')) {
        setCurrentProject(prev => ({ ...prev, imageUrl: pastedText }));
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Dodaj Projekty do Konkursu:</h1>
        <p className="text-2xl font-semibold mb-8 text-center text-blue-700">{contestName}</p>

        {/* Formularz dodawania pojedynczego projektu */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Dodaj Nowy Projekt</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa Projektu
              </label>
              <input
                type="text"
                id="projectName"
                name="name"
                value={currentProject.name}
                onChange={handleProjectChange}
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Np. Zielone dachy w centrum"
                required
              />
            </div>
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Opis Projektu
              </label>
              <textarea
                id="projectDescription"
                name="description"
                value={currentProject.description}
                onChange={handleProjectChange}
                rows="3"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Szczegółowy opis projektu..."
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Adres URL obrazka lub wklej (Ctrl+V) obrazek/link
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={currentProject.imageUrl}
                onChange={handleProjectChange}
                onPaste={handleImagePaste}
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg lub wklej tutaj"
                required
              />
              {currentProject.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Podgląd obrazka:</p>
                  <img src={currentProject.imageUrl} alt="Podgląd" className="max-w-full h-48 object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Dodaj Projekt do Listy
            </button>
          </form>
        </div>

        {/* Lista dodanych projektów */}
        {projects.length > 0 && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Projekty do opublikowania ({projects.length})</h2>
            <div className="space-y-4">
              {projects.map((p, index) => (
                <div key={p.id} className="border border-gray-200 p-4 rounded-lg flex items-center space-x-4">
                  <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handlePublishAll}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
            >
              Opublikuj Wszystkie Projekty
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
