
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, apellido, email, telefono, direccion, contraseña, tipo_usuario } = req.body; // Recibimos el tipo de usuario

        try {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Guardar el usuario en la base de datos
            const nuevoUsuario = await prisma.usuario.create({
                data: {
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
