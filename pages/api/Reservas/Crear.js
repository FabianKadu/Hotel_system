import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const {
        id_usuario,
        id_habitacion,
        fecha_reserva,
        fecha_entrada,
        fecha_salida,
        estado_reserva,
        numero_noches,
        costo_total
    } = req.body;

    try {
        // Validar que los campos obligatorios están presentes
        if (!id_usuario || !id_habitacion || !fecha_entrada || !fecha_salida || !numero_noches || !costo_total) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
        }

        // Crear la nueva reserva en la base de datos
        const nuevaReserva = await prisma.reserva.create({
            data: {
                id_usuario: parseInt(id_usuario),
                id_habitacion: parseInt(id_habitacion),
                fecha_reserva: fecha_reserva ? new Date(fecha_reserva) : new Date(),
                fecha_entrada: new Date(fecha_entrada),
                fecha_salida: new Date(fecha_salida),
                estado_reserva: estado_reserva || 'Confirmada', // Valor por defecto
                numero_noches: parseInt(numero_noches),
                costo_total: parseFloat(costo_total),
            },
        });

        return res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
    }
}
