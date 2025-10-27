import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Contest() {
  const { id } = useParams(); // 'id' from the URL parameter (e.g., /contest/1)
  const [contest, setContest] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_PROJECTS_URL = `https://io-aplikacja-do-glosowania-1.onrender.com/api/project/competition/${id}`;
  const API_COMPETITION_URL = `https://io-aplikacja-do-glosowania-1.onrender.com/api/competition/${id}`;

  useEffect(() => {
    const fetchContestAndProjects = async () => {
      try {
        // Fetch competition details
        const competitionResponse = await fetch(API_COMPETITION_URL);
        if (!competitionResponse.ok) {
          throw new Error(`HTTP error! Status: ${competitionResponse.status}`);
        }
        const competitionData = await competitionResponse.json();
        setContest(competitionData);

        // Fetch projects for the competition
        const projectsResponse = await fetch(API_PROJECTS_URL);
        if (!projectsResponse.ok) {
          throw new Error(`HTTP error! Status: ${projectsResponse.status}`);
        }
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (e) {
        console.error("Error fetching contest or projects:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchContestAndProjects();
  }, [id, API_PROJECTS_URL, API_COMPETITION_URL]);

  const handleVote = (projectId) => {
    // This will be replaced with actual API call to register a vote
    alert(`Oddano głos na projekt ID: ${projectId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center justify-center">
        Loading contest details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-red-500 py-12 px-4 flex flex-col items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 flex flex-col items-center justify-center">
        Contest not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{contest.name}</h1>

        {/* Display project images if available (assuming each project has its own base64 image) */}
        {projects.length === 0 ? (
          <p className="text-center text-lg">Brak projektów dla tego konkursu.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>{" "}
                  {/* Use project.title */}
                  <p className="text-gray-700 mb-4">{project.description}</p>
                </div>
                {/* Obrazek przeniesiony tutaj, aby był na końcu przed sekcją z głosami i przyciskiem */}
                {project.image && (
                  <div className="mb-4 mt-auto flex justify-center"> {/* Dodano mt-auto dla przyklejenia do dołu */}
                    <img
                      src={`data:image/jpeg;base64,${project.image}`} // Assuming it's JPEG. Adjust if it's PNG etc.
                      alt={`Obraz dla projektu ${project.title}`}
                      className="rounded-lg shadow-sm max-h-48 object-cover w-full"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  {/* Zakładam, że głosy (votes) są częścią obiektu projektu, ale nie było ich w przykładzie JSON.
                      Jeśli ich nie ma, to pole 'votes' trzeba będzie dodać do obiektu projektu na backendzie,
                      albo pobierać je z innego endpointu. */}
                  <span className="text-xl font-bold text-blue-600">
                    {project.votes || 0} głosów
                  </span>
                  <button
                    onClick={() => handleVote(project.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Oddaj Głos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
