let express = require("express");
let telemetria = require("./telemetria");

require('dotenv').config();

// run: node index.js

let app = express();

(async () => {
	let index_name = process.env.NAME_COLLECTION;
	
	// Deletando index
	// await telemetria.deleteIndex(index_name);

	// Caso o index telemetria ainda não exista - criar e popular com os dados de telemetria
	if(await telemetria.verifyIfExists(index_name) == false) {
		// Criando novo index
		await telemetria.createNewIndex(index_name);
	}

	telemetria.populateDataIndex(index_name);
})();

