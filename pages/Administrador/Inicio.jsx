import Layout from '../../components/ui/NavbarAdm/Layout';

const Inicio = () => {
    return (
        <Layout>
            {/* Fondo decorado con animación */}
            <div className="relative min-h-full flex items-center justify-center bg-gray-100 overflow-hidden">
                {/* Fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x opacity-75"></div>

                {/* Contenido centrado en 3 columnas */}
                <div className="grid grid-cols-3 items-center justify-center relative z-10">
                    {/* Columna izquierda vacía */}
                    <div></div>

                    {/* Contenido centrado en la columna del medio */}
                    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
                        <img
                            src="/favicon.ico"
                            alt="Logo del hotel"
                            className="w-32 h-32 mb-4"
                        />
                        {/* Nombre del hotel */}
                        <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">
                            Hotel Cat
                        </h1>
                        <p className="text-gray-600 text-xl text-center">
                            Bienvenido al Panel de Administración
                        </p>
                    </div>

                    {/* Columna derecha vacía */}
                    <div></div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient-x {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 10s ease infinite;
        }
    `}</style>
        </Layout>

    );
};

export default Inicio;
