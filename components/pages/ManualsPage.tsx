import React from 'react';
import { BookUser, FileText, PenSquare, UserCheck } from 'lucide-react';

const ManualsPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Manual de Funciones y Vinculación Laboral</h1>
            <p className="text-lg text-gray-400">Documentación clave para entender tu rol y formalizar tu ingreso.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="flex items-start space-x-4">
                 <div className="bg-red-900/50 p-3 rounded-lg">
                    <BookUser className="h-8 w-8 text-red-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Tu Guía para el Éxito</h3>
                    <p className="text-gray-300 mt-1">
                        El Manual de Funciones es una herramienta esencial que define las expectativas y responsabilidades de tu cargo. Junto con el proceso de vinculación, asegura una incorporación clara y ordenada a la estructura de Industrias MGP.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center"><FileText className="h-5 w-5 mr-2" /> Contenido del Manual</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Descripción general y objetivo del cargo.</li>
                        <li>Listado de responsabilidades y funciones principales.</li>
                        <li>Competencias y habilidades requeridas.</li>
                        <li>Ubicación en el organigrama y líneas de reporte.</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center"><UserCheck className="h-5 w-5 mr-2" /> Proceso de Vinculación</h4>
                     <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Firma del contrato laboral y acuerdos de confidencialidad.</li>
                        <li>Entrega de documentación requerida (identificación, certificados).</li>
                        <li>Realización de exámenes médicos de ingreso.</li>
                        <li>Afiliación al sistema de seguridad social.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default ManualsPage;
