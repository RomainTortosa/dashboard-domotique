const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint pour vérifier si une commande est disponible
app.get('/checkCommand', (req, res) => {
  // Simulez ici la vérification si une commande est disponible
  // Envoie une réponse indiquant si une commande est disponible ou non
  const commandAvailable = true; // Mettez ici la logique de votre application
  if (commandAvailable) {
    res.json({ status: 'CommandAvailable' });
  } else {
    res.json({ status: 'NoCommand' });
  }
});

// Endpoint pour allumer la chaîne hi-fi
app.post('/power', (req, res) => {
  // Placez ici le code pour envoyer la requête HTTP à l'ESP32
  // Dans cet exemple, nous utilisons axios, assurez-vous de l'installer avec npm install axios
  const axios = require('axios');
  axios.post('http://192.168.1.102:80/power') // Remplacez par l'adresse IP de votre ESP32
    .then(response => {
      console.log('Requête envoyée à l\'ESP32 pour allumer la chaîne hi-fi');
      res.json({ status: 'CommandAvailable' });
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête à l\'ESP32', error);
      res.json({ status: 'NoCommand' });
    });
});

// Endpoint pour réduire le volume
app.post('/reduceVolume', (req, res) => {
  // Placez ici le code pour envoyer la requête HTTP à l'ESP32 pour réduire le volume
  const axios = require('axios');
  axios.post('http://192.168.1.102:80/reduceVolume') // Remplacez par l'adresse IP de votre ESP32
    .then(response => {
      console.log('Requête envoyée à l\'ESP32 pour réduire le volume');
      res.json({ status: 'CommandAvailable' });
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête à l\'ESP32', error);
      res.json({ status: 'NoCommand' });
    });
});

// Endpoint pour augmenter le volume
app.post('/increaseVolume', (req, res) => {
  // Placez ici le code pour envoyer la requête HTTP à l'ESP32 pour augmenter le volume
  const axios = require('axios');
  axios.post('http://192.168.1.102:80/increaseVolume') // Remplacez par l'adresse IP de votre ESP32
    .then(response => {
      console.log('Requête envoyée à l\'ESP32 pour augmenter le volume');
      res.json({ status: 'CommandAvailable' });
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête à l\'ESP32', error);
      res.json({ status: 'NoCommand' });
    });
});

// Endpoint pour la commande "videoVCR"
const handleSourceButton = () => {
  const axios = require('axios');
  // Envoyez la requête pour l'API videoVCR
  axios.post('http://192.168.1.102:80/videoVCR')
    .then(response => {
      console.log('Requête envoyée à l\'ESP32 pour la commande "videoVCR"');
      // Traitez la réponse ici si nécessaire
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête à l\'ESP32 pour "videoVCR"', error);
    });

  // Envoyez la requête pour l'API tape
  axios.post('http://192.168.1.102:80/tape')
    .then(response => {
      console.log('Requête envoyée à l\'ESP32 pour la commande "tape"');
      // Traitez la réponse ici si nécessaire
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête à l\'ESP32 pour "tape"', error);
    });
};

// Endpoint pour la commande "source"
app.post('/source', (req, res) => {
  // Utilisez la fonction pour gérer les deux API lorsque le bouton "Source" est cliqué
  handleSourceButton();

  // Réponse à la demande HTTP
  res.json({ status: 'CommandAvailable' });
});

// Endpoint pour récupérer l'heure
app.get('/heure', (req, res) => {
  const maintenant = new Date();
  const heures = maintenant.getHours();
  const minutes = maintenant.getMinutes();
  const temps = `${heures}:${minutes}`;
  res.json({ heure: temps });
});

// Endpoint pour récupérer le jour
app.get('/jour', (req, res) => {
  const maintenant = new Date();
  const jour = maintenant.toLocaleDateString('fr-FR', { weekday: 'long' });
  res.json({ jour: jour });
});

// Endpoint pour récupérer la date
app.get('/date', (req, res) => {
  const maintenant = new Date();
  const date = maintenant.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  res.json({ date: date });
});

// Port d'écoute du serveur
const port = 3000;

// Middleware pour le traitement des données du capteur
let sensorData = { temperature: 0, humidity: 0, temperatureESP32: 0, soilMoisture: 0 };

// Endpoint pour recevoir les données du capteur
app.post('/api/temperature', (req, res) => {
  const { temperature, humidity, temperatureESP32, soilMoisture } = req.body;
  console.log(`Received data - Temperature: ${temperature}, Humidity: ${humidity}, Temperature ESP32: ${temperatureESP32}, Soil Moisture: ${soilMoisture}`);

  // Mettre à jour les données du capteur avec les valeurs reçues
  sensorData = { temperature, humidity, temperatureESP32, soilMoisture };

  // Ajouter votre logique pour traiter ou stocker les données ici

  res.status(200).send('Data received successfully');
});

// Endpoint pour récupérer les données du capteur
app.get('/api/temperature', (req, res) => {
  // Renvoyer les dernières données du capteur dans la réponse GET
  res.status(200).json(sensorData);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});