import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import DoctorList from "./pages/DoctorList";
import DoctorDetail from "./pages/DoctorDetail";
import Home from "./pages/Home";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
