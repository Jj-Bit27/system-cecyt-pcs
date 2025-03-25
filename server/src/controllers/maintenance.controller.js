import { pool } from "../database/db.js";

/* Obtener todos los mantenimientos */
export const getMaintenances = async (req, res) => {
  try {
    const { computer_id } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM mantenimientos WHERE computadora_id = ?",
      [computer_id]
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

/* Obtener un mantenimiento en especifico */
export const getMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM mantenimientos WHERE id = ?", [
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

/* Añadir un nuevo mantenimiento */
export const addMaintenance = async (req, res) => {
  try {
    const { computadora_id, fecha, descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable } = req.body;

    const [result] = await pool.query(
      "INSERT INTO mantenimientos (computadora_id, fecha, descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [computadora_id, fecha, descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable]
    );

    res.status(201).json({
      id: result.insertId,
      result,
      message: "Mantenimiento añadido correctamente"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar un mantenimiento */
export const editMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable } = req.body;

    const [resultados] = await pool.query("SELECT * FROM mantenimientos WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "El mantenimiento no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      "UPDATE mantenimientos SET descripcion = ?, tipo = ?, componentes_revisados = ?, observaciones = ?, tecnico_responsable = ? WHERE id = ?",
      [descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable, id]
    );

    res.status(200).json({ id, descripcion, tipo, componentes_revisados, observaciones, tecnico_responsable });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar un mantenimiento */
export const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await pool.query("DELETE FROM mantenimientos WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro el mantenimiento que se desea eliminar" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};