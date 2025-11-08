import React from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
      <header className="relative rounded-xl overflow-hidden shadow-lg">
        <img src="https://picsum.photos/1200/400?grayscale&blur=2" alt="Office Banner" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h1 className="text-4xl font-extrabold text-white">
            Bienvenido a bordo, nuevo miembro del equipo
          </h1>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-gray-800 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">Carta de Bienvenida</h2>
          <p className="text-gray-300 leading-relaxed">
            En nombre de toda la gerencia y el equipo de Industrias MGP, te extendemos la más cálida bienvenida. Estamos encantados de que te unas a nosotros. Tu talento y perspectiva son una valiosa adición a nuestra misión. Creemos que juntos alcanzaremos nuevas cimas de éxito e innovación. ¡Prepárate para un viaje emocionante!
          </p>
          <p className="mt-4 text-gray-300 font-semibold">- La Gerencia</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
            <PlayCircle className="h-20 w-20 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white">Video de Bienvenida</h3>
            <p className="text-gray-400 mt-2">Un mensaje de nuestro equipo para ti. ¡Haz clic para ver!</p>
            <button className="mt-4 bg-red-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-900 transition-colors">
                Ver Video
            </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Accesos Rápidos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAccessCard title="Iniciar mi Inducción" description="Comienza tu viaje de aprendizaje y conoce tus primeras tareas." />
          <QuickAccessCard title="Conocer la Empresa" description="Explora nuestra historia, misión, visión y valores." />
          <QuickAccessCard title="Procesos RRHH" description="Información clave sobre nómina, vacaciones y más." />
          <QuickAccessCard title="Directorio de Contacto" description="Encuentra a tus compañeros y contactos clave." />
        </div>
      </div>
    </div>
  );
};

const QuickAccessCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
        <h3 className="text-lg font-bold text-red-500 mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex justify-end">
            <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-red-600 transition-colors" />
        </div>
    </div>
);

export default HomePage;