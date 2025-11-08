import React from 'react';
import StrategicAnalysis from '../StrategicAnalysis';

const StrategicAnalysisPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4">Análisis Estratégico con IA</h1>
                <p className="text-lg text-gray-400">Utiliza el modo de pensamiento profundo de la IA para resolver problemas complejos y obtener análisis detallados.</p>
            </div>
            <StrategicAnalysis />
        </div>
    );
};

export default StrategicAnalysisPage;
