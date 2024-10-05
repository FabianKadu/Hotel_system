import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const habitacion = await prisma.habitacion.findMany();
        res.status(200).json(habitacion);
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
