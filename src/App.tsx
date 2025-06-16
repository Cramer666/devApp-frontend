import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { PersonaForm } from "./components/personas/personaFormulario";
import { PersonaList } from "./components/personas/personaLista";
import { PersonaView } from "./components/personas/personaView";
import { AutoList } from "./components/autos/autoLista";
import { AutoForm } from "./components/autos/autoFormulario";
import { AutoView } from "./components/autos/autoView";
import './App.css';

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg bg-dark bg-opacity-75 px-4">
          <div className="container-fluid">
            <Link className="navbar-brand text-white"  to="/">Inicio</Link>
            <div className="mx-auto d-flex gap-5">
              <Link className="navbar-brand text-white" to="/personas">Personas</Link>
              <Link className="navbar-brand text-white" to="/autos">Autos</Link>
            </div>
          </div>
        </nav>


      <div className="app-background">
          <Routes>
            <Route path="/" element={<Navigate to="/" replace />} />
            <Route path="/personas" element={<PersonaList />} />
            <Route path="/personas/crear" element={<PersonaForm />} />
            <Route path="/personas/editar/:id" element={<PersonaForm isEditing />} />
            <Route path="/personas/:id" element={<PersonaView />} />
            <Route path="/autos" element={<AutoList />} />
            <Route path="/autos/crear" element={<AutoForm />} />
            <Route path="/autos/editar/:id" element={<AutoForm isEditing />} />
            <Route path="/autos/:id" element={<AutoView />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
