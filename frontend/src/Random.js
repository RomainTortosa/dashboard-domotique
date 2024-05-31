import React, { useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io();

const Random = () => {
  const [isRandomColorActive, setIsRandomColorActive] = useState(false);
  const intervalIdRef = useRef(null);

  const handleToggleRandomColor = () => {
    if (!isRandomColorActive) {
      startSendingRandomColors();
    } else {
      stopSendingRandomColors();
    }
    setIsRandomColorActive(!isRandomColorActive);
  };

  const startSendingRandomColors = () => {
    intervalIdRef.current = setInterval(() => {
      const randomColor = generateRandomColor();
      socket.emit('colorChange', randomColor);
    }, 500);
  };

  const stopSendingRandomColors = () => {
    clearInterval(intervalIdRef.current);
  };

  const generateRandomColor = () => {
    return {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
    };
  };

  return (
    <div>
      <button onClick={handleToggleRandomColor}>
        {isRandomColorActive ? 'Arrêter Couleur Aléatoire' : 'Démarrer Couleur Aléatoire'}
      </button>
    </div>
  );
};

export default Random;