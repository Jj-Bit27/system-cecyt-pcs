import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { getArticulosRequest } from "../api/articles";
import { addMantenimientoRequest } from "../api/maintenance";

function NewMaintenancePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const computerId = searchParams.get("computerId");

  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    computadora_id: computerId || "",
    tipo: "preventivo",
    descripcion: "",
    componentes_revisados: {
      cpu: false,
      ram: false,
      almacenamiento: false,
      placa_base: false,
      fuente_poder: false,
      otros: false,
    },
    otros_componentes: "",
    fecha: new Date().toISOString().split("T")[0],
    tecnico_responsable: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTimeout(async () => {
      const res = await getArticulosRequest();
      const allArticles = res.data;
      const computersOnly = allArticles.filter((article) =>
        ["CPU", "Laptop"].includes(article.articulo)
      );
      setComputers(computersOnly);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("componentes_revisados.")) {
      const componentName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        componentes_revisados: {
          ...prev.componentes_revisados,
          [componentName]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Limpiar error cuando el campo cambia
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

    if (!formData.computadora_id) {
      newErrors.computadora_id = "Seleccione una computadora";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "Ingrese una descripción";
    }

    const anyComponentSelected = Object.values(
      formData.componentes_revisados
    ).some((value) => value);
    if (!anyComponentSelected) {
      newErrors.componentes_revisados = "Seleccione al menos un componente";
    }

    if (
      formData.componentes_revisados.otros &&
      !formData.otros_componentes.trim()
    ) {
      newErrors.otros_componentes = "Especifique los otros componentes";
    }

    if (!formData.tecnico_responsable.trim()) {
      newErrors.tecnico_responsable =
        "Ingrese el nombre del técnico responsable";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convertir componentes_revisados a una cadena para la columna TEXT
      const componentesRevisadosStr =
        Object.entries(formData.componentes_revisados)
          .filter(([_, checked]) => checked)
          .map(([componente]) => componente)
          .join(", ") +
        (formData.otros_componentes ? `, ${formData.otros_componentes}` : "");

      const dataToSubmit = {
        computadora_id: formData.computadora_id,
        fecha: formData.fecha,
        descripcion: formData.descripcion,
        tipo: formData.tipo,
        componentes_revisados: componentesRevisadosStr || "Ninguno",
        observaciones: "", // Podrías agregar un campo en el formulario si lo necesitas
        tecnico_responsable: formData.tecnico_responsable,
      };

      await addMantenimientoRequest(dataToSubmit);

      navigate("/articles"); // Redirige a la lista de computadoras
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-6 mt-4">Nuevo Mantenimiento</h1>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-500">Cargando...</div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-4 rounded-lg shadow-sm"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Computadora
              </label>
              <select
                name="computadora_id"
                value={formData.computadora_id}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.computadora_id ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Seleccionar computadora</option>
                {computers.map((computer) => (
                  <option key={computer.id} value={computer.id}>
                    {computer.num_inventario} ({computer.articulo})
                  </option>
                ))}
              </select>
              {errors.computadora_id && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.computadora_id}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Mantenimiento
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="preventivo"
                    checked={formData.tipo === "preventivo"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Preventivo
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="correctivo"
                    checked={formData.tipo === "correctivo"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Correctivo
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Componentes Revisados
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.cpu"
                    checked={formData.componentes_revisados.cpu}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  CPU
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.ram"
                    checked={formData.componentes_revisados.ram}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  RAM
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.almacenamiento"
                    checked={formData.componentes_revisados.almacenamiento}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Almacenamiento
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.placa_base"
                    checked={formData.componentes_revisados.placa_base}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Placa Base
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.fuente_poder"
                    checked={formData.componentes_revisados.fuente_poder}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Fuente de Poder
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="componentes_revisados.otros"
                    checked={formData.componentes_revisados.otros}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Otros
                </label>
              </div>
              {errors.componentes_revisados && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.componentes_revisados}
                </p>
              )}
            </div>

            {formData.componentes_revisados.otros && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Especificar Otros Componentes
                </label>
                <input
                  type="text"
                  name="otros_componentes"
                  value={formData.otros_componentes}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.otros_componentes
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Ej: Tarjeta gráfica, ventiladores, etc."
                />
                {errors.otros_componentes && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FiAlertCircle />
                    {errors.otros_componentes}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción del Mantenimiento
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className={`w-full p-2 border rounded-md ${
                  errors.descripcion ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describa las actividades realizadas durante el mantenimiento..."
              ></textarea>
              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.descripcion}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Técnico Responsable
              </label>
              <input
                type="text"
                name="tecnico_responsable"
                value={formData.tecnico_responsable}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.tecnico_responsable
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Ej: Juan Pérez"
              />
              {errors.tecnico_responsable && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.tecnico_responsable}
                </p>
              )}
            </div>

            <div className="flex gap-3">
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
        )}
      </div>
    </main>
  );
}

export default NewMaintenancePage;
