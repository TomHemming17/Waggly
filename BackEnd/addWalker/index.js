const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER_WALKERS;

console.log("Endpoint:", endpoint); 
console.log("Key:", key); 
console.log("Database ID:", databaseId); 
console.log("Container ID:", containerId); 

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    try {
        const newWalker = req.body;

        if (!newWalker || !newWalker.walkerID || !newWalker.walkerName || !newWalker.areas) {
            context.res = {
                status: 400,
                body: "Please provide complete walker information (walkerID, walkerName, areas)."
            };
            return;
        }

        const { resource: createdItem } = await client.database(databaseId).container(containerId).items.create(newWalker);
        context.res = {
            status: 201,
            body: createdItem,
        };
    } catch (error) {
        context.log('Error adding walker:', error);
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};










