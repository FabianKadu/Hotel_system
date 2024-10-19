import Link from "next/link";
import SectionWrapper from "../../SectionWrapper";

const CTA = () => {

    const amenitiesList = [
        "Habitaciones cómodas y modernas",
        "Wifi de alta velocidad",
        "Desayuno incluido",
        "Servicio de limpieza diario",
        "Televisión con acceso a Netflix",
        "Baño privado con agua caliente",
        "Excelente ubicación en el centro de la ciudad"
    ];

    return (
        <SectionWrapper id="cta">
            {/* Fondo moderno con gradiente */}
            <div className="bg-gradient-to-tr from-slate-900 via-indigo-900 to-slate-900 py-10 pb-10 px-6">
                <div className="max-w-3xl mx-auto text-gray-100 space-y-6">
                    <h2 className="text-3xl font-semibold sm:text-4xl">
                        Disfruta de una estancia inolvidable en <span className="font-bold text-yellow-300">Hotel Cat</span>
                    </h2>
                    <p className="text-lg leading-relaxed">
                        Nuestro hotel está diseñado para brindarte la mejor experiencia, con todas las comodidades que necesitas para relajarte y disfrutar de tu visita, ya sea por negocios o placer.
                    </p>

                    {/* Lista de comodidades */}
                    <ul className="space-y-4">
                        {amenitiesList.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span className="text-base">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8">
                        ¿Listo para disfrutar de una experiencia única?{" "}
                        <Link href="/Habitaciones" className="text-yellow-300 hover:text-blue-400 inline-flex items-center gap-x-1 duration-150" scroll={false}>
                            Reserva tu habitación
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default CTA;
