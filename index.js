const Searches = require("./models/Searches");

const {
  pauseMenu,
  inquireMenu,
  readInput
} = require("./helpers/inquirer");

const main = async () => {

  let opt;

  const searches = new Searches();

  do {

    opt = await inquireMenu();

    switch (opt) {
      case 1:
        // readInput
        const place = await readInput('Ciudad:');
        await searches.city(place);
        // Search places

        // Select place

        // data clima

        // show results
        console.log('\nInformación de la cidad\n'.green);
        console.log('Ciudad:');
        console.log('Lat:',);
        console.log('Lng:',);
        console.log('Temperatura:',);
        console.log('Mínima:',);
        console.log('Máxima:',);
        break;
      case 2:
        break;
    }

    if (opt !== 0) await pauseMenu();

  } while (opt !== 0);

}

main();