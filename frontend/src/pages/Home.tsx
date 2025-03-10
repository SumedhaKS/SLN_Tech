import { useState } from "react"

export function Home(){
    const [filter, setFilter] = useState("")
    return <div>
        Home Page
        <div>
            <button>Create new Job</button>
        </div>
        <div>
            <input type="text" placeholder="Search Job ID" onChange={(e)=>setFilter(e.target.value)}/>
        </div>
        
    </div>
}
