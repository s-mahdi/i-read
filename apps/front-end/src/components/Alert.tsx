import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ message, onClose, duration = 6000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;
    let cleanupTimer: NodeJS.Timeout;

    if (message) {
      showTimer = setTimeout(() => setIsVisible(true), 10);
      hideTimer = setTimeout(() => {
        setIsVisible(false);
        cleanupTimer = setTimeout(onClose, 500);
      }, duration - 500);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [message, onClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div
      className={`fixed bottom-4 left-4 md:left-4 bg-red-500 text-white pl-1 py-2 rounded max-w-xs md:max-w-md flex items-center transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button onClick={handleClose} className="mr-4 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <span className="px-2">{message}</span>
    </div>
  );
};

export default Alert;
