import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMonitor, FiSearch, FiChevronRight, FiPlus } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";
import QRModal from "../components/QRModal.jsx";
import { getArticulosRequest } from "../api/articles.js";

function ComputersPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrModal, setQrModal] = useState({
    show: false,
    computerId: "",
    computerName: "",
  });

  useEffect(() => {
    setTimeout(async () => {
      const res = await getArticulosRequest();
      const allArticles = res.data;
      const computersOnly = allArticles.filter((article) =>
        ["CPU", "Laptop"].includes(article.articulo)
      );
      setArticles(computersOnly);
      setLoading(false);
    }, 500);
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.num_inventario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateQR = (e, article) => {
    e.stopPropagation();
    setQrModal({
      show: true,
      computerId: article.id,
      computerName: `${article.marca} ${article.modelo} (${article.num_inventario})`,
    });
  };

  const closeQrModal = () => {
    setQrModal({
      show: false,
      computerId: "",
      computerName: "",
    });
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 mt-4">
          <h1 className="text-xl font-bold">Todas las Computadoras</h1>
          <button
            onClick={() => navigate("/article/new")} // Ajustado a la nueva ruta
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiPlus />
            <span className="hidden sm:inline">Nueva Computadora</span>
            <span className="sm:hidden">Nueva</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por número de inventario, marca o modelo"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-500">
              Cargando computadoras...
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No se encontraron computadoras
              </div>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/details/${article.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiMonitor className="text-blue-500 text-xl" />
                      <div>
                        <h3 className="font-medium">
                          {article.marca} {article.modelo} (
                          {article.num_inventario})
                        </h3>
                        <p className="text-sm text-gray-500">
                          {article.articulo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleGenerateQR(e, article)}
                        className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        <FaQrcode className="text-gray-500" />
                        <span className="text-xs">Generar QR</span>
                      </button>
                      <FiChevronRight className="text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Fecha de registro:{" "}
                    {new Date(article.fecha_registro).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal para mostrar el código QR */}
      {qrModal.show && (
        <QRModal
          computerId={qrModal.computerId}
          computerName={qrModal.computerName}
          onClose={closeQrModal}
        />
      )}
    </main>
  );
}

export default ComputersPage;
