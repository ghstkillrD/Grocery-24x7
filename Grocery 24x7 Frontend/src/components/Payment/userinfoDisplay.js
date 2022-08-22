import './userinfoDisplay.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import  jsPDF   from "jspdf";
import 'jspdf-autotable';

import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";

export default function UserInfoDisplay() {
    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },

      })
    
      const classes = useStyles();

const [payments, setPayments] = useState([]);

useEffect(() => {
    function getPayments(){
        axios.get("http://localhost:8070/payment/pay").then((res) => {
            console.log(res.data);
            setPayments(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }
    getPayments();
}, [])
/*const [name, setName] = useState("");


useEffect(() => {
    
    setName(localStorage.getItem('Name'));
   
}, []);  */ 
//update part
    const setData = (payments) => {
        let { _id, name, address, contact, method, subtotal, shipping, total} = payments;
        localStorage.setItem('ID', _id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Address', address);
        localStorage.setItem('Contact', contact);
        //localStorage.setItem('Item', item)
        //localStorage.setItem('Quantity', quantity)
        localStorage.setItem('Method', method);
        localStorage.setItem('SubTotal', subtotal);
        localStorage.setItem('Shipping', shipping);
        localStorage.setItem('Total', total);
    }
 
    const generatePDF = items => {

        const doc = new jsPDF();
        const tableColumn = ["Payment ID", "Name", "Address", "Contact","Method","Total"];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    
        items.map(payments => {
            const ordersData = [
                payments._id,
                payments.name,
                payments.address,
                payments.contact,
                payments.method,
                payments.total
    
            ];
            tableRows.push(ordersData);
        })
        doc.text("Grocery 24x7", 70, 8).setFontSize(13);
        doc.text("Cart Details Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
        //doc.addImage(img, 'JPEG', 170, 8, 35, 35);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Payment Details Report.pdf");
    };

    return(
        <div className="container">
            <br/>
        <h1>Payment Info</h1> <br/>
        <div class="buttonn">

<button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(payments)} >Generate Report</button> <br></br>

</div>
        <p>{payments.map((payments) => {return(
            <div>
                
                        
                        
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Name:" secondary={payments.name}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Address:" secondary={payments.address}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Contact No" secondary={payments.contact}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Date:" secondary={payments.date}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Payment Method:" secondary={payments.method}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Sub Total:" secondary={payments.subtotal}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Shipping Fee:" secondary={payments.shipping}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Total:" secondary={payments.total}  />
      </ListItem>

    </List>

<form>
        <Link to = '/payupdate/:id'  className={classes.navlink}>
            <Button variant="contained" color="secondary" onClick = {() => setData(payments)}>Edit Info</Button>
        </Link> &nbsp;
        <Link to = '/oadd'  className={classes.navlink}>
            <Button variant="contained" color="secondary" onClick = {() => setData(payments)}>Pay</Button>
        </Link>
     </form>
       
            </div>
            );
            })}
        </p> 
        
       
        </div>
    );
}