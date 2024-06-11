const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;

if (!endpoint || !key) {
    throw new Error("Missing Cosmos DB configuration. Please set COSMOS_DB_ENDPOINT and COSMOS_DB_KEY environment variables.");
}

const client = new CosmosClient({ endpoint, key });

const databaseId = 'WagglyDb';
const containerId = 'DogID';

module.exports = async function (context, req) {
    try {
        const { resources: dogs } = await client
            .database(databaseId)
            .container(containerId)
            .items.query("SELECT * FROM c")
            .fetchAll();
        
        context.res = {
            status: 200,
            body: dogs
        };
    } catch (error) {
        context.log.error("Error fetching dogs from Cosmos DB", error);
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};