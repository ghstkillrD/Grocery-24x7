
import React,{useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import { Link } from "react-router-dom";
import {Card,CardMedia,CardContent,Typography} from '@material-ui/core'
import { Button,CardActionArea, CardActions } from '@material-ui/core';

import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";


export default function SelectedOrder() {

    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },
        
        buttonStyle :{
              
            fontWeight: "bold",
            padding:'20 px',
            paddingRight: '20px',
            paddingLeft: '20px'
        },
        container: {
            backgroundColor: '#e6e9ea',
            height: '600px',
            position: 'relative'
        }
      })
    
      const classes = useStyles();

    
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    
    const [method, setMethod] = useState('');
    const [subtotal, setSubTotal] = useState("")
    const [shipping, setShipping] = useState('');
    const [total, setTotal] = useState('');

    

    const [_id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('OID'))
        
        setStatus(localStorage.getItem('Status'));
        setDate(localStorage.getItem('Date'));
        setName(localStorage.getItem('Name'));
        setAddress(localStorage.getItem('Address'));
        setContact(localStorage.getItem('Contact'));
      
        setMethod(localStorage.getItem('Method'));
        setSubTotal(localStorage.getItem('SubTotal'));
        setShipping(localStorage.getItem('Shipping'));
        setTotal(localStorage.getItem('Total'));
        
    }, []);

    /*const [orders, setOrders] = useState([]);
    useEffect(() => {
        function getOrders(){
            axios.get(`http://localhost:8070/order/oget/${_id}`).then((res) => {
                setOrders(res.data);   
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    },[])*/
    

    return(
        <div className="container">
        <br/>
        <h3>Order Details</h3><br/>
       
        
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Order ID:" secondary={_id}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Ordered Date:" secondary={date}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Order Status:" secondary={status}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Name:" secondary={name}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Address:" secondary={address}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Contact Details:" secondary={contact} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Payment Method:" secondary={method}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Sub Total:" secondary={subtotal} />
      </ListItem>
      <ListItem>
        <ListItemText primary=" Shipping Fee:" secondary={shipping}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Total:" secondary={total}  />
      </ListItem>

    </List>
    </div>
    )
}