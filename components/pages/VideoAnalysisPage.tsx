import React from 'react';
import VideoAnalysis from '../VideoAnalysis';

const VideoAnalysisPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4">Análisis de Video con IA</h1>
                <p className="text-lg text-gray-400">Extrae resúmenes, puntos clave e información valiosa de tus videos de capacitación o procesos.</p>
            </div>
            <VideoAnalysis />
        </div>
    );
};

export default VideoAnalysisPage;
