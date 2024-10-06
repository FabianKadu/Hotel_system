import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id_usuario } = req.query;

    if (req.method === 'GET') {
        try {
            // Obtener todas las reservas del usuario logueado
            const reservas = await prisma.reserva.findMany({
                where: {
                    id_usuario: parseInt(id_usuario, 10),
                },
                include: {
                    habitacion: true, // Incluir detalles de la habitación relacionada
                },
            });

            // Devolver las reservas
            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del usuario:', error);
            res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
