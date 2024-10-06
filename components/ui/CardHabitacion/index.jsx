import { useRouter } from "next/router";

function CardHabitacion({ habitacion }) {

    const router = useRouter();

    const handleReservar = () => {
        // Redirigir a la página de reserva pasando solo el ID de la habitación
        router.push({
            pathname: '/Reservar',
            query: { id_habitacion: habitacion.id_habitacion }, // Solo se pasa el ID por URL
        });
    };

    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img class="w-full h-48 object-cover" src={"./images.jpg"} alt="Habitación de hotel" />

            <div class="px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="font-bold text-xl dark:text-black">Habitacion {habitacion.numero_habitacion}</div>
                    <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75l.924 1.894a1.125 1.125 0 00.846.616l2.082.303-1.506 1.468a1.125 1.125 0 00-.324.996l.355 2.068-1.86-.978a1.125 1.125 0 00-1.048 0l-1.86.978.355-2.068a1.125 1.125 0 00-.324-.996L8.148 9.563l2.082-.303a1.125 1.125 0 00.846-.616L12 6.75z" />
                        </svg>
                        {habitacion.tipo_habitacion}
                    </span>
                </div>

                <p class="text-gray-700 text-base mt-2">
                    {habitacion.descripcion}
                </p>

                <div class="flex items-center mt-4 space-x-4 text-gray-600">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12h.008v.008h-.008V12zm0 0h.008v.008h-.008V12zM12 12v.008h.008V12H12zM3.75 12h.008v.008H3.75V12zm0 0h.008v.008H3.75V12zM12 12v.008h.008V12H12z" />
                        </svg>
                        <span class="ml-1">Wi-Fi Gratis</span>
                    </div>

                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" class="w-5 h-5 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75l.924 1.894a1.125 1.125 0 00.846.616l2.082.303-1.506 1.468a1.125 1.125 0 00-.324.996l.355 2.068-1.86-.978a1.125 1.125 0 00-1.048 0l-1.86.978.355-2.068a1.125 1.125 0 00-.324-.996L8.148 9.563l2.082-.303a1.125 1.125 0 00.846-.616L12 6.75z" />
                        </svg>
                        <span class="ml-1">Desayuno Incluido</span>
                    </div>

                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" class="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12l-9-6-9 6 9 6 9-6z" />
                        </svg>
                        <span class="ml-1">Piscina</span>
                    </div>
                </div>
            </div>

            <div class="px-6 pt-4 pb-6">
                <div class="flex items-center justify-between">
                    <span class="text-gray-900 font-bold text-xl">S/. {habitacion.precio_por_noche}.00 /    noche</span>
                    <button onClick={handleReservar} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Reservar
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CardHabitacion