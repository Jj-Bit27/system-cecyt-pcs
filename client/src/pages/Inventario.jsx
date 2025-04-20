import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiChevronRight,
  FiPackage,
  FiInfo,
} from "react-icons/fi";
import { getArticulosRequest } from "../api/articles";
import { FaQrcode } from "react-icons/fa";
import QRModal from "../components/QrModal.jsx";

function InventarioPage() {
  const navigate = useNavigate();
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtros, setFiltros] = useState({
    estado: "",
    tipo_uso: "",
    articulo: "",
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [qrModal, setQrModal] = useState({
    show: false,
    computerId: "",
    computerName: "",
  });

  useEffect(() => {
    setTimeout(async () => {
      const res = await getArticulosRequest();
      const allArticles = res.data;
      setInventario(allArticles);
      setLoading(false);
    }, 500);
  }, []);

  // Obtener valores únicos para los filtros
  const articulos = [...new Set(inventario.map((item) => item.articulo))];

  // Filtrar inventario según búsqueda y filtros
  const inventarioFiltrado = inventario.filter((item) => {
    const matchSearch =
      item.num_inventario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.num_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.articulo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchEstado = filtros.estado ? item.estado === filtros.estado : true;
    const matchTipoUso = filtros.tipo_uso
      ? item.tipo_uso === filtros.tipo_uso
      : true;
    const matchArticulo = filtros.articulo
      ? item.articulo === filtros.articulo
      : true;

    return matchSearch && matchEstado && matchTipoUso && matchArticulo;
  });

  const resetFiltros = () => {
    setFiltros({
      estado: "",
      tipo_uso: "",
      articulo: "",
    });
  };

  // Función para manejar el clic en el botón Generar QR (placeholder)
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

  // Función para obtener el color según el estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "bueno":
        return "bg-green-100 text-green-800";
      case "malo":
        return "bg-red-100 text-red-800";
      case "para baja":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 mt-4">
          <h1 className="text-xl font-bold">Inventario de Artículos</h1>
          <button
            onClick={() => navigate("/article/new")}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiPlus />
            <span className="hidden sm:inline">Nuevo Artículo</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por número, marca, modelo..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FiFilter />
              <span>Filtros</span>
            </button>
          </div>

          {mostrarFiltros && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Estado
                  </label>
                  <select
                    value={filtros.estado}
                    onChange={(e) =>
                      setFiltros({ ...filtros, estado: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Todos</option>
                    <option value="bueno">Bueno</option>
                    <option value="malo">Malo</option>
                    <option value="para baja">Para baja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tipo de Uso
                  </label>
                  <select
                    value={filtros.tipo_uso}
                    onChange={(e) =>
                      setFiltros({ ...filtros, tipo_uso: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Todos</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="laboratorio">Laboratorio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Artículo
                  </label>
                  <select
                    value={filtros.articulo}
                    onChange={(e) =>
                      setFiltros({ ...filtros, articulo: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Todos</option>
                    {articulos.map((articulo, index) => (
                      <option key={index} value={articulo}>
                        {articulo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFiltros}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-gray-500">
                Cargando inventario...
              </div>
            </div>
          ) : (
            <>
              {/* Vista para pantallas medianas y grandes */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artículo
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Núm. Inventario
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marca / Modelo
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo de Uso
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QR
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventarioFiltrado.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-4 text-center text-gray-500"
                        >
                          No se encontraron artículos
                        </td>
                      </tr>
                    ) : (
                      inventarioFiltrado.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{item.articulo}</td>
                          <td className="px-4 py-3">{item.num_inventario}</td>
                          <td className="px-4 py-3">
                            <div>{item.marca}</div>
                            <div className="text-sm text-gray-500">
                              {item.modelo}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                                item.estado
                              )}`}
                            >
                              {item.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3 capitalize">
                            {item.tipo_uso}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => navigate(`/details/${item.id}`)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FiInfo className="w-5 h-5" />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={(e) => handleGenerateQR(e, item)}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors text-xs"
                            >
                              <FaQrcode className="text-gray-500" />
                              Generar QR
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Vista para dispositivos móviles */}
              <div className="md:hidden">
                {inventarioFiltrado.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No se encontraron artículos
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inventarioFiltrado.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FiPackage className="text-blue-500 text-xl" />
                            <div>
                              <h3 className="font-medium">{item.articulo}</h3>
                              <p className="text-sm text-gray-500">
                                {item.marca} {item.modelo}
                              </p>
                            </div>
                          </div>
                          <FiChevronRight
                            className="text-gray-400"
                            onClick={() => navigate(`/details/${item.id}`)}
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="text-xs text-gray-500">
                            {item.num_inventario}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                              item.estado
                            )}`}
                          >
                            {item.estado}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {item.tipo_uso}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={(e) => handleGenerateQR(e, item)}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            <FaQrcode className="text-gray-500" />
                            Generar QR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
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

export default InventarioPage;
