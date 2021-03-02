const axios = require('axios');

class Searches {

  record = ["Madrid", "Perú", "Colombia"];

  constructor() {
    //TODO: leer db si éxiste
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

      console.log(error);

    }

  }

}

module.exports = Searches;