import Layout from '../../components/ui/NavbarAdm/Layout';
import { useState, useEffect } from 'react';

const Habitaciones = () => {
    // Estado para almacenar habitaciones
    const [habitaciones, setHabitaciones] = useState([]);

    // ---------------------MODAL DE CREAR HABITACION
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [formData, setFormData] = useState({
        numero_habitacion: '',
        tipo_habitacion: '',
        precio_por_noche: '',
        estado_habitacion: '',
        descripcion: '',
    });

    useEffect(() => {
        fetch('/api/Habitaciones/HabitacionesTotal')
            .then((response) => response.json())
            .then((data) => setHabitaciones(data));
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Llamar a la API para crear una nueva habitación
        try {
            const res = await fetch('/api/Habitaciones/Crear', {
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

    // ---------------------MODAL DE ACTUALIZAR HABITACION

    const [showUpdateModal, setShowUpdateModal] = useState(false); // Estado para mostrar/ocultar el modal de actualización
    const [selectedHabitacion, setSelectedHabitacion] = useState(null); // Estado para la habitación seleccionada
    const [updateFormData, setUpdateFormData] = useState({
        numero_habitacion: '',
        tipo_habitacion: '',
        precio_por_noche: '',
        estado_habitacion: '',
        descripcion: '',
    });

    const handleOpenUpdateModal = (habitacion) => {
        setSelectedHabitacion(habitacion); // Establecer la habitación seleccionada
        setUpdateFormData({
            numero_habitacion: habitacion.numero_habitacion,
            tipo_habitacion: habitacion.tipo_habitacion,
            precio_por_noche: habitacion.precio_por_noche,
            estado_habitacion: habitacion.estado_habitacion,
            descripcion: habitacion.descripcion || '',
        });
        setShowUpdateModal(true); // Mostrar el modal
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/Habitaciones/Actualizar/${selectedHabitacion.id_habitacion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateFormData),
            });

            if (res.ok) {
                const habitacionActualizada = await res.json();

                // Actualizar solo la habitación que fue modificada
                const nuevasHabitaciones = habitaciones.map((hab) =>
                    hab.id_habitacion === habitacionActualizada.id_habitacion ? habitacionActualizada : hab
                );

                setHabitaciones(nuevasHabitaciones); // Actualizar el estado de las habitaciones
                setShowUpdateModal(false); // Cerrar el modal
            } else {
                console.error('Error al actualizar la habitación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // ---------------------MODAL DE ACTUALIZAR HABITACION  

    const handleDelete = async (id_habitacion) => {
        try {
            const res = await fetch(`/api/Habitaciones/Eliminar/${id_habitacion}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Si la eliminación es exitosa, filtra la habitación eliminada del estado
                const nuevasHabitaciones = habitaciones.filter(habitacion => habitacion.id_habitacion !== id_habitacion);
                setHabitaciones(nuevasHabitaciones); // Actualizar el estado
            } else {
                console.error('Error al eliminar la habitación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // -------------------FILTROS

    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');

    // Listas predefinidas para tipo y estado de habitación
    const tiposHabitacion = ['Doble', 'Suite', 'Simple'];
    const estadosHabitacion = ['Disponible', 'Reservada', 'Ocupada'];

    const filtrarHabitaciones = () => {
        return habitaciones.filter((habitacion) => {
            const coincideTipo = filtroTipo ? habitacion.tipo_habitacion === filtroTipo : true;
            const coincideEstado = filtroEstado ? habitacion.estado_habitacion === filtroEstado : true;

            return coincideTipo && coincideEstado;
        });
    };


    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Habitaciones</h1>

                {/* Botón para abrir el modal de crear habitación */}
                <div className="mb-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => setShowModal(true)}
                    >
                        Crear Habitación
                    </button>
                </div>

                {/* Filtros */}
                <div className="mb-4 flex items-center justify-end space-x-8">
                    <div >
                        <label className="px-4 mb-2">Filtrar por Tipo:</label>
                        <select
                            className="border px-8 border-gray-300 rounded py-2"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {tiposHabitacion.map((tipo) => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="px-4 mb-2">Filtrar por Estado:</label>
                        <select
                            className="border px-8 border-gray-300 rounded py-2"
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {estadosHabitacion.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón para limpiar los filtros */}
                    <div className="flex items-end">
                        <button
                            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
                            onClick={() => {
                                setFiltroTipo('');
                                setFiltroEstado('');
                            }}
                        >
                            Limpiar Filtros
                        </button>
                    </div>
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
                        {filtrarHabitaciones().map(habitacion => (
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
                                            onClick={() => handleOpenUpdateModal(habitacion)}
                                        >
                                            Actualizar
                                        </button>
                                        {/* Botón para eliminar */}
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(habitacion.id_habitacion)}
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
                    <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-md shadow-lg">
                            <h2 className="text-2xl mb-4 text-center">Crear Habitación</h2>
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
                                        className="bg-gray-400 mx-8 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 mx-8 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Crear Habitación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showUpdateModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-md shadow-lg">
                            <h2 className="text-2xl mb-4 text-center">Actualizar Habitación</h2>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Número de Habitación</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={updateFormData.numero_habitacion}
                                        onChange={(e) => setUpdateFormData({ ...updateFormData, numero_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Tipo de Habitación</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={updateFormData.tipo_habitacion}
                                        onChange={(e) => setUpdateFormData({ ...updateFormData, tipo_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Precio por Noche</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={updateFormData.precio_por_noche}
                                        onChange={(e) => setUpdateFormData({ ...updateFormData, precio_por_noche: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Estado de Habitación</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={updateFormData.estado_habitacion}
                                        onChange={(e) => setUpdateFormData({ ...updateFormData, estado_habitacion: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Descripción</label>
                                    <textarea
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                        value={updateFormData.descripcion}
                                        onChange={(e) => setUpdateFormData({ ...updateFormData, descripcion: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="bg-gray-400 mx-8 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        onClick={() => setShowUpdateModal(false)} // Cerrar el modal
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 mx-8 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Actualizar Habitación
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
