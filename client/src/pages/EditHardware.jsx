import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { editDetalleRequest, getDetallesByIdRequest } from "../api/details";

function EditarHardwarePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL
  const computadoraId = Number.parseInt(id);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cpu: "",
    monitor: "",
    monitor_serie: "",
    mouse: "",
    teclado: "",
    cable_corriente: "",
    internet: "",
    sistema_operativo: "",
    antivirus: "",
    red_por_cable: "",
    wifi: "",
    observaciones: "",
  });
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        // Obtener datos del hardware desde el backend
        const response = await getDetallesByIdRequest(computadoraId);
        const [detalle] = response.data;

        if (detalle) {
          setFormData({
            cpu: detalle.cpu || "",
            monitor: detalle.monitor || "",
            monitor_serie: detalle.monitor_serie || "",
            mouse: detalle.mouse || "",
            teclado: detalle.teclado || "",
            cable_corriente: detalle.cable_corriente || "",
            internet: detalle.internet || "",
            sistema_operativo: detalle.sistema_operativo || "",
            antivirus: detalle.antivirus || "",
            red_por_cable: detalle.red_por_cable || "",
            wifi: detalle.wifi || "",
            observaciones: detalle.observaciones || "",
          });
        }
      } catch (err) {
        console.error("Error fetching hardware details:", err);
        setFetchError("No se pudo cargar la información del hardware.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [computadoraId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando se cambia el campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación básica para campos obligatorios
    if (!formData.cpu.trim()) {
      newErrors.cpu = "El CPU es obligatorio";
    }

    if (!formData.sistema_operativo.trim()) {
      newErrors.sistema_operativo = "El sistema operativo es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Enviar los datos actualizados al backend
        await editDetalleRequest(computadoraId, formData);
        navigate(`/details/${computadoraId}`);
      } catch (err) {
        console.error("Error updating hardware details:", err);
        alert(
          "No se pudo actualizar los detalles de hardware. Por favor, intenta de nuevo."
        );
      }
    }
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

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-red-500">{fetchError}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6 mt-4">
          Editar Detalles de Hardware
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">CPU</label>
              <input
                type="text"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.cpu ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cpu && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.cpu}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Monitor</label>
              <input
                type="text"
                name="monitor"
                value={formData.monitor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Número de Serie del Monitor
              </label>
              <input
                type="text"
                name="monitor_serie"
                value={formData.monitor_serie}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mouse</label>
              <input
                type="text"
                name="mouse"
                value={formData.mouse}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teclado</label>
              <input
                type="text"
                name="teclado"
                value={formData.teclado}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Cable de Corriente
              </label>
              <input
                type="text"
                name="cable_corriente"
                value={formData.cable_corriente}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Internet</label>
              <input
                type="text"
                name="internet"
                value={formData.internet}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sistema Operativo
              </label>
              <input
                type="text"
                name="sistema_operativo"
                value={formData.sistema_operativo}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.sistema_operativo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.sistema_operativo && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.sistema_operativo}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Antivirus
              </label>
              <input
                type="text"
                name="antivirus"
                value={formData.antivirus}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Red por Cable
              </label>
              <input
                type="text"
                name="red_por_cable"
                value={formData.red_por_cable}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">WiFi</label>
              <input
                type="text"
                name="wifi"
                value={formData.wifi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <FiSave />
              <span>Guardar Cambios</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              <FiX />
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditarHardwarePage;
