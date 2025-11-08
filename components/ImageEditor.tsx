import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { UploadCloud, Wand2, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { fileToBase64 } from '../utils/helpers';

const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateImage = useCallback(async () => {
    if (!file || !prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Data = await fileToBase64(file);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: file.type } },
            { text: prompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const firstPart = response.candidates?.[0]?.content.parts[0];
      if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
        const base64ImageBytes = firstPart.inlineData.data;
        setEditedImage(`data:${firstPart.inlineData.mimeType};base64,${base64ImageBytes}`);
      } else {
        throw new Error("No se pudo generar la imagen. La respuesta no contiene datos de imagen.");
      }
    } catch (err) {
      console.error("Image generation error:", err);
      setError("No se pudo generar la imagen. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [file, prompt, isLoading, ai.models]);

  const reset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setFile(null);
    setError(null);
  };
  
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
        <Sparkles className="h-8 w-8 text-red-400 mr-3" />
        Editor de Imágenes con IA
      </h2>
      <p className="text-gray-400 mb-6">
        Sube una foto de perfil o de equipo y usa la IA para hacer ediciones creativas.
      </p>

      {!originalImage ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
          <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
          <span className="font-semibold text-gray-300">Haz clic para subir una imagen</span>
          <span className="text-sm text-gray-400">PNG, JPG, o WEBP</span>
          <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleImageUpload} />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ImageDisplay title="Original" imageSrc={originalImage} />
            <ImageDisplay title="Editada" imageSrc={editedImage} isLoading={isLoading} />
          </div>

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: 'Añade un filtro retro' o 'Conviértelo en un dibujo animado'"
                className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={generateImage} disabled={isLoading || !prompt} className="flex-1 sm:flex-auto flex items-center justify-center gap-2 bg-red-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-900 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                <span>Generar</span>
              </button>
              <button onClick={reset} className="flex-1 sm:flex-auto flex items-center justify-center gap-2 bg-gray-600 text-gray-200 font-semibold px-4 py-3 rounded-lg hover:bg-gray-500 transition-colors">
                <RefreshCw className="h-5 w-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ImageDisplay: React.FC<{ title: string; imageSrc: string | null; isLoading?: boolean }> = ({ title, imageSrc, isLoading }) => (
    <div className="w-full">
        <h3 className="font-semibold mb-2 text-center text-gray-300">{title}</h3>
        <div className="aspect-square w-full bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            {isLoading ? (
                <div className="flex flex-col items-center text-gray-500">
                    <RefreshCw className="h-10 w-10 animate-spin mb-2" />
                    <span>Generando...</span>
                </div>
            ) : imageSrc ? (
                <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <ImageIcon className="h-10 w-10 mb-2"/>
                    <span>Esperando resultado</span>
                </div>
            )}
        </div>
    </div>
);

export default ImageEditor;