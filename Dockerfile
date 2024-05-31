# Utilisation de l'image Node.js officielle en tant que base
FROM node:14.18

# Création du répertoire de travail principal
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour le backend
COPY backend/package*.json ./backend/

# Installation des dépendances npm pour le backend
RUN npm install --prefix ./backend/

# Copie du reste des fichiers du backend
COPY backend/ ./backend/

# Commande par défaut pour lancer l'application avec nodemon pour le backend
CMD ["node", "./backend/node_modules/.bin/nodemon", "./backend/server"]