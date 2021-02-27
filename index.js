const {
  pauseMenu,
  inquireMenu
} = require("./helpers/inquirer");

const main = async () => {

  let opt;

  do {

    opt = await inquireMenu();

    switch (opt) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
    }

    if (opt !== 0) await pauseMenu();

  } while (opt !== 0);

}

main();