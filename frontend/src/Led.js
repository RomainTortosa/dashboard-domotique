import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Led.css';

const socket = io('http://localhost:3001');

function Led() {
  const [color, setColor] = useState({ red: 0, green: 0, blue: 0 });
  const [currentColor, setCurrentColor] = useState({ red: 0, green: 0, blue: 0 });
  const [isOff, setIsOff] = useState(true);
  const [manualToggle, setManualToggle] = useState(false);

  useEffect(() => {
    socket.on('currentColor', (newColor) => {
      setCurrentColor(newColor);
      if (!manualToggle) {
        setIsOff(false); // Mettre l'interrupteur sur "on" seulement si le basculement n'est pas manuel
      }
    });

    return () => {
      socket.off('currentColor');
    };
  }, [manualToggle]);

  const handleColorChange = () => {
    socket.emit('colorChange', color);
  };

  useEffect(() => {
    if (isOff) {
      setColor({ red: 0, green: 0, blue: 0 });
      socket.emit('colorChange', { red: 0, green: 0, blue: 0 });
    }
  }, [isOff]);

  const handleToggle = () => {
    setIsOff(!isOff); // Inverser l'état de l'interrupteur
    setManualToggle(true); // Indiquer que le basculement est manuel
    if (!isOff) {
      setColor({ red: 0, green: 0, blue: 0 }); // Réinitialiser la couleur si l'interrupteur est mis sur "off"
      socket.emit('colorChange', { red: 0, green: 0, blue: 0 });
    }
  };

  return (
    <div className="Led">
      <h1>ESP Color Picker</h1>
      <div>
        <label htmlFor="red">Red:</label>
        <input
          type="range"
          id="red"
          min="0"
          max="255"
          value={color.red}
          onChange={(e) => setColor({ ...color, red: parseInt(e.target.value) })}
        />
        {color.r}
      </div>
      <div>
        <label htmlFor="green">Green:</label>
        <input
          type="range"
          id="green"
          min="0"
          max="255"
          value={color.green}
          onChange={(e) => setColor({ ...color, green: parseInt(e.target.value) })}
        />
        {color.g}
      </div>
      <div>
        <label htmlFor="blue">Blue:</label>
        <input
          type="range"
          id="blue"
          min="0"
          max="255"
          value={color.blue}
          onChange={(e) => setColor({ ...color, blue: parseInt(e.target.value) })}
        />
        {color.b}
      </div>
      <button onClick={handleColorChange}>Change Color</button>

      <div className="slideThree">
        <input
          type="checkbox"
          value="None"
          id="slideThree"
          name="check"
          checked={!isOff}
          onChange={handleToggle} // Utilisez handleToggle pour inverser l'état de l'interrupteur
        />
        <label htmlFor="slideThree"></label>
      </div>

      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`,
          marginTop: '20px',
        }}
      ></div>
    </div>
  );
}

export default Led;
