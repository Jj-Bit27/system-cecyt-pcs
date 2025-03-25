import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { addArticuloRequest } from "../api/articles";

function NewArticlePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    num_inventario: "",
    num_serie: "",
    marca: "",
    modelo: "",
    estado: "bueno",
    tipo_uso: "administrativo",
    articulo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    if (!formData.num_inventario.trim()) {
      newErrors.num_inventario = "El número de inventario es obligatorio";
    }

    if (!formData.num_serie.trim()) {
      newErrors.num_serie = "El número de serie es obligatorio";
    }

    if (!formData.marca.trim()) {
      newErrors.marca = "La marca es obligatoria";
    }

    if (!formData.modelo.trim()) {
      newErrors.modelo = "El modelo es obligatorio";
    }

    if (!formData.articulo.trim()) {
      newErrors.articulo = "El artículo es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { data } = await addArticuloRequest(formData);

      navigate("/articles"); // Ajusta la ruta según tu aplicación
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-6 mt-4">Agregar Nuevo Artículo</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-4 rounded-lg shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de Inventario
            </label>
            <input
              type="text"
              name="num_inventario"
              value={formData.num_inventario}
              onChange={handleChange}
              placeholder="Ej: INV-00123"
              className={`w-full p-2 border rounded-md ${
                errors.num_inventario ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.num_inventario && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle />
                {errors.num_inventario}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Número de Serie
            </label>
            <input
              type="text"
              name="num_serie"
              value={formData.num_serie}
              onChange={handleChange}
              placeholder="Ej: SN-XYZ789"
              className={`w-full p-2 border rounded-md ${
                errors.num_serie ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.num_serie && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle />
                {errors.num_serie}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Ej: Dell"
              className={`w-full p-2 border rounded-md ${
                errors.marca ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.marca && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle />
                {errors.marca}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ej: OptiPlex 7090"
              className={`w-full p-2 border rounded-md ${
                errors.modelo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.modelo && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle />
                {errors.modelo}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="bueno">Bueno</option>
              <option value="malo">Malo</option>
              <option value="para baja">Para Baja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Uso
            </label>
            <select
              name="tipo_uso"
              value={formData.tipo_uso}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="administrativo">Administrativo</option>
              <option value="laboratorio">Laboratorio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Artículo</label>
            <input
              type="text"
              name="articulo"
              value={formData.articulo}
              onChange={handleChange}
              placeholder="Ej: CPU o Monitor"
              className={`w-full p-2 border rounded-md ${
                errors.articulo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.articulo && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle />
                {errors.articulo}
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
      </div>
    </main>
  );
}

export default NewArticlePage;
