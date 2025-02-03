const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
const MONGODB_URI = "mongodb://localhost:27017/your-database-name"; // Replace with your MongoDB URI

async function main() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("your-database-name"); // Replace with your database name
        const collection = db.collection("your-collection-name"); // Replace with your collection name

        // Example: Create a document
        const result = await collection.insertOne({ name: "John", age: 30 });
        console.log("Inserted document:", result.insertedId);

        // Example: Find a document
        const document = await collection.findOne({ name: "John" });
        console.log("Found document:", document);

        // Example: Update a document
        const updateResult = await collection.updateOne(
            { name: "John" },
            { $set: { age: 31 } }
        );
        console.log("Updated document:", updateResult.modifiedCount);

        // Example: Delete a document
        const deleteResult = await collection.deleteOne({ name: "John" });
        console.log("Deleted document:", deleteResult.deletedCount);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
