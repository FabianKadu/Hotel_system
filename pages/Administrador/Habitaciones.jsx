import Layout from '../../components/ui/NavbarAdm/Layout';
import { useState, useEffect } from 'react';

const Habitaciones = () => {
    // Estado para almacenar habitaciones
    const [habitaciones, setHabitaciones] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [formData, setFormData] = useState({
        numero_habitacion: '',
        tipo_habitacion: '',
        precio_por_noche: '',
        estado_habitacion: '',
        descripcion: '',
    });

    useEffect(() => {
        fetch('/api/Habitaciones/Habitaciones')
            .then((response) => response.json())
            .then((data) => setHabitaciones(data));
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Llamar a la API para crear una nueva habitación
        try {
            const res = await fetch('/api/habitaciones/Crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const nuevaHabitacion = await res.json();
                setHabitaciones([...habitaciones, nuevaHabitacion]);
                setShowModal(false); // Cerrar el modal después de crear la habitación
                setFormData({
                    numero_habitacion: '',
                    tipo_habitacion: '',
                    precio_por_noche: '',
                    estado_habitacion: '',
                    descripcion: '',
                });
            } else {
                console.error('Error al crear la habitación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // Función para eliminar una habitación
    const eliminarHabitacion = (id) => {
        const nuevasHabitaciones = habitaciones.filter(habitacion => habitacion.id !== id);
        setHabitaciones(nuevasHabitaciones);
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Gestión de Habitaciones</h1>

                {/* Botón para abrir el modal de crear habitación */}
                <div className="mb-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => setShowModal(true)}
                    >
                        Crear Habitación
                    </button>
                </div>

                {/* Tabla de habitaciones */}
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Número</th>
                            <th className="py-2 px-4 border">Descripción</th>
                            <th className="py-2 px-4 border">Tipo</th>
                            <th className="py-2 px-4 border">Precio</th>
                            <th className="py-2 px-4 border">Estado</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map(habitacion => (
                            <tr key={habitacion.id} className="border-b">
                                <td className="py-2 px-4 border">{habitacion.id_habitacion}</td>
                                <td className="py-2 px-4 border">{habitacion.numero_habitacion}</td>
                                <td className="py-2 px-4 border">{habitacion.descripcion}</td>
                                <td className="py-2 px-4 border">{habitacion.tipo_habitacion}</td>
                                <td className="py-2 px-4 border">S/.{habitacion.precio_por_noche}.00</td>
                                <td className="py-2 px-4 border">{habitacion.estado_habitacion}</td>
                                <td className="py-2 px-4 border">
                                    <div className="flex space-x-2">
                                        {/* Botón para actualizar */}
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => alert(`Actualizar habitación con ID: ${habitacion.id}`)}
                                        >
                                            Actualizar
                                        </button>
                                        {/* Botón para eliminar */}
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => eliminarHabitacion(habitacion.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para crear una nueva habitación */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-md shadow-lg">
                            <h2 className="text-2xl mb-4">Crear Habitación</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Número de Habitación</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={formData.numero_habitacion}
                                        onChange={(e) => setFormData({ ...formData, numero_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Tipo de Habitación</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={formData.tipo_habitacion}
                                        onChange={(e) => setFormData({ ...formData, tipo_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Precio por Noche</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={formData.precio_por_noche}
                                        onChange={(e) => setFormData({ ...formData, precio_por_noche: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Estado de Habitación</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={formData.estado_habitacion}
                                        onChange={(e) => setFormData({ ...formData, estado_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Descripción</label>
                                    <textarea
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Crear Habitación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Habitaciones;
