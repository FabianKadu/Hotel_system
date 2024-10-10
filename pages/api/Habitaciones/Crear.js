import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { numero_habitacion, tipo_habitacion, precio_por_noche, estado_habitacion, descripcion } = req.body;

    if (!numero_habitacion || !tipo_habitacion || !precio_por_noche || !estado_habitacion) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const nuevaHabitacion = await prisma.habitacion.create({
            data: {
                numero_habitacion: parseInt(numero_habitacion),
                tipo_habitacion,
                precio_por_noche: parseFloat(precio_por_noche),
                estado_habitacion,
                descripcion,
            },
        });
        res.status(201).json(nuevaHabitacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la habitación', error: error.message });
    }
}
