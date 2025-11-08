import React from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TutorialStep {
  title: string;
  content: string;
  page: string; // Updated to string to allow dot notation
  positioning: React.CSSProperties;
  arrow?: 'top' | 'bottom' | 'left' | 'right';
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: '¡Bienvenido al Portal!',
    content: 'Este es tu centro de bienvenida a Industrias MGP. Permítenos mostrarte las funciones clave.',
    page: 'home',
    positioning: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  },
  {
    title: 'Navegación Principal',
    content: 'Usa esta barra lateral para acceder a todas las secciones importantes del portal, desde tu inducción hasta las herramientas de IA.',
    page: 'home',
    positioning: { top: '160px', left: '280px' },
    arrow: 'left',
  },
  {
    title: 'Tu Plan de Inducción',
    content: 'Haz clic aquí para encontrar tu checklist de tareas y empezar con el pie derecho.',
    page: 'onboarding.induction',
    positioning: { top: '220px', right: '10vw' },
    arrow: 'left',
  },
  {
    title: 'Herramientas con IA',
    content: 'Hemos agrupado todas nuestras herramientas de IA aquí. Edita imágenes, analiza videos o resuelve problemas complejos.',
    page: 'ai.image',
    positioning: { top: '520px', left: '280px' },
    arrow: 'left',
  },
  {
    title: 'Asistente Virtual',
    content: '¿Tienes alguna pregunta? Nuestro asistente de IA está disponible 24/7 para ayudarte.',
    page: 'ai.image', 
    positioning: { bottom: '130px', right: '80px' },
    arrow: 'bottom',
  },
];

interface TutorialProps {
  stepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ stepIndex, onNext, onPrev, onClose }) => {
  const step = TUTORIAL_STEPS[stepIndex];
  if (!step) return null;

  const arrowClasses: { [key: string]: string } = {
    top: 'absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800',
    bottom: 'absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-800',
    left: 'absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-800',
    right: 'absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-800',
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
      <div
        style={step.positioning}
        className="fixed w-80 bg-gray-800 rounded-lg shadow-2xl p-6 z-50 animate-fade-in"
      >
        {step.arrow && <div className={arrowClasses[step.arrow]} />}
        <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-200">
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{step.content}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-400">
            {stepIndex + 1} / {TUTORIAL_STEPS.length}
          </span>
          <div className="flex gap-2">
            {stepIndex > 0 && (
              <button onClick={onPrev} className="p-2 rounded-md hover:bg-gray-700">
                <ArrowLeft size={18} />
              </button>
            )}
            <button onClick={onNext} className="bg-red-800 text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-red-900 flex items-center gap-1">
              {stepIndex === TUTORIAL_STEPS.length - 1 ? 'Finalizar' : 'Siguiente'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;