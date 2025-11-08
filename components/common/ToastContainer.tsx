import React from 'react';
import { useToast } from '../../contexts/ToastContext';
import ToastComponent from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
