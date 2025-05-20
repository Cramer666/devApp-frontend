import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PersonaForm } from "./components/personas/personaFormulario";
import { PersonaList } from "./components/personas/personaLista";
import { PersonaView } from "./components/personas/personaView";
import { AutoList } from "./components/autos/autoLista";
import { AutoForm } from "./components/autos/autoFormulario";
import { AutoView } from "./components/autos/autoView";

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
      
      <Route path="/personas" element={<PersonaList />} />
      <Route path="/personas/crear" element={<PersonaForm />} />
      <Route path="/personas/editar/:id" element={<PersonaForm isEditing />} />
      <Route path="/personas/:id" element={<PersonaView />} />
      <Route path="/autos" element={<AutoList />} />
      <Route path="/autos/crear" element={<AutoForm />} />
      <Route path="/autos/editar/:id" element={<AutoForm isEditing />} />
      <Route path="/autos/:id" element={<AutoView />} />
    
      </Routes>
    </Router>
  );
}

export default App;