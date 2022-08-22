import './itempage.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Card,CardMedia,CardContent,Typography} from '@material-ui/core'
import { Button,CardActionArea, CardActions } from '@material-ui/core';


export default function ItemPage() {

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
            backgroundColor: '#e6e9ea'
        }
        
      })
    
      const classes = useStyles();
    
    //receive part
        const [items, setItems] = useState([]);
        const [searchTerm, setsearchTerm] = useState("");
  

        

        useEffect(() => {
            function getItems() {
                axios.get("http://localhost:8070/product/").then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                }).catch((err) => {
                    alert(err.message);
                })
            }
            getItems();
        }, [])

        //send data
        const setData = (items) => {
            let { _id,pname, pDesc, pPrice,pImage } = items;
            localStorage.setItem('ID', _id);
            localStorage.setItem('Item Name', pname);
            localStorage.setItem('Item Desc', pDesc);
            localStorage.setItem('Price', pPrice);
            localStorage.setItem('Image', pImage)   
         }

        return(
  
            <div className="homescreen__products" className={classes.container}>
                <h1>Item Page</h1> 

                {/*search*/}
                <input type = "text" placeholder = "search..." className = "form-control" style={{margintop:50, marginbottom:20, width:"40%"}}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />
    
   
   {/*<table class="table table-bordered">
        <table class="table table-hover" >
                   
                   <tbody>
                       {
                           items.filter(val=> {
                               if(searchTerm == ''){
                                   return val;
                               }else if (
                                   val.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.pDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.pPrice.toLowerCase().includes(searchTerm.toLowerCase()) 
                               ){
                                   return val;
                               }
                           }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.pname}</td>
                                   <td >{f.pDesc} </td>
                                   <td >{f.pPrice} </td>
                                   <td >{f.stockUnits} </td>

                               </tr>

                           })
                       }
                   </tbody>
                   </table>
                    </table>*/}
                <br/>

                {/*iterm card*/}
                <div className="grid-container">
                
                    {items.map((items) => {return(
                        
                    <Card sx={{ maxWidth: 345 }} className="grid-item"> 
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={items.pImage}
                            alt={items.pname}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ItemName : {items.pname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Item Description : {items.pDesc}<br/>
                            Item Price : {items.pPrice}<br/>
                            Remaining : {items.stockUnits}<br/>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            
                            <Link to="/selected" className={classes.navlink}>
                                <Button className={classes.buttonStyle} 
                                variant="contained" color="secondary" size="small"
                                onClick = {() => setData(items)}>Add to cart</Button>
                                </Link>
                            
                        </CardActions>
                    </Card>
                    
                    
                        );
                    })}
                
                </div>
            </div>


        );
    }