import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { numero_habitacion, tipo_habitacion, precio_por_noche, estado_habitacion, descripcion } = req.body;

    try {
        const habitacionActualizada = await prisma.habitacion.update({
            where: { id_habitacion: parseInt(id) },
            data: {
                numero_habitacion,
                tipo_habitacion,
                precio_por_noche: precio_por_noche ? parseFloat(precio_por_noche) : undefined,
                estado_habitacion,
                descripcion,
            },
        });

        res.status(200).json(habitacionActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la habitación', error: error.message });
    }
}
