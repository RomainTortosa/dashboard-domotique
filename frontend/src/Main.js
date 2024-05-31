// src/Main.js
import React from 'react';

import TelecommandeHifi from './TelecommandeHifi';
import Led from "./Led";
import Random from "./Random";
import Time_led from "./Time_led";

function Main() {
    return (
      <div className="Main">
        <TelecommandeHifi />  
        <Led />
        <Random />
        <Time_led />
      </div>

    );
  }
  
export default Main;