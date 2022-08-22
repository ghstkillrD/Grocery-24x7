import './selecteditem.css';
import React,{useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import { Link } from "react-router-dom";
import {Card,CardMedia,CardContent,Typography} from '@material-ui/core'
import { Button,CardActionArea, CardActions } from '@material-ui/core';


export default function SelectedItem() {

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
        },
        container: {
            backgroundColor: '#e6e9ea',
            height: '600px',
            position: 'relative'
        }
      })
    
    const classes = useStyles();

    //increment
    let [quantity, setNumber] = useState(0)
    let [qPrice, setQPrice] = useState(0)


    function increment(){

        setNumber(++quantity);
        setQPrice(quantity*itemprice)

    }
    //decrement
    function decrement(){

        setNumber(--quantity);
        setQPrice(quantity*itemprice)

    }

    //passed data from the previous
    const [itemname, setName] = useState("");
    const [itemDesc, setDesc] = useState("");
    const [itemprice, setPrice] = useState("");
    const [pImage, setImage] = useState("");

    useEffect(() => {
        setName(localStorage.getItem('Item Name'));
        setDesc(localStorage.getItem('Item Desc'));
        setPrice(localStorage.getItem('Price'));
        setImage(localStorage.getItem('Image'));
    }, []);

    //add to cart
    function sendData(e) {
        e.preventDefault();
        
        const newItem = {
            itemDesc,
            itemname,
            quantity,
            itemprice,
            qPrice,
            pImage
        }

        axios.post("http://localhost:8070/cart/cadd",newItem).then(()=>{
            alert("Item Added to the cart!")
            
        }).catch((err)=>{
            alert(err)
        })

    }

    return(
        <div className={classes.container}>
            <br></br><br></br><br></br>
            <div className="grid-container">

                {/*item card*/}
                <Card sx={{ maxWidth: 345 }} className="grid-item1"> 
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="400"
                            image={pImage}
                            alt={itemDesc}
                        />                        
                    </CardActionArea>
                    <CardActions></CardActions>
                </Card>


                <div className="grid-item2">
                    <h3>{itemname} &nbsp;
                    {itemDesc}<br/>       
                    Rs.{itemprice}.00</h3><br/><br/>

                    <h5>Quantity : {quantity}<br/><br/>
                    Quntitiy Price : Rs. {qPrice}.00 </h5><br/>

                    <Button variant="outlined" className="btn" onClick = {e => increment()}>+</Button>&nbsp;
                    <Button variant="outlined" className="btn" onClick = {e => decrement()}>-</Button>&nbsp;

                    <form onSubmit={sendData}>
                        <br/>
                        <Button type="submit" className={classes.buttonStyle} variant="contained" color="secondary">Add to Cart</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}