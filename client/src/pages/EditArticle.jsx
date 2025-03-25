import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { editArticuloRequest, getArticuloRequest } from "../api/articles";

function EditarArticuloPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL
  const [loading, setLoading] = useState(true);
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
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        // Obtener datos del artículo desde el backend
        const response = await getArticuloRequest(id);
        const [articulo] = response.data;

        if (articulo) {
          setFormData({
            num_inventario: articulo.num_inventario,
            num_serie: articulo.num_serie,
            marca: articulo.marca,
            modelo: articulo.modelo,
            estado: articulo.estado,
            tipo_uso: articulo.tipo_uso,
            articulo: articulo.articulo,
          });
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setFetchError("No se pudo cargar la información del artículo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      newErrors.articulo = "El nombre del artículo es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Enviar los datos actualizados al backend
        await editArticuloRequest(id, formData);
        navigate(`/article/${id}`);
      } catch (err) {
        console.error("Error updating article:", err);
        alert(
          "No se pudo actualizar el artículo. Por favor, intenta de nuevo."
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
          Editar Artículo de Inventario
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Número de Inventario
              </label>
              <input
                type="text"
                name="num_inventario"
                value={formData.num_inventario}
                onChange={handleChange}
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
              <label className="block text-sm font-medium mb-1">Artículo</label>
              <input
                type="text"
                name="articulo"
                value={formData.articulo}
                onChange={handleChange}
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

            <div>
              <label className="block text-sm font-medium mb-1">Marca</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
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
                <option value="para baja">Para baja</option>
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

export default EditarArticuloPage;
