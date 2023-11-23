let express = require("express");

require('dotenv').config();

let get = async (index, query) => {
	let myHeaders = new Headers();
	let url = `https://${process.env.OPENSEARCH_HOST}/${index}/_search?q=${query}&pretty=true`;

	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Basic ${process.env.OPENSEARCH_TOKEN}`);

	return fetch(url, {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	});
}

let put = async (index, id, dataJson) => {
	let myHeaders = new Headers();
	let url = `https://${process.env.OPENSEARCH_HOST}/${index}/_doc/${id}`;

	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Basic ${process.env.OPENSEARCH_TOKEN}`);
	
	return fetch(url, {
		method: 'PUT',
		headers: myHeaders,
		body: JSON.stringify(dataJson),
		redirect: 'follow'
	});
}

let post = async (index, dataJson) => {
	let myHeaders = new Headers();
	let raw = JSON.stringify(dataJson);
	let url = `https://${process.env.OPENSEARCH_HOST}/${index}/_bulk`;

	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Basic ${process.env.OPENSEARCH_TOKEN}`);

	return fetch(url, {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	});
	// .then(response => response.text())
	// .then(result => console.log(result))
	// .catch(error => console.log('error', error));
}

module.exports = { get, put };

