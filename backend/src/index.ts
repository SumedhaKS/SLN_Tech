// main index file
import express from "express";
import { client } from "./db"
import zod from "zod";

const app = express()
const port = 3001;

app.use(express.json())

app.get('/', (req:any, res:any)=>{
    res.send("Hello")
})

app.get('/jobs', async (req:any, res:any)=>{
    try{
        const response = await client.query(`SELECT id FROM customer;`) // returns an array of object of IDs 
        console.log(typeof(response.rows))
        res.json({
            message : response.rows 
        })
    }
   catch(err){
    console.error("error : " + err)
   }
})

const userSchema = zod.object({
    name: zod.string(),
    email: zod.string().email().optional(),
    phno: zod.string().min(10),
    address: zod.string()
})

app.post('/customer-details', async (req:any ,res:any)=>{  
    try{
        console.log(req.body)
        const userBody = userSchema.safeParse(req.body);
        console.log(userBody)
        if(!userBody.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        else{
            if(!req.body.email){
                const query = `INSERT INTO customer(name, phno, address)values($1, $2, $3);`
                const values = [req.body.name, req.body.phno, req.body.address]
                const queryResponse = await client.query(query, values)
                if(!queryResponse){
                    return res.json({
                        message : "Try again later"
                    })
                }  
            }
            else{
                const query = `INSERT INTO customer(name, email, phno, address)values($1, $2, $3, $4)`
                const values = [req.body.name, req.body.email, req.body.phno, req.body.address]
                const queryResponse = await client.query(query, values)
                if(!queryResponse){
                    return res.json({
                    'message' : "Try again later"
                    })
                }
                else{
                    return res.json({
                        message : "User created successfully"
                    })
                }
            }
        }
    } catch(err){
        console.error("Error occurred:", err)
        return res.status(500).json({
            message: "Internal server error"
        })
    } 
    // finally{
    //     await client.end()
    // }       
})

app.post('/job-details', (req:any,res:any)=>{
    
})



app.listen(port, ()=> console.log(`listening on port ${port}`))