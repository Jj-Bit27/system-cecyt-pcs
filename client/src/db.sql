-- Tabla de Inventario de Articulos --
CREATE TABLE inventario_articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_inventario VARCHAR(100) NOT NULL UNIQUE,
    num_serie VARCHAR(100) NOT NULL UNIQUE,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    estado ENUM('bueno', 'malo', 'para baja') NOT NULL,
    tipo_uso ENUM('administrativo', 'laboratorio') NOT NULL,
    articulo VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Detalles de Hardware
CREATE TABLE detalles_hardware (
    id INT AUTO_INCREMENT PRIMARY KEY,
    computadora_id INT NOT NULL,
    cpu VARCHAR(100),
    monitor VARCHAR(100),
    monitor_serie VARCHAR(50),
    mouse VARCHAR(50),
    teclado VARCHAR(50),
    cable_corriente VARCHAR(50),
    internet VARCHAR(50),
    sistema_operativo VARCHAR(50),
    antivirus VARCHAR(50),
    red_por_cable VARCHAR(50),
    wifi VARCHAR(50),
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (computadora_id) REFERENCES inventario_articulos(id)
);

-- Tabla de Mantenimientos
CREATE TABLE mantenimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    computadora_id INT NOT NULL,
    fecha DATETIME NOT NULL,
    descripcion TEXT,
    tipo ENUM('preventivo', 'correctivo') NOT NULL,
    componentes_revisados TEXT,
    observaciones TEXT,
    tecnico_responsable VARCHAR(100),
    FOREIGN KEY (computadora_id) REFERENCES inventario_articulos(id)
);
