import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiPackage,
  FiCalendar,
  FiTag,
  FiHash,
  FiInfo,
  FiTool,
  FiPlus,
  FiCpu,
  FiMonitor,
  FiWifi,
  FiHardDrive,
  FiSettings,
  FiShield,
} from "react-icons/fi";
import { deleteArticuloRequest, getArticuloRequest } from "../api/articles"; // Importar funciones de articles
import { getMantenimientosRequest } from "../api/maintenance"; // Importar función de mantenimientos
import { getDetallesByIdRequest } from "../api/details"; // Importar función de detalles

function DetalleInventarioPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // "info", "hardware" o "mantenimientos"
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener datos del artículo
        const articuloResponse = await getArticuloRequest(id);
        const articulo = articuloResponse.data;

        // Obtener mantenimientos
        const mantenimientosResponse = await getMantenimientosRequest(id);
        const mantenimientos = mantenimientosResponse.data;

        // Obtener detalles de hardware
        const detallesResponse = await getDetallesByIdRequest(id);
        const detalles = detallesResponse.data;

        // Combinar los datos en un solo objeto
        setItem({
          ...articulo,
          mantenimientos: mantenimientos || null,
          detalles_hardware: detalles || null,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudo cargar la información del artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  const handleDelete = async () => {
    try {
      await deleteArticuloRequest(id);
      navigate("/articles");
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("No se pudo eliminar el artículo.");
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="animate-pulse text-gray-500">
          Cargando información...
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-red-500">{error || "Artículo no encontrado"}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Detalle del Artículo</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{item[0].articulo}</h2>
                <p className="text-gray-500">
                  {item[0].marca} {item[0].modelo}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(
                  item[0].estado
                )}`}
              >
                {item[0].estado}
              </span>
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "info"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Información General
              </button>
              <button
                onClick={() => setActiveTab("hardware")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "hardware"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Detalles de Hardware
              </button>
              <button
                onClick={() => setActiveTab("mantenimientos")}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === "mantenimientos"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mantenimientos
              </button>
            </div>
          </div>

          {/* Contenido de la pestaña de Información General */}
          {activeTab === "info" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiHash className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Número de Inventario
                      </p>
                      <p className="font-medium">{item[0].num_inventario}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiTag className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Número de Serie</p>
                      <p className="font-medium">{item[0].num_serie}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiPackage className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Marca</p>
                      <p className="font-medium">{item[0].marca}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiInfo className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Modelo</p>
                      <p className="font-medium">{item[0].modelo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiTool className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Tipo de Uso</p>
                      <p className="font-medium capitalize">
                        {item[0].tipo_uso}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiCalendar className="text-blue-500 text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Registro</p>
                      <p className="font-medium">
                        {formatDate(item[0].fecha_registro)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña de Detalles de Hardware */}
          {activeTab === "hardware" && (
            <div className="p-6">
              {item.detalles_hardware.length !== 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FiCpu className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">CPU</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].cpu || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiMonitor className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Monitor</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].monitor || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Serie:{" "}
                            {item.detalles_hardware[0].monitor_serie || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiTool className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Mouse</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].mouse || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiTool className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Teclado</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].teclado || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiTool className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Cable de Corriente
                          </p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].cable_corriente || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FiSettings className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Sistema Operativo
                          </p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].sistema_operativo ||
                              "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiShield className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Antivirus</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].antivirus || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiWifi className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Internet</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].internet || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiHardDrive className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Red por Cable</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].red_por_cable || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiWifi className="text-blue-500 text-xl mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">WiFi</p>
                          <p className="font-medium">
                            {item.detalles_hardware[0].wifi || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.detalles_hardware[0].observaciones && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Observaciones
                      </h3>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                        {item.detalles_hardware[0].observaciones}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => navigate(`/hardware/edit/${item[0].id}`)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit className="w-4 h-4" />
                      <span>Editar detalles de hardware</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    No hay detalles de hardware registrados para este artículo
                  </p>
                  <button
                    onClick={() => navigate(`/hardware/new/${item[0].id}`)}
                    className="flex items-center gap-2 mx-auto text-blue-500 hover:text-blue-700"
                  >
                    <FiPlus className="w-4 h-4" />
                    <span>Añadir detalles de hardware</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Contenido de la pestaña de Mantenimientos */}
          {activeTab === "mantenimientos" && (
            <div className="p-6">
              {item.mantenimientos.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No hay registros de mantenimiento para este artículo
                </div>
              ) : (
                <div className="space-y-6">
                  {item.mantenimientos.map((mantenimiento) => (
                    <div
                      key={mantenimiento.id}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              mantenimiento.tipo === "preventivo"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {mantenimiento.tipo === "preventivo"
                              ? "Preventivo"
                              : "Correctivo"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(mantenimiento.fecha)}
                        </span>
                      </div>

                      <h3 className="font-medium mb-2">Descripción</h3>
                      <p className="text-gray-700 mb-4">
                        {mantenimiento.descripcion}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">
                            Componentes Revisados
                          </h4>
                          <p className="text-gray-700">
                            {mantenimiento.componentes_revisados}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">
                            Técnico Responsable
                          </h4>
                          <p className="text-gray-700">
                            {mantenimiento.tecnico_responsable}
                          </p>
                        </div>
                      </div>

                      {mantenimiento.observaciones && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">
                            Observaciones
                          </h4>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                            {mantenimiento.observaciones}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() =>
                    navigate(`/maintenance/new?computerId=${item[0].id}`)
                  }
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Registrar nuevo mantenimiento</span>
                </button>
              </div>
            </div>
          )}

          <div className="p-6 bg-gray-50 flex justify-between">
            <button
              onClick={() => navigate(`/article/edit/${item[0].id}`)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <FiEdit />
              <span>Editar</span>
            </button>

            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">
                  ¿Eliminar artículo?
                </span>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Sí
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                <FiTrash2 />
                <span>Eliminar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleInventarioPage;
