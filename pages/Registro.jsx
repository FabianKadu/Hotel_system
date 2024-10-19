import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Registro() {
    const [formData, setFormData] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        contraseña: '',
        tipo_usuario: 'Huésped',
    });
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Función para generar una contraseña de 10 caracteres
    const generatePassword = () => {
        const password = Math.random().toString(36).slice(-10);
        setFormData({
            ...formData,
            contraseña: password,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar los datos al backend
        const response = await fetch('/api/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                contraseña: formData.contraseña,
            }),
        });

        if (response.ok) {
            alert('Usuario registrado con éxito.');
            router.push('/login');
        } else {
            alert('Error al registrar el usuario.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-5 mb-5">
                <Link href="/" aria-label="Logo">
                    <img src="./favicon.ico" width={120} className="mx-auto" />
                </Link>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Registro de Usuario</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="number"
                        name="dni"
                        placeholder="DNI"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Input para escribir o mostrar la contraseña generada */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="contraseña"
                            placeholder="Contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-blue-500"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>

                    {/* Botón para generar una contraseña */}
                    <button
                        type="button"
                        onClick={generatePassword}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-all"
                    >
                        Generar Contraseña
                    </button>

                    {/* Botón de submit */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition-all"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}
