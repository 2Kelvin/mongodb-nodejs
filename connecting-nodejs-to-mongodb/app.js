const { MongoClient } = require('mongodb');

// my atlas cluster connection string
const uri = 'mongodb+srv://<user>:<password>@cluster0.j6lvbks.mongodb.net/?retryWrites=true&w=majority';

// checking mongodb connection string
console.log(uri);

const clientConnection = new MongoClient(uri);

async function main() {
    try {
        // connecting to mongodb
        await clientConnection.connect();
        console.log("\nConnected to MongoDB Atlas!")

        // list out all the databases in the cluster
        const allDbs = await clientConnection.db().admin().listDatabases();
        console.table(allDbs.databases);
    } catch (error) {
        console.error(error);
    } finally {
        await clientConnection.close();
    }
}

main();