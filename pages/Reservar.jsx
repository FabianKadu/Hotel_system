import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Reservar() {
    const [habitacion, setHabitacion] = useState(null); // Almacena los datos de la habitación
    const [formData, setFormData] = useState({
        id_habitacion: '',
        numero_habitacion: '',
        fecha_entrada: '',
        fecha_salida: '',
        numero_noches: 0,
        costo_total: 0,
    });
    const [user, setUser] = useState(null);
    const [precioPorNoche, setPrecioPorNoche] = useState(0); // Precio por noche de la habitación
    const router = useRouter();

    useEffect(() => {
        // Verificar si el usuario está logueado
        const usuarioGuardado = localStorage.getItem('usuario');
        if (!usuarioGuardado) {
            router.push('/login'); // Redirigir al login si no está logueado
        } else {
            setUser(JSON.parse(usuarioGuardado));
        }

        // Obtener el ID de la habitación desde la URL
        const { id_habitacion } = router.query;
        if (id_habitacion) {
            // Hacer la solicitud a la API para obtener los detalles de la habitación
            fetch(`/api/Habitaciones/Habitaciones_por_Id/${id_habitacion}.js`)
                .then((res) => res.json())
                .then((habitacionData) => {
                    // Guardar los datos de la habitación en el estado
                    setHabitacion(habitacionData);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        id_habitacion: habitacionData.id_habitacion,
                        numero_habitacion: habitacionData.numero_habitacion,
                    }));
                    setPrecioPorNoche(habitacionData.precio_por_noche); // Guardar el precio por noche
                })
                .catch((error) => {
                    console.error('Error al obtener los detalles de la habitación:', error);
                });
        }
    }, [router.query]);

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
                const costo_total = numero_noches * precioPorNoche; // Calcular el costo total basado en noches y precio por noche

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

        const formattedFechaEntrada = new Date(formData.fecha_entrada + 'T00:00:00');
        const formattedFechaSalida = new Date(formData.fecha_salida + 'T00:00:00');

        const reservaData = {
            id_usuario: user.id_usuario, // ID del usuario logueado
            id_habitacion: formData.id_habitacion, // ID de la habitación
            fecha_entrada: formattedFechaEntrada.toISOString().split('T')[0],
            fecha_salida: formattedFechaSalida.toISOString().split('T')[0],
            numero_noches: formData.numero_noches,
            costo_total: formData.costo_total,
        };

        const response = await fetch('/api/Reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservaData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Reserva creada con éxito');
            // Redirigir o hacer otra acción después de la creación exitosa
        } else {
            alert(data.error || 'Error al crear la reserva');
        }
    };


    if (!habitacion) {
        return <div>Cargando detalles de la habitación...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="mt-12 min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Reservar Habitación</h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Mostrar el nombre completo de la habitación */}
                    <div>
                        <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la Habitación
                        </label>
                        <input
                            type="text"
                            name="nombre_completo"
                            value={`Habitación ${formData.numero_habitacion}`} // Combinar nombre y número
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Fecha de Entrada */}
                        <div>
                            <label htmlFor="fecha_entrada" className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de Entrada
                            </label>
                            <input
                                type="date"
                                name="fecha_entrada"
                                value={formData.fecha_entrada}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Fecha de Salida */}
                        <div>
                            <label htmlFor="fecha_salida" className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de Salida
                            </label>
                            <input
                                type="date"
                                name="fecha_salida"
                                value={formData.fecha_salida}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Mostrar el número de noches */}
                    <div>
                        <label htmlFor="numero_noches" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Noches
                        </label>
                        <input
                            type="text"
                            name="numero_noches"
                            value={formData.numero_noches}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none"
                        />
                    </div>

                    {/* Mostrar el costo total */}
                    <div>
                        <label htmlFor="costo_total" className="block text-sm font-medium text-gray-700 mb-1">
                            Costo Total
                        </label>
                        <input
                            type="text"
                            name="costo_total"
                            value={`$${formData.costo_total.toFixed(2)}`} // Mostrar con dos decimales
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none"
                        />
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Reservar
                    </button>
                </form>
            </div>
        </div>
    );
}
