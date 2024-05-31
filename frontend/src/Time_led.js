import React, { useState, useEffect } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Time_led() {
  const [turnOnTime, setTurnOnTime] = useState('');
  const [ledColor, setLedColor] = useState('off');

  useEffect(() => {
    // Récupération de l'heure d'allumage depuis l'API
    socket.on('getTurnOnTime', (time) => {
      setTurnOnTime(time);
    });

    // Écoute des mises à jour de l'heure actuelle pour allumer les LED en bleu si nécessaire
    const interval = setInterval(() => {
      const currentTime = moment().format("HH:mm:ss");
      if (currentTime === turnOnTime) {
        console.log("C'est l'heure d'allumage !");
        setLedColor('blue');
        socket.emit('colorChange', { red: 0, green: 0, blue: 255 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turnOnTime]);

  const handleTimeChange = (e) => {
    setTurnOnTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log("L'heure d'allumage est réglée à :", turnOnTime);
    socket.emit('setTurnOnTime', turnOnTime);
  };

  return (
    <div className="time_led">
      <h2>Définir l'heure d'allumage des LED en bleu</h2>
      <label htmlFor="turnOnTime">Heure d'allumage (format HH:mm) :</label>
      <input
        type="text"
        id="turnOnTime"
        value={turnOnTime}
        onChange={handleTimeChange}
        placeholder="HH:mm"
      />
      <button onClick={handleSubmit}>Définir l'heure d'allumage</button>

      {/* Simulation de l'affichage des LED */}
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: ledColor === 'blue' ? 'blue' : 'gray', // Condition pour changer la couleur des LED
          marginTop: '20px',
        }}
      ></div>
    </div>
  );
}

export default Time_led;