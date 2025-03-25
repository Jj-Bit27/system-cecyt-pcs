import { pool } from "../database/db.js";

/* Obtener todos los detalles de hardware de la PC */
export const getDetails = async (req, res) => {
  try {
    const { computer_id } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM detalles_hardware WHERE computadora_id = ?",
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

/* Obtener un detalle en especifico en especifico */
export const getDetailByID = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM detalles_hardware WHERE id = ?", [
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

/* Añadir un nuevo detalle */
export const addDetail = async (req, res) => {
  try {
    const { computadora_id, cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones } = req.body;

    const [result] = await pool.query(
      "INSERT INTO detalles_hardware (computadora_id, cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [computadora_id, cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones]
    ).catch((error) => {
      console.log(error);
    });

    res.status(201).json({
      id: result.insertId,
      result,
      message: "Detalle añadido correctamente"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar un detalle */
export const editDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones } = req.body;

    const [resultados] = await pool.query("SELECT * FROM detalles_hardware WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "El detalle de hardware no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      "UPDATE detalles_hardware SET cpu = ?, monitor = ?, monitor_serie = ?, mouse = ?, teclado = ?, cable_corriente = ?, internet = ?, sistema_operativo = ?, antivirus = ?, red_por_cable = ?, wifi = ?, observaciones = ? WHERE id = ?",
      [cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones, id]
    );

    res.status(200).json({ id, cpu, monitor, monitor_serie, mouse, teclado, cable_corriente, internet, sistema_operativo, antivirus, red_por_cable, wifi, observaciones });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar un detalle */
export const deleteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await pool.query("DELETE FROM detalles_hardware WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro el detalle de hardware que se desea eliminar" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};