/* Bibliotecas */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Paginas */
import Landing from "./pages/Landing.jsx";
import Computers from "./pages/Computadoras.jsx";
import Details from "./pages/Details.jsx";
import Inventario from "./pages/Inventario.jsx";
import NewArticle from "./pages/NewArticle.jsx";
import NewMaintenance from "./pages/NewMaintenance.jsx";
import NewHardware from "./pages/NewHardware.jsx";
import EditArticle from "./pages/EditArticle.jsx";
import EditHardware from "./pages/EditHardware.jsx";

/*  Otros */
import Navbar from "./components/NavBar.jsx";

function App({ children }) {
  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-16 pb-16 md:pb-0">
          {children ? (
            children
          ) : (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/articles" element={<Inventario />} />
              <Route path="/computers" element={<Computers />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/article/edit/:id" element={<EditArticle />} />
              <Route path="/hardware/edit/:id" element={<EditHardware />} />
              <Route path="/hardware/new/:id" element={<NewHardware />} />
              <Route path="/article/new" element={<NewArticle />} />
              <Route path="/maintenance/new" element={<NewMaintenance />} />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
