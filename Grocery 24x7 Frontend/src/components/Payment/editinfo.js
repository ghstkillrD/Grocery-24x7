import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function UpdateUserInfo() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    //const [item, setItem] = useState('');
    //const [quantity, setQuantity] = useState('');
    const [method, setMethod] = useState('');
    const [subtotal, setSubTotal] = useState("")
    const [shipping, setShipping] = useState('');
    const [total, setTotal] = useState('');


    const [_id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setName(localStorage.getItem('Name'));
        setAddress(localStorage.getItem('Address'));
        setContact(localStorage.getItem('Contact'));
        //setItem(localStorage.getItem('Item'));
        //setQuantity(localStorage.getItem('Quantity'));
        setMethod(localStorage.getItem('Method'));
        setSubTotal(localStorage.getItem('SubTotal'));
        setShipping(localStorage.getItem('Shipping'));
        setTotal(localStorage.getItem('Total'));
    }, []);   
    
    const updateAPIData = () => {
        const newPayment ={
            name,
            address,
            contact,
            //item,
            //quantity,
            method,
            subtotal,
            shipping,
            total
            
        }
        axios.put(`http://localhost:8070/payment/payupdate/${_id}`,newPayment).then(()=>{
            alert(" Updated Successfully!");
            
        }).catch((err) =>{
            alert(err)
        })
    }


    return (

        <div class="container">
    <form onSubmit={updateAPIData}>
	
    <br></br><br></br>

    <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" value = {name}
                type="text" id="name" name="name" placeholder="Enter name.." required
                onChange={(e)=> { setName(e.target.value); }}/>
    </div>

	<br></br>
    <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input className="form-control" value = {address}
                type="text" id="address" name="address" placeholder="Enter address.." required
                onChange={(e)=> {setAddress(e.target.value);}}/>
            </div>


	<br></br>

    <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact number</label>
                <input className="form-control" pattern="[0-9]{10}" value = {contact}
                type="tel" id="contact" name="number" placeholder="0XXXXXXXXX" required
                onChange={(e)=> {setContact(e.target.value);}}/>
            </div>
    <br></br>

    <Button variant="contained" color="secondary" type="submit"
                        >Edit Info</Button>&nbsp;&nbsp;

    <Link to="/pay">
<Button variant="contained" color="secondary" 
                        >Back</Button>
</Link>
  </form>
</div>
    
    );

}