const { Client } = require("@opensearch-project/opensearch");

require('dotenv').config();

let client = new Client({ node: `${process.env.OPENSEARCH_PROTOCOL}://${process.env.OPENSEARCH_AUTH}@${process.env.OPENSEARCH_HOST}` });

module.exports = client;