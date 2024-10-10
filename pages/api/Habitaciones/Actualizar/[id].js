import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;  // Obtener el id de la habitación desde la URL

    // Verificar que el método HTTP sea PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    // Extraer los datos enviados en el cuerpo de la solicitud
    const { numero_habitacion, tipo_habitacion, precio_por_noche, estado_habitacion, descripcion } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!numero_habitacion || !tipo_habitacion || !precio_por_noche || !estado_habitacion) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Actualizar la habitación en la base de datos utilizando Prisma
        const habitacionActualizada = await prisma.habitacion.update({
            where: {
                id_habitacion: parseInt(id),  // Asegurarse de que id_habitacion sea un número entero
            },
            data: {
                numero_habitacion: parseInt(numero_habitacion), // Convertir número de habitación a entero
                tipo_habitacion,
                precio_por_noche: parseFloat(precio_por_noche), // Convertir precio a flotante
                estado_habitacion,
                descripcion: descripcion || '',  // Si la descripción es nula, utilizar una cadena vacía
            },
        });

        // Responder con la habitación actualizada
        res.status(200).json(habitacionActualizada);
    } catch (error) {
        // En caso de error, devolver un mensaje de error
        res.status(500).json({ message: 'Error al actualizar la habitación', error: error.message });
    }
}
