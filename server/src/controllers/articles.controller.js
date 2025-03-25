import { pool } from "../database/db.js";

/* Obtener todos los articulos */
export const getArticles = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM inventario_articulos",
    );

    res
      .json(
        result,
      )
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener un articulo en especifico */
export const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM inventario_articulos WHERE id = ?", [
      id,
    ]);

    res
      .json(
        result,
      )
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir un nuevo articulo */
export const addArticle = async (req, res) => {
  try {
    const { num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo } = req.body;

    const [result] = await pool.query(
      "INSERT INTO inventario_articulos (num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo]
    );

    res.status(201).json({
      result,
      message: "Ariculo añadido correctamente"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar un articulo */
export const editArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo } = req.body;

    const [resultados] = await pool.query("SELECT * FROM inventario_articulos WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "El articulo no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      "UPDATE inventario_articulos SET num_inventario = ?, num_serie = ?, marca = ?, modelo = ?, estado = ?, tipo_uso = ?, articulo = ? WHERE id = ?",
      [num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo, id]
    );

    res.status(200).json({ id, num_inventario, num_serie, marca, modelo, estado, tipo_uso, articulo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar un articulo */
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await pool.query("DELETE FROM inventario_articulos WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro el articulo que se desea eliminar" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};