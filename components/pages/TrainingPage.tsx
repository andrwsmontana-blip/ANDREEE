import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const TrainingPage: React.FC = () => (
  <div className="animate-fade-in-up space-y-8">
    <div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Capacitación y Desarrollo</h1>
        <p className="text-lg text-gray-400">Tu ruta para el aprendizaje y crecimiento continuo en la empresa.</p>
    </div>
    <div className="bg-gray-800 p-8 rounded-xl shadow-md space-y-10">
        <div>
            <h3 className="text-2xl font-bold text-white mb-6">Aprendizaje y Crecimiento Continuo</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <InfoCard icon={<Calendar className="text-red-500" />} title="Calendario de Capacitaciones" description="Mantente al día con los próximos cursos, talleres y seminarios programados." />
                <InfoCard icon={<GraduationCap className="text-yellow-500" />} title="Biblioteca de Cursos" description="Accede a nuestro repositorio de tutoriales, videos y material de aprendizaje a tu propio ritmo." />
            </div>
        </div>
    </div>
  </div>
);

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-700 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{icon}</div>
            <h4 className="font-bold text-lg text-white">{title}</h4>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
    </div>
);


export default TrainingPage;
