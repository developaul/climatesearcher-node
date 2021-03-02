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

  async city(place = '') {

    try {
      // Petición http
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


    // await fetch('https://google.com');

    // regresar los lugares

  }


}

module.exports = Searches;