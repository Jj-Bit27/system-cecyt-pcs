import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { addDetalleRequest } from "../api/details";

function NuevoHardwarePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL
  const computadoraId = Number.parseInt(id);

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
        // Enviar los datos al backend
        const dataToSend = {
          computadora_id: computadoraId,
          ...formData,
        };
        await addDetalleRequest(dataToSend);
        navigate(`/details/${computadoraId}`);
      } catch (err) {
        console.error("Error saving hardware details:", err);
        alert(
          "No se pudo registrar los detalles de hardware. Por favor, intenta de nuevo."
        );
      }
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6 mt-4">
          Añadir Detalles de Hardware
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
                placeholder="Ej: Intel Core i7-11700 3.6GHz"
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
                placeholder="Ej: Dell P2419H 24"
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
                placeholder="Ej: CN123456789"
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
                placeholder="Ej: Dell MS116"
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
                placeholder="Ej: Dell KB216"
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
                placeholder="Ej: Estándar 3 pines"
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
                placeholder="Ej: 1 Gbps"
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
                placeholder="Ej: Windows 11 Pro"
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
                placeholder="Ej: Windows Defender"
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
                placeholder="Ej: Ethernet 1Gbps"
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
                placeholder="Ej: Intel Wi-Fi 6 AX201"
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
              placeholder="Información adicional sobre el hardware..."
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <FiSave />
              <span>Guardar</span>
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

export default NuevoHardwarePage;
