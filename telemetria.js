let database = require('./db');
let { QueryTypes } = require('sequelize');
let ClientOpenSearch = require('./opensearch');

async function getResults(page = 0, limit = 10) {
	return database.query(`select * from name_table where column_comparation > 0 and column_comparation < 1 LIMIT ${page}, ${limit}`,{
		type: QueryTypes.SELECT
	});
}

let verifyIfExists = async (index_name) => {
	let indexExists = await ClientOpenSearch.indices.exists({
		index: index_name
	});

	return indexExists.body;
}

let deleteIndex = async (index_name) => {
	try {
		let result = await ClientOpenSearch.indices.delete({ index: index_name });
		return result.body.acknowledged;
	} catch (error) {
		if(error.message.includes('index_not_found_exception')) return true;
		throw(error.message);
	}
}

let createNewIndex = async (index_name) => {
	ClientOpenSearch.indices.create({
		index: index_name
	});
}

let populateDataIndex = async (index_name, page = 0, limit = 2000) => {
	do {
		let telemetria = await getResults(page, limit);

		if(telemetria.length) {
			ClientOpenSearch.helpers.bulk({
				datasource: telemetria,
				onDocument (doc) {
					return {
						index: {_index: index_name}
					}
				}
			});
		} else {
			// Parar loop quando não houver mais resultados
			break;
		}

		page = page + limit;
	} while (true);
}

let search = async (index_name, queryObject) => {
	let result = await ClientOpenSearch.search({
		index: index_name,
		body: {
			query: queryObject
		}
	});

	return {
		total: result.body.hits.total,
		hits: result.body.hits.hits
	}
	
}

module.exports = {
	verifyIfExists,
	deleteIndex,
	createNewIndex,
	populateDataIndex,
	search
}

