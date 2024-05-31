import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const SensorDisplay = () => {
  const [sensorData, setSensorData] = useState({
    temperature: [],
    humidity: [],
    temperatureESP32: [],
    soilMoisture: [],
    time: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/temperature');
        const { temperature, humidity, temperatureESP32, soilMoisture, time } = response.data;
        setSensorData(prevState => ({
          temperature: [...prevState.temperature.slice(-10), temperature],
          humidity: [...prevState.humidity.slice(-10), humidity],
          temperatureESP32: [...prevState.temperatureESP32.slice(-10), temperatureESP32],
          soilMoisture: [...prevState.soilMoisture.slice(-10), soilMoisture],
          time: [...prevState.time.slice(-10), time]
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Extraire les 10 dernières valeurs de l'axe des abscisses pour chaque capteur
  const lastTime = sensorData.time.slice(-10);

  return (
    <div className="container">
      <div className="graph">
        <h2>Temperature</h2>
        <Line
          data={{
            labels: lastTime.map(time => moment(time).format("HH:mm:ss")),
            datasets: [{
              label: 'Temperature',
              data: sensorData.temperature,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            }]
          }}
        />
      </div>
      <div className="graph">
        <h2>Humidity</h2>
        <Line
          data={{
            labels: lastTime.map(time => moment(time).format("HH:mm:ss")),
            datasets: [{
              label: 'Humidity',
              data: sensorData.humidity,
              fill: false,
              borderColor: 'rgb(192, 75, 192)',
              tension: 0.1,
            }]
          }}
        />
      </div>
      <div className="graph">
        <h2>Temperature ESP32</h2>
        <Line
          data={{
            labels: lastTime.map(time => moment(time).format("HH:mm:ss")),
            datasets: [{
              label: 'Temperature ESP32',
              data: sensorData.temperatureESP32,
              fill: false,
              borderColor: 'rgb(192, 192, 75)',
              tension: 0.1,
            }]
          }}
        />
      </div>
      <div className="graph">
        <h2>Soil Moisture</h2>
        <Line
          data={{
            labels: lastTime.map(time => moment(time).format("HH:mm:ss")),
            datasets: [{
              label: 'Soil Moisture',
              data: sensorData.soilMoisture,
              fill: false,
              borderColor: 'rgb(75, 75, 192)',
              tension: 0.1,
            }]
          }}
        />
      </div>
    </div>
  );
};

export default SensorDisplay;