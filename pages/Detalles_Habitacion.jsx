import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

export default function DetallesHabitacion() {
    
    const [habitacion, setHabitacion] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0); // Estado para la imagen principal
    const router = useRouter();
    const { id_habitacion } = router.query;

    const fetchDetallesHabitacion = async () => {
        if (id_habitacion) {
            try {
                const response = await fetch(`/api/Habitaciones_por_Id/${id_habitacion}`);
                const habitacionData = await response.json();
                setHabitacion(habitacionData);
            } catch (error) {
                console.error('Error al obtener los detalles de la habitación:', error);
            }
        }
    };

    useEffect(() => {
        fetchDetallesHabitacion();
    }, [id_habitacion]);

    if (!habitacion) {
        return <div>Cargando detalles de la habitación...</div>;
    }

    // Crear rutas dinámicas para las imágenes en base al número de la habitación
    const imagenes = [
        `/habitacion${habitacion.numero_habitacion}.jpg`,
        `/habitacion${habitacion.numero_habitacion}1.jpg`,
        `/habitacion${habitacion.numero_habitacion}2.jpg`,
        `/habitacion${habitacion.numero_habitacion}3.jpg`,
        `/habitacion${habitacion.numero_habitacion}4.jpg`
    ];

    return (
        <div className="container mx-auto mt-32 p-8 bg-white rounded-lg shadow-xl">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">{`Habitación ${habitacion.numero_habitacion}`}</h1>

            {/* Galería de fotos de la habitación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fotos de la Habitación</h2>

                    {/* Imagen principal */}
                    <div className="mb-4">
                        <img src={imagenes[selectedImage]} alt={`Imagen ${selectedImage + 1}`} className="rounded-lg shadow-lg object-cover w-full h-72" />
                    </div>

                    {/* Miniaturas de las imágenes */}
                    <div className="flex space-x-4">
                        {imagenes.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Miniatura ${index + 1}`}
                                className={`cursor-pointer rounded-lg shadow-md object-cover w-24 h-24 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => setSelectedImage(index)} // Cambiar la imagen principal al hacer clic
                            />
                        ))}
                    </div>
                </div>

                {/* Detalles de la habitación */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de la Habitación</h2>
                    <div className="text-gray-600 space-y-2">
                        <p className="text-lg"><strong className="text-gray-700">Tipo de Habitación:</strong> {habitacion.tipo_habitacion}</p>
                        <p className="text-lg"><strong className="text-gray-700">Precio por Noche:</strong> s/. {habitacion.precio_por_noche}.00</p>
                        <p className="text-lg"><strong className="text-gray-700">Estado:</strong> {habitacion.estado_habitacion}</p>
                        <div className="mt-6">
                            <p className="text-lg"><strong className="text-gray-700">Descripción:</strong></p>
                            <p className="text-gray-600 mt-2">{habitacion.descripcion}</p>
                        </div>
                    </div>

                    {/* Servicios fijos con iconos */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Servicios Incluidos</h2>
                        <ul className="list-none text-lg text-gray-600 space-y-2">
                            <li className="flex items-center">
                                <i className="fas fa-wifi text-green-500 mr-3"></i> Wifi
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-shower text-green-500 mr-3"></i> Agua caliente
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-tv text-green-500 mr-3"></i> Televisión con Netflix
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-broom text-green-500 mr-3"></i> Servicio de limpieza diario
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-bath text-green-500 mr-3"></i> Baño privado
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-utensils text-green-500 mr-3"></i> Desayuno incluido
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
