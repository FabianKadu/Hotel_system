import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            id_usuario,
            id_habitacion,
            fecha_entrada,
            fecha_salida,
            numero_noches,
            costo_total
        } = req.body;

        try {
            // Verificar si los datos necesarios están presentes
            if (!id_usuario || !id_habitacion || !fecha_entrada || !fecha_salida || !numero_noches || !costo_total) {
                return res.status(400).json({ error: 'Faltan datos necesarios para la reserva' });
            }

            // Iniciar una transacción para asegurar consistencia entre las operaciones
            const result = await prisma.$transaction(async (prisma) => {
                // Obtener los datos del usuario para verificar los puntos
                const usuario = await prisma.usuario.findUnique({
                    where: { id_usuario: parseInt(id_usuario, 10) },
                });

                if (!usuario) {
                    throw new Error('Usuario no encontrado');
                }

                // Verificar si el usuario tiene suficientes puntos
                if (usuario.puntos < costo_total) {
                    throw new Error('No tienes suficientes puntos para completar la reserva');
                }

                // Descontar los puntos del usuario
                const usuarioActualizado = await prisma.usuario.update({
                    where: { id_usuario: parseInt(id_usuario, 10) },
                    data: { puntos: usuario.puntos - parseFloat(costo_total) }, // Descontar los puntos según el costo total
                });

                // Cambiar el estado de la habitación a "reservada"
                const habitacionActualizada = await prisma.habitacion.update({
                    where: { id_habitacion: parseInt(id_habitacion, 10) },
                    data: { estado_habitacion: 'Reservada' }, // Actualizar el estado a "reservada"
                });

                // Crear la nueva reserva
                const nuevaReserva = await prisma.reserva.create({
                    data: {
                        id_usuario: parseInt(id_usuario, 10),
                        id_habitacion: parseInt(id_habitacion, 10),
                        fecha_reserva: new Date(), // Fecha de creación de la reserva
                        fecha_entrada: new Date(fecha_entrada),
                        fecha_salida: new Date(fecha_salida),
                        numero_noches: parseInt(numero_noches, 10),
                        costo_total: parseFloat(costo_total),
                        estado_reserva: 'confirmada', // Establecer un estado inicial para la reserva
                    },
                });

                return nuevaReserva;
            });

            // Responder con la reserva creada
            res.status(201).json(result);
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
