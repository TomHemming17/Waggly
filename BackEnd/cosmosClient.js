// cosmosClient.js
require('dotenv').config();
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerIdDogs = process.env.COSMOS_DB_CONTAINER_DOGS;
const containerIdWalkers = process.env.COSMOS_DB_CONTAINER_WALKERS;

const client = new CosmosClient({ endpoint, key });

async function getContainer(containerId) {
    const database = client.database(databaseId);
    const container = database.container(containerId);
    return container;
}

module.exports = {
    getDogsContainer: () => getContainer(containerIdDogs),
    getWalkersContainer: () => getContainer(containerIdWalkers),
};
