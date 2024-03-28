const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.get('/external-api', async (req, res) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        throw new Error('Ошибка при загрузке данных из внешнего API');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
    }
  });
  
app.use(bodyParser.json());

// Роутер для приветствия
app.get('/', (req, res) => {
  res.send('Привет, это мой RESTful API!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
