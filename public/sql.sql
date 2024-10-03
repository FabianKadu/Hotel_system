-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    tipo_usuario VARCHAR(50) NOT NULL,
    fecha_registro DATE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Crear tabla Habitaciones
CREATE TABLE Habitaciones (
    id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    numero_habitacion INT NOT NULL,
    tipo_habitacion VARCHAR(50) NOT NULL,
    precio_por_noche DECIMAL(10, 2) NOT NULL,
    estado_habitacion VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Crear tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_habitacion INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    estado_reserva VARCHAR(50) NOT NULL,
    numero_noches INT NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_habitacion) REFERENCES Habitaciones(id_habitacion)
);

-- Crear tabla Pagos
CREATE TABLE Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    fecha_pago DATE NOT NULL,
    estado_pago VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva)
);
