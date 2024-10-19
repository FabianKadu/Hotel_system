import { useState } from 'react';

const CrearReservaModal = ({ isOpen, onClose, onReservaCreated }) => {
    // Estado para manejar los datos del formulario
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

    // Función para manejar el envío del formulario
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
                // Notificar al componente padre que la reserva ha sido creada
                onReservaCreated(nuevaReserva);
                // Cerrar el modal
                onClose();
                // Limpiar el formulario
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
            } else {
                console.error('Error al crear la reserva');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // Si el modal no está abierto, no mostrar nada
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Crear Reserva</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">ID Usuario</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.id_usuario}
                            onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">ID Habitación</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.id_habitacion}
                            onChange={(e) => setFormData({ ...formData, id_habitacion: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Fecha Reserva</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.fecha_reserva}
                            onChange={(e) => setFormData({ ...formData, fecha_reserva: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Fecha Entrada</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.fecha_entrada}
                            onChange={(e) => setFormData({ ...formData, fecha_entrada: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Fecha Salida</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.fecha_salida}
                            onChange={(e) => setFormData({ ...formData, fecha_salida: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Número de Noches</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.numero_noches}
                            onChange={(e) => setFormData({ ...formData, numero_noches: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Costo Total</label>
                        <input
                            type="number"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={formData.costo_total}
                            onChange={(e) => setFormData({ ...formData, costo_total: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
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
                        >
                            Crear Reserva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearReservaModal;
