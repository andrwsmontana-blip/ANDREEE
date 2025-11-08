import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UploadCloud, Film, Lightbulb, RefreshCw, FileText } from 'lucide-react';
import { fileToBase64 } from '../utils/helpers';

const FRAME_EXTRACTION_RATE_MS = 1000; // 1 frame per second

const VideoAnalysis: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Resume este video y extrae los puntos clave.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoSrc(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  };
  
  const analyzeVideo = useCallback(async () => {
    if (!videoFile || !prompt) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        if (!videoElement || !canvasElement) throw new Error("Video elements not ready");

        const frames: string[] = await new Promise((resolve) => {
            const extractedFrames: string[] = [];
            videoElement.currentTime = 0;

            const onSeeked = () => {
                const ctx = canvasElement.getContext('2d');
                if(!ctx) return;
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
                ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
                const base64Data = canvasElement.toDataURL('image/jpeg').split(',')[1];
                extractedFrames.push(base64Data);

                if (videoElement.currentTime < videoElement.duration) {
                    videoElement.currentTime += FRAME_EXTRACTION_RATE_MS / 1000;
                } else {
                    videoElement.removeEventListener('seeked', onSeeked);
                    resolve(extractedFrames);
                }
            };
            videoElement.addEventListener('seeked', onSeeked);
            videoElement.currentTime = 0; // Start the process
        });

        if (frames.length === 0) {
            throw new Error("No se pudieron extraer frames del video.");
        }

        const imageParts = frames.map(frame => ({
            inlineData: {
                data: frame,
                mimeType: 'image/jpeg',
            },
        }));

        const model = 'gemini-2.5-pro';
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{text: prompt}, ...imageParts] }],
        });

        setAnalysisResult(response.text);

    } catch (err) {
      console.error("Video analysis error:", err);
      setError("Error al analizar el video. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [videoFile, prompt, ai.models]);

  return (
    <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
        <FileText className="h-7 w-7 text-red-500 mr-3" />
        Análisis de Video con IA
      </h3>
      <p className="text-gray-400 mb-6">
        Sube un video de capacitación o de un proceso y obtén un resumen e ideas clave.
      </p>

      {!videoSrc ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
          <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
          <span className="font-semibold text-gray-300">Sube un video</span>
          <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} src={videoSrc} controls className="w-full h-full" muted onLoadedData={() => videoRef.current && (videoRef.current.currentTime = 0)}></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
          <div className="relative">
            <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="¿Qué quieres saber del video?"
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700"
            />
          </div>
          <button onClick={analyzeVideo} disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-red-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-900 disabled:bg-gray-500">
            {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Film className="h-5 w-5" />}
            <span>{isLoading ? 'Analizando...' : 'Analizar Video'}</span>
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {analysisResult && (
        <div className="mt-6 p-6 bg-gray-700 rounded-lg">
          <h4 className="font-bold text-lg text-white mb-2">Resultados del Análisis:</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;