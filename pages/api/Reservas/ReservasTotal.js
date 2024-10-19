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

        // Devolver los datos sin formateo adicional
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
}
