import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { num } = req.query; // Obtener el NUmero de la URL

    if (req.method === 'GET') {
        try {
            // Convertir el ID a número para evitar problemas con la consulta
            const habitacionNum = parseInt(num, 10);
            if (isNaN(habitacionNum)) {
                return res.status(400).json({ error: 'Número de habitación inválido' });
            }
            // Consultar la habitación por ID usando Prisma
            const habitacion = await prisma.habitacion.findMany({
                where: {
                    numero_habitacion: habitacionNum,
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
        res.status(405).json({ message: 'Método no permitido' });
    }
}
