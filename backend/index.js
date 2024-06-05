// Подключение модулей
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

// получение токена и логина из env
const access_token = (dotenv?.parsed?.ADS_ACCESS_TOKEN);
const login = (dotenv?.parsed?.LOGIN);

// объявление origin
const ADS_ORIGIN = `https://ads-api.ru/main/api?user=${login}&token=${access_token}`;

// инициализация сервера
const app = express();
// объявление порта
const PORT = 9000;

// подключение bodyParser
app.use(bodyParser.json());

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Тестовый еднпоинт
app.get('/', (req, res) => {
  res.send('Привет, это мой первый ендпоинт rest-api!');
});


//подключение живого апи (по умолчанию указываем москву и метро отрадное!)
app.get('/objects-avito', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=1`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

app.get('/objects-cian', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=4`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

app.get('/objects-sob', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=5`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

app.get('/objects-youla', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=6`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

app.get('/objects-moyareklama', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=10`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

app.get('/objects-domclick', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=11`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});

//irr.ru, n1.ru
app.get('/objects-archived', async (req, res) => {
  try {
    const response = await fetch(`https://ads-api.ru/main/api?user=${login}&token=${access_token}&city=Москва&metro=Отрадное&source=2,7`);
    if (response.ok) {
      const data = await response.json();
      res.json(data?.data);
    } else {
      throw new Error('Ошибка при загрузке данных из внешнего API');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Произошла ошибка при загрузке данных из внешнего API');
  }
});



