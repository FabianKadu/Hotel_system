export default () => {

    const testimonials = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Martin escobar",
            title: "Huésped",
            quote: "La estancia en Hotel fue maravillosa. El personal fue muy amable y las instalaciones superaron mis expectativas. ¡Recomendado al 100%!"
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Angela stian",
            title: "Huésped",
            quote: "Un lugar perfecto para descansar después de un día lleno de actividades. Las habitaciones son cómodas y los servicios como el WiFi y Netflix fueron de gran ayuda."
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Karim ahmed",
            title: "Huésped",
            quote: "El Hotel Paraíso del Sol es acogedor y cómodo. Me encantó el servicio de limpieza diario y la atención personalizada. ¡Definitivamente volveré!"
        },
    ]

    return (
        <section className="">
            <div className=" mx-auto px-4 md:px-8 bg-gray-800 pt-10 pb-10 ">
                <div className="max-w-xl sm:text-center md:mx-auto">
                    <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                        Descubre lo que nuestros huéspedes dicen sobre nosotros
                    </h3>
                    <p className="mt-3 text-gray-400 ">
                        La experiencia de nuestros visitantes habla por sí misma. Con servicios excepcionales y atención personalizada, Hotel se ha convertido en el favorito de quienes buscan confort y relajación.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            testimonials.map((item, idx) => (
                                <li key={idx} className="bg-gray-100 p-4 rounded-xl">
                                    <figure>
                                        <div className="flex items-center gap-x-4">
                                            <img src={item.avatar} className="w-16 h-16 rounded-full" />
                                            <div>
                                                <span className="block text-gray-800 font-semibold">{item.name}</span>
                                                <span className="block text-gray-600 text-sm mt-0.5">{item.title}</span>
                                            </div>
                                        </div>
                                        <blockquote>
                                            <p className="mt-6 text-gray-700">
                                                {item.quote}
                                            </p>
                                        </blockquote>
                                    </figure>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}