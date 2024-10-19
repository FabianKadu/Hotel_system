-- CreateTable
CREATE TABLE `habitacion` (
    `id_habitacion` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_habitacion` INTEGER NOT NULL,
    `tipo_habitacion` VARCHAR(50) NOT NULL,
    `precio_por_noche` DECIMAL(10, 2) NOT NULL,
    `estado_habitacion` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id_habitacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `id_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reserva` INTEGER NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `metodo_pago` VARCHAR(50) NOT NULL,
    `fecha_pago` DATE NOT NULL,
    `estado_pago` VARCHAR(50) NOT NULL,

    INDEX `id_reserva`(`id_reserva`),
    PRIMARY KEY (`id_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserva` (
    `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_habitacion` INTEGER NOT NULL,
    `fecha_reserva` DATE NOT NULL,
    `fecha_entrada` DATE NOT NULL,
    `fecha_salida` DATE NOT NULL,
    `estado_reserva` VARCHAR(50) NOT NULL,
    `numero_noches` INTEGER NOT NULL,
    `costo_total` DECIMAL(10, 2) NOT NULL,

    INDEX `id_habitacion`(`id_habitacion`),
    INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_reserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(8) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(15) NULL,
    `direccion` VARCHAR(255) NULL,
    `tipo_usuario` VARCHAR(50) NOT NULL,
    `fecha_registro` DATE NOT NULL,
    `contraseña` VARCHAR(255) NOT NULL,
    `puntos` INTEGER NOT NULL DEFAULT 1000,

    UNIQUE INDEX `usuario_dni_key`(`dni`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva`(`id_reserva`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion`(`id_habitacion`) ON DELETE RESTRICT ON UPDATE RESTRICT;
