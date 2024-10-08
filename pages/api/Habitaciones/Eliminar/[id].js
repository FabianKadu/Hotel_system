import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        await prisma.habitacion.delete({
            where: { id_habitacion: parseInt(id) },
        });
        res.status(200).json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la habitación', error: error.message });
    }
}
