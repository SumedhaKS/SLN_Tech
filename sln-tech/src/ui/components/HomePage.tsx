import { useEffect, useState } from "react"

export default function HomePage() {
    const [newJob, setNewJob] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [users, setUsers] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('');
    const [serial, setSerial] = useState('');

    const [testParam, settestparam] = useState('')

    useEffect(() => {
        // poll BE
        // store the output array in users
        async function getPing() {
            const res = await (window as any ).versions.ping()
            settestparam(res)
        }
        getPing()
        
        

    }, [searchParam])

    const submitForm = ()=>{
        /*
        {
            name,
            email,
            address,
            make,
            model,
            serial
        }
            send to BE 

            on succcess setNewJob(false)
        */ 
    }

    if (!newJob) {
        return <div>
            Home Page

            <h2>{testParam}</h2> <br />
           
            <div>
                <button onClick={() => setNewJob(true)}>Create new Job</button>
            </div>
            <div>
                <input type="text" placeholder="Search Job ID" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />      { /*a debouncer would be great*/}
                <div>
                    {users.map(user => <User user={user} />)}
                </div>
            </div>
        </div>
    }

    if (newJob) {
        return <div>
            <div>
                <label>Name</label>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />

                <label>Email</label>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                <label>Address</label>
                <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

                <label>Make</label>
                <input type="text" placeholder="Camera Make" onChange={(e) => setMake(e.target.value)} />

                <label>Model</label>
                <input type="text" placeholder="Camera Model" onChange={(e) => setModel(e.target.value)} />

                <label>Serial No</label>
                <input type="text" placeholder="Camera Serial No" onChange={(e) => setSerial(e.target.value)} />
            </div>
            <button onClick={submitForm}>Create Job</button>
        </div>
    }

}

interface userType{
    id: string
}

function User({user}:{user:userType}) {
    const checkStatus = ()=>{
        // navigate to the page where the technician will update the fault and estimated cost with jobID as param 
    } 

    return <div>
        <div>
            {user.id}
            <button onClick={checkStatus} >Status</button>
        </div>
    </div>
}