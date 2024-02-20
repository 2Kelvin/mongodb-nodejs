// inserting documents to mongodb using nodejs
// using insertOne() & insertmany()

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://<username>:<password>@cluster0.j6lvbks.mongodb.net/?retryWrites=true&w=majority';

// client to use to connect to the database
const client = new MongoClient(uri);

// collection to use
const itemsCollection = client.db('test').collection('items');

// new data to add
const gravelBike = {
    type: 'Gravel bike',
    color: 'Lime',
    nickname: 'Haze',
    mileage: '42km',
};

// new array of data to add
const newArrayData = [
    {
        brand: 'BMW',
        color: 'Blue',
    },
    {
        brand: 'Mercedes Benz',
        color: 'Grey',
    },
];


async function main() {
    try {
        // connecting to database
        await client.connect();
        console.log("We're in!\n");

        // inserting one document to the database
        let result = await itemsCollection.insertOne(gravelBike);
        // using the result promise returned to fetch the new item's _id
        console.log(`Successfully inserted the new document. It's _id is: ${result.insertedId}`);

        // inserting many documents
        // an array of documents should be passed in to insertMany method
        let promiseResults = await itemsCollection.insertMany(newArrayData);
        console.log(`Inserted ${promiseResults.insertedCount} documents.`);
        console.log(promiseResults);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main();

// initiate a package.json using ==> npm i
// install the nodejs mongodb driver using ==> npm install mongodb