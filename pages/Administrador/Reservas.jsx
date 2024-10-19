import { useState, useEffect } from 'react';
import Layout from '../../components/ui/NavbarAdm/Layout';
import CrearReservaModal from './CrearReservaModal';

const Reservas = () => {
    // Definir hooks al principio del componente
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para obtener las reservas de la API
    const fetchReservas = async () => {
        try {
            const response = await fetch('/api/Reservas/ReservasTotal');
            const data = await response.json();
            setReservas(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            setLoading(false);
        }
    };

    // Efecto para obtener las reservas cuando el componente se monta
    useEffect(() => {
        fetchReservas();
    }, []);

    // Función para manejar la creación de una nueva reserva
    const handleReservaCreated = (nuevaReserva) => {
        // Añadir la nueva reserva a la lista existente de reservas
        setReservas([...reservas, nuevaReserva]);
    };

    // Función para eliminar una reserva
    const handleDelete = async (id_reserva) => {
        try {
            await fetch(`/api/Reservas/Eliminar/${id_reserva}`, {
                method: 'DELETE',
            });
            setReservas(reservas.filter((reserva) => reserva.id_reserva !== id_reserva));
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };

    // Función para manejar la actualización de la reserva
    const handleOpenUpdateModal = (reserva) => {
        // Aquí puedes manejar la lógica para abrir un modal de actualización
        console.log('Abrir modal para actualizar reserva:', reserva);
    };

    if (loading) {
        return <p>Cargando reservas...</p>;
    }

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Reservas Generales</h1>

                {/* Botón para abrir el modal de crear Reserva */}
                <div className="mb-4 flex justify-between">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Crear Reserva
                    </button>
                </div>

                {/* Modal para crear reserva */}
                <CrearReservaModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onReservaCreated={handleReservaCreated}
                />

                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">N° Hab</th>
                            <th className="py-2 px-4 border">DNI</th>
                            <th className="py-2 px-4 border">Huésped</th>
                            <th className="py-2 px-4 border">Fecha Reserva</th>
                            <th className="py-2 px-4 border">Fecha Entrada</th>
                            <th className="py-2 px-4 border">Fecha Salida</th>
                            <th className="py-2 px-4 border">Costo Total</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id_reserva} className="border-b">
                                <td className="py-2 px-4 border">{reserva.id_reserva}</td>
                                <td className="py-2 px-4 border">{reserva.habitacion.numero_habitacion}</td>
                                <td className="py-2 px-4 border">{reserva.usuario.dni}</td>
                                <td className="py-2 px-4 border">{reserva.usuario.apellido} {reserva.usuario.nombre}</td>
                                <td className="py-2 px-4 border">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border">{new Date(reserva.fecha_entrada).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border">{new Date(reserva.fecha_salida).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border">S/{reserva.costo_total}.00</td>
                                <td className="py-2 px-4 border">
                                    <div className="flex space-x-2">
                                        {/* Botón para actualizar */}
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleOpenUpdateModal(reserva)}
                                        >
                                            Actualizar
                                        </button>
                                        {/* Botón para eliminar */}
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(reserva.id_reserva)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Reservas;
