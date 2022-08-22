import './viewcart.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import  jsPDF   from "jspdf";
import 'jspdf-autotable'

import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';

export default function ViewCart() {
    //styles
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

    //receive part
    const [items, setItems] = useState([]);

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

    //send total to payment part
        const setData = () => {
            localStorage.setItem('Total', total) 
         }

    //delete part
        const onDelete = (_id) => {
            axios.delete(`http://localhost:8070/cart/cdelete/${_id}`).then(() => {
                getData();
                window.location.replace('/c');
        })
        }

        //data receive
        const getData = () => {
            axios.get(`http://localhost:8070/cart/c`).then((getData) => {
                     setItems(getData.data);
                 })
        }

        //get total
        function getCartSubTotal  ()  {
            const i= items
              .reduce((itemprice, item) => itemprice + item.itemprice * item.quantity, 0)
              .toFixed(2);
              
              return i;
        };
         const total = items
         .reduce((itemprice, item) => itemprice + item.itemprice * item.quantity, 0)
         .toFixed(2);

       /* function calTotal(itemprice,quantity){
            //const t = items.map((items) => {items.qPrice})
            //console.log(t)
            return itemprice*quantity;
        }*/
        //<p>Rs{calTotal(items.itemprice,items.quantity)}</p>

        // genarate pdf
        const generatePDF = items => {

            const doc = new jsPDF();
            const tableColumn = ["Item Name", "Item Quantity", "Net Total", "Sub Total"];
            const tableRows = [];
            const date = Date().split(" ");
            const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        
            items.map(items => {
                const itemsData = [
                    items.itemname,
                    items.quantity,
                    items.itemprice,
                    items.qPrice
        
                ];
                tableRows.push(itemsData);
            })
            doc.text("Grocery 24x7", 70, 8).setFontSize(13);
            doc.text("Cart Details Report", 14, 16).setFontSize(13);
            doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
            //right down width height
            //doc.addImage(img, 'JPEG', 170, 8, 35, 35);
            doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
            doc.save("Cart Details Report.pdf");
        };

    return(

        <div className="cartscreen">
            <div className="cartscreen__left">
                <h2>Shopping Cart</h2>

                <div class="buttonn">
                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(items)} >
                    Generate Report</button> <br></br>
                </div><br/>

                {/*cart table*/}
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Product Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">NetPrice(Rs.)</TableCell>
                            <TableCell align="right">Sub Total(Rs.)</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((items) => {return(
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        
                            <TableCell align="right">{items.itemname}</TableCell>
                            <TableCell align="right">{items.quantity}</TableCell>
                            <TableCell align="right">{items.itemprice}</TableCell>
                            <TableCell align="right">{items.qPrice}</TableCell>
                            <TableCell align="right">
                                <Link className={classes.navlink} to = '/cdelete:id'>
                                    <Button startIcon={<DeleteOutlinedIcon/>} className={classes.buttonStyle}
                                    variant="contained" color="secondary"
                                    onClick = {() => onDelete(items._id)}>Delete</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
            
            </div>

            <div className="cartscreen__right">
                <div className="cartscreen__info">
                    <form >
                    <p>Total = Rs{getCartSubTotal()}</p>
                        <Link to = '/checkout' className={classes.navlink}>
                            <Button variant="contained" onClick = {() => setData()}>CheckOut</Button>
                        </Link>
                    </form>
                </div>
            </div>
      </div>
    );
}
