import { Client } from "pg";
require('dotenv').config()

const client = new Client({connectionString:process.env.DATABASE_URL})
client.connect()

const initialSetUp = ()=>{
    //create table properly
    // alter sequence to start from 1000; 

}

// initialSetUp()

module.exports= {
    client
}
