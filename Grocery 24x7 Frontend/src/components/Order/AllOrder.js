import './AllOrder.css';
import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from "axios";
import  jsPDF   from "jspdf";
import 'jspdf-autotable'


export default function AllOrder(){

    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },
        
        buttonStyle :{
              
            fontWeight: "bold",
            padding:'20 px',
            paddingRight: '20px',
            paddingLeft: '20px'
  
        }
    
      })
    
      const classes = useStyles();
    
    const [orders, setOrders] = useState([]);
    //const [carts, setCarts] = useState([]);
   

    useEffect(() => {
        function getOrders(){
            axios.get("http://localhost:8070/order/o").then((res) => {
                setOrders(res.data);   
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    },[])

    /*useEffect(() => {
        function getCarts(){
            axios.get("http://localhost:8070/cart/c").then((res) => {
                setCarts(res.data);   
            }).catch((err) => {
                alert(err.message);
            })
        }
        getCarts();
    },[])*/

    const setData = (orders) => {
        let { _id,date,status,name, address, contact, method, subtotal, shipping, total} = orders;
        localStorage.setItem('OID', _id);
        localStorage.setItem('Date', date);
        localStorage.setItem('Status', status);
        localStorage.setItem('ID', _id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Address', address);
        localStorage.setItem('Contact', contact);
        
        localStorage.setItem('Method', method);
        localStorage.setItem('SubTotal', subtotal);
        localStorage.setItem('Shipping', shipping);
        localStorage.setItem('Total', total);
    }

    const getData = () => {
        axios.get("http://localhost:8070/order/o").then((res) => {
                setOrders(res.data);
             })
    }

    const onDelete = (orders) => {
        let { _id } = orders;
        localStorage.setItem('OID', _id);
        //localStorage.setItem('RID', orderID);
        axios.delete(`http://localhost:8070/order/odelete/${_id}`).then(() => {
            getData();
        })
    }
    
    const generatePDF = items => {

        const doc = new jsPDF();
        const tableColumn = ["Order ID", "Date", "Status", "Name","Address","Contact"];
        const tableRows = [];
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    
        items.map(orders => {
            const ordersData = [
                orders._id,
                orders.date,
                orders.status,
                orders.name,
                orders.address,
                orders.contact
    
            ];
            tableRows.push(ordersData);
        })
        doc.text("Grocery 24x7", 70, 8).setFontSize(13);
        doc.text("Cart Details Report", 14, 16).setFontSize(13);
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        //right down width height
        //doc.addImage(img, 'JPEG', 170, 8, 35, 35);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
        doc.save("Order Report.pdf");
    };

    return(
        <div className="container">
            <br/>
            <h3>Order Details</h3>
            <div class="buttonn">

<button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(orders)} >Generate Report</button> 
<Link to='/r' className={classes.navlink} >
                            <Button variant="contained" color="secondary" style={{float:"right"}}>All Requests</Button>
                        </Link>
</div><br/>
            <p>{orders.map((orders) => {return(
                <div>
                   
                    <p><b>Order ID : </b>{orders._id}<br/>
                    <b>Ordered Date : </b>{orders.date}<br/>
                    <b>Status : </b>{orders.status}<br/><br/>
                    
                    

                    <Link to='/singleOrder' className={classes.navlink} >
                            <Button variant="contained"  onClick={() => setData(orders)}>View</Button>
                        </Link> &nbsp;
                        <Button startIcon={<DeleteOutlinedIcon/>} className={classes.buttonStyle}
                        variant="contained" color="secondary" onClick={() => onDelete(orders._id)}>Delete</Button>
                        &nbsp;&nbsp;
                        <Link to='/radd' className={classes.navlink} >
                            <Button variant="contained"  onClick={() => setData(orders)}>Request</Button>
                        </Link> &nbsp;

                        <Button variant="contained" >Write a Review</Button>
                    </p><br/>
                </div>
                );
                })}
            </p>

            
        </div>
    )
}
/*<Link to='/oupdate/:rid'>
<button onClick={() => setData(orders)}>Update</button>
</Link> &nbsp;*/