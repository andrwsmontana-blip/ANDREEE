import React from 'react';

const SafetyPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Seguridad y Salud (SST)</h1>
            <p className="text-lg text-gray-400">Procedimientos y políticas para garantizar un entorno de trabajo seguro.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-md space-y-6">
            <h3 className="text-2xl font-bold text-white">Tu Bienestar es Nuestra Prioridad</h3>
            <p className="text-gray-300">En Industrias MGP, la seguridad es un compromiso de todos. Aquí encontrarás las políticas y procedimientos clave para garantizar un entorno de trabajo seguro y saludable.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
                <li>Política de uso de Equipo de Protección Personal (EPP).</li>
                <li>Procedimiento de reporte de incidentes y actos inseguros.</li>
                <li>Plan de emergencias y rutas de evacuación.</li>
                <li>Programas de pausas activas y ergonomía en el puesto de trabajo.</li>
            </ul>
        </div>
    </div>
);

export default SafetyPage;
