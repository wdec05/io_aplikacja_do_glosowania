// src/pages/AddProjects.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddProjects() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contestName, setContestName] = useState('');
  const [projects, setProjects] = useState([]); // Przechowuje dodane projekty (pobrane z API)
  const [currentProject, setCurrentProject] = useState({ title: '', description: '', imageFile: null, imagePreviewUrl: '' });
  const [isLoadingContest, setIsLoadingContest] = useState(true);
  const [contestError, setContestError] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [addProjectError, setAddProjectError] = useState(null);

  const API_COMPETITION_URL = `https://io-aplikacja-do-glosowania-1.onrender.com/api/competition/${contestId}`;
  const API_PROJECT_URL = `https://io-aplikacja-do-glosowania-1.onrender.com/api/project`;
  const API_PROJECTS_FOR_CONTEST_URL = `https://io-aplikacja-do-glosowania-1.onrender.com/api/project/competition/${contestId}`;


  // Funkcja pomocnicza do konwersji File/Blob na ArrayBuffer, a potem na Array<number>
  const fileToArrayOfNumbers = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Ładowanie nazwy konkursu i już dodanych projektów
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingContest(true);
      setContestError(null);
      try {
        // Fetch competition details
        const competitionResponse = await fetch(API_COMPETITION_URL);
        if (!competitionResponse.ok) {
          throw new Error(`Failed to fetch contest! Status: ${competitionResponse.status}`);
        }
        const competitionData = await competitionResponse.json();
        setContestName(competitionData.name);

        // Fetch existing projects for this competition
        const projectsResponse = await fetch(API_PROJECTS_FOR_CONTEST_URL);
        if (!projectsResponse.ok) {
          throw new Error(`Failed to fetch projects! Status: ${projectsResponse.status}`);
        }
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

      } catch (e) {
        console.error("Error fetching contest or projects:", e);
        setContestError(e.message);
      } finally {
        setIsLoadingContest(false);
      }
    };

    fetchData();
  }, [contestId, API_COMPETITION_URL, API_PROJECTS_FOR_CONTEST_URL]);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProject(prev => ({ ...prev, imageFile: file }));
      // Utwórz URL podglądu
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentProject(prev => ({ ...prev, imagePreviewUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentProject(prev => ({ ...prev, imageFile: null, imagePreviewUrl: '' }));
    }
  };


  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddProjectError(null);
    if (!currentProject.title || !currentProject.description || !currentProject.imageFile) {
      alert('Wypełnij wszystkie pola projektu i dodaj obrazek!');
      return;
    }

    setIsAddingProject(true);

    try {
      const imageByteArray = await fileToArrayOfNumbers(currentProject.imageFile);

      const projectData = {
        competitionId: parseInt(contestId), // Upewnij się, że to jest liczba
        title: currentProject.title,
        description: currentProject.description,
        image: imageByteArray,
        votes: 0 // Inicjalizujemy głosy na 0
      };

      const response = await fetch(API_PROJECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Próbujemy pobrać tekst błędu
        throw new Error(`Failed to add project! Status: ${response.status}, Details: ${errorText}`);
      }

      const newProject = await response.json();
      setProjects(prev => [...prev, newProject]); // Dodaj nowy projekt do listy
      setCurrentProject({ title: '', description: '', imageFile: null, imagePreviewUrl: '' }); // Reset formularza
      alert('Projekt został pomyślnie dodany!');

    } catch (e) {
      console.error('Error adding project:', e);
      setAddProjectError(e.message);
      alert(`Wystąpił błąd podczas dodawania projektu: ${e.message}`);
    } finally {
      setIsAddingProject(false);
    }
  };

  const handleFinishAndGoHome = () => {
    navigate('/');
  };


  if (isLoadingContest) {
    return <div className="min-h-screen bg-gray-100 p-8 text-black flex items-center justify-center">Ładowanie danych konkursu...</div>;
  }

  if (contestError) {
    return <div className="min-h-screen bg-gray-100 p-8 text-red-500 flex items-center justify-center">Błąd ładowania konkursu: {contestError}</div>;
  }

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
              <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa Projektu
              </label>
              <input
                type="text"
                id="projectTitle"
                name="title" // Zmieniono z 'name' na 'title'
                value={currentProject.title}
                onChange={handleProjectChange}
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Np. Zielone dachy w centrum"
                required
                disabled={isAddingProject}
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
                disabled={isAddingProject}
              ></textarea>
            </div>
            <div>
              <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700 mb-1">
                Obrazek Projektu (PNG, JPG)
              </label>
              <input
                type="file"
                id="projectImage"
                name="imageFile"
                accept="image/png, image/jpeg"
                onChange={handleImageFileChange}
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
                disabled={isAddingProject}
              />
              {currentProject.imagePreviewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Podgląd obrazka:</p>
                  <img src={currentProject.imagePreviewUrl} alt="Podgląd" className="max-w-full h-48 object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>
            {addProjectError && <p className="text-red-500 text-sm mt-2">{addProjectError}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              disabled={isAddingProject}
            >
              {isAddingProject ? 'Dodawanie projektu...' : 'Dodaj Projekt'}
            </button>
          </form>
        </div>

        {/* Lista dodanych projektów (pobranych z API) */}
        {projects.length > 0 && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Aktualnie dodane projekty ({projects.length})</h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="border border-gray-200 p-4 rounded-lg flex items-center space-x-4">
                  {/* Zakładam, że API zwraca obrazek w base64, tak jak na stronie Contest */}
                  {p.image && (
                    <img src={`data:image/jpeg;base64,${p.image}`} alt={p.title} className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleFinishAndGoHome}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
            >
              Zakończ dodawanie i wróć na stronę główną
            </button>
          </div>
        )}
        {projects.length === 0 && !isLoadingContest && (
            <div className="text-center text-gray-600 p-4">
                Brak dodanych projektów dla tego konkursu. Dodaj pierwszy projekt powyżej!
            </div>
        )}
      </div>
    </div>
  );
}
