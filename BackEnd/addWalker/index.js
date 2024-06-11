const { CosmosClient } = require('@azure/cosmos');

const connectionObject = {
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
};
const client = new CosmosClient(connectionObject);

const databaseId = 'WagglyDB';
const containerId = 'WalkerID';

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
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};