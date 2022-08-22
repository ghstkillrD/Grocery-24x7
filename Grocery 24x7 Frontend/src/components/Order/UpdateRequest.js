import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
//import { useHistory } from 'react-router';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UpdateRequest(){

    //let history = useHistory();
    const [orderID, setOrderID] = useState("");
    const [reason, setReason] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    

    const [_id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('RID'))
        //setRequestID(localStorage.getItem('RID'));
        setReason(localStorage.getItem('Reason'));
        setDesc(localStorage.getItem('Description'));
        setDate(localStorage.getItem('Date'));
        
    }, []);

    useEffect(() => {
        setOrderID(localStorage.getItem('OID'))
        
        //setStatus(localStorage.getItem('Status'));
        //setDate(localStorage.getItem('Date'));
        
    }, []);

    const updateAPIData = () => {
        const newRequest = {
            orderID,
            reason,
            desc,
            date
        }
        axios.put(`http://localhost:8070/request/rupdate/${_id}`,newRequest).then(()=>{
            alert(" Updated Successfully!");
           
        }).catch((err) =>{
            alert(err)
        })
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
            <br/>
                <p>Request ID : {_id}</p>
                <p>Order ID : {orderID}</p>
                <div className="mb-3">
                    <label htmlFor="inputReason" className="form-label">Reason</label>
                    <textarea className="form-control" id="inputReason" rows="3"
                    value={reason} 
                    onChange={(e) => {setReason(e.target.value);}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="inputDescription" rows="3"
                    value={desc}
                    onChange={(e) => {setDesc(e.target.value);}}/>
                </div>
                
                
                <Button variant="contained" color="secondary" type='submit' onClick={updateAPIData}>Update</Button>
                
                &nbsp;&nbsp;

    <Link to="/r">
<Button variant="contained" color="secondary" 
                        >Back</Button>
                        </Link>
                <br/><br/>
            </form>
        </div>

    )

}