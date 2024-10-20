import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { dni } = req.query;
    if (req.method === 'GET') {
        try {

            const usuario = await prisma.usuario.findMany({
                where: {
                    dni: dni
                }
            });

            // Devolver las usuario
            res.status(200).json(usuario);
        } catch (error) {
            console.error('Error al obtener los detalles del usuario:', error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
