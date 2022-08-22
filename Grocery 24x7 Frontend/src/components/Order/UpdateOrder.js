import React,{useState, useEffect} from "react";
import axios from "axios";

export default function UpdateOrder(){

    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    

    const [_id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('OID'))
        
        setStatus(localStorage.getItem('Status'));
        setDate(localStorage.getItem('Date'));
        
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:8070/request/oupdate/${_id}`, {
            status,
            date
        }).then(() => {alert("Updated successfully")
            window.location.replace("/o");})
    }

    /*function sendData(e){
        e.preventDefault();

        const newRequest = {
            requestID,
            date,
            desc
        }

        axios.post("http://localhost:8070/request/add",newRequest).then(()=>{
            alert("Student Added")
        }).catch((err) =>{
            alert(err)
        })

    }*/

    return(

        <div className="container">
            <form >
                <div className="mb-3">
                    <label htmlFor="inputRequestID" className="form-label">Status</label>
                    <input type="text" className="form-control" id="inputReason" 
                    value={status} 
                    onChange={(e) => {setStatus(e.target.value);}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDate" className="form-label">Date</label>
                    <input type="text" className="form-control" id="inputDescription"
                    value={date}
                    onChange={(e) => {setDate(e.target.value);}}/>
                </div>
                
                
                <button type='submit' onClick={updateAPIData}>Update</button>
            </form>
        </div>

    )

}