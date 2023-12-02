const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://0.0.0.0:27017/e-commerce";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


// client.connect()
//     .then(()=>{
//         const db = client.db()
//     })
//     .then(()=>{
//         console.log("Data Added")
//     })
//     .catch((err)=>{
//         console.log("Error:" ,err)
//     })
//     .finally(()=>{
//         client.close()
//     })

