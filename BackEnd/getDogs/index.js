const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER_DOGS;

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    try {
        const querySpec = {
            query: "SELECT * from c"
        };

        const { resources: items } = await client.database(databaseId).container(containerId).items.query(querySpec).fetchAll();
        context.res = {
            status: 200,
            body: items
        };
    } catch (error) {
        context.log('Error fetching dogs:', error);
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};











