import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const initialStartServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`Server can't start: ${e}`);
  }
};

// Connection URL
const mongoURI =
  "mongodb+srv://raja:<password>@cluster0.ulkc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Database name
const dbName = "myDatabase";

// Create a MongoClient
const client = new MongoClient(mongoURI);

// Initialize a global variable for the database
let passwordsCollection = null;

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Establish a connection to MongoDB
    await client.connect();
    console.log("MongoDB connected successfully!");

    const db = client.db(dbName); // Assign the database to the global variable
    passwordsCollection = db.collection("passwords");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Function to retrieve data from the "passwords" collection
app.get("/get-data", async (request, response) => {
  try {
    if (!passwordsCollection) {
      console.error("Database is not initialized. Call connectDB() first.");
      return;
    }

    const result = await passwordsCollection.find().toArray();
    response.json(result);
  } catch (err) {
    console.error("Error retrieving data from passwords collection:", err);
  }
});

// Route to handle adding passwords
app.post("/add-password", async (req, res) => {
  const { siteName, password } = req.body;

  try {
    if (!passwordsCollection) {
      console.error("Database is not initialized. Call connectDB() first.");
      return;
    }

    console.log(siteName, password); // This should now log the body sent from the frontend

    // Uncomment to insert into the database
    await passwordsCollection.insertOne({
      siteName,
      password,
    });

    res.json("Password saved successfully");
  } catch (err) {
    console.error("Error retrieving data from passwords collection:", err);
    res.json("Error retrieving data from passwords collection:", err);
  }
});

// Execute the connection and data retrieval functions in sequence
const main = async () => {
  await initialStartServer();
  await connectDB(); // Ensure the database is connected before fetching data
  // await getPasswordCollections();
  //await client.close(); // Close the connection after all operations
};

main();
