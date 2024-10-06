import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Obtener todas las habitaciones cuyo estado no sea "disponible"
            const habitacionesReservadas = await prisma.habitacion.findMany({
                where: { estado_habitacion: 'Reservada' },
            });

            // Actualizar el estado de las habitaciones a "disponible" si la fecha de salida ha pasado
            await Promise.all(
                habitacionesReservadas.map(async (habitacion) => {
                    // Buscar la reserva más reciente de esta habitación
                    const ultimaReserva = await prisma.reserva.findFirst({
                        where: { id_habitacion: habitacion.id_habitacion },
                        orderBy: { fecha_salida: 'desc' }, // Ordenar por la fecha de salida más reciente
                    });

                    // Si la fecha de salida ha pasado, cambiar el estado a "disponible"
                    if (ultimaReserva && new Date(ultimaReserva.fecha_salida) < new Date()) {
                        await prisma.habitacion.update({
                            where: { id_habitacion: habitacion.id_habitacion },
                            data: { estado_habitacion: 'Disponible' },
                        });
                    }
                })
            );

            // Después de actualizar, obtener solo las habitaciones que tienen el estado "disponible"
            const habitacionesDisponibles = await prisma.habitacion.findMany({
                where: {
                    estado_habitacion: 'Disponible', // Filtrar por estado "disponible"
                },
            });

            // Devolver las habitaciones disponibles
            res.status(200).json(habitacionesDisponibles);
        } catch (error) {
            console.error('Error al obtener y actualizar las habitaciones:', error);
            res.status(500).json({ error: 'Error al obtener y actualizar las habitaciones' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
