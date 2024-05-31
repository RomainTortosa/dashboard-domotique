import React, { useState } from 'react';
import axios from 'axios';
import './TelecommandeHifi.css';

function TelecommandeHifi() {
  const [message, setMessage] = useState('');

  const pressButton = (buttonName) => {
    setMessage(`Bouton ${buttonName} pressé`);

    // Envoyer une requête au serveur Node.js en fonction du bouton pressé
    axios.post(`http://localhost:3000/${buttonName.toLowerCase()}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <div className="remote">
      <h1>TV Remote</h1>
      <div className="remote-buttons">
        <section>
          <button id="power" className="power" onClick={() => pressButton('Power')}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px" viewBox="0 0 22.1 22.1" style={{ enableBackground: 'new 0 0 22.1 22.1' }}
                 xmlSpace="preserve">
              <path d="M11.1,22.1C11.1,22.1,11.1,22.1,11.1,22.1c-2.7,0-5.2-1-7.1-2.9C0.1,15.2,0.1,8.9,4,5c0.4-0.4,1-0.4,1.4,0
                            c0.4,0.4,0.4,1,0,1.4c-3.1,3.1-3.1,8.2,0,11.3c1.5,1.5,3.5,2.3,5.7,2.3c0,0,0,0,0,0c2.1,0,4.1-0.8,5.7-2.3c3.1-3.1,3.1-8.2,0-11.3
                            c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0c3.9,3.9,3.9,10.2,0,14.1C16.2,21,13.7,22.1,11.1,22.1z"/>
              <path d="M11.1,12.1c-0.6,0-1-0.4-1-1v-10c0-0.6,0.4-1,1-1s1,0.4,1,1v10C12.1,11.6,11.6,12.1,11.1,12.1z"/>
            </svg>
          </button>
          <button id="source" className="source" onClick={() => pressButton('Source')}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px" width="55.9px" height="55.9px" viewBox="0 0 55.9 55.9" style={{ enableBackground: 'new 0 0 55.9 55.9' }}
                 xmlSpace="preserve">
              <g id="XMLID_5_">
                <path className="st0" d="M50.5,5.4h-45c-2.8,0-5,2.3-5,5v10h5v-10h45v35.1h-45V35.4h-5v10c0,2.8,2.3,5,5,5h45
                                c2.8,0,5-2.2,5-5v-35C55.5,7.7,53.2,5.4,50.5,5.4z M25.4,37.9l10-10l-10-10v7.5h-25v5h25V37.9z"/>
              </g>
            </svg>
          </button>
        </section>
        <section className="vol-section">
          <button id="IncreaseVolume" className="vol-up" onClick={() => pressButton('IncreaseVolume')}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px" viewBox="0 0 82 82" style={{ enableBackground: 'new 0 0 82 82' }} xmlSpace="preserve">
              <g className="st0">
                <polygon className="st1" points="0,24.4 0,57.5 17.1,57.5 49.4,75.1 49.4,6.8 17.1,24.4"/>
                <rect x="56.3" y="37.4" className="st1" width="23.7" height="7"/>
              </g>
              <g>
                <polygon points="0,25.3 0,56.7 16.3,56.7 46.9,73.5 46.9,8.5 16.3,25.3"/>
                <polygon points="69.8,37.2 69.8,26.5 62.1,26.5 62.1,37.2 51.8,37.2 51.8,44.7 62.1,44.7 62.1,55.5 69.8,55.5 69.8,44.7 80,44.7
                                80,37.2"/>
              </g>
            </svg>
          </button>
          <button id="ReduceVolume" className="vol-down" onClick={() => pressButton('ReduceVolume')}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px" viewBox="0 0 82 82" style={{ enableBackground: 'new 0 0 82 82' }} xmlSpace="preserve">
              <g>
              <polygon points="0,24.4 0,57.5 17.1,57.5 49.4,75.1 49.4,6.8 17.1,24.4"/>
                <rect x="56.3" y="37.4" width="23.7" height="7"/>
              </g>
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
}

export default TelecommandeHifi;                