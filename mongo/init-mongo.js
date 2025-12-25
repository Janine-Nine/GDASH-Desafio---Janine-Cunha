/*
 * init-mongo.js
 * Script de inicialização (executado pelo Docker Mongo image quando a base está vazia)
 * Insere uma coleção `weather` com alguns registros de exemplo.
 */

// Seleciona (ou cria) o DB 'gdash'
db = db.getSiblingDB('gdash');

// Cria collection 'weather' se não existir
if (!db.getCollectionNames().includes('weather')) {
  db.createCollection('weather');
}

// Insere documentos de exemplo se a collection estiver vazia
if (db.weather.countDocuments() === 0) {
  db.weather.insertMany([
    {
      city: 'Pelotas',
      timestamp: new Date().toISOString(),
      temperature: 25.2,
      humidity: 82,
      windspeed: 3.4,
      condition: 'Ensolarado',
      insight: 'Temperatura agradável para a estação'
    },
    {
      city: 'Porto Alegre',
      timestamp: new Date().toISOString(),
      temperature: 28.6,
      humidity: 68,
      windspeed: 4.7,
      condition: 'Parcialmente nublado',
      insight: 'Aquecer no período da tarde'
    }
  ]);
  print('Inserted sample weather documents into gdash.weather');
} else {
  print('gdash.weather already contains data, skipping sample insert');
}
