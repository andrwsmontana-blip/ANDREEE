
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Volume2, Loader2, Play, Pause } from 'lucide-react';
import { decode, decodeAudioData } from '../../utils/helpers';

interface TTSButtonProps {
  textToRead: string;
}

// Global audio context to avoid creating multiple instances
let audioContext: AudioContext | null = null;
const getAudioContext = () => {
    if (!audioContext || audioContext.state === 'closed') {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    return audioContext;
};

const TTSButton: React.FC<TTSButtonProps> = ({ textToRead }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const generateAndPlayAudio = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsPlaying(true);

    try {
      const model = "gemini-2.5-flash-preview-tts";
      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: textToRead }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data received.");

      const ctx = getAudioContext();
      const decodedBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      setAudioBuffer(decodedBuffer);

      const source = ctx.createBufferSource();
      source.buffer = decodedBuffer;
      source.connect(ctx.destination);
      source.onended = () => {
          setIsPlaying(false);
          setSourceNode(null);
      }
      source.start(0);
      setSourceNode(source);

    } catch (error) {
      console.error("TTS error:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [textToRead, isLoading, ai.models]);
  
  const handlePlayback = () => {
    if(isPlaying) {
        if(sourceNode) {
            sourceNode.stop();
        }
        setIsPlaying(false);
    } else {
        if(audioBuffer) {
            const ctx = getAudioContext();
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.onended = () => {
                setIsPlaying(false);
                setSourceNode(null);
            }
            source.start(0);
            setSourceNode(source);
            setIsPlaying(true);
        } else {
            generateAndPlayAudio();
        }
    }
  }

  return (
    <button
      onClick={handlePlayback}
      disabled={isLoading}
      className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
      aria-label="Read text aloud"
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 
       isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
    </button>
  );
};

export default TTSButton;
