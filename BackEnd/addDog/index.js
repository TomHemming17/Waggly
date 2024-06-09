const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER_DOGS;

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    try {
        const newDog = req.body;

        if (!newDog || !newDog.dogID || !newDog.dogName || !newDog.ownerName || !newDog.address) {
            context.res = {
                status: 400,
                body: "Please provide complete dog information (dogID, dogName, ownerName, address)."
            };
            return;
        }

        const { resource: createdItem } = await client.database(databaseId).container(containerId).items.create(newDog);
        context.res = {
            status: 201,
            body: createdItem,
        };
    } catch (error) {
        context.log('Error adding dog:', error);
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};




















