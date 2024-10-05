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
            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold dark:text-gray-300">
                    Habitaciones
                    <hr />
                </h1>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                    descripcion descripcion descripcion descripcion.
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
