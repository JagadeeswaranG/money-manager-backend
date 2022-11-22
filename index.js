const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const app = express();
const dotenv = require("dotenv").config();
const URL = process.env.DB;

// app.use(
//   cors({
//     // origin: "*",

//   })
// );

app.use(cors())

app.use(express.json());
console.log(URL);

// create-add inc/exp
app.post("/create-data", async (req, res) => {
  try {
    //Connect the Database
    const connection = await mongoclient.connect(URL);

    //Select the DB
    const db =  await connection.db("WEBCODE2");

    //Select Collection
    //Do operation(CRUD)
    const product = await db.collection("finance").insertOne(req.body);

    //Close the connection
    await connection.close();

    console.log(product);
    res.json({ message: "Financial Details Added", id: product.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Read-get inc/exp data
app.get("/get-data", async (req, res) => {
  try {
    //Connect the DB
    const connection = await mongoclient.connect(URL);

    //Select the DB
    const db = await connection.db("WEBCODE2");

    //Select collection
    //Do operation(CRUD)
    const product = await db.collection("finance").find({}).toArray();

    //Close connection
    await connection.close();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// create-add business
app.post("/create-business", async (req, res) => {
  try {
    //Connect the Database
    const connection = await mongoclient.connect(URL);

    //Select the DB
    const db = await connection.db("WEBCODE2");

    //Select Collection
    //Do operation(CRUD)
    const product = await db.collection("business").insertOne(req.body);

    //Close the connection
    await connection.close();

    console.log(product);
    res.json({ message: "Business Details Added", id: product.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Read-get inc/exp business
app.get("/get-business", async (req, res) => {
  try {
    //Connect the DB
    const connection = await mongoclient.connect(URL);

    //Select the DB
    const db =await connection.db("WEBCODE2");

    //Select collection
    //Do operation(CRUD)
    const product = await db.collection("business").find({}).toArray();

    //Close connection
    await connection.close();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.listen(process.env.PORT || 3002);
