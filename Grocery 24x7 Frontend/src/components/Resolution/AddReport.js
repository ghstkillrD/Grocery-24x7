import React, { useState } from "react"; 
import axios from "axios";
import Button from '@material-ui/core/Button';

export default function AddReport(){

    const[name, setName] = useState("");
    const[yusername, setYusername] = useState("");
    const[ousername, setOusername] = useState("");
    const[issue, setIssue] = useState("");

    function sendData(e){
        e.preventDefault();


            const newReport ={

                name,
                yusername,
                ousername,
                issue
            }
 
            axios.post("http://localhost:8070/report/add",newReport).then(()=>{
                alert("Report Added")
            
            }).catch((err)=>{
                alert(err)
            })
    
    }


    return(

        <div className="container">
        <br></br>
        <br></br>
        <h3>Reporting an Issue </h3>
            <form onSubmit={sendData}>

                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name"
                    onChange={(e)=>{

                        setName(e.target.value);

                    } }></input>

                </div>

                <div className="mb-3">
                    <label for="yusername" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="yusername" placeholder="Enter your username"
                     onChange={(e)=>{

                        setYusername(e.target.value);

                    } }></input>
                </div>

                <div className="mb-3">
                    <label for="ousername" className="form-label">Wrongdoer UserName</label>
                    <input type="text" className="form-control" id="ousername" placeholder="Enter the username of the wrongdoer"
                    onChange={(e)=>{

                        setOusername(e.target.value);

                    } }></input>
                </div>

                <div className="mb-3">
                    <label for="issue" className="form-label">Issue</label>
                    <input type="text" className="form-control" id="issue" placeholder="Enter the issue"
                    onChange={(e)=>{

                        setIssue(e.target.value);

                    } }></input>
                </div>
                
                <Button variant="contained" color="black" type="submit" >Submit</Button>
            </form>
            <br></br>
    <br></br>
    <br></br>
    <br></br>
        </div>
    )



}