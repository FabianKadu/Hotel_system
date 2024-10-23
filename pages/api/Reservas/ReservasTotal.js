import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        // Consultar todas las reservas con los detalles del usuario y la habitación
        const reservas = await prisma.reserva.findMany({
            include: {
                usuario: {
                    select: {
                        dni: true,
                        nombre: true,
                        apellido: true,
                    },
                },
                habitacion: {
                    select: {
                        numero_habitacion: true,
                        tipo_habitacion: true,
                        precio_por_noche: true,
                    },
                },
            },
        });

        // Formatear las fechas para evitar desfase de zona horaria
        const reservasFormateadas = reservas.map(reserva => ({
            ...reserva,
            fecha_reserva: reserva.fecha_reserva.toISOString().split('T')[0],
            fecha_entrada: reserva.fecha_entrada.toISOString().split('T')[0],
            fecha_salida: reserva.fecha_salida.toISOString().split('T')[0],
        }));

        // Devolver los datos con fechas formateadas
        res.status(200).json(reservasFormateadas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
}
