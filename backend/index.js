import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";
import 'dotenv/config'

const app = express();
//need this as middleware to read Json requests!!!
app.use(express.json());

//middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of Cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(cors({
//     origin:'https://localhost:5000',
//     methods: ["GET","POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))


//steps for database
//Step 1: Create connection
//Step 2: Connect to database
//Step 3: Create Schema
//Step 4: Create model
//Step 5: Use model for CRUD operations
const connection = process.env.CONNECTION;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(connection)
  .then(() => {
    console.log("App connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
