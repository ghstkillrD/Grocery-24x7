import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import axios from "axios";

export default function AddRequest(){

    const cDate = Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric' , year:'numeric'}).format(new Date());
    const reqDate = new Date(cDate);
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    
    const date = reqDate.toLocaleDateString(
        'en-gb',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      );

    const [orderID, setOrderID] = useState("");
    const [reason, setReason] = useState("");
    const [desc, setDesc] = useState("");
    //const [date, setDate] = useState(dd);

    useEffect(() => {
        setOrderID(localStorage.getItem('OID'))
        
        //setStatus(localStorage.getItem('Status'));
        //setDate(localStorage.getItem('Date'));
        
    }, []);
    
    function sendData(e){
        e.preventDefault();

        const newRequest = {
            orderID,
            reason,
            desc,
            date
        }

        axios.post("http://localhost:8070/request/radd",newRequest).then(()=>{
            alert("Request Added");
            window.location.replace("/r");
        }).catch((err) =>{
            alert(err)
        })

    }

    return(

        <div className="container">
            <form onSubmit={sendData}>
                <br/>
                <h4>Add a request to change order. </h4>
                    Order ID : {orderID}<br/><br/>
                 <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Reason</label>
                    <textarea className="form-control" id="inputDescription" rows="3" required
                    onChange={(e) => {setReason(e.target.value);}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="inputDescription" rows="3" required
                    onChange={(e) => {setDesc(e.target.value);}}/>
                </div>
    
               
                
                
                
                <Button variant="contained" color="secondary" type="submit" className="btn btn-primary">Submit</Button>
                <br/><br/>
                
            </form>
        </div>

    )

    /*<div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Reason</label><br/>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                        name="reason" value="missing" onChange={(e) => {setReason(e.target.value);}}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Product is missing in the package</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        name="reason" value="wrongItems" onChange={(e) => {setReason(e.target.value);}}/>
                        <label class="form-check-label" for="flexRadioDefault2">I received the wrong items or order</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        name="reason" value="quantity" onChange={(e) => {setReason(e.target.value);}}/>
                        <label class="form-check-label" for="flexRadioDefault2">I did not order this quantity</label>
                    </div>
                </div>*/

}