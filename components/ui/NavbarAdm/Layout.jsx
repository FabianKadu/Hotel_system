import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Navbar izquierdo fijo */}
            <aside className="w-64 bg-gray-900 text-white p-6 fixed h-full flex flex-col justify-between">
                {/* Título del panel */}
                <div>
                    <h2 className="text-center text-2xl font-bold mb-10">Administrador</h2>
                    <ul className="space-y-2">
                        <li className={currentPath === '/Administrador/Inicio' ? 'bg-gray-700 p-3 rounded-lg' : 'p-3'}>
                            <Link href="/Administrador/Inicio" className={`block hover:bg-gray-700 p-2 rounded-lg transition duration-200 ${currentPath === '/Administrador/Inicio' ? 'bg-gray-700' : ''}`}>
                                Inicio
                            </Link>
                        </li>
                        <li className={currentPath === '/Administrador/Habitaciones' ? 'bg-gray-700 p-3 rounded-lg' : 'p-3'}>
                            <Link href="/Administrador/Habitaciones" className={`block hover:bg-gray-700 p-2 rounded-lg transition duration-200 ${currentPath === '/Administrador/Habitaciones' ? 'bg-gray-700' : ''}`}>
                                Habitaciones
                            </Link>
                        </li>
                        <li className={currentPath === '/Administrador/Usuarios' ? 'bg-gray-700 p-3 rounded-lg' : 'p-3'}>
                            <Link href="/Administrador/Usuarios" className={`block hover:bg-gray-700 p-2 rounded-lg transition duration-200 ${currentPath === '/Administrador/Usuarios' ? 'bg-gray-700' : ''}`}>
                                Usuarios
                            </Link>
                        </li>
                        <li className={currentPath === '/Administrador/Reservas' ? 'bg-gray-700 p-3 rounded-lg' : 'p-3'}>
                            <Link href="/Administrador/Reservas" className={`block hover:bg-gray-700 p-2 rounded-lg transition duration-200 ${currentPath === '/Administrador/Reservas' ? 'bg-gray-700' : ''}`}>
                                Reservas
                            </Link>
                        </li>
                    </ul>

                    {/* Botón de volver */}
                    <div className="mt-60 text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-red-600 transition"
                        >
                            Volver a inicio
                        </button>
                    </div>
                </div>

                {/* Footer en el sidebar (opcional) */}
                <div className="text-center text-sm text-gray-400 mt-8">
                    © 2024 Wholy System
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="ml-64 p-8  min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
