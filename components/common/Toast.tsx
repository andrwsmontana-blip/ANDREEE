import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Toast } from '../../contexts/ToastContext';

interface ToastProps {
  toast: Toast;
  onRemove: () => void;
}

const ICONS = {
  success: <CheckCircle className="h-6 w-6 text-green-500" />,
  error: <XCircle className="h-6 w-6 text-red-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
};

const TOAST_COLORS = {
    success: 'bg-green-800/90 border-green-700',
    error: 'bg-red-800/90 border-red-700',
    info: 'bg-blue-800/90 border-blue-700',
    warning: 'bg-yellow-800/90 border-yellow-700',
};

const PROGRESS_COLORS = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
}

const DURATION = 5000; // 5 seconds

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(DURATION);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        remainingTimeRef.current -= (Date.now() - startTimeRef.current);
      }
    } else {
      startTimeRef.current = Date.now();
      timerRef.current = window.setTimeout(onRemove, remainingTimeRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, onRemove]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-start w-full max-w-sm p-4 text-white rounded-lg shadow-lg backdrop-blur-sm animate-fade-in-right ${TOAST_COLORS[toast.type]}`}
    >
      <div className="flex-shrink-0">{ICONS[toast.type]}</div>
      <div className="ml-3 w-0 flex-1">
        <p className="text-sm font-bold text-gray-100">{toast.title}</p>
        {toast.message && <p className="mt-1 text-sm text-gray-200">{toast.message}</p>}
      </div>
      <button
        onClick={onRemove}
        className="ml-4 flex-shrink-0 rounded-md p-1 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="absolute bottom-0 left-0 h-1 bg-black/20 w-full rounded-b-lg">
          <div
            className={`h-full rounded-b-lg ${PROGRESS_COLORS[toast.type]}`}
            style={{ animation: `shrink ${DURATION}ms linear forwards`, animationPlayState: isPaused ? 'paused' : 'running' }}
          ></div>
      </div>
    </div>
  );
};

export default ToastComponent;
