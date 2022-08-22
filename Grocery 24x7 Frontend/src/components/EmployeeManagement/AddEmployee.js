/* eslint-disable */
import React, { useState }  from "react";
import axios from 'axios'
//import {isEmpty, isEmail, isLength, } from '../../utils/validation/Validation'
//import validator from '.\node_modules\validator\dist\Validator'



export default function AddEmployee(){
    

    const [EmployeeNo, setemployeeno] = useState("");
    const [Name, setname] = useState("");
    const [EmailAddress,setemailaddress] = useState("");
    const [HomeAddress,sethomeAddress] = useState("");
    const [PhoneNo, setphoneno] = useState("");


    function sendData(e){
      e.preventDefault();
      
      const newEmployee ={
          EmployeeNo,
          Name,
          EmailAddress,
          HomeAddress,
          PhoneNo
      }

    

    axios.post("http://localhost:8070/employee/add", newEmployee).then(()=>{
          alert("Employee Add");
          window.location.replace("/");
          
    }).catch((err)=>{
          alert(err)
    })
    }


    //validation
    /*const [emailaddressError, setEmailAddressError] = useState('')
    const validateEmailAddress = (e) => {
      var email = e.target.value
    
      if (validator.isEmailAdress(EmailAddress)) {
        setEmailAddressError('Valid Email Address :)')
      } else {
        setEmailAddressError('Enter valid Email Address!')
      }
    }*/



    return(
        <div className="container">
        <div className="py-2">
            <h2>Add Employee </h2>
        </div>
            <form onSubmit={sendData}>


            <div className='col-md-6'>
                
                <label for="EmployeeNo">Employee No</label>
                <input type="text"  className="form-control"  id="EmployeeNo"  placeholder="Enter Employee No" onChange= {(e)=>{  setemployeeno(e.target.value); }}>
                </input>
                
            </div>
 
            <div className='col-md-6'>
                <label for="Name"> Name</label>
                <input type="text"  className="form-control"   id="Name"  placeholder="Enter Name" onChange= {(e)=>{ setname(e.target.value);  }}>
                </input>
            </div>



            <div className='col-md-6'>
                <label for="EmailAddress">Email Address</label>
                <input type="text"  className="form-control" id="EmailAddress"  placeholder="Enter Email Address" onChange= {(e)=>{ setemailaddress(e.target.value); }}>
                 </input>
            </div>




            <div className='col-md-6'>
                <label for="HomeAddress">Home Address</label>
                <input type="text"  className="form-control"  id="HomeAddress"  placeholder="Enter Home Address" onChange= {(e)=>{  sethomeAddress(e.target.value); }}>
                </input>
            </div>



            <div className='col-md-6'>
                <label for="PhoneNo">Phone No</label>
                <input type="text"  className="form-control"  id="PhoneNo" placeholder=" Enter PhoneNo" onChange= {(e)=>{setphoneno(e.target.value);}}>
                </input>
            </div>
            
            
            
            <br/><br/>
            <div className="container">
            <button type="Submit" className="btn btn-danger" onClick={sendData}>Submit</button>
            </div>


        </form>
            <br/><br/>


    </div>
    )

}

