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

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

action();