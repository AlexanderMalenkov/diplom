// Подключение модулей
const express = require('express');
const mysql2 = require('mysql2/promise')
const bodyParser = require('body-parser');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  database: 'geoportal_otradnoe',
  password: ''
})

// инициализация сервера
const app = express();
// объявление порта
const PORT = 9000;

// подключение bodyParser
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


app.get('/kadastr', (req, res) => {
  pool.query('SELECT * FROM kadastr_map')?.then((data) => {
    res.json(data[0])
  })
});

app.get('/new_buildings', (req, res) => {
  pool.query('SELECT * FROM newbuildings')?.then((data) => {
    res.json(data[0])
  })
});

app.get('/metro', (req, res) => {
  pool.query('SELECT * FROM metro')?.then((data) => {
    res.json(data[0])
  })
});

app.get('/advertisements', (req, res) => {
  pool.query('SELECT * FROM advertisements')?.then((data) => {
    res.json(data[0])
  })
});
