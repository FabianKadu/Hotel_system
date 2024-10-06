import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Para generar el token JWT

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, contraseña } = req.body;

        try {
            // Buscar al usuario por email
            const usuario = await prisma.usuario.findUnique({
                where: {
                    email: email,
                },
            });

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
            const passwordMatch = await bcrypt.compare(contraseña, usuario.contrase_a);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            // Generar un token JWT (opcional)
            const token = jwt.sign({ id: usuario.id_usuario, nombre: usuario.nombre }, 'SECRET_KEY', {
                expiresIn: '1h',
            });

            // Enviar el token o establecer la sesión del usuario
            res.status(200).json({ message: 'Inicio de sesión exitoso', token, usuario });

        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
