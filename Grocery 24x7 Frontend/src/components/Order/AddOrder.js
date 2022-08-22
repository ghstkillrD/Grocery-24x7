import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';


export default function AddOrder(){

    //styles
    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },

      })
    
    const classes = useStyles();

    //take today's date
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

    const status = "pending...";
   
    //receive data
    const [payments, setPayments] = useState([]);
    /*useEffect(() => {
        function getPayments(){
            axios.get("http://localhost:8070/payment/pay").then((res) => {
                console.log(res.data);
                setPayments(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPayments();
    }, [])*/

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

    const [items, setItems] = useState([]);
    //const [total, setTotal] = useState(0);
    /*const [item1, setItem1] = useState(0);
    const [item2, setItem2] = useState(0);
    const [item3, setItem3] = useState(0);*/

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8070/cart/c").then((res) => {
                //console.log(res.data);
                setItems(res.data);
               // setTotal(res.data.qPrice);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])
    
    /*const itemlist = ["x"];
    const il = itemlist.toString();
    
    function additem(itemname){
        let x = itemlist.push(itemname).toString();
        return (x);

    }
    
    const iteml = items
         .reduce((name, item) => name+ item.name,0);
         itemlist.push(iteml);*/


    function sendData(e){
        e.preventDefault();

        const newOrder = {
            status,
            date,
            name,
            address,
            contact,
            method,
            total,
            shipping,
            subtotal,

        }

        axios.post("http://localhost:8070/order/oadd",newOrder).then(()=>{
            alert("Order Added");
            window.location.replace("/o");
        }).catch((err) =>{
            alert(err)
        })

    }

    return(
        <div className="container">
        <br/><br/>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{backgroundColor:"black" }}>
                        <TableRow >
                            <TableCell align="right" style={{color:"white"}}>Product Name</TableCell>
                            <TableCell align="right" style={{color:"white"}}>Quantity</TableCell>
                            <TableCell align="right" style={{color:"white"}}>NetPrice(Rs.)</TableCell>
                            <TableCell align="right" style={{color:"white"}}>Sub Total(Rs.)</TableCell>
                            <TableCell align="right" style={{color:"white"}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((items) => {return(
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        
                            <TableCell align="right">{items.itemname}</TableCell>
                            <TableCell align="right">{items.quantity}</TableCell>
                            <TableCell align="right">{items.itemprice}</TableCell>
                            <TableCell align="right">{items.qPrice}</TableCell>
                            
                        </TableRow>
                    );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
           
            

    <div className="grid-container">
        
                <div className="grid-item2">
                <b>Name :</b> <br/>
                <b>Address : </b><br/>
                <b>Contact No : </b><br/>
                <b>Date : </b><br/>
                <b>Status : </b><br/>
                <b>Payment Method : </b><br/> 
                <b>Sub Total : </b><br/>
                                                      
                <b>Delivery Fee : </b><br/>
                <b>Total : </b><br/><br></br>
                </div>
                <div className="grid-item2">
                {name}<br/>
                {address}<br/>
                {contact}<br/>
                {date}<br/>
                {status}<br/>
                {method}<br/> 
                Rs.{subtotal}.00<br/>
                                                      
                Rs.{shipping}.00<br/>
                Rs.{total}.00<br/><br></br>
                </div>

           

    </div>
    <form onSubmit={sendData}>
  
  <Button variant="contained" color="secondary" type="submit"
                       >Confirm Order</Button>
  
  </form>
<br/><br/>

</div>
        /*<div className="container">
            <form onSubmit={sendData}>

                 <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Reason</label>
                    <textarea className="form-control" id="inputDescription" rows="3"
                    onChange={(e) => {setReason(e.target.value);}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="inputDescription" rows="3"
                    onChange={(e) => {setDesc(e.target.value);}}/>
                </div>
    
               
                {date}
                
                
                <button type="submit" className="btn btn-primary">Submit</button>
                
            </form>
        </div>*/

    )

    

}