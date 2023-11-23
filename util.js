let ClientOpenSearch = require('./opensearch');
let NativeClientOpenSearch = require('./NativeClientOpenSearch');

await NativeClientOpenSearch.get('books', `longDescription:\"Descrição longa do Rafael\"`)
	.then(response => response.text())
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log('error', error);
	});

//------------------------------------------------------------------------------------------

let dataJson = {
	title: "Hibernate in Action",
	isbn: "193239415X",
	pageCount: 400,
	publishedDate: {date: "2004-08-01"},
	thumbnailUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bauer.jpg",
	shortDescription: "Descrição de teste do Rafael",
	longDescription: "Descrição longa do Rafael",
	status: "PUBLISH",
	authors: ["Christian Bauer", "Gavin King"],
	categories: ["PHP"]
};

await NativeClientOpenSearch.put('books', 23, dataJson)
	.then(response => response.text())
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log('error', error);
	});

