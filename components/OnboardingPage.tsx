import React, { useState } from 'react';
import { CheckCircle, Circle, Download, Briefcase } from 'lucide-react';

const tasks = [
  { id: 1, text: "Firma tu contrato digital en la plataforma de RRHH." },
  { id: 2, text: "Configura tu correo electrónico y herramientas de comunicación." },
  { id: 3, text: "Completa el tour virtual de las instalaciones." },
  { id: 4, text: "Reúnete con tu mentor asignado para una introducción." },
  { id: 5, text: "Asiste a la reunión de bienvenida con tu equipo." },
  { id: 6, text: "Revisa los objetivos y expectativas para tu primer mes." }
];

const OnboardingPage: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (taskId: number) => {
    setCompletedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="animate-fade-in-up space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Tu Inducción</h1>
        <p className="text-lg text-gray-400">Tu guía paso a paso para un comienzo exitoso en Industrias MGP.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-white mb-6">Checklist de tu Primera Semana</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-center p-4 rounded-lg cursor-pointer transition-colors bg-gray-700 hover:bg-gray-600"
              >
                {completedTasks.includes(task.id) ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400 mr-4 flex-shrink-0" />
                )}
                <span className={`flex-grow ${completedTasks.includes(task.id) ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Briefcase className="h-7 w-7 mr-3 text-red-500"/>
                  Estructura Organizacional
                </h2>
                <p className="text-gray-300 mb-4">Conoce cómo estamos organizados. Haz clic en la imagen para ampliar.</p>
                <img src="https://picsum.photos/800/500?graph" alt="Organigrama" className="w-full h-auto rounded-lg shadow-inner cursor-pointer" />
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-white mb-6">Documentos Importantes</h2>
                <ul className="space-y-3">
                    <DocumentLink title="Manual de Bienvenida" />
                    <DocumentLink title="Reglamento Interno de Trabajo" />
                    <DocumentLink title="Código de Ética y Conducta" />
                    <DocumentLink title="Política de Seguridad y Salud" />
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

const DocumentLink: React.FC<{ title: string }> = ({ title }) => (
    <a href="#" className="flex items-center justify-between p-3 bg-red-900/50 rounded-lg hover:bg-red-900 transition-colors group">
        <span className="font-semibold text-red-200">{title}</span>
        <Download className="h-5 w-5 text-red-300 group-hover:scale-110 transition-transform" />
    </a>
);

export default OnboardingPage;