/* eslint-disable */
import React, { useEffect, useState }  from "react";
import axios from "axios";



export default function UpdateEmployee(){

    const [EmployeeNo, setemployeeno] = useState("");
    const [Name, setname] = useState("");
    const [EmailAddress,setemailaddress] = useState("");
    const [HomeAddress,sethomeAddress] = useState("");
    const [PhoneNo, setphoneno] = useState("");

    const [_id, setID] = useState(null);

    useEffect(()=> {
        setID(localStorage.getItem('ID'));
        setemployeeno(localStorage.getItem('EmployeeNo')); 
        setname(localStorage.getItem('Name'));
        setemailaddress(localStorage.getItem('EmailAddress'));
        sethomeAddress(localStorage.getItem('HomeAddress'));
        setphoneno(localStorage.getItem('PhoneNo'));
    }, []);

    useEffect(()=>{
        setemployeeno(localStorage.getItem('EmployeeNo'))
    },[]);


    const updateAPIData = () => {
        const newEmployee ={
            EmployeeNo,
            Name,
            EmailAddress,
            HomeAddress,
            PhoneNo
        
        }
    axios.put(`http://localhost:8070/employee/update/${_id}` ,newEmployee).then(()=>{
        alert(" Updated Suceessfuly!");
        window.location.replace("/");
    }).catch((err) =>{
        alert(err)
    })

}

      return(   
        <div className="container">
        <div className="py-2">
            <h2>Update Employee </h2>
        </div>
            <form>

            <p>EmployeeNo : {EmployeeNo}</p>
 
            <div className='col-md-6'>
                <label for="Name"> Name</label>
                <input type="text" 
                value = {Name}
                className="form-control" 
                id="Name"  
               
                onChange= {(e)=>{
                    setname(e.target.value);
                }}/>
                
            </div>



            <div className='col-md-6'>
                <label for="EmailAddress">Email Address</label>
                <input type="text" 
                value = {EmailAddress}
                className="form-control"
                 id="EmailAddress" 
                
                 onChange= {(e)=>{
                    setemailaddress(e.target.value);
                }}/>
            </div>




            <div className='col-md-6'>
                <label for="HomeAddress">Home Address</label>
                <input type="text" 
                value = {HomeAddress}
                className="form-control" 
                id="HomeAddress" 
               
                onChange= {(e)=>{
                    sethomeAddress(e.target.value);
                }}/>
            </div>



            <div className='col-md-6'>
                <label for="PhoneNo">Phone No</label>
                <input type="text" 
                value = {PhoneNo}
                className="form-control" 
                id="PhoneNo" 
                
                onChange= {(e)=>{
                    setphoneno(e.target.value);
                }}/>
                
            </div> 
        

        <br/><br/>
            <div className="container">
            <button type="submit" 
            className="btn btn-danger" onClick={updateAPIData}>Save</button>
            </div>
        </form>
        <br/><br/>
    
    </div>
    );

}
