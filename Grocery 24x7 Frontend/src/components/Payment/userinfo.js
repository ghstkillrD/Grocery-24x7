import './userinfo.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import visacard from 'G:/ITP/online_grocery_shopping/src/images/visacard.png';


export default function UserInfo() {

    //styles
    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },

      })
    
    const classes = useStyles();
    
    //set data
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [method, setMethod] = useState("");
    const [shipping, setShipping] = useState(200);
    const [subtotal, setSubTotal] = useState("");
    const total = parseInt(subtotal)+parseInt(shipping);

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

    localStorage.setItem('Name', name);

    useEffect(() => {
        setSubTotal(localStorage.getItem('Total'));
    }, []);
    
    //add data
    function sendData(e){
        e.preventDefault();
        localStorage.setItem('Name', name);
        const newPayment = {
            name,
            address,
            contact,
            method,
            total,
            shipping,
            subtotal,
            date
        }

        axios.post("http://localhost:8070/payment/payadd", newPayment).then(()=>{
            alert("Payment successfully!");
            window.location.replace("/pay");
        }).catch((err)=>{
            alert(err)
        })
    }
    
    return(

        <div className = "container">

        {/*billing form*/}
        <form onSubmit={sendData}>
        <br></br><br></br>
            <h3>Billing Details</h3>
            <br/>

            <b>Sub Total : </b> Rs.{subtotal}<br></br>
            <b>Delivery Fee :</b> Rs.200.00 <br></br>
            <b>Total : </b>Rs.{total}.00<br></br><br></br>

            {/*name field*/}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" 
                type="text" id="name" name="name" placeholder="Enter name.." required
                onChange={(e)=> { setName(e.target.value); }}/>
            </div>

            {/*address field*/}
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input className="form-control" 
                type="text" id="address" name="address" placeholder="Enter address.." required
                onChange={(e)=> {setAddress(e.target.value);}}/>
            </div>

            {/*contact field*/}
            <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact number</label>
                <input className="form-control" pattern="[0-9]{10}"
                type="tel" id="contact" name="number" placeholder="0XXXXXXXXX" required
                onChange={(e)=> {setContact(e.target.value);}}/>
            </div><br/>
                
            {/*payment method*/}
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group"><br/>

                <div className="checkout-step checkout-step--active">
                        <h5 className="_1fM65H _2RMAtd"><span className="_1Tmvyj"></span><span className="_1_m52b">Payment Options</span></h5>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <h5><FormControlLabel value="female" 
                                id="card" name="method" value="card" control={<Radio />} label="Card Payment" 
                                onChange={(e)=> {setMethod(e.target.value);}} />
                                </h5>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails className="card_details_parent">
                                <div className="credit_card_details">
                                    <Grid container>
                                        <Grid className="address_field_bk" item xs={12} sm={12} md={12} xl={8} lg={8}>
                                            <div className="panel panel-default credit-card-box">
                                                <div className="panel-heading display-table">
                                                    <div className="row display-tr">
                                                        <h3 className="panel-title display-td">Card Details</h3>
                                                        <div className="display-td">
                                                            <img className="img-responsive pull-right" 
                                                            src="G:/ITP/online_grocery_shopping/src/images/visacard.png" alt="visa" height="50px" width="100px"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="panel-body">
                                                    <div  id="payment-form">
                                                        <div className="row">
                                                            <div className="col-xs-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="cardNumber">Card Number</label>
                                                                    <div className="input-group">
                                                                        <input type="tel" className="form-control" name="cardNumber" placeholder="Valid Card Number" autoComplete="cc-number" required autofocus />
                                                                        <span className="input-group-addon"><i className="fa fa-credit-card" /></span>
                                                                    </div><br/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xs-7 col-md-7">
                                                                <div className="form-group">
                                                                    <label htmlFor="cardExpiry"><span className="hidden-xs">Expiration</span></label>
                                                                    <input type="tel" className="form-control" name="cardExpiry" placeholder="MM / YY" autoComplete="cc-exp" required />
                                                                </div>
                                                            </div>
                                                            <div className="col-xs-5 col-md-5 pull-right">
                                                                <div className="form-group">
                                                                    <label htmlFor="cardCVC">CVV Code</label>
                                                                    <input type="tel" className="form-control" name="cardCVC" placeholder="CVV" autoComplete="cc-csc" required />
                                                                </div><br/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xs-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="couponCode">Coupon Code</label>
                                                                    <input type="text" className="form-control" name="couponCode" />
                                                                </div>
                                                            </div>
                                                        </div><br/>
                                                        <div className="row">
                                                            <div className="col-xs-12">
                                                                
                                                            <Button className="btn btn-success btn-lg btn-block"
                                                            variant="contained" color="secondary" type="submit">Proceed to Pay</Button>
                                    
                                                            </div>
                                                        </div>
                                                        <div className="row" style={{ display: 'none' }}>
                                                            <div className="col-xs-12">
                                                                <p className="payment-errors" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                            <h5><FormControlLabel 
                            id="cash" name="method" value="cash" onChange={(e)=> {setMethod(e.target.value);}}
                            control={<Radio />} label="Cash On Delivery" /></h5>

                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails className="card_details_parent">
                                <div className="clearfix"><div className="payment-confirm-tip" data-spm-anchor-id="a2a0e.payment_page.0.i6.28766af7uWKlE7">You can pay in cash to our courier when you receive the goods at your doorstep.</div></div>
                                <br/><br/>
                                <div id="to-payment">
                                    <Button className="btn btn-success btn-lg btn-block"
                                    variant="contained" color="secondary" type="submit" >Proceed to Pay</Button> 
                                </div>
                                    
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        
                </div>
            </RadioGroup>
            <br></br><br></br>
        </form>

    </div>

    );
}

