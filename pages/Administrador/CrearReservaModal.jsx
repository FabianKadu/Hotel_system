import { useState } from 'react';

const CrearReservaModal = ({ isOpen, onClose, onReservaCreated }) => {
    const [formData, setFormData] = useState({
        id_usuario: '',
        id_habitacion: '',
        fecha_reserva: '',
        fecha_entrada: '',
        fecha_salida: '',
        estado_reserva: 'Confirmada', // Valor por defecto
        numero_noches: '',
        costo_total: ''
    });

    const [dni, setDni] = useState(''); // Estado para el DNI ingresado
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null); // Estado para almacenar los datos del usuario encontrado
    const [usuarioNoEncontrado, setUsuarioNoEncontrado] = useState(false); // Estado para manejar la búsqueda fallida
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // Estado para mostrar modal de mensajes
    const [message, setMessage] = useState(''); // Estado para el mensaje en el modal

    // Función para buscar usuario por DNI
    const handleBuscarUsuario = async () => {
        try {
            const res = await fetch(`/api/Usuarios/UsuarioPorDni/${dni}`);
            if (res.ok) {
                const data = await res.json();
                setUsuarioEncontrado(data); // Almacenar los datos del usuario encontrado
                setFormData({ ...formData, id_usuario: data[0].id_usuario }); // Actualizar el id_usuario en el formulario
                setMessage(`Usuario encontrado: ${data[0].nombre} ${data[0].apellido}`);
                setIsMessageModalOpen(true); // Mostrar el modal con mensaje
                setUsuarioNoEncontrado(false);
            } else {
                setUsuarioEncontrado(null);
                setMessage('Usuario no encontrado. Verifique el DNI.');
                setIsMessageModalOpen(true); // Mostrar el modal con mensaje
                setUsuarioNoEncontrado(true);
            }
        } catch (error) {
            console.error('Error al buscar el usuario:', error);
            setMessage('Error al buscar el usuario.');
            setIsMessageModalOpen(true); // Mostrar el modal con mensaje
            setUsuarioNoEncontrado(true);
        }
    };

    const [numero_habitacion, setNumero_habitacion] = useState(''); // Estado para el DNI ingresado
    const [precioHabitacion, setPrecioHabitacion] = useState(0); // Estado para manejar la búsqueda fallida

    const handleBuscarHabitacion = async () => {
        try {
            const res = await fetch(`/api/Habitaciones/HabitacionPorNum/${numero_habitacion}`);
            if (res.ok) {
                const data = await res.json();
                setUsuarioEncontrado(data); // Almacenar los datos la habitacion encontrado
                setFormData({ ...formData, id_habitacion: data[0].id_habitacion }); // Actualizar el id_usuario en el formulario
                setMessage(`Habitacion encontrada - Estado:  ${data[0].estado_habitacion}`);
                setIsMessageModalOpen(true); // Mostrar el modal con mensaje
                setUsuarioNoEncontrado(false);
                setPrecioHabitacion(parseInt(data[0].precio_por_noche,10));
            } else {
                setUsuarioEncontrado(null);
                setMessage('Habitacion no encontrada. Verifique el Número.');
                setIsMessageModalOpen(true); // Mostrar el modal con mensaje
                setUsuarioNoEncontrado(true);
            }
        } catch (error) {
            console.error('Error al buscar la habitacion:', error);
            setMessage('Error al buscar la habitacion.');
            setIsMessageModalOpen(true); // Mostrar el modal con mensaje
            setUsuarioNoEncontrado(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        // Calcular el número de noches y el costo total cuando las fechas cambien
        if (name === 'fecha_entrada' || name === 'fecha_salida') {
            const fechaEntrada = name === 'fecha_entrada' ? new Date(value) : new Date(formData.fecha_entrada);
            const fechaSalida = name === 'fecha_salida' ? new Date(value) : new Date(formData.fecha_salida);

            if (fechaEntrada && fechaSalida && fechaEntrada < fechaSalida) {
                const numero_noches = (fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24); // Calcular noches
                const costo_total = numero_noches * precioHabitacion; // Calcular el costo total basado en noches y precio por noche

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    numero_noches,
                    costo_total,
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/Reservas/Crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const nuevaReserva = await res.json();
                alert('Reserva creada con éxito');
                onReservaCreated(nuevaReserva);
                onClose();
                setFormData({
                    id_usuario: '',
                    id_habitacion: '',
                    fecha_reserva: '',
                    fecha_entrada: '',
                    fecha_salida: '',
                    estado_reserva: 'Confirmada',
                    numero_noches: '',
                    costo_total: ''
                });
                setUsuarioEncontrado(null);
            } else {
                console.error('Error al crear la reserva');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4 text-center">Crear Reserva</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 w-full hidden"
                        value={formData.id_usuario}
                        readOnly
                        required
                    />

                    {/* Buscar Usuario */}
                    <div className="relative mb-4">
                        <input
                            name="dni"
                            placeholder="Ingrese DNI del huésped"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Botón para buscar usuario */}
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-indigo-600 text-white font-bold py-2 mt-2 px-4 rounded-lg w-full transition-all"
                        onClick={handleBuscarUsuario}
                    >
                        Buscar Usuario
                    </button>

                    {/* Buscar Habitacion */}
                    <div className="relative mb-4 mt-2">
                        <input
                            name="numero_habitacion"
                            placeholder="Ingrese Número de habitacion"
                            value={numero_habitacion}
                            onChange={(f) => setNumero_habitacion(f.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Botón para buscar habitacion */}
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-indigo-600 text-white font-bold py-2 mt-2 px-4 rounded-lg w-full transition-all"
                        onClick={handleBuscarHabitacion}
                    >
                        Buscar Habitacion
                    </button>

                    {/* Inputs en dos columnas */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="fecha_entrada" className="block mb-2">Fecha Entrada</label>
                            <input
                                type="date"
                                name="fecha_entrada"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={formData.fecha_entrada}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="fecha_salida" className="block mb-2">Fecha Salida</label>
                            <input
                                type="date"
                                name="fecha_salida"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={formData.fecha_salida}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-2">Número de Noches</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={formData.numero_noches}
                                onChange={(e) => setFormData({ ...formData, numero_noches: e.target.value })}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Costo Total</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={formData.costo_total}
                                onChange={(e) => setFormData({ ...formData, costo_total: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={!usuarioEncontrado} // Solo permitir enviar si se encontró un usuario
                        >
                            Crear Reserva
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal para mensajes */}
            {isMessageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <p>{message}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-4 px-4 rounded-lg"
                            onClick={() => setIsMessageModalOpen(false)}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearReservaModal;
