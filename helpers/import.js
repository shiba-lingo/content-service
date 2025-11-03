const { MongoClient } = require('mongodb');
const fs = require('fs');
import dotenv from 'dotenv';

dotenv.config();

const articleFile = './articles.json';

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'shiba-beta';
const client = new MongoClient(uri);

async function main() {
    try {
        // Try connecting to the MongoDB server
        await client.connect();
        console.log('You are now connected to MongoDB');

        const database = client.db(dbName);
        await importData(database.collection('articles'), articleFile)
        await importData(database.collection('users'), userFile)

    } catch (error) {
        console.error('There has been an error:', error);
    } finally {
        try {
            // Try closing the connection
            await client.close();
            console.log('MongoDB connection is now closed.');
        } catch (error) {
            console.error('There has been an error closing MongoDB connection:', error);
        }
    }
}

async function importData(collection, file) {
    const mockData = fs.readFileSync(file, 'utf8');
    const importDataJSON = JSON.parse(mockData);

    for (const row of importDataJSON) {
        try {
            const result = await collection.insertOne(row);
            console.log('Inserted document with ID:', result.insertedId);
        }
        catch (error) {
            console.error('Error inserting document:', error);
        }
    }
    console.log('Data import is now completed.');
}

main();

