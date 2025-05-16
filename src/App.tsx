import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PersonasPage } from "./paginas/pagPersonas";
import { AutosPage } from "./paginas/AutosPage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/personas">Personas</Link>
          <Link className="nav-link" to="/autos">Autos</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div className="container mt-4"><h1>Bienvenido</h1></div>} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/autos" element={<AutosPage />} />
      </Routes>
    </Router>
  );
}

export default App;