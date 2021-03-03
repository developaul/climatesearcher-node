const inquirer = require('inquirer');

require('colors');

const questions = [
	{
		type: 'list',
		name: 'option',
		message: '¿Qué desea hacer?',
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Buscar ciudad`
			},
			{
				value: 2,
				name: `${'2.'.green} Historial`
			},
			{
				value: 0,
				name: `${'0.'.green} Salir`
			}
		]
	}
];

const inquireMenu = async () => {

	console.clear();

	console.log('========================'.green);
	console.log('  Seleccine una opción  '.white);
	console.log('========================\n'.green);

	const { option } = await inquirer.prompt(questions);

	return option;
};


const pauseMenu = async () => {

	const questionPause = [
		{
			type: 'input',
			name: 'enter',
			message: `Presione ${'ENTER'.green} para continuar`
		}
	];

	console.log('\n');

	await inquirer.prompt(questionPause);
};

const readInput = async message => {

	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (!value.length) return 'Por favor ingrese un valor';
				return true;
			}
		}
	];

	const { desc } = await inquirer.prompt(question);

	return desc;
}

const listPlaces = async (places = []) => {

	const choices = places.map(({ id, name }, i) => {

		const idx = `${`${i + 1}.`.green}`;

		return {
			value: id,
			name: `${idx} ${name}`
		}

	});

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Seleccione un lugar',
			choices: [
				{
					value: '0',
					name: `${'0.'.green} Cancelar`
				},
				...choices
			]
		}
	];

	const { id } = await inquirer.prompt(questions);

	return id;
}

module.exports = {
	inquireMenu,
	listPlaces,
	pauseMenu,
	readInput
};