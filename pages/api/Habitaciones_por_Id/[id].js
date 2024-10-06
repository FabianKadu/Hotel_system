import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query; // Obtener el ID de la URL

    if (req.method === 'GET') {
        try {
            // Convertir el ID a número para evitar problemas con la consulta
            const habitacionId = parseInt(id, 10);

            if (isNaN(habitacionId)) {
                return res.status(400).json({ error: 'ID de habitación inválido' });
            }

            // Consultar la habitación por ID usando Prisma
            const habitacion = await prisma.habitacion.findUnique({
                where: {
                    id_habitacion: habitacionId,
                },
            });

            if (!habitacion) {
                return res.status(404).json({ error: 'Habitación no encontrada' });
            }

            // Devolver los datos de la habitación
            res.status(200).json(habitacion);
        } catch (error) {
            console.error('Error al obtener la habitación:', error);
            res.status(500).json({ error: 'Error al obtener la habitación' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' }); // Solo permitir GET
    }
}
