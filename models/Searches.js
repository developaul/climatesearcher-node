const fs = require('fs');

const axios = require('axios');

class Searches {

  record = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get recordCapitalize() {
    return this.record.map(place => {
      let words = place.split(' ');
      words = words.map(p => p[0].toUpperCase() + p.substring(1));

      return words.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es"
    }
  }

  async city(place = '') {

    try {

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(place)}.json`,
        params: this.paramsMapbox
      });

      const resp = await instance.get();

      return resp.data.features.map(({ id, place_name, center }) => ({
        id,
        name: place_name,
        lng: center[0],
        lat: center[1]
      }));

    } catch (error) {

      return [];

    }

  }

  async climatePlace(lat, lon) {

    try {

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon }
      });

      const resp = await instance();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max
      }

    } catch (error) {

      console.error(error);

    }

  }

  addHistory(place = '') {

    if (this.record.includes(place.toLocaleLowerCase())) return;

    this.record = this.record.splice(0, 5);

    this.record = [place.toLocaleLowerCase(), ...this.record]

    this.saveDB();
  }

  saveDB() {

    const payload = {
      record: this.record
    }

    try {

      fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    } catch (err) {

      console.error(err);

    }

  }

  readDB() {

    if (!fs.existsSync(this.dbPath)) return;

    try {

      const { record } = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' })) || [];
      this.record = record;

    } catch (err) {

      console.error(err);

    }

  }

}

module.exports = Searches;