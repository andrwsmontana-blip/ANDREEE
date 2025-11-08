import React from 'react';
import ImageEditor from '../ImageEditor';

const ImageEditorPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
       <div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Editor de Imágenes con IA</h1>
            <p className="text-lg text-gray-400">Sube una imagen y usa prompts de texto para realizar ediciones creativas y profesionales.</p>
        </div>
        <ImageEditor />
    </div>
  );
};

export default ImageEditorPage;
