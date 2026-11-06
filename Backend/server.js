import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
    connectDB();
})

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected With Database");
    } catch (error) {
        console.error("Error connecting to Database: ", error);
    }
}

// app.post("/test", async(req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     }

//     try{
//         const response = await fetch("https://api.openai.com/v1/completions", options);
//         const data = await response.json();
//         console.log(data.choices[0].message.content);
//         res.send(data);
//     } catch(err) {
//         console.log(err);
//     }
// })