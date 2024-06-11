const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;

if (!endpoint || !key) {
    throw new Error("Missing Cosmos DB configuration. Please set COSMOS_DB_ENDPOINT and COSMOS_DB_KEY environment variables.");
}

const client = new CosmosClient({ endpoint, key });

const databaseId = 'WagglyDB';
const containerId = 'WalkersID';

module.exports = async function (context, req) {
    const newWalker = req.body;
    
    try {
        const { resource: createdItem } = await client
            .database(databaseId)
            .container(containerId)
            .items.create(newWalker);
        
        context.res = {
            status: 201,
            body: createdItem
        };
    } catch (error) {
        context.log.error("Error adding walker to Cosmos DB", error);
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};











