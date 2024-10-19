import Image from "next/image";
import { useState } from "react";
import NavLink from "../NavLink";
import heroThumbnail from "../../../public/hotel-inicio.jpg"; 
import GradientWrapper from "../../GradientWrapper";
import HeroIntroVideo from "../HeroIntroVideo";

const Hero = () => {
    const [isVideoPoppedUp, setVideoPopUp] = useState(false);

    return (
        <GradientWrapper>
            <section>
                <div className="mt-32 custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
                    <div className="flex-none space-y-5 max-w-4xl xl:max-w-2xl">
                        <h1 className="text-4xl text-white font-extrabold sm:text-6xl">
                            Bienvenido a Hotel Cat
                        </h1>
                        
                        <p className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0">
                            Disfruta de una experiencia inolvidable en nuestro hotel con habitaciones modernas,
                            servicios premium y una ubicación privilegiada en el corazón de la ciudad.
                        </p>
                        <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
                            <NavLink
                                href="/Habitaciones"
                                className="block text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 py-2 px-5 rounded-lg shadow-md"
                                scroll={false}
                            >
                                Reservar ahora
                            </NavLink>
                            <NavLink
                                href="/Nosotros"
                                className="block text-gray-100 bg-gray-700 hover:bg-gray-800 py-2 px-5 mt-3 sm:mt-0 rounded-lg shadow-md"
                                scroll={false}
                            >
                                Conocer más
                            </NavLink>
                        </div>
                    </div>
                    {/* Imagen o video introductorio */}
                    <div className="flex-1 w-full sm:max-w-2xl xl:max-w-xl">
                        <div className="relative">
                            <Image src={heroThumbnail} className="rounded-lg w-full" alt="Hotel Paraíso del Sol" />
                            <button
                                aria-label="Reproducir video de introducción"
                                className="absolute w-14 h-10 rounded-lg inset-0 m-auto duration-150 bg-gray-800 hover:bg-gray-700 ring-offset-2 focus:ring text-white"
                                onClick={() => setVideoPopUp(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Video emergente */}
                {isVideoPoppedUp && (
                    <HeroIntroVideo onClose={() => setVideoPopUp(false)} />
                )}
            </section>
        </GradientWrapper>
    );
};

export default Hero;
