import CardHabitacion from "../CardHabitacion";
import { useEffect, useState } from 'react';

export default () => {
    const [habitaciones, setHabitaciones] = useState([]);

    useEffect(() => {
        fetch('/api/Habitaciones')
            .then((response) => response.json())
            .then((data) => setHabitaciones(data));
    }, []);

    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center mt-32">
                <h1 className="text-3xl text-gray-800 font-semibold dark:text-gray-300">
                    Habitaciones
                </h1>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                    Descubre el confort y la modernidad de nuestras habitaciones en Hotel _, donde cada detalle está diseñado para tu comodidad. ¡Relájate y disfruta de una estancia inolvidable!
                </p>
            </div>
            <div className="my-10 mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {
                    habitaciones.map((habitacion) => (
                        <CardHabitacion key={habitacion.id_habitacion} habitacion={habitacion} />
                    ))
                }
            </div>
        </section>
    )
}
