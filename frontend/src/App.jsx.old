import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contest from "./pages/Contest.jsx";
import CreateContest from "./pages/CreateContest.jsx";
import AddProjects from "./pages/AddProjects.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest/:id" element={<Contest />} />
        <Route path="/admin/create-contest" element={<CreateContest />} />
        <Route path="/admin/add-projects/:contestId" element={<AddProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
