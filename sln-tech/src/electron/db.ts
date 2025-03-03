import { Client } from "pg";

const client = new Client({ connectionString: "" })

async function createTables() {
    await client.connect();
    const result1 = await client.query(`CREATE TABLE customer(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE,
            phoneNo VARCHAR(15) UNIQUE NOT NULL,
            address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        )`)
    const result2 = await client.query(`alter SEQUENCE customer_id_seq RESTART 1000`)

    const result3 = await client.query(`CREATE TABLE service(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customer(id) ON DELETE CASCADE,
        model VARCHAR(200) NOT NULL,
        issue_description TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
    )`)

    console.log(result1, '\n', result2, '\n', result3)
}



