
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { dni, nombre, apellido, email, telefono, direccion, contraseña, tipo_usuario } = req.body; // Recibimos el tipo de usuario

        try {

            // Validación de longitud del DNI
            if (dni.length !== 8) {
                return res.status(400).json({ message: 'El DNI debe tener exactamente 8 dígitos.' });
            }

            // Verificar que todos los campos requeridos están presentes
            if (!nombre || !apellido || !email || !contraseña || !dni) {
                return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Guardar el usuario en la base de datos
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    dni,
                    nombre,
                    apellido,
                    email,
                    telefono,
                    direccion,
                    tipo_usuario: tipo_usuario,
                    fecha_registro: new Date(),
                    contrase_a: hashedPassword,
                },
            });

            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
