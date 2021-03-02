const axios = require('axios');

class Searches {

  record = ["Madrid", "Perú", "Colombia"];

  constructor() {
    //TODO: leer db si éxiste
  }

  get paramsMapbox() {
    return {
      'access_token': "pk.eyJ1IjoiZGV2ZWxvcGF1bCIsImEiOiJja2xuNHJoMDcwOGJyMnZwdW9wdXB6bTlqIn0.HEiZIsgkb7ioUV6Gyn4uTg",
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

      console.log(resp.data);

      return [];

    } catch (error) {

      return [];

    }


    // await fetch('https://google.com');

    // regresar los lugares

  }


}

module.exports = Searches;