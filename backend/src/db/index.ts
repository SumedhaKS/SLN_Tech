import { Client } from "pg";
require('dotenv').config()

export const client = new Client({connectionString:process.env.DATABASE_URL})
client.connect()

const initialSetUp = async ()=>{
    //create table properly
    // alter sequence to start from 1000; 
    const q1 = await client.query(`CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    phNo VARCHAR(15) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE service(
    id SERIAL PRIMARY KEY,
    customer_ID INT REFERENCES customer(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    make VARCHAR(50) NOT NULL,
    serial_no VARCHAR(20) UNIQUE,
    issue_description TEXT NOT NULL,
    status VARCHAR(15) DEFAULT 'pending',
    estimated_cost decimal(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)
    
    const q2 = await client.query(`ALTER SEQUENCE customer_id_seq RESTART 1000;`)

    console.log("initial setup successfull.")
}
// initialSetUp()

const populateDB = async ()=>{
    await client.query(`INSERT INTO customer(name, phno, address) VALUES('user1', '1234567890', 'address1'), ('user2', '0123456789', 'address2')`)
    console.log('done')
}
// populateDB()


module.exports = { client };
    

