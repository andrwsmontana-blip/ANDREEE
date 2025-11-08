import React from 'react';
import { UserSearch, CheckSquare, Users, Award } from 'lucide-react';

const PreselectionPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Pre selección y Selección de Personal</h1>
            <p className="text-lg text-gray-400">Nuestro compromiso con atraer y contratar al mejor talento.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="flex items-start space-x-4">
                <div className="bg-red-900/50 p-3 rounded-lg">
                    <UserSearch className="h-8 w-8 text-red-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Proceso de Selección de Talento</h3>
                    <p className="text-gray-300 mt-1">
                        En Industrias MGP, creemos que nuestro éxito reside en nuestro equipo. Por ello, nuestro proceso de selección está diseñado para identificar a profesionales apasionados que compartan nuestros valores y deseen crecer con nosotros. Buscamos no solo habilidades, sino también potencial y una gran actitud.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Fases de Nuestro Proceso</h4>
                <div className="grid md:grid-cols-3 gap-6">
                    <PhaseCard 
                        icon={<CheckSquare className="text-blue-400"/>} 
                        title="1. Publicación y Búsqueda" 
                        description="Identificamos las necesidades del equipo y publicamos la vacante en diversos canales. Realizamos una búsqueda activa para encontrar a los mejores candidatos." 
                    />
                    <PhaseCard 
                        icon={<Users className="text-yellow-400"/>} 
                        title="2. Entrevistas y Evaluaciones" 
                        description="Los candidatos preseleccionados participan en entrevistas con RRHH y el líder del área. Se pueden aplicar pruebas técnicas para evaluar competencias." 
                    />
                    <PhaseCard 
                        icon={<Award className="text-green-400"/>} 
                        title="3. Oferta y Contratación" 
                        description="Al candidato seleccionado se le presenta una oferta formal. Una vez aceptada, iniciamos el proceso de vinculación para darle la bienvenida al equipo." 
                    />
                </div>
            </div>
        </div>
    </div>
);

const PhaseCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-700 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{icon}</div>
            <h4 className="font-bold text-lg text-white">{title}</h4>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
    </div>
);

export default PreselectionPage;
