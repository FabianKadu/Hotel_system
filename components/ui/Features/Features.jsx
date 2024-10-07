import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faWifi, faCoffee, faSwimmer, faBriefcase, faTv } from '@fortawesome/free-solid-svg-icons';

export default () => {

    const features = [
        {
            icon: <FontAwesomeIcon icon={faBed} className="w-6 h-6" />,
            title: "Habitaciones modernas",
            desc: "Disfruta de habitaciones cómodas y totalmente equipadas con diseño moderno, ideales para relajarse después de un largo día."
        },
        {
            icon: <FontAwesomeIcon icon={faWifi} className="w-6 h-6" />,
            title: "WiFi gratuito",
            desc: "Conéctate fácilmente con nuestro servicio de WiFi de alta velocidad disponible en todas las áreas del hotel."
        },
        {
            icon: <FontAwesomeIcon icon={faCoffee} className="w-6 h-6" />,
            title: "Desayuno incluido",
            desc: "Comienza tu día con un delicioso desayuno buffet gratuito con una amplia selección de comidas frescas y saludables."
        },
        {
            icon: <FontAwesomeIcon icon={faSwimmer} className="w-6 h-6" />,
            title: "Piscina y spa",
            desc: "Relájate en nuestra piscina al aire libre o disfruta de nuestros tratamientos de spa, diseñados para ofrecer una experiencia de bienestar."
        },
        {
            icon: <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6" />,
            title: "Centro de negocios",
            desc: "Disponemos de un centro de negocios equipado con impresoras, escáneres y salas de reuniones para tus necesidades profesionales."
        },
        {
            icon: <FontAwesomeIcon icon={faTv} className="w-6 h-6" />,
            title: "Televisión con acceso a Netflix",
            desc: "Relájate en la comodidad de tu habitación mientras disfrutas de tus series y películas favoritas en Netflix."
        },
    ];

    return (
        <section className="py-14">
            <div className="bg-gradient-to-b from-white via-blue-100 to-white mx-auto px-4 text-center text-gray-600 md:px-8">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Todo lo que necesitas para una estancia perfecta
                    </h3>
                    <p className="mt-3">
                        Disfruta de nuestras excelentes instalaciones y servicios de primera categoría diseñados para ofrecerte una experiencia inolvidable.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((item, idx) => (
                            <li key={idx} className="space-y-3">
                                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h4 className="text-lg text-gray-800 font-semibold">
                                    {item.title}
                                </h4>
                                <p>
                                    {item.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
