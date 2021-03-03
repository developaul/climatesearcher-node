const Searches = require("./models/Searches");

const {
  inquireMenu,
  listPlaces,
  pauseMenu,
  readInput
} = require("./helpers/inquirer");

require('dotenv').config();

const main = async () => {

  let opt;

  const searches = new Searches();

  do {

    opt = await inquireMenu();

    switch (opt) {
      case 1:
        // readInput
        const place = await readInput('Ciudad:');

        // Search places
        const places = await searches.city(place);

        // Select place
        const idSelected = await listPlaces(places);
        if (idSelected === '0') continue;
        const { name, lng, lat } = places.find(p => p.id === idSelected);

        // Save DB
        searches.addHistory(name);

        // data clima
        const { desc, temp, min, max } = await searches.climatePlace(lat, lng);

        // show results
        console.clear();
        console.log('\nInformación de la cidad\n'.green);
        console.log('Ciudad:', name.green);
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('Temperatura:', temp);
        console.log('Mínima:', min);
        console.log('Máxima:', max);
        console.log('Como esta el clima:', desc.green);
        break;
      case 2:
        searches.recordCapitalize.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pauseMenu();

  } while (opt !== 0);

}

main();