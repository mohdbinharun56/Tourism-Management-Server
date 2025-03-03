const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b1v1s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const tourismCollection = client.db('Tourism').collection('tourists');


    // add tourists spot
    app.post('/tourists/add',async (req,res)=>{
        const touristBody = req.body;
        const newTouristsSpot = {
            image: touristBody.image,
            spotName: touristBody.spotName,
            countryName: touristBody.countryName,
            location: touristBody.location,
            description: touristBody.description,
            averageCost: touristBody.averageCost,
            seasonality: touristBody.seasonality,
            travelTime: touristBody.travelTime,
            visitors: touristBody.visitors,
            userName: touristBody.userName,
            email: touristBody.email
        }
        // console.log(newTouristsSpot);
        const result = await tourismCollection.insertOne(newTouristsSpot);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("App initialization");
})

app.listen(port,()=>{
    console.log(`Application run on port: ${port}`)
})