import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Clients from './pages/Clients'; // <-- Imported!

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/clients" element={<Clients />} /> {/* <-- Added route! */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;