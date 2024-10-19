import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Perfil() {
    const [user, setUser] = useState(null); // Almacena los datos del usuario logueado
    const [reservas, setReservas] = useState([]); // Almacena las reservas del usuario
    const router = useRouter();

    useEffect(() => {
        // Verificar si el usuario está logueado
        const usuarioGuardado = localStorage.getItem('usuario');
        if (!usuarioGuardado) {
            router.push('/login'); // Redirigir al login si no está logueado
        } else {
            const userData = JSON.parse(usuarioGuardado);
            setUser(userData);

            // Obtener las reservas del usuario
            fetch(`/api/Reservas/ReservasPorId/${userData.id_usuario}`)
                .then((res) => res.json())
                .then((reservasData) => {
                    setReservas(reservasData); // Guardar las reservas del usuario
                })
                .catch((error) => {
                    console.error('Error al obtener las reservas:', error);
                });
        }
    }, [router]);

    if (!user) {
        return <div>Cargando perfil...</div>; // Mostrar mensaje de carga mientras se obtienen los datos del usuario
    }

    return (
        <div className="container mx-auto mt-32">
            {/* Mostrar los detalles del usuario */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4"></div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                    {/* Imagen centrada */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/foto.jpg"
                            alt="Foto de perfil"
                            className="rounded-full w-32 h-32 object-cover shadow-md"
                        />
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                        {user.nombre} {user.apellido}
                    </h1>
                    <p className="text-gray-600 mb-6">{user.email}</p>

                    <p className="text-lg">
                        <strong className="text-gray-700">DNI:</strong> {user.dni}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-700">Teléfono:</strong> {user.telefono}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-700">Dirección:</strong> {user.direccion}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-700">Puntos disponibles:</strong> {user.puntos}
                    </p>
                </div>
                <div className="p-4"></div>
            </div>

            {/* Mostrar la tabla de reservas del usuario */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mis Reservas</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-6 py-4 text-left">#</th>
                                <th className="px-6 py-4 text-left">Habitación</th>
                                <th className="px-6 py-4 text-left">Fecha de Entrada</th>
                                <th className="px-6 py-4 text-left">Fecha de Salida</th>
                                <th className="px-6 py-4 text-left">Estado</th>
                                <th className="px-6 py-4 text-left">Costo Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservas.map((reserva, index) => (
                                <tr key={reserva.id_reserva} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{`Habitación ${reserva.habitacion.numero_habitacion}`}</td>
                                    <td className="px-6 py-4">
                                        {new Date(reserva.fecha_entrada).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(reserva.fecha_salida).toLocaleDateString()}
                                    </td>
                                    <td className={`px-6 py-4 font-semibold ${reserva.estado_reserva === 'Confirmada' ? 'text-red-600' : 'text-green-600'
                                        }`}>
                                        {reserva.estado_reserva}
                                    </td>
                                    <td className="px-6 py-4">S/. {reserva.costo_total}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
