export default function AboutUs() {
    return (
        <section className="relative py-16 bg-gray-100">
            <div className="mt-32 container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
                        Sobre Nosotros
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        En Hotel Paraíso del Sol, nos dedicamos a ofrecer a nuestros huéspedes una experiencia única y placentera, con la máxima comodidad y servicios de alta calidad.
                        Descubre más sobre quiénes somos y por qué somos el lugar ideal para tu próxima estancia.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    {/* Sección de Misión */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-800">Nuestra Misión</h3>
                        <p className="mt-3 text-gray-600">
                            Nuestra misión es ofrecer una experiencia de hospitalidad excepcional, donde cada detalle está diseñado para satisfacer las necesidades de nuestros huéspedes.
                            Nos esforzamos por combinar el lujo y la comodidad en un ambiente acogedor y moderno.
                        </p>
                    </div>

                    {/* Sección de Visión */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-800">Nuestra Visión</h3>
                        <p className="mt-3 text-gray-600">
                            Aspiramos a ser reconocidos como uno de los mejores hoteles de la región, conocidos por nuestra excelencia en el servicio y nuestra atención personalizada,
                            creando recuerdos inolvidables para nuestros huéspedes.
                        </p>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {/* Valor 1 */}
                    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold text-gray-800">Calidad</h4>
                        <p className="mt-2 text-gray-600">
                            Nos comprometemos a brindar la más alta calidad en cada uno de nuestros servicios y espacios.
                        </p>
                    </div>

                    {/* Valor 2 */}
                    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold text-gray-800">Hospitalidad</h4>
                        <p className="mt-2 text-gray-600">
                            Nuestra prioridad es hacerte sentir como en casa, con un servicio amable y cercano.
                        </p>
                    </div>

                    {/* Valor 3 */}
                    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold text-gray-800">Innovación</h4>
                        <p className="mt-2 text-gray-600">
                            Incorporamos las últimas tendencias en hospitalidad y tecnología para mejorar la experiencia de nuestros huéspedes.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800">¿Por qué elegirnos?</h3>
                    <p className="mt-4 text-lg text-gray-600">
                        En Hotel Paraíso del Sol, ofrecemos más que solo una habitación. Ofrecemos una experiencia completa, desde habitaciones modernas hasta servicios de spa, piscina y gastronomía de primera calidad.
                        Cada huésped es especial para nosotros, y nos enorgullecemos de ofrecer un servicio personalizado y de alta calidad.
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]" style={{ background: "linear-gradient(106.89deg, rgba(79, 70, 229, 0.4) 15.73%, rgba(232, 121, 249, 0.26) 56.49%, rgba(14, 165, 233, 0.41) 115.91%)" }}></div>
        </section>
    );
}
