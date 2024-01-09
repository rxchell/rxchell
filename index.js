import dotenv from 'dotenv'; // Import dotenv 
import Mustache from 'mustache';
import fetch from 'node-fetch';
import fs from 'fs';
const MUSTACHE_MAIN_DIR = './main.mustache';
let DATA = {
  name: 'Rachel',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Singapore',
  }),
};

async function setWeatherInformation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${process.env.e2cde8e54d9f77964843492c4b881742}}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      DATA.temperature = Math.round(r.main.temp);
      DATA.weather = r.weather[0].description;
    });
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  await setWeatherInformation();   
  await generateReadMe();
}

action();